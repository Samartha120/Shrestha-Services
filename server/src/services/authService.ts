import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import type { LoginPayload } from "../types/auth.types.js";

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
