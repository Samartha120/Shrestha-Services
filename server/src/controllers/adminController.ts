import { Response, NextFunction } from "express";
import { adminService } from "../services/adminService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { prisma } from "../config/prisma.js";

// Minimal, dependency-free CSV serialiser with correct quoting/escaping.
const toCsv = (rows: (string | number | null | undefined)[][]): string => {
  const escape = (val: string | number | null | undefined) => {
    const s = val === null || val === undefined ? "" : String(val);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return rows.map((r) => r.map(escape).join(",")).join("\r\n");
};

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

  getOrderStatsData: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await adminService.getOrderStatsData();
      res.status(200).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  },

  getUserGrowthData: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await adminService.getUserGrowthData();
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

  // Stream a real CSV export built from live data for the requested category.
  exportReport: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const type = String(req.params.type || "").toLowerCase();
      let rows: (string | number | null | undefined)[][];
      let filename: string;

      if (type === "orders") {
        const orders = await prisma.order.findMany({
          include: { status: true },
          orderBy: { createdAt: "desc" },
        });
        rows = [["Order Number", "Customer", "Status", "Total (NPR)", "Created"]];
        orders.forEach((o) =>
          rows.push([
            o.orderNumber,
            o.customerName,
            o.status?.name || "—",
            Number(o.totalAmount),
            o.createdAt.toISOString(),
          ])
        );
        filename = "orders-report.csv";
      } else if (type === "quotes") {
        const quotes = await prisma.quote.findMany({ orderBy: { date: "desc" } });
        rows = [["Quote ID", "Customer", "Email", "Material", "Qty", "Status", "Estimate (NPR)", "Date"]];
        quotes.forEach((q) =>
          rows.push([
            q.id,
            q.customerName,
            q.email,
            q.material,
            q.quantity,
            q.status,
            Number(q.estimatedPrice),
            q.date.toISOString(),
          ])
        );
        filename = "quotes-report.csv";
      } else if (type === "users") {
        const customerRole = await prisma.role.findUnique({ where: { name: "customer" } });
        const users = await prisma.user.findMany({
          where: customerRole ? { roleId: customerRole.id } : undefined,
          include: { customer: true },
          orderBy: { createdAt: "desc" },
        });
        rows = [["Name", "Email", "Phone", "Company", "PAN/VAT", "Verified", "Registered"]];
        users.forEach((u) =>
          rows.push([
            u.name,
            u.email,
            u.customer?.phone || "",
            u.customer?.companyName || "",
            u.customer?.panVatNumber || "",
            u.isVerified ? "Yes" : "No",
            u.createdAt.toISOString(),
          ])
        );
        filename = "customers-report.csv";
      } else if (type === "revenue") {
        const data = await adminService.getRevenueChartData();
        rows = [["Month", "Revenue (NPR)"]];
        data.forEach((d) => rows.push([d.name, d.revenue]));
        filename = "revenue-report.csv";
      } else {
        res.status(400).json({ status: "error", message: "Unknown report type" });
        return;
      }

      const csv = toCsv(rows);
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.status(200).send(csv);
    } catch (err) {
      next(err);
    }
  },
};
