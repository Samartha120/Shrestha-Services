import crypto from "crypto";

/*
  RFC 6238 TOTP (and the RFC 4648 base32 it needs), implemented with Node's
  crypto so we add no third-party dependency to the auth path. Compatible with
  Google Authenticator, Authy, 1Password, etc. (SHA-1, 6 digits, 30s step).
*/

const STEP = 30;
const DIGITS = 6;
const B32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function generateSecret(bytes = 20): string {
  const buf = crypto.randomBytes(bytes);
  let bits = "";
  for (const byte of buf) bits += byte.toString(2).padStart(8, "0");
  let out = "";
  for (let i = 0; i + 5 <= bits.length; i += 5) {
    out += B32_ALPHABET[parseInt(bits.slice(i, i + 5), 2)];
  }
  return out;
}

function base32Decode(input: string): Buffer {
  const clean = input.replace(/=+$/, "").toUpperCase().replace(/\s/g, "");
  let bits = "";
  for (const char of clean) {
    const idx = B32_ALPHABET.indexOf(char);
    if (idx === -1) continue;
    bits += idx.toString(2).padStart(5, "0");
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

function hotp(secret: Buffer, counter: number): string {
  const buf = Buffer.alloc(8);
  // 64-bit big-endian counter
  buf.writeBigUInt64BE(BigInt(counter));
  const hmac = crypto.createHmac("sha1", secret).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const bin =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return (bin % 10 ** DIGITS).toString().padStart(DIGITS, "0");
}

/* Verify a code with a ±1 step window to tolerate clock drift. */
export function verifyTotp(secretBase32: string, token: string, window = 1): boolean {
  if (!/^\d{6}$/.test(token || "")) return false;
  const secret = base32Decode(secretBase32);
  const counter = Math.floor(Date.now() / 1000 / STEP);
  for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
    const candidate = hotp(secret, counter + errorWindow);
    // constant-time compare
    if (
      candidate.length === token.length &&
      crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(token))
    ) {
      return true;
    }
  }
  return false;
}

/* otpauth:// URI for authenticator apps (render as QR or manual entry). */
export function otpauthUri(secretBase32: string, account: string, issuer = "Shrestha Services"): string {
  const label = encodeURIComponent(`${issuer}:${account}`);
  const params = new URLSearchParams({
    secret: secretBase32,
    issuer,
    algorithm: "SHA1",
    digits: String(DIGITS),
    period: String(STEP),
  });
  return `otpauth://totp/${label}?${params.toString()}`;
}
