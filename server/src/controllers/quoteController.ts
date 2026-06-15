import { Response, NextFunction } from "express";
import { quoteService } from "../services/quoteService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const quoteController = {
  submit: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // req.file was resolved by the upload middleware
      const quote = await quoteService.submit(req.body, req.file);
      res.status(201).json({ status: "success", data: { quote } });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ status: "error", message: "Unauthorized access" });
        return;
      }

      let quotes;
      if (req.user.role === "admin" || req.user.role === "superadmin") {
        quotes = await quoteService.getAll();
      } else {
        quotes = await quoteService.getByEmail(req.user.email);
      }

      res.status(200).json({ status: "success", data: { quotes } });
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const quote = await quoteService.getById(id);
      if (!quote) {
        res.status(404).json({ status: "error", message: "Quote not found" });
        return;
      }
      res.status(200).json({ status: "success", data: quote });
    } catch (err) {
      next(err);
    }
  },

  updateStatus: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status, priceOverride } = req.body;
      const quote = await quoteService.updateStatus(id, status, priceOverride);
      res.status(200).json({ status: "success", data: { quote } });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await quoteService.delete(id);
      res.status(200).json({ status: "success", message: "Quote request successfully deleted" });
    } catch (err) {
      next(err);
    }
  },
};
