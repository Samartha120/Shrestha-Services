import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { mfaController } from "../controllers/mfaController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authLimiter, otpLimiter } from "../middlewares/rateLimiter.js";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  sendOtpSchema,
  verifyOtpSchema,
  updateProfileSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/login",
  authLimiter,
  validateRequest(loginSchema),
  authController.login
);

router.post(
  "/send-otp",
  otpLimiter,
  validateRequest(sendOtpSchema),
  authController.sendOtp
);

router.post(
  "/verify-otp",
  otpLimiter,
  validateRequest(verifyOtpSchema),
  authController.verifyOtp
);

router.post(
  "/register",
  authLimiter,
  validateRequest(registerSchema),
  authController.register
);

router.post(
  "/forgot-password",
  authLimiter,
  validateRequest(forgotPasswordSchema),
  authController.forgotPassword
);

router.post(
  "/reset-password",
  authLimiter,
  validateRequest(resetPasswordSchema),
  authController.resetPassword
);

router.post("/google-callback", authController.googleCallback);

router.post("/logout", authController.logout);

router.get("/me", authMiddleware as any, authController.me as any);
router.post("/impersonate/stop", authMiddleware as any, authController.stopImpersonation as any);

// ── Multi-factor authentication ──
// Second login step (challenge + code) — public but rate-limited.
router.post("/mfa/login-verify", authLimiter, mfaController.loginVerify as any);
// Enrolment / management — require an authenticated session.
router.get("/mfa/status", authMiddleware as any, mfaController.status as any);
router.post("/mfa/setup", authMiddleware as any, mfaController.setup as any);
router.post("/mfa/enable", authMiddleware as any, mfaController.enable as any);
router.post("/mfa/disable", authMiddleware as any, mfaController.disable as any);

router.get("/profile", authMiddleware as any, authController.getProfile as any);

router.put(
  "/profile",
  authMiddleware as any,
  validateRequest(updateProfileSchema),
  authController.updateProfile as any
);

export default router;
