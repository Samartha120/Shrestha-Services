import { Response, NextFunction } from "express";
import { testimonialService } from "../services/testimonialService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const testimonialController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const testimonials = await testimonialService.getAll();
      res.status(200).json({ status: "success", data: testimonials });
    } catch (err) {
      next(err);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const testimonial = await testimonialService.create(req.body, userId);
      res.status(201).json({ status: "success", data: testimonial });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await testimonialService.delete(id);
      res.status(200).json({ status: "success", message: "Testimonial deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
