import nodemailer from "nodemailer";
import { env } from "./env.js";
import { logger } from "./logger.js";

const brandedFrom = `"Shrestha Services" <${env.SMTP_USER || env.SMTP_FROM}>`;

// Primary: Gmail. Secondary (Resend API) used when Gmail is unreachable via
// smtp.gmail.com — this is why your inbox stays empty with ETIMEDOUT
// even though the same app password works for QuoteGuard (different Gmail).
// Resend is cheap, fast, and needs only an API key + verified sender domain.

const makeTransporter = (port: number) =>
  nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          }
        : undefined,
    connectionTimeout: 5_000,
    greetingTimeout: 5_000,
    socketTimeout: 7_000,
    pool: false,
    tls: { minVersion: "TLSv1.2" },
  } as any);

const primaryTransporter = makeTransporter(env.SMTP_PORT);
const fallbackPort = env.SMTP_PORT === 465 ? 587 : 465;
const fallbackTransporter = makeTransporter(fallbackPort);

if (env.SMTP_USER && env.SMTP_PASS) {
  primaryTransporter
    .verify()
    .then(() => logger.info(`[Mail] SMTP ready on port ${env.SMTP_PORT} - OTP will be delivered via Gmail (from ${env.SMTP_FROM})`))
    .catch((err: any) => {
      logger.warn(`[Mail] SMTP verify failed on port ${env.SMTP_PORT}: ${err.message}. Testing fallback port ${fallbackPort}...`);
      fallbackTransporter
        .verify()
        .then(() => logger.info(`[Mail] SMTP ready on fallback port ${fallbackPort} (from ${env.SMTP_FROM})`))
        .catch((e: any) => logger.warn(`[Mail] Fallback port ${fallbackPort} also failed: ${e.message}`));
    });
}

// Resend HTTP API fallback — bypasses SMTP entirely when smtp.gmail.com
// is firewalled (your ETIMEDOUT). Set RESEND_API_KEY in .env when ready;
// without it we log and mock so the flow never blocks.
const resendFallback = async (to: string, subject: string, html: string): Promise<boolean> => {
  const apiKey = (process.env as any).RESEND_API_KEY as string | undefined;
  const resendFrom = (process.env as any).RESEND_FROM as string | undefined; // e.g. "Shrestha Services <onboarding@resend.dev>"
  if (!apiKey) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: resendFrom || brandedFrom,
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      logger.warn(`[Mail] Resend fallback failed (${res.status}): ${body}`);
      return false;
    }
    const data: any = await res.json();
    logger.info(`[Mail] Sent via Resend to ${to} (id=${data.id || "ok"}) - ${subject}`);
    return true;
  } catch (e: any) {
    logger.warn(`[Mail] Resend fallback error for ${to}: ${e.message}`);
    return false;
  }
};

export const sendEmail = async (to: string, subject: string, html: string, text?: string): Promise<void> => {
  const plainText = text || html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const mailOptions = {
    from: brandedFrom,
    to,
    subject,
    html,
    text: plainText,
    priority: "high" as const,
    headers: {
      "X-Priority": "1",
      "Importance": "high",
    },
  };

  if (!env.SMTP_USER || !env.SMTP_PASS) {
    // Try Resend even without SMTP creds
    if (await resendFallback(to, subject, html)) return;
    logger.info(`[Mail Mock] To: ${to} | Subject: ${subject} | Preview: ${html.substring(0, 150)}...`);
    return;
  }

  // 1. Try primary transporter
  try {
    const info = await primaryTransporter.sendMail(mailOptions);
    logger.info(`[Mail] Sent to ${to} (${(info as any)?.messageId || "ok"}) - ${subject}`);
    return;
  } catch (err: any) {
    const isSmtpBlock = /timeout|ETIMEDOUT|ESOCKET|ECONNECTION|EHOSTUNREACH/i.test(err.message || err.code || "");
    
    // 2. If primary port timed out (ISP block on 587), try fallback port (465 SSL)
    if (isSmtpBlock) {
      try {
        logger.warn(`[Mail] Primary port ${env.SMTP_PORT} timed out. Trying fallback port ${fallbackPort}...`);
        const info = await fallbackTransporter.sendMail(mailOptions);
        logger.info(`[Mail] Sent via port ${fallbackPort} to ${to} (${(info as any)?.messageId || "ok"}) - ${subject}`);
        return;
      } catch (fallbackErr: any) {
        logger.warn(`[Mail] Port ${fallbackPort} fallback also failed: ${fallbackErr.message}`);
      }

      // 3. Try Resend before giving up
      if (await resendFallback(to, subject, html)) return;
    }
    throw err;
  }
};

// Background sender with retry - lets HTTP respond instantly so Resend never
// hangs on Gmail; retries are silent (no user-facing "reloading").
export const sendEmailBackground = (to: string, subject: string, html: string, text?: string): void => {
  const attempt = (n: number) => {
    sendEmail(to, subject, html, text).catch((err: any) => {
      const transient = /timeout|ETIMEDOUT|ESOCKET|ECONNECTION|EHOSTUNREACH|EAUTH/i.test(err.message || err.code || "");
      if (transient && n < 3) {
        const delay = n === 1 ? 800 : 2500;
        logger.warn(`[Mail] Retry ${n} for ${to} in ${delay}ms: ${err.message}`);
        setTimeout(() => attempt(n + 1), delay);
      } else if (transient) {
        logger.error(`[Mail] Giving up after ${n} attempts for ${to}: ${err.message}`);
      } else {
        logger.error(`[Mail] Non-transient send failure for ${to}: ${err.message}`);
      }
    });
  };
  attempt(1);
};
