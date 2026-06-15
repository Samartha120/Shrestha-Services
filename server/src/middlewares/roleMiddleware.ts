import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware.js";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        status: "error",
        message: "Unauthorized. Access token is required.",
      });
      return;
    }

    const hasPermission = allowedRoles.includes(req.user.role);
    if (!hasPermission) {
      res.status(403).json({
        status: "error",
        message: "Forbidden. You do not have permission to access this resource.",
      });
      return;
    }

    next();
  };
};
