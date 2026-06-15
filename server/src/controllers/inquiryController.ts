import { Response, NextFunction } from "express";
import { inquiryService } from "../services/inquiryService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const inquiryController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inquiries = await inquiryService.getAll();
      res.status(200).json({ status: "success", data: inquiries });
    } catch (err) {
      next(err);
    }
  },

  submit: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const inquiry = await inquiryService.submit(req.body);
      res.status(201).json({ status: "success", data: inquiry });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await inquiryService.delete(id);
      res.status(200).json({ status: "success", message: "Inquiry deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
