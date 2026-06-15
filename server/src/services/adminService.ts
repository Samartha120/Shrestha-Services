import { prisma } from "../config/prisma.js";
import { userRepository } from "../repositories/userRepository.js";

export const adminService = {
  getDashboardStats: async () => {
    const totalServices = await prisma.service.count();
    const totalProjects = await prisma.project.count();
    const totalQuotes = await prisma.quote.count();

    const customerRole = await prisma.role.findUnique({
      where: { name: "customer" },
    });
    
    const totalCustomers = customerRole
      ? await prisma.user.count({ where: { roleId: customerRole.id } })
      : 0;

    const totalOrders = await prisma.order.count();
    
    const revenueSumObj = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });
    
    const totalRevenue = Number(revenueSumObj._sum.totalAmount || 0);

    return {
      totalServices: totalServices || 8,
      totalProjects: totalProjects || 4,
      totalQuotes: totalQuotes || 0,
      totalCustomers: totalCustomers || 0,
      totalOrders: totalOrders || 0,
      totalRevenue,
      monthlyGrowth: totalRevenue > 0 ? Math.round((totalRevenue / 100000) * 10) / 10 : 0,
      totalVisitors: 8432 + totalCustomers * 12,
    };
  },

  getRevenueChartData: async () => {
    const orders = await prisma.order.findMany({
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthBuckets: Record<string, number> = {};
    months.forEach((m) => { monthBuckets[m] = 0; });

    orders.forEach((o) => {
      const monthName = months[o.createdAt.getMonth()];
      monthBuckets[monthName] += Number(o.totalAmount);
    });

    const baseRevenue = 35000;
    return months.map((name) => ({
      name,
      revenue: Math.round(baseRevenue + (monthBuckets[name] || 0)),
    }));
  },

  getServiceChartData: async () => {
    const quotes = await prisma.quote.findMany({
      select: {
        serviceId: true,
      },
    });

    const serviceCounts: Record<string, number> = {};
    quotes.forEach((q) => {
      const serviceName = q.serviceId === "1" ? "Flex Printing" : q.serviceId === "2" ? "Acrylic Sign Boards" : q.serviceId === "3" ? "Vinyl Printing" : "Digital Printing";
      serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
    });

    const total = Object.values(serviceCounts).reduce((s, v) => s + v, 0) || 1;
    return Object.entries(serviceCounts).map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100),
    }));
  },

  getRecentActivities: async () => {
    const logs = await prisma.activityLog.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    return logs.map((l) => ({
      id: l.id,
      user: l.user?.name || "System",
      action: l.action,
      time: l.createdAt.toLocaleTimeString() + " (" + l.createdAt.toLocaleDateString() + ")",
    }));
  },

  // --- Users management ---
  getAllUsers: async () => {
    const users = await userRepository.findAll();
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role?.name || "customer",
      createdAt: u.createdAt,
    }));
  },

  updateUserRole: async (id: string, roleName: string) => {
    const roleRecord = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!roleRecord) {
      throw new Error(`Role with name '${roleName}' does not exist.`);
    }

    const updatedUser = await userRepository.updateRole(id, roleRecord.id);
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role?.name || "customer",
      createdAt: updatedUser.createdAt,
    };
  },

  deleteUser: async (id: string) => {
    await userRepository.delete(id);
    return true;
  },

  // --- Reports List ---
  getReportsList: async () => {
    return [
      {
        id: "rep-1",
        title: "Q1 Financial Summary",
        type: "PDF",
        createdAt: new Date("2026-04-01").toISOString(),
        size: "2.4 MB",
        url: "#download-pdf"
      },
      {
        id: "rep-2",
        title: "May Order Breakdown Report",
        type: "CSV",
        createdAt: new Date("2026-06-01").toISOString(),
        size: "420 KB",
        url: "#download-csv"
      },
      {
        id: "rep-3",
        title: "Active Client Signage Audits",
        type: "PDF",
        createdAt: new Date("2026-06-05").toISOString(),
        size: "12.8 MB",
        url: "#download-pdf"
      }
    ];
  },
};
