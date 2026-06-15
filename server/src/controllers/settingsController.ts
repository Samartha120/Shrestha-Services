import { Response, NextFunction } from "express";
import { settingsService } from "../services/settingsService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const settingsController = {
  getCompanyInfo: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const info = await settingsService.getCompanyInfo();
      res.status(200).json({ status: "success", data: info });
    } catch (err) {
      next(err);
    }
  },

  saveCompanyInfo: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const info = await settingsService.saveCompanyInfo(req.body);
      res.status(200).json({ status: "success", data: info });
    } catch (err) {
      next(err);
    }
  },
};
