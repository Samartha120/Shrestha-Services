import { Router } from "express";
import { adminController } from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router();

// Apply auth and admin RBAC checks to ALL endpoints under /admin
router.use(authMiddleware as any);
router.use(roleMiddleware(["admin", "superadmin"]) as any);

// Analytics charts and metrics
router.get("/stats", adminController.getStats as any);
router.get("/revenue-chart", adminController.getRevenueChartData as any);
router.get("/order-chart", adminController.getOrderStatsData as any);
router.get("/user-growth-chart", adminController.getUserGrowthData as any);
router.get("/service-chart", adminController.getServiceChartData as any);
router.get("/quote-chart", adminController.getQuoteChartData as any);
router.get("/recent-activities", adminController.getRecentActivities as any);

// Users management
router.get("/users", adminController.getAllUsers as any);
router.patch("/users/:id/role", adminController.updateUserRole as any);
router.delete("/users/:id", adminController.deleteUser as any);

// Reports — real CSV exports generated from live data
router.get("/reports/:type/export", adminController.exportReport as any);

export default router;
