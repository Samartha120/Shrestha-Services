import { Router } from "express";
import { quoteController } from "../controllers/quoteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createQuoteSchema, updateQuoteStatusSchema } from "../validators/quote.validator.js";

const router = Router();

// Apply auth to all quote endpoints
router.use(authMiddleware as any);

router.post(
  "/",
  upload.single("file"),
  validateRequest(createQuoteSchema),
  quoteController.submit as any
);

router.get("/", quoteController.getAll as any);
router.get("/:id", quoteController.getById as any);

router.patch(
  "/:id/status",
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(updateQuoteStatusSchema),
  quoteController.updateStatus as any
);

router.delete(
  "/:id",
  roleMiddleware(["admin", "superadmin"]) as any,
  quoteController.delete as any
);

export default router;
