import { Router } from "express";
import { settingsController } from "../controllers/settingsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { saveCompanyInfoSchema } from "../validators/settings.validator.js";

const router = Router();

// Public/authenticated access
router.get("/company-info", settingsController.getCompanyInfo as any);

// Protected routes (admin update)
router.put(
  "/company-info",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(saveCompanyInfoSchema),
  settingsController.saveCompanyInfo as any
);

export default router;
