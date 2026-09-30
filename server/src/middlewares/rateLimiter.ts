import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

// Rate limiting is only enforced in production. In development/test the limiter
// is bypassed so local testing and page reloads never get locked out (HTTP 429).
const isProduction = env.NODE_ENV === "production";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100, // Limit to 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => !isProduction,
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 30, // Limit to 30 authentication attempts per IP
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => !isProduction,
  skipSuccessfulRequests: true, // Only failed logins/registrations count toward the limit
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many login/registration attempts. Locked out for 15 minutes.",
  },
});
