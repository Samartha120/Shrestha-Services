import { Router } from "express";
import { notificationController } from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Apply auth check globally on notification endpoints
router.use(authMiddleware as any);

router.get("/", notificationController.getAll as any);
router.patch("/read-all", notificationController.markAllAsRead as any);
router.patch("/:id/read", notificationController.markAsRead as any);
router.delete("/:id", notificationController.delete as any);

export default router;
