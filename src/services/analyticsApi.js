import { getMockDb, delay } from "@/utils/mockDb";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash);
}
export const analyticsApi = {
    getStats: async () => {
        await delay(600);
        const db = getMockDb();
        const totalServices = db.services.length;
        const totalProjects = db.projects.length;
        const totalQuotes = db.quotes.length;
        const totalUsers = db.users.length;
        const totalOrders = db.orders.length;
        const totalRevenue = db.orders
            .filter((o) => o.status === "Delivered" || o.status === "Printing")
            .reduce((sum, o) => sum + o.totalAmount, 0);
        return {
            totalServices,
            totalProjects,
            totalQuotes,
            totalCustomers: totalUsers - 1,
            totalOrders,
            totalRevenue,
            monthlyGrowth: totalRevenue > 0 ? Math.round((totalRevenue / 100000) * 100) / 10 : 0,
            totalVisitors: 8432 + totalUsers * 120,
        };
    },
    getRevenueChartData: async () => {
        await delay(500);
        const db = getMockDb();
        const monthBuckets = {};
        MONTHS.forEach((m) => { monthBuckets[m] = 0; });
        db.orders.forEach((order) => {
            const monthIdx = hashString(order.id) % 12;
            const monthName = MONTHS[monthIdx];
            monthBuckets[monthName] += order.totalAmount;
        });
        db.quotes.filter((q) => q.status === "Approved").forEach((q) => {
            const monthIdx = hashString(q.id) % 12;
            const monthName = MONTHS[monthIdx];
            monthBuckets[monthName] += q.estimatedPrice * 0.3;
        });
        const baseRevenue = 35000;
        return MONTHS.map((name) => ({
            name,
            revenue: Math.round(baseRevenue + (monthBuckets[name] || 0)),
        }));
    },
    getVisitorChartData: async () => {
        await delay(500);
        const db = getMockDb();
        const baseVisitors = 800;
        return MONTHS.map((name, idx) => ({
            name,
            visitors: baseVisitors + Math.round((db.users.length * 50) + (idx * 120) + (hashString(name) % 300)),
        }));
    },
    getServiceChartData: async () => {
        await delay(500);
        const db = getMockDb();
        const serviceCounts = {};
        db.quotes.forEach((q) => {
            const svc = db.services.find((s) => s.id === q.serviceId);
            if (svc) {
                serviceCounts[svc.title] = (serviceCounts[svc.title] || 0) + 1;
            }
        });
        if (Object.keys(serviceCounts).length === 0) {
            db.services.slice(0, 4).forEach((s) => {
                serviceCounts[s.title] = hashString(s.id) % 30 + 5;
            });
        }
        const total = Object.values(serviceCounts).reduce((s, v) => s + v, 0) || 1;
        const sorted = Object.entries(serviceCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6);
        const topPercent = sorted.map(([name, count]) => ({
            name,
            value: Math.round((count / total) * 100),
        }));
        const usedTotal = topPercent.reduce((s, item) => s + item.value, 0);
        if (usedTotal < 100 && topPercent.length > 0) {
            topPercent[0].value += 100 - usedTotal;
        }
        return topPercent;
    },
    getQuoteChartData: async () => {
        await delay(500);
        const db = getMockDb();
        const dayBuckets = {};
        WEEKDAYS.forEach((d) => { dayBuckets[d] = { submitted: 0, approved: 0 }; });
        db.quotes.forEach((q) => {
            const dayIdx = hashString(q.id) % 7;
            const dayName = WEEKDAYS[dayIdx];
            dayBuckets[dayName].submitted += 1;
            if (q.status === "Approved") {
                dayBuckets[dayName].approved += 1;
            }
        });
        return WEEKDAYS.map((name) => ({
            name,
            submitted: dayBuckets[name].submitted + 1,
            approved: dayBuckets[name].approved + Math.floor(hashString(name) % 3),
        }));
    },
    getRecentActivities: async () => {
        await delay(400);
        const db = getMockDb();
        const activities = [];
        db.quotes.slice(-3).reverse().forEach((q, idx) => {
            const statusLabel = q.status === "Approved" ? "Approved" : q.status === "Pending" ? "Submitted" : q.status;
            activities.push({
                id: `act-q-${q.id}`,
                user: q.customerName,
                action: `${statusLabel} Quote Request ${q.id}`,
                time: idx === 0 ? "10 minutes ago" : idx === 1 ? "2 hours ago" : "1 day ago",
            });
        });
        db.orders.slice(-2).reverse().forEach((o, idx) => {
            activities.push({
                id: `act-o-${o.id}`,
                user: o.customerName,
                action: `Order ${o.orderNumber} status: ${o.status}`,
                time: idx === 0 ? "5 hours ago" : "3 days ago",
            });
        });
        db.inquiries.slice(-2).reverse().forEach((inquiry, idx) => {
            activities.push({
                id: `act-i-${inquiry.id}`,
                user: inquiry.name,
                action: "Submitted a contact inquiry",
                time: idx === 0 ? "1 day ago" : "3 days ago",
            });
        });
        return activities.slice(0, 6);
    },
};
