import { prisma } from "../config/prisma.js";
import { userRepository } from "../repositories/userRepository.js";
import { badRequest, forbidden, notFound } from "../utils/AppError.js";

// Roles an admin may assign/manage. `superadmin` is deliberately excluded:
// only a super-administrator can grant or revoke super-administrator.
const ASSIGNABLE_BY_ADMIN = ["customer", "support", "order_manager", "admin"];
const PRIVILEGED_ROLES = ["admin", "superadmin"];

interface Actor {
  id: string;
  role: string;
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Build a rolling 12-month window (oldest -> newest) ending on the current
// month. Each bucket carries a "YYYY-MM" key for matching and a short label.
const buildMonthBuckets = () => {
  const now = new Date();
  const buckets: { key: string; name: string }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      name: MONTH_LABELS[d.getMonth()],
    });
  }
  return buckets;
};

const monthKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;

export const adminService = {
  getDashboardStats: async () => {
    const customerRole = await prisma.role.findUnique({ where: { name: "customer" } });

    const [
      totalServices,
      totalProjects,
      totalQuotes,
      approvedQuotes,
      pendingQuotes,
      totalCustomers,
      totalOrders,
      revenueSumObj,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.quote.count(),
      prisma.quote.count({ where: { status: "Approved" } }),
      prisma.quote.count({ where: { status: "Pending" } }),
      customerRole ? prisma.user.count({ where: { roleId: customerRole.id } }) : Promise.resolve(0),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
    ]);

    const totalRevenue = Number(revenueSumObj._sum.totalAmount || 0);

    // Real month-over-month revenue growth from order timestamps.
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [thisMonthAgg, lastMonthAgg] = await Promise.all([
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { createdAt: { gte: thisMonthStart } } }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { createdAt: { gte: lastMonthStart, lt: thisMonthStart } } }),
    ]);

    const thisMonthRevenue = Number(thisMonthAgg._sum.totalAmount || 0);
    const lastMonthRevenue = Number(lastMonthAgg._sum.totalAmount || 0);
    const monthlyGrowth = lastMonthRevenue > 0
      ? Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 1000) / 10
      : null;

    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    const conversionRate = totalQuotes > 0 ? Math.round((approvedQuotes / totalQuotes) * 1000) / 10 : 0;

    return {
      totalServices,
      totalProjects,
      totalQuotes,
      approvedQuotes,
      pendingQuotes,
      totalCustomers,
      totalOrders,
      totalRevenue,
      avgOrderValue,
      conversionRate,
      monthlyGrowth,
    };
  },

  // Real monthly revenue over a rolling 12-month window (no padding).
  getRevenueChartData: async () => {
    const buckets = buildMonthBuckets();
    const since = new Date();
    since.setMonth(since.getMonth() - 11, 1);
    since.setHours(0, 0, 0, 0);

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: since } },
      select: { totalAmount: true, createdAt: true },
    });

    const totals: Record<string, number> = {};
    buckets.forEach((b) => { totals[b.key] = 0; });
    orders.forEach((o) => {
      const k = monthKey(o.createdAt);
      if (k in totals) totals[k] += Number(o.totalAmount);
    });

    return buckets.map((b) => ({ name: b.name, revenue: Math.round(totals[b.key]) }));
  },

  // Monthly order counts over the same rolling 12-month window.
  getOrderStatsData: async () => {
    const buckets = buildMonthBuckets();
    const since = new Date();
    since.setMonth(since.getMonth() - 11, 1);
    since.setHours(0, 0, 0, 0);

    const orders = await prisma.order.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true },
    });

    const counts: Record<string, number> = {};
    buckets.forEach((b) => { counts[b.key] = 0; });
    orders.forEach((o) => {
      const k = monthKey(o.createdAt);
      if (k in counts) counts[k] += 1;
    });

    return buckets.map((b) => ({ name: b.name, orders: counts[b.key] }));
  },

  // Cumulative + new customer sign-ups per month (rolling 12 months).
  getUserGrowthData: async () => {
    const customerRole = await prisma.role.findUnique({ where: { name: "customer" } });
    if (!customerRole) return buildMonthBuckets().map((b) => ({ name: b.name, newUsers: 0, totalUsers: 0 }));

    const buckets = buildMonthBuckets();
    const since = new Date();
    since.setMonth(since.getMonth() - 11, 1);
    since.setHours(0, 0, 0, 0);

    const [priorCount, users] = await Promise.all([
      prisma.user.count({ where: { roleId: customerRole.id, createdAt: { lt: since } } }),
      prisma.user.findMany({
        where: { roleId: customerRole.id, createdAt: { gte: since } },
        select: { createdAt: true },
      }),
    ]);

    const newPerMonth: Record<string, number> = {};
    buckets.forEach((b) => { newPerMonth[b.key] = 0; });
    users.forEach((u) => {
      const k = monthKey(u.createdAt);
      if (k in newPerMonth) newPerMonth[k] += 1;
    });

    let running = priorCount;
    return buckets.map((b) => {
      running += newPerMonth[b.key];
      return { name: b.name, newUsers: newPerMonth[b.key], totalUsers: running };
    });
  },

  // Quote volume grouped by raw serviceId. Service names are resolved on the
  // client against its own service catalog, so no fabricated mapping here.
  getServiceChartData: async () => {
    const grouped = await prisma.quote.groupBy({
      by: ["serviceId"],
      _count: { serviceId: true },
    });
    return grouped.map((g) => ({
      serviceId: g.serviceId,
      count: g._count.serviceId,
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

  updateUserRole: async (actor: Actor, id: string, roleName: string) => {
    // Deny-by-default guards against privilege escalation / lateral takeover.
    if (actor.id === id) {
      throw forbidden("You cannot change your own role.");
    }

    const target = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
    if (!target) throw notFound("User not found.");

    const targetRole = target.role?.name || "customer";
    const isSuperActor = actor.role === "superadmin";

    // Only a super-admin may assign the super-admin role...
    if (roleName === "superadmin" && !isSuperActor) {
      throw forbidden("Only a super-administrator can grant super-administrator.");
    }
    // ...or modify an account that is currently privileged (admin/superadmin).
    if (PRIVILEGED_ROLES.includes(targetRole) && !isSuperActor) {
      throw forbidden("Only a super-administrator can modify a privileged account.");
    }
    // A plain admin may only assign roles up to (and including) admin.
    if (!isSuperActor && !ASSIGNABLE_BY_ADMIN.includes(roleName)) {
      throw forbidden("You are not allowed to assign this role.");
    }

    const roleRecord = await prisma.role.findUnique({ where: { name: roleName } });
    if (!roleRecord) {
      throw badRequest(`Role '${roleName}' does not exist.`);
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

  deleteUser: async (actor: Actor, id: string) => {
    if (actor.id === id) {
      throw forbidden("You cannot delete your own account.");
    }

    const target = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
    if (!target) throw notFound("User not found.");

    const targetRole = target.role?.name || "customer";
    // Only a super-admin may delete a privileged (admin/superadmin) account.
    if (PRIVILEGED_ROLES.includes(targetRole) && actor.role !== "superadmin") {
      throw forbidden("Only a super-administrator can delete a privileged account.");
    }

    await userRepository.delete(id);
    return true;
  },
};
