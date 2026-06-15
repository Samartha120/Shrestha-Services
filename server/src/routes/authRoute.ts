import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/login",
  authLimiter,
  validateRequest(loginSchema),
  authController.login
);

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  authController.forgotPassword
);

router.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  authController.resetPassword
);

router.post("/logout", authController.logout);

router.get("/me", authMiddleware as any, authController.me as any);

export default router;
