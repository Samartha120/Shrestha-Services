import nodemailer from "nodemailer";
import { env } from "./env.js";
import { logger } from "./logger.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: env.SMTP_USER && env.SMTP_PASS ? {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  } : undefined,
});

export const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  try {
    if (!env.SMTP_USER || !env.SMTP_PASS) {
      logger.info(`[Mail Sync Mock] To: ${to} | Subject: ${subject} | Content Preview: ${html.substring(0, 150)}...`);
      return;
    }
    
    await transporter.sendMail({
      from: env.SMTP_FROM,
      to,
      subject,
      html,
    });
    logger.info(`[Mail System] Dispatched email to ${to} for topic: "${subject}"`);
  } catch (err: any) {
    logger.error(`[Mail Fail] Failed sending email to ${to}: ${err.message}`);
  }
};
