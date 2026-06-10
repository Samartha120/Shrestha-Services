import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { analyticsApi } from "@/services/analyticsApi";
import Card from "@/components/ui/Card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, } from "recharts";
import { TrendingUp, TrendingDown, Activity, BarChart3, Coins, Users } from "lucide-react";
const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length)
        return null;
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl px-4 py-3 text-sm", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5", children: label }), payload.map((entry, i) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "h-2 w-2 rounded-full shrink-0", style: { backgroundColor: entry.color } }), _jsxs("span", { className: "text-slate-700 dark:text-slate-300 capitalize", children: [entry.name, ":"] }), _jsx("span", { className: "font-bold text-slate-900 dark:text-white", children: entry.name === "revenue"
                            ? `NPR ${entry.value.toLocaleString()}`
                            : entry.value.toLocaleString() })] }, i)))] }));
};
const colorMap = {
    blue: { bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-600 dark:text-blue-400" },
    emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600 dark:text-emerald-400" },
    indigo: { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-600 dark:text-indigo-400" },
    cyan: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-600 dark:text-cyan-400" },
};
const KpiCard = ({ icon: Icon, label, value, trend, trendLabel, color }) => {
    const { bg, text } = colorMap[color];
    const isPositive = trend >= 0;
    return (_jsxs(Card, { className: "p-5 border border-slate-200/80 dark:border-slate-800 group hover:shadow-md transition-shadow duration-300", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsx("div", { className: `h-11 w-11 rounded-2xl ${bg} ${text} flex items-center justify-center shrink-0`, children: _jsx(Icon, { size: 20 }) }), _jsxs("div", { className: `flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400"}`, children: [isPositive ? _jsx(TrendingUp, { size: 11 }) : _jsx(TrendingDown, { size: 11 }), Math.abs(trend), "%"] })] }), _jsxs("div", { className: "mt-4 space-y-0.5", children: [_jsx("p", { className: "text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white", children: value }), _jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: label }), _jsx("p", { className: "text-[11px] text-slate-400 dark:text-slate-500 pt-1", children: trendLabel })] })] }));
};
export default function AdminAnalytics() {
    const [revenueData, setRevenueData] = useState([]);
    const [visitorData, setVisitorData] = useState([]);
    const [quoteData, setQuoteData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const [rev, vis, quo] = await Promise.all([
                    analyticsApi.getRevenueChartData(),
                    analyticsApi.getVisitorChartData(),
                    analyticsApi.getQuoteChartData(),
                ]);
                setRevenueData(rev);
                setVisitorData(vis);
                setQuoteData(quo);
            }
            catch (err) {
                console.error("Failed to load analytics records", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-24 gap-3", children: [_jsx("div", { className: "h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" }), _jsx("p", { className: "text-sm text-slate-500", children: "Syncing analytics engine..." })] }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Analytics Control" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: "Real-time metrics tracking billing revenues, quote conversions, and portal traffic." })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl", children: [_jsx(Activity, { size: 13, className: "text-emerald-500" }), "Live data"] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: [_jsx(KpiCard, { icon: Coins, label: "Avg Order Value", value: "NPR 16,340", trend: 8.2, trendLabel: "vs. last 30 days", color: "blue" }), _jsx(KpiCard, { icon: BarChart3, label: "Conversion Rate", value: "42.8%", trend: 3.5, trendLabel: "quotes \u2192 orders", color: "emerald" }), _jsx(KpiCard, { icon: Users, label: "Monthly Visitors", value: "8,432", trend: -2.1, trendLabel: "portal sessions", color: "indigo" }), _jsx(KpiCard, { icon: Activity, label: "Active Inquiries", value: "14 Inbound", trend: 12.0, trendLabel: "pending responses", color: "cyan" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 space-y-5", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Monthly Invoices Issued" }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500", children: "Total NPR revenue billed per month" })] }), _jsx("div", { className: "h-72 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: revenueData, barSize: 28, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(148,163,184,0.15)" }), _jsx(XAxis, { dataKey: "name", stroke: "transparent", tick: { fill: "#94a3b8", fontSize: 11, fontWeight: 500 } }), _jsx(YAxis, { stroke: "transparent", tick: { fill: "#94a3b8", fontSize: 11 }, width: 60 }), _jsx(Tooltip, { content: _jsx(ChartTooltip, {}), cursor: { fill: "rgba(148,163,184,0.08)" } }), _jsx(Bar, { dataKey: "revenue", fill: "url(#revenueGrad)", radius: [6, 6, 0, 0] }), _jsx("defs", { children: _jsxs("linearGradient", { id: "revenueGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#3b82f6", stopOpacity: 0.95 }), _jsx("stop", { offset: "100%", stopColor: "#6366f1", stopOpacity: 0.7 })] }) })] }) }) })] }), _jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 space-y-5", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Monthly Portal Visitors" }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500", children: "Unique sessions on the customer portal" })] }), _jsx("div", { className: "h-72 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: visitorData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(148,163,184,0.15)" }), _jsx(XAxis, { dataKey: "name", stroke: "transparent", tick: { fill: "#94a3b8", fontSize: 11, fontWeight: 500 } }), _jsx(YAxis, { stroke: "transparent", tick: { fill: "#94a3b8", fontSize: 11 }, width: 50 }), _jsx(Tooltip, { content: _jsx(ChartTooltip, {}), cursor: { stroke: "rgba(99,102,241,0.3)", strokeWidth: 1 } }), _jsx(Line, { type: "monotone", dataKey: "visitors", stroke: "#6366f1", strokeWidth: 2.5, dot: { fill: "#6366f1", r: 4, strokeWidth: 2, stroke: "#fff" }, activeDot: { r: 6, stroke: "#6366f1", strokeWidth: 2, fill: "#fff" } })] }) }) })] }), _jsxs(Card, { className: "lg:col-span-2 p-6 border border-slate-200/80 dark:border-slate-800 space-y-5", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Quote Submissions vs Approvals" }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500", children: "Weekly quote conversion funnel" })] }), _jsxs("div", { className: "flex gap-4 text-xs font-semibold text-slate-500 shrink-0", children: [_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-2.5 w-2.5 rounded-sm bg-slate-400" }), "Submitted"] }), _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-2.5 w-2.5 rounded-sm bg-emerald-500" }), "Approved"] })] })] }), _jsx("div", { className: "h-72 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: quoteData, barGap: 4, barSize: 22, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(148,163,184,0.15)" }), _jsx(XAxis, { dataKey: "name", stroke: "transparent", tick: { fill: "#94a3b8", fontSize: 11, fontWeight: 500 } }), _jsx(YAxis, { stroke: "transparent", tick: { fill: "#94a3b8", fontSize: 11 }, width: 40 }), _jsx(Tooltip, { content: _jsx(ChartTooltip, {}), cursor: { fill: "rgba(148,163,184,0.08)" } }), _jsx(Bar, { dataKey: "submitted", fill: "#94a3b8", radius: [5, 5, 0, 0] }), _jsx(Bar, { dataKey: "approved", fill: "#10b981", radius: [5, 5, 0, 0] })] }) }) })] })] })] }));
}
