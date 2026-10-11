import { Request, Response, NextFunction } from "express";
import { ACCESS_COOKIE, REFRESH_COOKIE, CSRF_COOKIE } from "../utils/cookies.js";

/*
  CSRF defense (double-submit cookie) for COOKIE-authenticated writes.

  SameSite=Lax already blocks cross-site POSTs from sending our cookies; this
  adds a second check: a state-changing request that relies on an auth cookie
  must also echo the non-httpOnly csrf cookie in the X-CSRF-Token header. A
  cross-site attacker can send the cookie implicitly but cannot read it to set
  the header. Pure Bearer/API requests (no auth cookie) are exempt — they are
  not CSRF-able — so existing token clients are unaffected.
*/

const SAFE = new Set(["GET", "HEAD", "OPTIONS"]);

// Bootstrap auth endpoints are exempt: they either run unauthenticated or
// validate their own token, and must work even when a stale/mismatched auth
// cookie is still in the browser. SameSite=Lax already blocks cross-site POSTs
// from sending these cookies, so exempting the login flow is safe.
const EXEMPT = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/send-otp",
  "/api/v1/auth/verify-otp",
  "/api/v1/auth/forgot-password",
  "/api/v1/auth/reset-password",
  "/api/v1/auth/google-callback",
  "/api/v1/auth/mfa/login-verify",
  "/api/v1/auth/refresh",
  "/api/v1/auth/logout",
];

export function csrfMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (SAFE.has(req.method)) return next();
  if (EXEMPT.includes(req.path)) return next();

  const cookies = (req as any).cookies || {};
  const cookieAuth = cookies[ACCESS_COOKIE] || cookies[REFRESH_COOKIE];
  if (!cookieAuth) return next(); // not cookie-authenticated → not CSRF-able

  const headerToken = req.headers["x-csrf-token"];
  const cookieToken = cookies[CSRF_COOKIE];
  if (!cookieToken || !headerToken || headerToken !== cookieToken) {
    res.status(403).json({ status: "error", message: "Invalid or missing CSRF token." });
    return;
  }
  next();
}
