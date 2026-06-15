import { Router } from "express";
import { projectController } from "../controllers/projectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createProjectSchema, updateProjectSchema } from "../validators/project.validator.js";

const router = Router();

// Public routes
router.get("/", projectController.getAll as any);
router.get("/:slug", projectController.getBySlug as any);

// Protected routes
router.post(
  "/",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(createProjectSchema),
  projectController.create as any
);

router.put(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(updateProjectSchema),
  projectController.update as any
);

router.delete(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  projectController.delete as any
);

export default router;
