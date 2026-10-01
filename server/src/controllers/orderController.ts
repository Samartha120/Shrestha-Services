import { Response, NextFunction } from "express";
import { orderService } from "../services/orderService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const orderController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized access" });
        return;
      }

      let orders;
      if (req.user.role === "admin" || req.user.role === "superadmin") {
        orders = await orderService.getAll();
      } else {
        orders = await orderService.getByUserId(req.user.id);
      }

      res.status(200).json({ status: "success", data: { orders } });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized access" });
        return;
      }

      const { id } = req.params;
      const order = await orderService.getById(id);

      if (!order) {
        res.status(404).json({ status: "error", message: "Order not found" });
        return;
      }

      // Ownership enforcement: a customer may only view their own order.
      // Admins and superadmins may view any order.
      const isPrivileged =
        req.user.role === "admin" || req.user.role === "superadmin";
      if (!isPrivileged && order.userId !== req.user.id) {
        res.status(403).json({ status: "error", message: "You do not have access to this order" });
        return;
      }

      res.status(200).json({ status: "success", data: { order } });
    } catch (err) {
      next(err);
    }
  },

  updateStatus: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await orderService.updateStatus(id, status);
      res.status(200).json({ status: "success", data: { order } });
    } catch (err) {
      next(err);
    }
  },
};
