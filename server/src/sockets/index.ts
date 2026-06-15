import { logger } from "../config/logger.js";
import { Server as HttpServer } from "http";

export const initSockets = (server: HttpServer) => {
  logger.info("🔌 [Sockets] Realtime socket handlers initialization stubbed");
  // In production, integrate socket.io here:
  // const io = new SocketIOServer(server);
  // io.on("connection", (socket) => { ... });
};
