import { Response, NextFunction } from "express";
import { adminService } from "../services/adminService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { prisma } from "../config/prisma.js";

export const adminController = {
  getStats: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const stats = await adminService.getDashboardStats();
      res.status(200).json({ status: "success", data: stats });
    } catch (err) {
      next(err);
    }
  },

  getRevenueChartData: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await adminService.getRevenueChartData();
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  getVisitorChartData: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userCount = await prisma.user.count();
      const baseVisitors = 800;
      const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const data = MONTHS.map((name, idx) => ({
        name,
        visitors: baseVisitors + Math.round((userCount * 50) + (idx * 120) + ((idx * 53) % 300)),
      }));
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  getServiceChartData: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await adminService.getServiceChartData();
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  getQuoteChartData: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const quotes = await prisma.quote.findMany({
        select: { id: true, status: true, date: true },
      });
      const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const dayBuckets: Record<string, { submitted: number; approved: number }> = {};
      WEEKDAYS.forEach((d) => {
        dayBuckets[d] = { submitted: 0, approved: 0 };
      });

      quotes.forEach((q) => {
        let dayName = "Mon";
        if (q.date) {
          const dateObj = new Date(q.date);
          const dayIdx = (dateObj.getDay() + 6) % 7;
          dayName = WEEKDAYS[dayIdx] || "Mon";
        }
        dayBuckets[dayName].submitted += 1;
        if (q.status === "Approved") {
          dayBuckets[dayName].approved += 1;
        }
      });

      const data = WEEKDAYS.map((name) => ({
        name,
        submitted: dayBuckets[name].submitted,
        approved: dayBuckets[name].approved,
      }));

      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  getRecentActivities: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await adminService.getRecentActivities();
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  getAllUsers: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json({ status: "success", data: users });
    } catch (err) {
      next(err);
    }
  },

  updateUserRole: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = await adminService.updateUserRole(id, role);
      res.status(200).json({ status: "success", data: user });
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await adminService.deleteUser(id);
      res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
  },

  getReportsList: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const reports = await adminService.getReportsList();
      res.status(200).json({ status: "success", data: reports });
    } catch (err) {
      next(err);
    }
  },
};
