import { Router } from "express";
import { inquiryController } from "../controllers/inquiryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { submitInquirySchema } from "../validators/inquiry.validator.js";

const router = Router();

// Public submission
router.post("/", validateRequest(submitInquirySchema), inquiryController.submit as any);

// Protected dashboard access
router.get(
  "/",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  inquiryController.getAll as any
);

router.delete(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  inquiryController.delete as any
);

export default router;
