import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { analyticsApi } from "@/services/analyticsApi";
import { getMockDb } from "@/utils/mockDb";
import { TrendingUp, DollarSign, FileText, Users, Layers, ShieldAlert, Clock, Calendar, ArrowUpRight, ShoppingBag, Percent } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Cell, BarChart, Bar, Legend, LineChart, Line } from "recharts";
import Card from "@/components/ui/Card";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [revenueData, setRevenueData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [activities, setActivities] = useState([]);
    const [pendingQuotes, setPendingQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    // Filters & Tabs state
    const [timeframe, setTimeframe] = useState("Monthly");
    const [activeTab, setActiveTab] = useState("revenue");
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const statsRes = await analyticsApi.getStats();
                const revRes = await analyticsApi.getRevenueChartData();
                const servRes = await analyticsApi.getServiceChartData();
                const actRes = await analyticsApi.getRecentActivities();
                const db = getMockDb();
                const pending = db.quotes.filter((q) => q.status === "Pending");
                setStats(statsRes);
                setRevenueData(revRes);
                setServiceData(servRes);
                setActivities(actRes);
                setPendingQuotes(pending);
            }
            catch (err) {
                console.error("Failed to load analytics", err);
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);
    const COLORS = ["#3b82f6", "#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];
    // Dynamically filter or compute chart data based on timeframe state
    const getFilteredRevenueData = () => {
        switch (timeframe) {
            case "Daily":
                return [
                    { name: "Mon", revenue: 12000 },
                    { name: "Tue", revenue: 18500 },
                    { name: "Wed", revenue: 14000 },
                    { name: "Thu", revenue: 26000 },
                    { name: "Fri", revenue: 21000 },
                    { name: "Sat", revenue: 9500 },
                    { name: "Sun", revenue: 6000 },
                ];
            case "Weekly":
                return [
                    { name: "Week 1", revenue: 45000 },
                    { name: "Week 2", revenue: 68000 },
                    { name: "Week 3", revenue: 52000 },
                    { name: "Week 4", revenue: 78000 },
                ];
            case "Yearly":
                return [
                    { name: "2024", revenue: 450000 },
                    { name: "2025", revenue: 620000 },
                    { name: "2026", revenue: 785000 },
                ];
            case "Monthly":
            default:
                return revenueData;
        }
    };
    const getFilteredOrderData = () => {
        switch (timeframe) {
            case "Daily":
                return [
                    { name: "Mon", orders: 4, revenuePerOrder: 3000 },
                    { name: "Tue", orders: 7, revenuePerOrder: 2640 },
                    { name: "Wed", orders: 5, revenuePerOrder: 2800 },
                    { name: "Thu", orders: 9, revenuePerOrder: 2880 },
                    { name: "Fri", orders: 8, revenuePerOrder: 2625 },
                    { name: "Sat", orders: 3, revenuePerOrder: 3160 },
                    { name: "Sun", orders: 2, revenuePerOrder: 3000 },
                ];
            case "Weekly":
                return [
                    { name: "Week 1", orders: 18, revenuePerOrder: 2500 },
                    { name: "Week 2", orders: 24, revenuePerOrder: 2830 },
                    { name: "Week 3", orders: 19, revenuePerOrder: 2735 },
                    { name: "Week 4", orders: 28, revenuePerOrder: 2785 },
                ];
            case "Yearly":
                return [
                    { name: "2024", orders: 160, revenuePerOrder: 2812 },
                    { name: "2025", orders: 220, revenuePerOrder: 2818 },
                    { name: "2026", orders: 280, revenuePerOrder: 2803 },
                ];
            case "Monthly":
            default:
                return [
                    { name: "Jan", orders: 12, revenuePerOrder: 2900 },
                    { name: "Feb", orders: 15, revenuePerOrder: 2800 },
                    { name: "Mar", orders: 18, revenuePerOrder: 2750 },
                    { name: "Apr", orders: 14, revenuePerOrder: 2950 },
                    { name: "May", orders: 22, revenuePerOrder: 2820 },
                    { name: "Jun", orders: 25, revenuePerOrder: 2800 },
                    { name: "Jul", orders: 20, revenuePerOrder: 2850 },
                    { name: "Aug", orders: 21, revenuePerOrder: 2780 },
                    { name: "Sep", orders: 26, revenuePerOrder: 2830 },
                    { name: "Oct", orders: 24, revenuePerOrder: 2800 },
                    { name: "Nov", orders: 28, revenuePerOrder: 2840 },
                    { name: "Dec", orders: 32, revenuePerOrder: 2910 },
                ];
        }
    };
    const getUserGrowthData = () => {
        return [
            { name: "Jan", userGrowth: 10, activeUsers: 60, returningUsers: 40 },
            { name: "Feb", userGrowth: 15, activeUsers: 75, returningUsers: 45 },
            { name: "Mar", userGrowth: 22, activeUsers: 90, returningUsers: 50 },
            { name: "Apr", userGrowth: 18, activeUsers: 85, returningUsers: 52 },
            { name: "May", userGrowth: 30, activeUsers: 115, returningUsers: 60 },
            { name: "Jun", userGrowth: 35, activeUsers: 130, returningUsers: 65 },
            { name: "Jul", userGrowth: 28, activeUsers: 120, returningUsers: 68 },
            { name: "Aug", userGrowth: 32, activeUsers: 135, returningUsers: 72 },
            { name: "Sep", userGrowth: 40, activeUsers: 160, returningUsers: 78 },
            { name: "Oct", userGrowth: 38, activeUsers: 155, returningUsers: 80 },
            { name: "Nov", userGrowth: 45, activeUsers: 180, returningUsers: 85 },
            { name: "Dec", userGrowth: 52, activeUsers: 210, returningUsers: 92 },
        ];
    };
    if (loading) {
        return (_jsx("div", { className: "p-16 text-center text-sm font-semibold text-slate-500", children: "Syncing admin intelligence center database..." }));
    }
    return (_jsxs("div", { className: "space-y-8 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white", children: "Admin Command Center" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-semibold", children: "Real-time analytics, printer shop sales, corporate client growth, and system logistics." })] }), _jsx("div", { className: "flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-sm", children: ["Daily", "Weekly", "Monthly", "Yearly"].map((tf) => (_jsx("button", { onClick: () => setTimeframe(tf), className: `px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${timeframe === tf
                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                : "text-slate-550 dark:text-slate-400 hover:text-slate-850 dark:hover:text-slate-200"}`, children: tf }, tf))) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 hover:shadow-lg transition-all duration-300", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0", children: _jsx(DollarSign, { size: 24 }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-xs font-bold text-slate-550 dark:text-slate-450 uppercase tracking-wider", children: "Gross Income" }), _jsxs("span", { className: "flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded", children: [_jsx(ArrowUpRight, { size: 10 }), " +12.3%"] })] }), _jsxs("p", { className: "text-2xl font-extrabold mt-1 truncate text-slate-950 dark:text-white", children: ["NPR ", stats?.totalRevenue] })] })] }), _jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 hover:shadow-lg transition-all duration-300", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0", children: _jsx(FileText, { size: 24 }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-xs font-bold text-slate-550 dark:text-slate-450 uppercase tracking-wider", children: "Quote Orders" }), _jsxs("span", { className: "flex items-center gap-0.5 text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded", children: [_jsx(ArrowUpRight, { size: 10 }), " +8.5%"] })] }), _jsx("p", { className: "text-2xl font-extrabold mt-1 truncate text-slate-950 dark:text-white", children: stats?.totalQuotes })] })] }), _jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 hover:shadow-lg transition-all duration-300", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0", children: _jsx(Users, { size: 24 }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-xs font-bold text-slate-550 dark:text-slate-450 uppercase tracking-wider", children: "Active Clients" }), _jsxs("span", { className: "flex items-center gap-0.5 text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded", children: [_jsx(ArrowUpRight, { size: 10 }), " +24%"] })] }), _jsx("p", { className: "text-2xl font-extrabold mt-1 truncate text-slate-950 dark:text-white", children: stats?.totalCustomers })] })] }), _jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 hover:shadow-lg transition-all duration-300", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0", children: _jsx(Layers, { size: 24 }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-xs font-bold text-slate-550 dark:text-slate-450 uppercase tracking-wider", children: "Flex Machinery" }), _jsx("span", { className: "flex items-center gap-0.5 text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded", children: "94% Eff" })] }), _jsxs("p", { className: "text-2xl font-extrabold mt-1 truncate text-slate-950 dark:text-white", children: [stats?.totalServices, " Lines"] })] })] })] }), _jsxs(Card, { className: "border border-slate-200 dark:border-slate-800 p-6 md:p-8 space-y-6 shadow-sm", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4", children: [_jsx("div", { className: "flex items-center gap-2", children: ["revenue", "users", "services", "orders"].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab), className: `px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer capitalize ${activeTab === tab
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                                        : "text-slate-550 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-850"}`, children: [tab, " Analytics"] }, tab))) }), _jsxs("div", { className: "text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5", children: [_jsx(Calendar, { size: 14 }), " Active Filter: ", timeframe] })] }), _jsx("div", { className: "h-80 w-full text-xs", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: activeTab === "revenue" ? (_jsxs(AreaChart, { data: getFilteredRevenueData(), children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "revenueGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.25 }), _jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0", className: "dark:stroke-slate-800/80" }), _jsx(XAxis, { dataKey: "name", stroke: "#94a3b8", fontStyle: "semibold" }), _jsx(YAxis, { stroke: "#94a3b8" }), _jsx(Tooltip, { contentStyle: { borderRadius: "12px", border: "1px solid #e2e8f0" } }), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "#3b82f6", strokeWidth: 2.5, fillOpacity: 1, fill: "url(#revenueGrad)" })] })) : activeTab === "users" ? (_jsxs(LineChart, { data: getUserGrowthData(), children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0", className: "dark:stroke-slate-800/80" }), _jsx(XAxis, { dataKey: "name", stroke: "#94a3b8" }), _jsx(YAxis, { stroke: "#94a3b8" }), _jsx(Tooltip, { contentStyle: { borderRadius: "12px", border: "1px solid #e2e8f0" } }), _jsx(Legend, {}), _jsx(Line, { type: "monotone", name: "User Growth", dataKey: "userGrowth", stroke: "#06b6d4", strokeWidth: 2.5 }), _jsx(Line, { type: "monotone", name: "Active Users", dataKey: "activeUsers", stroke: "#6366f1", strokeWidth: 2.5 }), _jsx(Line, { type: "monotone", name: "Returning Users", dataKey: "returningUsers", stroke: "#10b981", strokeWidth: 2.5 })] })) : activeTab === "services" ? (_jsxs(BarChart, { data: serviceData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0", className: "dark:stroke-slate-800/80" }), _jsx(XAxis, { dataKey: "name", stroke: "#94a3b8" }), _jsx(YAxis, { stroke: "#94a3b8" }), _jsx(Tooltip, { contentStyle: { borderRadius: "12px", border: "1px solid #e2e8f0" } }), _jsx(Bar, { dataKey: "value", name: "Popularity %", fill: "#818cf8", radius: [4, 4, 0, 0], children: serviceData.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) })] })) : (_jsxs(BarChart, { data: getFilteredOrderData(), children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0", className: "dark:stroke-slate-800/80" }), _jsx(XAxis, { dataKey: "name", stroke: "#94a3b8" }), _jsx(YAxis, { stroke: "#94a3b8" }), _jsx(Tooltip, { contentStyle: { borderRadius: "12px", border: "1px solid #e2e8f0" } }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "orders", name: "Order count", fill: "#3b82f6", radius: [4, 4, 0, 0] }), _jsx(Bar, { dataKey: "revenuePerOrder", name: "Avg revenue (NPR)", fill: "#10b981", radius: [4, 4, 0, 0] })] })) }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest", children: [_jsx(ShoppingBag, { size: 14, className: "text-blue-500" }), " Avg Order value"] }), _jsx("p", { className: "text-lg font-bold text-slate-850 dark:text-white", children: "NPR 16,340" }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Total volume divided by verified client orders" })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest", children: [_jsx(Percent, { size: 14, className: "text-indigo-500" }), " Conversion Rate"] }), _jsx("p", { className: "text-lg font-bold text-slate-850 dark:text-white", children: "42.8%" }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Quote layout approvals vs total request queries" })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest", children: [_jsx(TrendingUp, { size: 14, className: "text-emerald-500" }), " Growth Index"] }), _jsx("p", { className: "text-lg font-bold text-slate-850 dark:text-white", children: "+18.5% YoY" }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Monthly invoice compound growth index rate" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs(Card, { className: "lg:col-span-2 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm", children: [_jsxs("div", { className: "p-6 border-b border-slate-150 dark:border-slate-800 flex justify-between items-center", children: [_jsxs("h3", { className: "font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2", children: [_jsx(ShieldAlert, { className: "h-4.5 w-4.5 text-amber-500" }), " Pending Quotes Audit"] }), _jsx(Link, { to: "/admin/quotes", className: "text-xs font-bold text-blue-605 dark:text-blue-450 hover:underline", children: "View All Quotes" })] }), _jsx("div", { className: "overflow-x-auto text-xs", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800", children: [_jsx("th", { className: "p-4 font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider text-[10px]", children: "ID" }), _jsx("th", { className: "p-4 font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider text-[10px]", children: "Customer" }), _jsx("th", { className: "p-4 font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider text-[10px]", children: "Material Specs" }), _jsx("th", { className: "p-4 font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider text-[10px]", children: "Price Estimate" }), _jsx("th", { className: "p-4 font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider text-[10px]", children: "Action" })] }) }), _jsxs("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-850", children: [pendingQuotes.slice(0, 4).map((q) => (_jsxs("tr", { className: "hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors", children: [_jsx("td", { className: "p-4 font-bold text-slate-900 dark:text-slate-50", children: q.id }), _jsx("td", { className: "p-4 text-slate-750 dark:text-slate-350 font-medium", children: q.customerName }), _jsx("td", { className: "p-4 text-slate-700 dark:text-slate-400 truncate max-w-[150px] font-semibold", children: q.material }), _jsxs("td", { className: "p-4 font-bold text-slate-950 dark:text-slate-50", children: ["NPR ", q.estimatedPrice] }), _jsx("td", { className: "p-4", children: _jsx(Link, { to: "/admin/quotes", className: "text-xs font-bold text-blue-600 dark:text-blue-450 hover:underline", children: "Audit \u2192" }) })] }, q.id))), pendingQuotes.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "p-8 text-center text-slate-400 font-semibold", children: "All quotes are audited and processed!" }) }))] })] }) })] }), _jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-sm", children: [_jsx("h3", { className: "font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider border-b border-slate-100 dark:border-slate-850 pb-2", children: "System Activity Log" }), _jsx("div", { className: "space-y-4", children: activities.map((act) => (_jsxs("div", { className: "flex gap-3 relative pb-1", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5 shadow shadow-blue-500" }), _jsxs("div", { className: "space-y-0.5 min-w-0", children: [_jsxs("p", { className: "text-xs font-semibold truncate text-slate-750 dark:text-slate-300", children: [_jsx("span", { className: "font-bold text-slate-900 dark:text-white", children: act.user }), ": ", act.action] }), _jsxs("span", { className: "flex items-center gap-1 text-[10px] text-slate-450 dark:text-slate-500 font-medium", children: [_jsx(Clock, { size: 10 }), " ", act.time] })] })] }, act.id))) })] })] })] }));
}
