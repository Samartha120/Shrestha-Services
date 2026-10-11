import { z } from "zod";

// Normalize emails consistently (trim + lowercase) so duplicates and lookups
// are stable regardless of how the user typed them.
const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email format");

// Password policy for NEW credentials (registration + reset). Existing
// passwords are never re-validated at login, so current accounts keep working.
const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long")
  .refine((v) => /[A-Za-z]/.test(v) && /[0-9]/.test(v), {
    message: "Password must contain at least one letter and one number",
  });

export const loginSchema = z.object({
  body: z.object({
    email,
    // Lenient at login so existing accounts are never locked out by policy.
    password: z.string().min(1, "Password is required"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email,
    password: strongPassword,
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
    phone: z.string().max(30).optional().nullable(),
    companyName: z.string().max(120).optional().nullable(),
    registrationId: z.string().max(60).optional().nullable(),
    panVatNumber: z.string().max(60).optional().nullable(),
    industryType: z.string().max(80).optional().nullable(),
    city: z.string().max(80).optional().nullable(),
    stateName: z.string().max(80).optional().nullable(),
    zip: z.string().max(20).optional().nullable(),
    street: z.string().max(160).optional().nullable(),
  }),
});

export const sendOtpSchema = z.object({
  body: z.object({
    email,
  }),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    email,
    otp: z.string().regex(/^\d{4,6}$/, "Invalid verification code"),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, "Reset token is required"),
    password: strongPassword,
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email,
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(120).optional(),
    phone: z.string().max(30).optional().nullable(),
    companyName: z.string().max(120).optional().nullable(),
    panVatNumber: z.string().max(60).optional().nullable(),
    address: z.string().max(300).optional().nullable(),
  }),
});
