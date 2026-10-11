import type { Response } from "express";
import crypto from "crypto";
import { env } from "../config/env.js";

/*
  Auth cookie helpers. In production cookies are Secure (HTTPS-only); SameSite
  is Lax so top-level navigations work while blocking cross-site POST CSRF.
  - access_token  : httpOnly, short-lived — the session bearer.
  - refresh_token : httpOnly, scoped to the auth path — used only to refresh.
  - csrf_token    : readable by JS (double-submit) — echoed back in a header
                    and matched server-side for cookie-authenticated writes.
*/

const isProd = env.NODE_ENV === "production";
const ACCESS_MAX_AGE = 15 * 60 * 1000; // 15m
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7d

const base = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
};

export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";
export const CSRF_COOKIE = "csrf_token";

export function newCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function setAuthCookies(
  res: Response,
  tokens: { accessToken: string; refreshToken: string; csrfToken: string }
): void {
  res.cookie(ACCESS_COOKIE, tokens.accessToken, { ...base, path: "/", maxAge: ACCESS_MAX_AGE });
  res.cookie(REFRESH_COOKIE, tokens.refreshToken, { ...base, path: "/api/v1/auth", maxAge: REFRESH_MAX_AGE });
  // Not httpOnly: the SPA reads this and echoes it as the X-CSRF-Token header.
  res.cookie(CSRF_COOKIE, tokens.csrfToken, { httpOnly: false, secure: isProd, sameSite: "lax", path: "/", maxAge: REFRESH_MAX_AGE });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie(ACCESS_COOKIE, { path: "/" });
  res.clearCookie(REFRESH_COOKIE, { path: "/api/v1/auth" });
  res.clearCookie(CSRF_COOKIE, { path: "/" });
}
