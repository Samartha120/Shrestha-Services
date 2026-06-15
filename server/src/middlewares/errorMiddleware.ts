import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`[API Error] ${req.method} ${req.originalUrl} - Code: ${status} - Message: ${message}`);
  
  if (err.stack && process.env.NODE_ENV === "development") {
    logger.error(err.stack);
  }

  res.status(status).json({
    status: "error",
    statusCode: status,
    message,
    errors: err.errors || undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
