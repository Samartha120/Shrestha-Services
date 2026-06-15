import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ status: "error", message: "Access token missing or invalid format" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string; email: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true },
    });

    if (!user) {
      res.status(401).json({ status: "error", message: "User session not found or deleted" });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role?.name || "customer",
      name: user.name,
    };

    next();
  } catch (err: any) {
    logger.warn(`[Auth Fail] JWT verification failed: ${err.message}`);
    res.status(401).json({ status: "error", message: "Session expired or authentication failed" });
  }
};
