import { EventEmitter } from "events";
import { logger } from "../config/logger.js";

class AppEventEmitter extends EventEmitter {}

export const sysEvents = new AppEventEmitter();

// Bind common log hooks
sysEvents.on("quote:created", (quoteId: string) => {
  logger.info(`📢 [Event] Quote created: ${quoteId}`);
});

sysEvents.on("order:updated", (orderId: string, status: string) => {
  logger.info(`📢 [Event] Order status updated: ${orderId} -> ${status}`);
});
