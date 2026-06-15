import { Response, NextFunction } from "express";
import { serviceService } from "../services/serviceService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const serviceController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const services = await serviceService.getAll();
      res.status(200).json({ status: "success", data: services });
    } catch (err) {
      next(err);
    }
  },

  getBySlug: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const service = await serviceService.getBySlug(slug);
      if (!service) {
        res.status(404).json({ status: "error", message: "Service not found" });
        return;
      }
      res.status(200).json({ status: "success", data: service });
    } catch (err) {
      next(err);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const service = await serviceService.create(req.body);
      res.status(201).json({ status: "success", data: service });
    } catch (err) {
      next(err);
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const service = await serviceService.update(id, req.body);
      res.status(200).json({ status: "success", data: service });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await serviceService.delete(id);
      res.status(200).json({ status: "success", message: "Service deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
