import crypto from "crypto";
import { env } from "../config/env.js";

/*
  Symmetric encryption for secrets at rest (TOTP seeds). AES-256-GCM with a
  key derived from JWT_SECRET via scrypt. Format: v1:<iv>:<tag>:<ciphertext>
  (all base64url). This keeps authenticator seeds from being usable even if the
  database is read directly. Rotating JWT_SECRET invalidates stored seeds
  (users must re-enrol) — acceptable for a seed, documented in the audit.
*/

const KEY = crypto.scryptSync(env.JWT_SECRET, "mfa-secret-kdf-v1", 32);
const b64 = (b: Buffer) => b.toString("base64url");
const unb64 = (s: string) => Buffer.from(s, "base64url");

export function encryptSecret(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${b64(iv)}:${b64(tag)}:${b64(enc)}`;
}

export function decryptSecret(payload: string): string {
  const [version, ivB64, tagB64, dataB64] = payload.split(":");
  if (version !== "v1") throw new Error("Unsupported secret format");
  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, unb64(ivB64));
  decipher.setAuthTag(unb64(tagB64));
  return Buffer.concat([decipher.update(unb64(dataB64)), decipher.final()]).toString("utf8");
}
