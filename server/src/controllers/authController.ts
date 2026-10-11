import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authService as authServiceRaw } from "../services/authService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { writeAudit } from "../utils/audit.js";
import { env } from "../config/env.js";
import {
  setAuthCookies,
  clearAuthCookies,
  REFRESH_COOKIE,
  ACCESS_COOKIE,
} from "../utils/cookies.js";
const authService = authServiceRaw as any;

const metaOf = (req: AuthRequest) => ({
  userAgent: req.headers["user-agent"] as string | undefined,
  ipAddress: req.ip,
});

// Set the httpOnly session cookies from a login/refresh result (when it has tokens).
const applyCookies = (res: Response, data: any) => {
  if (data?.token && data?.refreshToken && data?.csrfToken) {
    setAuthCookies(res, {
      accessToken: data.token,
      refreshToken: data.refreshToken,
      csrfToken: data.csrfToken,
    });
  }
};

export const authController = {
  login: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await authService.login(req.body, metaOf(req));
      applyCookies(res, data);
      await writeAudit(req, "auth.login.success", {
        userId: data?.user?.id,
        details: { email: data?.user?.email, role: data?.user?.role },
      });
      res.status(200).json({ status: "success", data });
    } catch (err) {
      await writeAudit(req, "auth.login.failure", {
        details: { email: typeof req.body?.email === "string" ? req.body.email : undefined },
      });
      next(err);
    }
  },

  // Rotate the refresh cookie into a fresh session.
  refresh: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies?.[REFRESH_COOKIE] || req.body?.refreshToken;
      const data = await authService.refresh(refreshToken, metaOf(req));
      applyCookies(res, data);
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  sendOtp: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await authService.sendOtp(req.body.email);
      res.status(200).json({ status: "success", message: "OTP sent to email" });
    } catch (err) {
      next(err);
    }
  },

  verifyOtp: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await authService.verifyOtp(req.body.email, req.body.otp);
      res.status(200).json({ status: "success", message: "OTP verified successfully" });
    } catch (err) {
      next(err);
    }
  },

  register: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ status: "success", data: { user } });
    } catch (err) {
      next(err);
    }
  },

  googleCallback: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await authService.googleLogin(req.body);
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  forgotPassword: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await authService.forgotPassword(req.body.email);
      res.status(200).json({ status: "success", message: "Password reset instructions dispatched" });
    } catch (err) {
      next(err);
    }
  },

  resetPassword: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await authService.resetPassword(req.body.token, req.body.password);
      res.status(200).json({ status: "success", message: "Password has been successfully updated" });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Best-effort: find the session id from the access cookie / bearer and
      // revoke it server-side, then clear cookies regardless.
      let sid: string | undefined;
      const bearer = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : undefined;
      const token = bearer || req.cookies?.[ACCESS_COOKIE];
      if (token) {
        try {
          const decoded = jwt.verify(token, env.JWT_SECRET) as { sid?: string };
          sid = decoded.sid;
        } catch {
          /* expired/invalid — still clear cookies */
        }
      }
      await authService.logout(sid);
      clearAuthCookies(res);
      res.status(200).json({ status: "success", message: "Session signed out successfully" });
    } catch (err) {
      next(err);
    }
  },

  me: async (req: AuthRequest, res: Response) => {
    res.status(200).json({
      status: "success",
      data: { user: req.user, impersonating: !!req.impersonator },
    });
  },

  // Ends an impersonation session (audit only — the client restores its own
  // original token). Safe no-op when not impersonating.
  stopImpersonation: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (req.impersonator) {
        await writeAudit(req, "admin.impersonation.stop", {
          userId: req.impersonator.id,
          details: { targetUserId: req.user?.id },
        });
      }
      res.status(200).json({ status: "success", message: "Impersonation ended." });
    } catch (err) {
      next(err);
    }
  },

  getProfile: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
      }
      const profile = await authService.getProfile(req.user.id);
      res.status(200).json({ status: "success", data: { profile } });
    } catch (err) {
      next(err);
    }
  },

  updateProfile: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
      }
      const profile = await authService.updateProfile(req.user.id, req.body);
      res.status(200).json({ status: "success", data: { profile } });
    } catch (err) {
      next(err);
    }
  },
};
