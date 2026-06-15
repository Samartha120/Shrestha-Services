import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router();

router.use(authMiddleware as any);

router.get("/", orderController.getAll as any);
router.get("/:id", orderController.getById as any);
router.patch("/:id/status", roleMiddleware(["admin", "superadmin"]) as any, orderController.updateStatus as any);

export default router;
