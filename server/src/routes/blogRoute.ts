import { Router } from "express";
import { blogController } from "../controllers/blogController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createBlogPostSchema,
  updateBlogPostSchema,
} from "../validators/blog.validator.js";

const router = Router();

// Admin management (listed before public /:slug to avoid route clashes)
router.get(
  "/admin",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  blogController.adminList as any
);

router.get(
  "/admin/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  blogController.adminGetById as any
);

router.post(
  "/",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(createBlogPostSchema),
  blogController.create as any
);

router.put(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  validateRequest(updateBlogPostSchema),
  blogController.update as any
);

router.delete(
  "/:id",
  authMiddleware as any,
  roleMiddleware(["admin", "superadmin"]) as any,
  blogController.delete as any
);

// Public routes
router.get("/", blogController.list as any);
router.get("/:slug", blogController.getBySlug as any);

export default router;
