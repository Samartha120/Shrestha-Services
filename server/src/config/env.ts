import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform((v) => parseInt(v, 10)).default("5000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(8, "JWT_SECRET must be at least 8 characters"),
  JWT_REFRESH_SECRET: z.string().min(8, "JWT_REFRESH_SECRET must be at least 8 characters"),
  JWT_ACCESS_EXPIRY: z.string().default("15m"),
  JWT_REFRESH_EXPIRY: z.string().default("7d"),
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_KEY: z.string().min(1, "SUPABASE_KEY is required"),
  SMTP_HOST: z.string().default("localhost"),
  SMTP_PORT: z.string().transform((v) => parseInt(v, 10)).default("587"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().default("info@shresthaservices.com.np"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment configuration:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
