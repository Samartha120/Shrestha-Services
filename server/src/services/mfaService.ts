import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { badRequest, unauthorized } from "../utils/AppError.js";
import { generateSecret, verifyTotp, otpauthUri } from "../utils/totp.js";
import { encryptSecret, decryptSecret } from "../utils/secretCrypto.js";

export const MFA_PRIVILEGED_ROLES = ["admin", "superadmin"];

const hashCode = (code: string) =>
  crypto.createHash("sha256").update(code.replace(/\s/g, "").toUpperCase()).digest("hex");

function generateRecoveryCodes(count = 10): string[] {
  return Array.from({ length: count }, () => {
    const raw = crypto.randomBytes(5).toString("hex").toUpperCase(); // 10 hex chars
    return `${raw.slice(0, 5)}-${raw.slice(5)}`;
  });
}

export const mfaService = {
  status: async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return { enabled: !!user?.mfaEnabled };
  },

  // Begin enrolment: issue a fresh secret (stored encrypted, pending) and the
  // otpauth URI the authenticator app scans / the user types manually.
  setup: async (userId: string, email: string) => {
    const secret = generateSecret();
    await prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: encryptSecret(secret), mfaEnabled: false },
    });
    return { secret, otpauthUri: otpauthUri(secret, email) };
  },

  // Confirm enrolment with a live code; on success, enable MFA and mint
  // single-use recovery codes (returned ONCE, stored only as hashes).
  enable: async (userId: string, token: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.mfaSecret) throw badRequest("Start MFA setup first.");
    if (user.mfaEnabled) throw badRequest("MFA is already enabled.");

    const secret = decryptSecret(user.mfaSecret);
    if (!verifyTotp(secret, token)) throw badRequest("Incorrect code. Try again.");

    const codes = generateRecoveryCodes();
    await prisma.$transaction([
      prisma.user.update({ where: { id: userId }, data: { mfaEnabled: true } }),
      prisma.mfaRecoveryCode.deleteMany({ where: { userId } }),
      prisma.mfaRecoveryCode.createMany({
        data: codes.map((c) => ({ userId, codeHash: hashCode(c) })),
      }),
    ]);

    logger.info(`[MFA] Enabled for user ${userId}`);
    return { recoveryCodes: codes };
  },

  // Disable requires re-authentication: current password AND a valid code
  // (TOTP or an unused recovery code).
  disable: async (userId: string, password: string, token: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.mfaEnabled || !user.mfaSecret) throw badRequest("MFA is not enabled.");
    if (!user.password || !(await bcrypt.compare(password, user.password))) {
      throw unauthorized("Password is incorrect.");
    }
    const ok = await mfaService.verifyCode(userId, decryptSecret(user.mfaSecret), token);
    if (!ok) throw badRequest("Incorrect code.");

    await prisma.$transaction([
      prisma.user.update({ where: { id: userId }, data: { mfaEnabled: false, mfaSecret: null } }),
      prisma.mfaRecoveryCode.deleteMany({ where: { userId } }),
    ]);
    logger.info(`[MFA] Disabled for user ${userId}`);
    return { success: true };
  },

  // Verify a TOTP code, or consume a single-use recovery code.
  verifyCode: async (userId: string, secret: string, token: string): Promise<boolean> => {
    if (verifyTotp(secret, token)) return true;
    const match = await prisma.mfaRecoveryCode.findFirst({
      where: { userId, codeHash: hashCode(token), used: false },
    });
    if (!match) return false;
    await prisma.mfaRecoveryCode.update({ where: { id: match.id }, data: { used: true } });
    logger.info(`[MFA] Recovery code consumed for user ${userId}`);
    return true;
  },

  // Used by the login MFA step. Returns the user (with role) on success.
  verifyForLogin: async (userId: string, token: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
    if (!user?.mfaEnabled || !user.mfaSecret) throw badRequest("MFA is not enabled for this account.");
    const ok = await mfaService.verifyCode(userId, decryptSecret(user.mfaSecret), token);
    if (!ok) throw unauthorized("Incorrect verification code.");
    return user;
  },
};
