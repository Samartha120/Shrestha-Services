import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { newCsrfToken } from "../utils/cookies.js";

/*
  Server-side session store backing revocable JWTs. Each login creates a
  Session row; both tokens carry its `sid`. authMiddleware rejects a token
  whose session is revoked or expired, so logout / password-reset / compromise
  invalidate access immediately (stateless JWTs alone can't be revoked).
*/

const REFRESH_MS = 7 * 24 * 60 * 60 * 1000;
const hash = (t: string) => crypto.createHash("sha256").update(t).digest("hex");

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
  sid: string;
}

interface Meta {
  userAgent?: string;
  ipAddress?: string;
}

const signAccess = (userId: string, email: string, sid: string) =>
  jwt.sign({ userId, email, sid }, env.JWT_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRY as any });

const signRefresh = (userId: string, sid: string) =>
  jwt.sign({ userId, sid }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRY as any });

export const sessionService = {
  create: async (user: { id: string; email: string }, meta: Meta = {}): Promise<SessionTokens> => {
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        refreshHash: "",
        userAgent: meta.userAgent,
        ipAddress: meta.ipAddress,
        expiresAt: new Date(Date.now() + REFRESH_MS),
      },
    });
    const accessToken = signAccess(user.id, user.email, session.id);
    const refreshToken = signRefresh(user.id, session.id);
    await prisma.session.update({ where: { id: session.id }, data: { refreshHash: hash(refreshToken) } });
    return { accessToken, refreshToken, csrfToken: newCsrfToken(), sid: session.id };
  },

  // True only if the session is live (used by authMiddleware when a token has sid).
  isActive: async (sid: string): Promise<boolean> => {
    const s = await prisma.session.findUnique({ where: { id: sid } });
    return !!s && !s.revoked && s.expiresAt > new Date();
  },

  // Validate + rotate a refresh token; returns new tokens and the user.
  rotate: async (refreshToken: string, meta: Meta = {}): Promise<SessionTokens & { user: any }> => {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { userId: string; sid: string };
    const session = await prisma.session.findUnique({ where: { id: decoded.sid } });
    if (!session || session.revoked || session.expiresAt <= new Date()) {
      throw new Error("Session is no longer valid");
    }
    if (session.refreshHash !== hash(refreshToken)) {
      // Token reuse / mismatch → revoke the whole session defensively.
      await prisma.session.update({ where: { id: session.id }, data: { revoked: true } });
      throw new Error("Refresh token mismatch");
    }
    const user = await prisma.user.findUnique({ where: { id: session.userId }, include: { role: true } });
    if (!user) throw new Error("User not found");

    const accessToken = signAccess(user.id, user.email, session.id);
    const newRefresh = signRefresh(user.id, session.id);
    await prisma.session.update({ where: { id: session.id }, data: { refreshHash: hash(newRefresh), userAgent: meta.userAgent, ipAddress: meta.ipAddress } });
    return { accessToken, refreshToken: newRefresh, csrfToken: newCsrfToken(), sid: session.id, user };
  },

  revoke: async (sid: string): Promise<void> => {
    await prisma.session.updateMany({ where: { id: sid, revoked: false }, data: { revoked: true } });
  },

  revokeAllForUser: async (userId: string): Promise<void> => {
    await prisma.session.updateMany({ where: { userId, revoked: false }, data: { revoked: true } });
  },
};
