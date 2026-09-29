import { useEffect, useState } from "react";
import { analyticsApi } from "@/services/analyticsApi";
import { getMockDb } from "@/utils/mockDb";
import { useTheme } from "@/providers/ThemeProvider";
import {
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  Layers,
  ShieldAlert,
  Clock,
  Calendar,
  ArrowUpRight,
  ShoppingBag,
  Percent
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line
} from "recharts";
import Card from "@/components/ui/Card";
import { Link } from "react-router-dom";

type Timeframe = "Daily" | "Weekly" | "Monthly" | "Yearly";
type ActiveTab = "revenue" | "users" | "services" | "orders";

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [pendingQuotes, setPendingQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Tabs state
  const [timeframe, setTimeframe] = useState<Timeframe>("Monthly");
  const [activeTab, setActiveTab] = useState<ActiveTab>("revenue");

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
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const COLORS = ["#d8402a", "#1a1714", "#776f64", "#2f7d54", "#b5730f", "#bf3320"];
  const gridStroke = isDark ? "rgba(44,40,34,0.9)" : "rgba(230,225,214,0.9)";
  const axisTickFill = isDark ? "#948b7d" : "#776f64";
  const accentStroke = isDark ? "#f2603f" : "#d8402a";
  const tooltipBg = isDark ? "#201d18" : "#ffffff";
  const tooltipBorder = isDark ? "#2c2822" : "#e6e1d6";
  const tooltipText = isDark ? "#f4f0e8" : "#1a1714";

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
    return (
      <div className="p-16 text-center text-sm font-semibold text-muted">
        Syncing admin intelligence center database...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-ink">Admin Command Center</h1>
          <p className="text-sm text-muted mt-1.5">
            Real-time analytics, printer shop sales, corporate client growth, and system logistics.
          </p>
        </div>

        {/* Timeframe Filter Dropdown */}
        <div className="flex items-center gap-2 bg-surface border border-line rounded-full p-1.5">
          {(["Daily", "Weekly", "Monthly", "Yearly"] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-mono rounded-full transition-all cursor-pointer ${
                timeframe === tf
                  ? "bg-ink text-inverse"
                  : "text-muted hover:text-ink"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border border-line rounded-sm flex items-center gap-4 transition-all duration-300">
          <div className="h-12 w-12 rounded-sm bg-accent-soft text-accent flex items-center justify-center shrink-0">
            <DollarSign size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted uppercase tracking-wide">Gross Income</p>
              <span className="flex items-center gap-0.5 text-[10px] text-ok font-mono bg-accent-soft px-1.5 py-0.5 rounded-full">
                <ArrowUpRight size={10} /> +12.3%
              </span>
            </div>
            <p className="text-2xl font-display mt-1 truncate text-ink">NPR {stats?.totalRevenue}</p>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm flex items-center gap-4 transition-all duration-300">
          <div className="h-12 w-12 rounded-sm bg-accent-soft text-accent flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted uppercase tracking-wide">Quote Orders</p>
              <span className="flex items-center gap-0.5 text-[10px] text-accent font-mono bg-accent-soft px-1.5 py-0.5 rounded-full">
                <ArrowUpRight size={10} /> +8.5%
              </span>
            </div>
            <p className="text-2xl font-display mt-1 truncate text-ink">{stats?.totalQuotes}</p>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm flex items-center gap-4 transition-all duration-300">
          <div className="h-12 w-12 rounded-sm bg-ink text-inverse flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted uppercase tracking-wide">Active Clients</p>
              <span className="flex items-center gap-0.5 text-[10px] text-accent font-mono bg-accent-soft px-1.5 py-0.5 rounded-full">
                <ArrowUpRight size={10} /> +24%
              </span>
            </div>
            <p className="text-2xl font-display mt-1 truncate text-ink">{stats?.totalCustomers}</p>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm flex items-center gap-4 transition-all duration-300">
          <div className="h-12 w-12 rounded-sm bg-ink text-inverse flex items-center justify-center shrink-0">
            <Layers size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted uppercase tracking-wide">Flex Machinery</p>
              <span className="flex items-center gap-0.5 text-[10px] text-ok font-mono bg-accent-soft px-1.5 py-0.5 rounded-full">
                94% Eff
              </span>
            </div>
            <p className="text-2xl font-display mt-1 truncate text-ink">{stats?.totalServices} Lines</p>
          </div>
        </Card>
      </div>

      {/* Analytics Main Interactive View */}
      <Card className="border border-line rounded-sm p-6 md:p-8 space-y-6">

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line pb-4">
          <div className="flex items-center gap-2">
            {(["revenue", "users", "services", "orders"] as ActiveTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-mono rounded-full transition-all cursor-pointer capitalize ${
                  activeTab === tab
                    ? "bg-accent text-accent-ink"
                    : "text-muted hover:bg-paper-dim"
                }`}
              >
                {tab} Analytics
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-muted uppercase tracking-wide flex items-center gap-1.5">
            <Calendar size={14} /> Active Filter: {timeframe}
          </div>
        </div>

        {/* Dynamic Tab Charts */}
        <div className="h-80 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === "revenue" ? (
              <AreaChart data={getFilteredRevenueData()}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={accentStroke} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={accentStroke} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" stroke="transparent" tick={{ fill: axisTickFill, fontWeight: 600 }} />
                <YAxis stroke="transparent" tick={{ fill: axisTickFill }} />
                <Tooltip contentStyle={{ borderRadius: "2px", border: `1px solid ${tooltipBorder}`, backgroundColor: tooltipBg, color: tooltipText }} />
                <Area type="monotone" dataKey="revenue" stroke={accentStroke} strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            ) : activeTab === "users" ? (
              <LineChart data={getUserGrowthData()}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="name" stroke="transparent" tick={{ fill: axisTickFill }} />
                <YAxis stroke="transparent" tick={{ fill: axisTickFill }} />
                <Tooltip contentStyle={{ borderRadius: "2px", border: `1px solid ${tooltipBorder}`, backgroundColor: tooltipBg, color: tooltipText }} />
                <Legend />
                <Line type="monotone" name="User Growth" dataKey="userGrowth" stroke={accentStroke} strokeWidth={2.5} />
                <Line type="monotone" name="Active Users" dataKey="activeUsers" stroke={tooltipText} strokeWidth={2.5} />
                <Line type="monotone" name="Returning Users" dataKey="returningUsers" stroke={COLORS[3]} strokeWidth={2.5} />
              </LineChart>
            ) : activeTab === "services" ? (
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" stroke="transparent" tick={{ fill: axisTickFill }} />
                <YAxis stroke="transparent" tick={{ fill: axisTickFill }} />
                <Tooltip contentStyle={{ borderRadius: "2px", border: `1px solid ${tooltipBorder}`, backgroundColor: tooltipBg, color: tooltipText }} />
                <Bar dataKey="value" name="Popularity %" fill={accentStroke} radius={[2, 2, 0, 0]}>
                  {serviceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart data={getFilteredOrderData()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" stroke="transparent" tick={{ fill: axisTickFill }} />
                <YAxis stroke="transparent" tick={{ fill: axisTickFill }} />
                <Tooltip contentStyle={{ borderRadius: "2px", border: `1px solid ${tooltipBorder}`, backgroundColor: tooltipBg, color: tooltipText }} />
                <Legend />
                <Bar dataKey="orders" name="Order count" fill={accentStroke} radius={[2, 2, 0, 0]} />
                <Bar dataKey="revenuePerOrder" name="Avg revenue (NPR)" fill={COLORS[3]} radius={[2, 2, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Business Insights Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-line">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted uppercase tracking-wide">
              <ShoppingBag size={14} className="text-accent" /> Avg Order value
            </div>
            <p className="text-lg font-display text-ink">NPR 16,340</p>
            <p className="text-[11px] text-faint">Total volume divided by verified client orders</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted uppercase tracking-wide">
              <Percent size={14} className="text-accent" /> Conversion Rate
            </div>
            <p className="text-lg font-display text-ink">42.8%</p>
            <p className="text-[11px] text-faint">Quote layout approvals vs total request queries</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted uppercase tracking-wide">
              <TrendingUp size={14} className="text-ok" /> Growth Index
            </div>
            <p className="text-lg font-display text-ink">+18.5% YoY</p>
            <p className="text-[11px] text-faint">Monthly invoice compound growth index rate</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Pending Quotes Action Table */}
        <Card className="lg:col-span-2 border border-line rounded-sm overflow-hidden">
          <div className="p-6 border-b border-line flex justify-between items-center">
            <h3 className="font-display text-sm text-ink uppercase tracking-wide flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-warn" /> Pending Quotes Audit
            </h3>
            <Link to="/admin/quotes" className="text-xs font-mono text-accent hover:underline">
              View All Quotes
            </Link>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-paper-dim border-b border-line">
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">ID</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Customer</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Material Specs</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Price Estimate</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pendingQuotes.slice(0, 4).map((q) => (
                  <tr key={q.id} className="hover:bg-paper-dim transition-colors">
                    <td className="p-4 font-mono text-ink">{q.id}</td>
                    <td className="p-4 text-ink-soft font-medium">{q.customerName}</td>
                    <td className="p-4 text-muted truncate max-w-[150px]">{q.material}</td>
                    <td className="p-4 font-mono text-ink">NPR {q.estimatedPrice}</td>
                    <td className="p-4">
                      <Link to="/admin/quotes" className="text-xs font-mono text-accent hover:underline">
                        Audit &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
                {pendingQuotes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted">
                      All quotes are audited and processed!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Activity Logs Timeline */}
        <Card className="p-6 border border-line rounded-sm space-y-5">
          <h3 className="font-display text-sm text-ink uppercase tracking-wide border-b border-line pb-2">System Activity Log</h3>
          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-3 relative pb-1">
                <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" />
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs truncate text-ink-soft">
                    <span className="font-medium text-ink">{act.user}</span>: {act.action}
                  </p>
                  <span className="flex items-center gap-1 text-[10px] text-faint font-mono">
                    <Clock size={10} /> {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}
