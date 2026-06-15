import { Router } from "express";
import { galleryController } from "../controllers/galleryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createGalleryItemSchema } from "../validators/gallery.validator.js";

const router = Router();

// Public routes
router.get("/", galleryController.getAll as any);
router.get("/category/:category", galleryController.getByCategory as any);

// Protected routes
router.post(
  "/",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(createGalleryItemSchema),
  galleryController.create as any
);

router.delete(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  galleryController.delete as any
);

export default router;
