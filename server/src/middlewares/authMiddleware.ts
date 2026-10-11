import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { Request } from "express";
import { sessionService } from "../services/sessionService.js";
import { ACCESS_COOKIE } from "../utils/cookies.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
  // Present only during an active impersonation session: the privileged
  // account that initiated it. `user` is the impersonated (target) account.
  impersonator?: { id: string };
  // The revocable server-side session backing this token (when present).
  sessionId?: string;
  // True when the token came from the httpOnly cookie (→ CSRF applies).
  authViaCookie?: boolean;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    let token: string | undefined;
    let viaCookie = false;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.[ACCESS_COOKIE]) {
      token = req.cookies[ACCESS_COOKIE];
      viaCookie = true;
    }

    if (!token) {
      res.status(401).json({ status: "error", message: "Access token missing or invalid format" });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      email: string;
      imp?: boolean;
      act?: string;
      sid?: string;
    };

    // Revocable sessions: if the token is session-backed, the session must be
    // live (logout / password-reset / compromise revoke it immediately).
    if (decoded.sid) {
      const active = await sessionService.isActive(decoded.sid);
      if (!active) {
        res.status(401).json({ status: "error", message: "Session has been revoked. Please sign in again." });
        return;
      }
      req.sessionId = decoded.sid;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true },
    });

    if (!user) {
      res.status(401).json({ status: "error", message: "User session not found or deleted" });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role?.name || "customer",
      name: user.name,
    };
    req.authViaCookie = viaCookie;

    // Carry impersonation context so controllers / audit can see both actors.
    if (decoded.imp && decoded.act) {
      req.impersonator = { id: decoded.act };
    }

    next();
  } catch (err: any) {
    logger.warn(`[Auth Fail] JWT verification failed: ${err.message}`);
    res.status(401).json({ status: "error", message: "Session expired or authentication failed" });
  }
};
