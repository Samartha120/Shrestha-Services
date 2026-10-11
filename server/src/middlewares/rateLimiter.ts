import rateLimit from "express-rate-limit";

/*
  Rate limiting. Security-sensitive limiters (auth, OTP, password reset) are
  enforced in ALL environments so brute-force / credential-stuffing / OTP
  guessing are blocked even in a misconfigured deployment. The broad API
  limiter stays generous so normal SPA browsing is never throttled.

  Keyed on the client IP. Behind a proxy/load balancer, set `app.set("trust
  proxy", 1)` so the real IP (not the proxy) is limited.
*/

const WINDOW_15_MIN = 15 * 60 * 1000;

// Broad protection against scraping / crash-the-API floods. Deliberately high
// so a human browsing the SPA (which fans out to several endpoints per page)
// is never limited.
export const apiLimiter = rateLimit({
  windowMs: WINDOW_15_MIN,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many requests from this IP. Please try again later.",
  },
});

// Login / register / forgot / reset-password. Only FAILED attempts count, so a
// legitimate user who logs in successfully is never affected.
export const authLimiter = rateLimit({
  windowMs: WINDOW_15_MIN,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many authentication attempts. Please try again in 15 minutes.",
  },
});

// Email verification: sending and (critically) verifying OTP codes. Prevents
// enumeration of the 6-digit space before a code expires.
export const otpLimiter = rateLimit({
  windowMs: WINDOW_15_MIN,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many verification requests. Please try again in 15 minutes.",
  },
});
