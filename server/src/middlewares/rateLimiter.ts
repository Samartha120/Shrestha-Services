import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100, // Limit to 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 15, // Limit to 15 authentication attempts per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many login/registration attempts. Locked out for 15 minutes.",
  },
});
