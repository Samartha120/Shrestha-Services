import http from "http";
import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { initJobs } from "./jobs/index.js";
import { initSockets } from "./sockets/index.js";

const PORT = env.PORT || 5000;
const server = http.createServer(app);

// Initialize Sockets and Background Jobs
initSockets(server);
initJobs();

server.listen(PORT, () => {
  logger.info(`🚀 [Server Started] Listening on port ${PORT} in ${env.NODE_ENV} mode`);
  logger.info(`📖 [Swagger Documentation] Available at http://localhost:${PORT}/api/v1/docs`);
});

// Handle graceful shutdowns
const gracefulShutdown = (signal: string) => {
  logger.info(`[${signal}] Server shutting down gracefully...`);
  server.close(() => {
    logger.info("HTTP server closed. Exiting process.");
    process.exit(0);
  });

  // Timeout shutdown if server hangs
  setTimeout(() => {
    logger.warn("Shutdown timeout reached. Forcing close.");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason: any) => {
  logger.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});
