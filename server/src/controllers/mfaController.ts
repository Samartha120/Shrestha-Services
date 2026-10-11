import { Response, NextFunction } from "express";
import { mfaService } from "../services/mfaService.js";
import { authService as authServiceRaw } from "../services/authService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { writeAudit } from "../utils/audit.js";
import { setAuthCookies } from "../utils/cookies.js";

const authService = authServiceRaw as any;

export const mfaController = {
  status: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await mfaService.status(req.user!.id);
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  setup: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await mfaService.setup(req.user!.id, req.user!.email);
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  enable: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = String(req.body?.token || "");
      const data = await mfaService.enable(req.user!.id, token);
      await writeAudit(req, "auth.mfa.enrolled", { userId: req.user!.id });
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  disable: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const password = String(req.body?.password || "");
      const token = String(req.body?.token || "");
      await mfaService.disable(req.user!.id, password, token);
      await writeAudit(req, "auth.mfa.disabled", { userId: req.user!.id });
      res.status(200).json({ status: "success", message: "Two-factor authentication disabled." });
    } catch (err) {
      next(err);
    }
  },

  // Public second step of login (challenge + code → session tokens).
  loginVerify: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const challengeToken = String(req.body?.challengeToken || "");
      const code = String(req.body?.code || "");
      const data = await authService.verifyMfaLogin(challengeToken, code, {
        userAgent: req.headers["user-agent"] as string | undefined,
        ipAddress: req.ip,
      });
      if (data?.token && data?.refreshToken && data?.csrfToken) {
        setAuthCookies(res, {
          accessToken: data.token,
          refreshToken: data.refreshToken,
          csrfToken: data.csrfToken,
        });
      }
      await writeAudit(req, "auth.login.success", {
        userId: data?.user?.id,
        details: { email: data?.user?.email, role: data?.user?.role, mfa: true },
      });
      res.status(200).json({ status: "success", data });
    } catch (err) {
      await writeAudit(req, "auth.login.failure", { details: { mfa: true } });
      next(err);
    }
  },
};
