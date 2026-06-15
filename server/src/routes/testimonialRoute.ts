import { Router } from "express";
import { testimonialController } from "../controllers/testimonialController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createTestimonialSchema } from "../validators/testimonial.validator.js";

const router = Router();

// Publicly read testimonials
router.get("/", testimonialController.getAll as any);

// Submit testimonial (requires auth)
router.post(
  "/",
  authMiddleware as any,
  validateRequest(createTestimonialSchema),
  testimonialController.create as any
);

// Delete testimonial (admin only)
router.delete(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  testimonialController.delete as any
);

export default router;
