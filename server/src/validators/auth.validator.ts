import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().optional().nullable(),
    companyName: z.string().optional().nullable(),
    registrationId: z.string().optional().nullable(),
    panVatNumber: z.string().optional().nullable(),
    industryType: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    stateName: z.string().optional().nullable(),
    zip: z.string().optional().nullable(),
    street: z.string().optional().nullable(),
  }),
});

export const sendOtpSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
  }),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().min(4).max(6),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    phone: z.string().max(30).optional().nullable(),
    companyName: z.string().max(120).optional().nullable(),
    panVatNumber: z.string().max(60).optional().nullable(),
    address: z.string().max(300).optional().nullable(),
  }),
});
