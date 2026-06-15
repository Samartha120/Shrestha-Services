import { Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const notificationController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
      }

      const notifications = await prisma.notification.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ status: "success", data: notifications });
    } catch (err) {
      next(err);
    }
  },

  markAsRead: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      const notification = await prisma.notification.update({
        where: { id },
        data: { read: true },
      });

      res.status(200).json({ status: "success", data: notification });
    } catch (err) {
      next(err);
    }
  },

  markAllAsRead: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
      }

      await prisma.notification.updateMany({
        where: { userId: req.user.id, read: false },
        data: { read: true },
      });

      const notifications = await prisma.notification.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ status: "success", data: notifications });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await prisma.notification.delete({
        where: { id },
      });
      res.status(200).json({ status: "success", message: "Notification deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
