import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { sendEmail } from "../config/mail.js";
import type { LoginPayload } from "../types/auth.types.js";
import crypto from "crypto";

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
      throw new Error("Invalid credentials");
    }

    const passwordMatches = await bcrypt.compare(payload.password, profile.password);
    if (!passwordMatches) {
      logger.warn(`[Login Failed] Email: ${payload.email} - Reason: password mismatch`);
      throw new Error("Invalid credentials");
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
      throw new Error("Invalid or expired OTP");
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
      throw new Error("An account with this email already exists");
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

    await prisma.customer.create({
      data: {
        id: profile.id,
        phone: payload.phone ?? null,
        companyName: payload.companyName ?? null,
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
    // Local mode has no email-link session; surface a clear message.
    logger.info(`[Forgot Password] Requested reset for: ${email} (local mode: contact an admin to reset)`);
    throw new Error("Password reset by email is not available in local mode. Please contact an administrator.");
  },

  resetPassword: async (_password: string) => {
    throw new Error("Password reset is not available in local mode. Please contact an administrator.");
  },

  logout: async () => {
    // Stateless JWT: nothing to revoke server-side. Client discards the token.
    return { success: true };
  },
};
