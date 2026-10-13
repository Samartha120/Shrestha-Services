import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { sendEmail, sendEmailBackground } from "../config/mail.js";
import type { LoginPayload } from "../types/auth.types.js";
import crypto from "crypto";
import { unauthorized, conflict, badRequest, forbidden, notFound } from "../utils/AppError.js";
import { mfaService, MFA_PRIVILEGED_ROLES } from "./mfaService.js";
import { sessionService } from "./sessionService.js";

interface SessionMeta {
  userAgent?: string;
  ipAddress?: string;
}

export const authService = {
  login: async (payload: LoginPayload, meta: SessionMeta = {}) => {
    // Local password auth against the PostgreSQL users table.
    const profile = await prisma.user.findUnique({
      where: { email: payload.email },
      include: { role: true },
    });

    if (!profile || !profile.password) {
      logger.warn(`[Login Failed] Email: ${payload.email} - Reason: user missing or has no password`);
      throw unauthorized("Invalid credentials");
    }

    const passwordMatches = await bcrypt.compare(payload.password, profile.password);
    if (!passwordMatches) {
      logger.warn(`[Login Failed] Email: ${payload.email} - Reason: password mismatch`);
      throw unauthorized("Invalid credentials");
    }

    const roleName = profile.role?.name || "customer";
    const privileged = MFA_PRIVILEGED_ROLES.includes(roleName);

    // Privileged account with MFA on → do NOT issue session tokens yet. Return
    // a short-lived challenge the client exchanges via /auth/mfa/login-verify.
    if (privileged && profile.mfaEnabled) {
      const challengeToken = jwt.sign(
        { userId: profile.id, purpose: "mfa_challenge" },
        env.JWT_SECRET,
        { expiresIn: "5m" }
      );
      logger.info(`[Login MFA] Challenge issued for: ${payload.email}`);
      return { mfaRequired: true, challengeToken };
    }

    const session = await sessionService.create(profile, meta);

    logger.info(`[Login Success] Email: ${payload.email} - Role: ${roleName}`);

    return {
      user: {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: roleName,
        avatar: profile.avatar || undefined,
      },
      token: session.accessToken,
      refreshToken: session.refreshToken,
      csrfToken: session.csrfToken,
      // Nudge privileged accounts without MFA to enrol (non-blocking).
      mfaEnrollmentRequired: privileged && !profile.mfaEnabled,
    };
  },

  // Rotate a refresh token into a fresh access/refresh pair (revocable session).
  refresh: async (refreshToken: string, meta: SessionMeta = {}) => {
    if (!refreshToken) throw unauthorized("No refresh token");
    try {
      const rotated = await sessionService.rotate(refreshToken, meta);
      return {
        user: {
          id: rotated.user.id,
          name: rotated.user.name,
          email: rotated.user.email,
          role: rotated.user.role?.name || "customer",
          avatar: rotated.user.avatar || undefined,
        },
        token: rotated.accessToken,
        refreshToken: rotated.refreshToken,
        csrfToken: rotated.csrfToken,
      };
    } catch {
      throw unauthorized("Session expired. Please sign in again.");
    }
  },

  // Second step of login for MFA-protected accounts.
  verifyMfaLogin: async (challengeToken: string, code: string, mfaMeta: SessionMeta = {}) => {
    let decoded: { userId: string; purpose?: string };
    try {
      decoded = jwt.verify(challengeToken, env.JWT_SECRET) as any;
    } catch {
      throw unauthorized("Your verification session expired. Please sign in again.");
    }
    if (decoded.purpose !== "mfa_challenge") {
      throw unauthorized("Invalid verification session.");
    }

    const user = await mfaService.verifyForLogin(decoded.userId, code);
    const session = await sessionService.create(user, mfaMeta);
    logger.info(`[Login MFA] Success for: ${user.email}`);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.name || "customer",
        avatar: user.avatar || undefined,
      },
      token: session.accessToken,
      refreshToken: session.refreshToken,
      csrfToken: session.csrfToken,
    };
  },

  // Google OAuth relied on Supabase; unavailable in local-only mode.
  googleLogin: async (_payload: { accessToken: string }) => {
    throw new Error("Google sign-in is not available in local mode. Use email and password.");
  },

  sendOtp: async (email: string) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      logger.warn(`[OTP] Already registered: ${email}`);
      throw conflict("An account with this email already exists");
    }

    // Throttle: at most one fresh OTP per 45s to prevent rapid re-send spam while
    // still keeping UX instant. Resend inside that window reuses the last code.
    const recent = await (prisma as any).otp.findFirst({
      where: { email, used: false, expiresAt: { gt: new Date() }, createdAt: { gt: new Date(Date.now() - 45_000) } },
      orderBy: { createdAt: "desc" },
    });
    if (recent) {
      logger.info(`[OTP] Reusing recent OTP for ${email}`);
      return { success: true, reused: true };
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await (prisma as any).otp.create({ data: { email, otp, expiresAt } });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d8402a;">Welcome to Shrestha Services!</h2>
        <p>Thank you for registering. Please use the following OTP to verify your email:</p>
        <div style="font-size: 32px; font-weight: bold; color: #d8402a; letter-spacing: 8px; margin: 20px 0; text-align: center;">
          ${otp}
        </div>
        <p>This OTP is valid for 10 minutes.</p>
        <p style="color: #64748b;">If you didn't request this, please ignore this email.</p>
      </div>
    `;

    const emailText = `Welcome to Shrestha Services!\n\nYour OTP is: ${otp}\n\nThis OTP is valid for 10 minutes.\nIf you didn't request this, please ignore this email.`;

    // Non-blocking: respond instantly; email delivers in background with retries.
    // Works for every email domain - always attempts real Gmail delivery.
    sendEmailBackground(email, "Verify Your Email - Shrestha Services", emailHtml, emailText);
    logger.info(`[OTP] Issued for ${email} (email sending in background)`);
    return { success: true };
  },

  verifyOtp: async (email: string, otp: string) => {
    // Find valid OTP
    const validOtp = await (prisma as any).otp.findFirst({
      where: {
        email,
        otp,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!validOtp) {
      logger.warn(`[OTP Invalid] Email: ${email}`);
      throw badRequest("Invalid or expired OTP");
    }

    // Mark OTP as used
    await (prisma as any).otp.update({
      where: { id: validOtp.id },
      data: { used: true },
    });

    logger.info(`[OTP Verified] Email: ${email}`);
    return { success: true };
  },

  register: async (payload: any) => {
    // Reject duplicate email up front.
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
      logger.warn(`[Registration Failed] Email already in use: ${payload.email}`);
      throw conflict("An account with this email already exists");
    }

    // Enforce email ownership SERVER-SIDE: a verified OTP for this email must
    // exist (issued + confirmed via /verify-otp within the last 30 minutes).
    // This stops direct POST /register calls from bypassing email verification.
    const verifiedOtp = await (prisma as any).otp.findFirst({
      where: {
        email: payload.email,
        used: true,
        createdAt: { gt: new Date(Date.now() - 30 * 60 * 1000) },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!verifiedOtp) {
      logger.warn(`[Registration Blocked] No verified OTP for: ${payload.email}`);
      throw badRequest("Please verify your email with the code we sent before registering.");
    }

    // Ensure the customer role exists, then create the user + customer profile.
    const customerRole = await prisma.role.upsert({
      where: { name: "customer" },
      update: {},
      create: { name: "customer" },
    });

    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const profile = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        roleId: customerRole.id,
        isVerified: true,
      },
      include: { role: true },
    });

    const fullAddress = [payload.street, payload.city, payload.stateName, payload.zip]
      .filter(Boolean)
      .join(", ");

    await prisma.customer.create({
      data: {
        id: profile.id,
        phone: payload.phone ?? null,
        companyName: payload.companyName ?? null,
        panVatNumber: payload.registrationId ?? payload.panVatNumber ?? null,
        address: fullAddress || null,
      },
    });

    logger.info(`[Registration Success] Email: ${payload.email} - ID: ${profile.id}`);

    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role?.name || "customer",
    };
  },

  forgotPassword: async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    // Always resolve the same way to avoid leaking whether an account exists.
    // Only users with a local password can reset (OAuth-only accounts can't).
    if (!user || !user.password) {
      logger.info(`[Forgot Password] No resettable account for: ${email} (silent no-op)`);
      return { success: true };
    }

    // Invalidate any outstanding tokens for this user, then issue a fresh one.
    await (prisma as any).passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await (prisma as any).passwordResetToken.create({
      data: { userId: user.id, token: hashedToken, expiresAt },
    });

    const appOrigin = env.CORS_ORIGIN.split(",")[0].trim();
    const resetUrl = `${appOrigin}/reset-password?token=${rawToken}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d8402a;">Reset your password</h2>
        <p>We received a request to reset the password for your Shrestha Services account.</p>
        <p style="margin: 24px 0; text-align: center;">
          <a href="${resetUrl}" style="background: #d8402a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; display: inline-block;">Reset password</a>
        </p>
        <p>Or paste this link into your browser:</p>
        <p style="word-break: break-all; color: #64748b;">${resetUrl}</p>
        <p>This link is valid for 1 hour. If you didn't request a reset, you can safely ignore this email.</p>
      </div>
    `;

    await sendEmail(email, "Reset Your Password - Shrestha Services", emailHtml);
    logger.info(`[Forgot Password] Reset link issued for: ${email}`);
    return { success: true };
  },

  resetPassword: async (token: string, password: string) => {
    if (!token) {
      throw badRequest("Reset token is missing");
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const record = await (prisma as any).passwordResetToken.findFirst({
      where: { token: hashedToken, used: false, expiresAt: { gt: new Date() } },
    });

    if (!record) {
      logger.warn(`[Reset Password] Invalid or expired token presented`);
      throw badRequest("This reset link is invalid or has expired. Please request a new one.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { id: record.userId },
      data: { password: hashedPassword },
    });

    await (prisma as any).passwordResetToken.update({
      where: { id: record.id },
      data: { used: true },
    });

    // Revoke every active session for this user — a reset must log out all
    // devices (handles the account-compromise case).
    await sessionService.revokeAllForUser(record.userId);

    logger.info(`[Reset Password] Password updated for user: ${record.userId}`);
    return { success: true };
  },

  logout: async (sid?: string) => {
    // Revoke the server-side session so the token can't be reused.
    if (sid) await sessionService.revoke(sid);
    return { success: true };
  },

  // Issue a short-lived impersonation token. Super-admin only; privileged
  // targets are refused so impersonation can never escalate privilege.
  impersonate: async (
    actor: { id: string; email: string; role: string },
    targetId: string
  ) => {
    if (actor.role !== "superadmin") {
      throw forbidden("Only a super-administrator can impersonate a user.");
    }
    if (actor.id === targetId) {
      throw badRequest("You cannot impersonate yourself.");
    }
    const target = await prisma.user.findUnique({
      where: { id: targetId },
      include: { role: true },
    });
    if (!target) throw notFound("User not found.");

    const targetRole = target.role?.name || "customer";
    if (["admin", "superadmin"].includes(targetRole)) {
      throw forbidden("Privileged accounts cannot be impersonated.");
    }

    const token = jwt.sign(
      { userId: target.id, email: target.email, imp: true, act: actor.id },
      env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    return {
      token,
      target: {
        id: target.id,
        name: target.name,
        email: target.email,
        role: targetRole,
      },
    };
  },

  // Return the full profile (user + customer business details) for the dashboard.
  getProfile: async (userId: string) => {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true, customer: true },
    });

    if (!profile) {
      throw unauthorized("User session not found");
    }

    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role?.name || "customer",
      avatar: profile.avatar || undefined,
      isVerified: profile.isVerified,
      phone: profile.customer?.phone || "",
      companyName: profile.customer?.companyName || "",
      panVatNumber: profile.customer?.panVatNumber || "",
      address: profile.customer?.address || "",
    };
  },

  // Update editable profile fields. Name lives on the user; business details
  // live on the customer record (created on demand if missing).
  updateProfile: async (
    userId: string,
    data: {
      name?: string;
      phone?: string;
      companyName?: string;
      panVatNumber?: string;
      address?: string;
    }
  ) => {
    if (data.name !== undefined) {
      await prisma.user.update({
        where: { id: userId },
        data: { name: data.name },
      });
    }

    await prisma.customer.upsert({
      where: { id: userId },
      update: {
        phone: data.phone ?? undefined,
        companyName: data.companyName ?? undefined,
        panVatNumber: data.panVatNumber ?? undefined,
        address: data.address ?? undefined,
      },
      create: {
        id: userId,
        phone: data.phone ?? null,
        companyName: data.companyName ?? null,
        panVatNumber: data.panVatNumber ?? null,
        address: data.address ?? null,
      },
    });

    logger.info(`[Profile Updated] User ID: ${userId}`);
    return authService.getProfile(userId);
  },
};
