import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { sendEmail } from "../config/mail.js";
import type { LoginPayload } from "../types/auth.types.js";
import crypto from "crypto";
import { unauthorized, conflict, badRequest } from "../utils/AppError.js";

// Issue the backend access + refresh JWT pair for an authenticated profile.
const issueTokens = (profile: { id: string; email: string }) => {
  const token = jwt.sign(
    { userId: profile.id, email: profile.email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRY as any }
  );
  const refreshToken = jwt.sign(
    { userId: profile.id },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRY as any }
  );
  return { token, refreshToken };
};

export const authService = {
  login: async (payload: LoginPayload) => {
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

    const { token, refreshToken } = issueTokens(profile);

    logger.info(`[Login Success] Email: ${payload.email} - Role: ${profile.role?.name || "customer"}`);

    return {
      user: {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role?.name || "customer",
        avatar: profile.avatar || undefined,
      },
      token,
      refreshToken,
    };
  },

  // Google OAuth relied on Supabase; unavailable in local-only mode.
  googleLogin: async (_payload: { accessToken: string }) => {
    throw new Error("Google sign-in is not available in local mode. Use email and password.");
  },

  sendOtp: async (email: string) => {
    // Prevent sending OTP if email already has an account
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      logger.warn(`[OTP Request Failed] Email already in use: ${email}`);
      throw conflict("An account with this email already exists");
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await (prisma as any).otp.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    // Send email with OTP (mail is mocked to the server log when SMTP is unset)
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

    await sendEmail(email, "Verify Your Email - Shrestha Services", emailHtml);

    logger.info(`[OTP Sent] Email: ${email} - Code: ${otp}`);
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

    // Ensure the customer role exists, then create the user + customer profile.
    const customerRole = await prisma.role.upsert({
      where: { name: "customer" },
      update: {},
      create: { name: "customer" },
    });

    const hashedPassword = await bcrypt.hash(payload.password, 10);

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

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: record.userId },
      data: { password: hashedPassword },
    });

    await (prisma as any).passwordResetToken.update({
      where: { id: record.id },
      data: { used: true },
    });

    logger.info(`[Reset Password] Password updated for user: ${record.userId}`);
    return { success: true };
  },

  logout: async () => {
    // Stateless JWT: nothing to revoke server-side. Client discards the token.
    return { success: true };
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
