import { Response, NextFunction } from "express";
import { authService } from "../services/authService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const authController = {
  login: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await authService.login(req.body);
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  register: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ status: "success", data: { user } });
    } catch (err) {
      next(err);
    }
  },

  forgotPassword: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await authService.forgotPassword(req.body.email);
      res.status(200).json({ status: "success", message: "Password reset instructions dispatched" });
    } catch (err) {
      next(err);
    }
  },

  resetPassword: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await authService.resetPassword(req.body.password);
      res.status(200).json({ status: "success", message: "Password has been successfully updated" });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await authService.logout();
      res.status(200).json({ status: "success", message: "Session signed out successfully" });
    } catch (err) {
      next(err);
    }
  },

  me: async (req: AuthRequest, res: Response) => {
    res.status(200).json({ status: "success", data: { user: req.user } });
  },
};
