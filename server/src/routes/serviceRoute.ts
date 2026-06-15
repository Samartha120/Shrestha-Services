import { Router } from "express";
import { serviceController } from "../controllers/serviceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createServiceSchema, updateServiceSchema } from "../validators/service.validator.js";

const router = Router();

// Public routes
router.get("/", serviceController.getAll as any);
router.get("/:slug", serviceController.getBySlug as any);

// Protected routes (admin/superadmin only)
router.post(
  "/",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(createServiceSchema),
  serviceController.create as any
);

router.put(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(updateServiceSchema),
  serviceController.update as any
);

router.delete(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  serviceController.delete as any
);

export default router;
