import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { sendEmail } from "../config/mail.js";
import type { LoginPayload } from "../types/auth.types.js";
import crypto from "crypto";

export const authService = {
  login: async (payload: LoginPayload) => {
    // 1. Delegate auth validation to Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error || !data.user) {
      logger.warn(`[Login Failed] Email: ${payload.email} - Reason: ${error?.message || "User missing"}`);
      throw new Error(error?.message || "Invalid credentials");
    }

    // 2. Fetch profile and role from PostgreSQL public users table
    const profile = await prisma.user.findUnique({
      where: { id: data.user.id },
      include: { role: true },
    });

    if (!profile) {
      logger.error(`[Sync Error] Profile not found in users table for ID: ${data.user.id}`);
      throw new Error("User profile registration not fully synced. Please try again.");
    }

    // 3. Generate Express backend JWT token
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

  googleLogin: async (payload: { accessToken: string }) => {
    // 1. Verify the Google access token using Supabase
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(payload.accessToken);

    if (error || !supabaseUser) {
      logger.warn(`[Google Login Failed] - Reason: ${error?.message || "User missing"}`);
      throw new Error(error?.message || "Invalid Google credentials");
    }

    // 2. Fetch profile from our PostgreSQL public users table using Supabase user ID
    let profile = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
      include: { role: true },
    });

    if (!profile) {
      // If user doesn't exist, create profile for them
      const name = supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'Guest';
      const customerRole = await prisma.role.findUnique({ where: { name: "customer" } });

      profile = await prisma.user.create({
        data: {
          id: supabaseUser.id,
          name,
          email: supabaseUser.email!,
          roleId: customerRole?.id,
          isVerified: true,
        } as any, // Type assertion for TypeScript
        include: { role: true },
      }) as any;

      await prisma.customer.upsert({
        where: { id: supabaseUser.id },
        update: {},
        create: { id: supabaseUser.id },
      });

      logger.info(`[Google Login New User] Email: ${supabaseUser.email}`);
    }

    if (!profile) {
      throw new Error("Failed to create or retrieve user profile");
    }

    // 3. Generate backend JWT token
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

    logger.info(`[Google Login Success] Email: ${supabaseUser.email}`);

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

    // Send email with OTP
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Welcome to Shrestha Services!</h2>
        <p>Thank you for registering. Please use the following OTP to verify your email:</p>
        <div style="font-size: 32px; font-weight: bold; color: #1e40af; letter-spacing: 8px; margin: 20px 0; text-align: center;">
          ${otp}
        </div>
        <p>This OTP is valid for 10 minutes.</p>
        <p style="color: #64748b;">If you didn't request this, please ignore this email.</p>
      </div>
    `;

    await sendEmail(email, "Verify Your Email - Shrestha Services", emailHtml);

    logger.info(`[OTP Sent] Email: ${email}`);
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
    // 1. Register user in Supabase auth system
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
        },
      },
    });

    if (error || !data.user) {
      logger.warn(`[Registration Failed] Email: ${payload.email} - Reason: ${error?.message}`);
      throw new Error(error?.message || "Registration failed");
    }

    // 2. Poll public users table to ensure postgres trigger executed sync
    let profile = null;
    let attempts = 0;
    while (!profile && attempts < 5) {
      await new Promise((r) => setTimeout(r, 200));
      profile = await prisma.user.findUnique({
        where: { id: data.user.id },
        include: { role: true },
      });
      attempts++;
    }

    if (!profile) {
      // Fallback manual profile insertion if trigger fails or has delay
      const customerRole = await prisma.role.findUnique({ where: { name: "customer" } });
      profile = await prisma.user.create({
        data: {
          id: data.user.id,
          name: payload.name,
          email: payload.email,
          roleId: customerRole?.id,
        },
        include: { role: true },
      });

      await prisma.customer.upsert({
        where: { id: data.user.id },
        update: {},
        create: { id: data.user.id },
      });
    }

    // After registration, user needs to verify OTP
    logger.info(`[Registration Success] Email: ${payload.email} - ID: ${data.user.id}`);

    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role?.name || "customer",
    };
  },

  forgotPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${env.SUPABASE_URL.replace("supabase.co", "shrestha.com")}/reset-password`,
    });
    if (error) throw new Error(error.message);
    logger.info(`[Forgot Password] Requested reset link for: ${email}`);
  },

  resetPassword: async (password: string) => {
    // In Supabase, the user is authenticated from the password reset email link
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(error.message);
    logger.info(`[Reset Password] Password reset successfully.`);
  },

  logout: async () => {
    await supabase.auth.signOut();
  },
};
