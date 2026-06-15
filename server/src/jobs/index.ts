import { logger } from "../config/logger.js";
import { prisma } from "../config/prisma.js";

// Simulating a background cron job using standard timeouts
export const initJobs = () => {
  logger.info("⏰ [Scheduler] Background jobs initialization started");

  // Every 24 hours, prune orphan uploads
  setInterval(async () => {
    try {
      logger.info("[Scheduler] Executing clean-up of orphaned uploads...");
      // Add cleanup queries here
    } catch (err: any) {
      logger.error(`[Scheduler Error] Uploads clean-up failed: ${err.message}`);
    }
  }, 24 * 60 * 60 * 1000);
};
