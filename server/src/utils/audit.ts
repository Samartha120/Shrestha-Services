import type { Request } from "express";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";

/*
  Security audit trail. Writes a tamper-evident row to the `audit_logs` table
  for security-relevant events (logins, role changes, user deletion, admin
  actions, impersonation, MFA changes). Best-effort: auditing must never break
  the request it is recording, so failures are logged and swallowed.

  NEVER pass passwords, tokens, OTPs, or raw secrets in `details`.
*/
export type AuditAction =
  | "auth.login.success"
  | "auth.login.failure"
  | "auth.login.mfa_required"
  | "auth.logout"
  | "auth.register"
  | "auth.password.reset"
  | "auth.mfa.enrolled"
  | "auth.mfa.disabled"
  | "admin.user.role_changed"
  | "admin.user.deleted"
  | "admin.impersonation.start"
  | "admin.impersonation.stop";

function clientIp(req: Request): string | undefined {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return req.ip || req.socket?.remoteAddress || undefined;
}

export async function writeAudit(
  req: Request | undefined,
  action: AuditAction,
  opts: { userId?: string | null; details?: Record<string, unknown> } = {}
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: opts.userId ?? null,
        action,
        details: opts.details ? (opts.details as object) : undefined,
        ipAddress: req ? clientIp(req) : undefined,
        userAgent: req ? (req.headers["user-agent"] as string | undefined) : undefined,
      },
    });
  } catch (err) {
    logger.warn(`[Audit] Failed to record "${action}": ${(err as Error).message}`);
  }
}
