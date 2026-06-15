import { Response, NextFunction } from "express";
import { galleryService } from "../services/galleryService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const galleryController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const items = await galleryService.getAll();
      res.status(200).json({ status: "success", data: items });
    } catch (err) {
      next(err);
    }
  },

  getByCategory: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { category } = req.params;
      const items = await galleryService.getByCategory(category);
      res.status(200).json({ status: "success", data: items });
    } catch (err) {
      next(err);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const item = await galleryService.create(req.body);
      res.status(201).json({ status: "success", data: item });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await galleryService.delete(id);
      res.status(200).json({ status: "success", message: "Gallery image deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
