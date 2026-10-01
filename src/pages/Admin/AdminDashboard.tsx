import { useEffect, useState } from "react";
import { analyticsApi } from "@/services/analyticsApi";
import { quoteApi, type FullQuote } from "@/services/quoteApi";
import { services as serviceCatalog } from "@/data/services";
import { useTheme } from "@/providers/ThemeProvider";
import {
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  Layers,
  ShieldAlert,
  Clock,
  ShoppingBag,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
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
  Line,
} from "recharts";
import Card from "@/components/ui/Card";
import { Link } from "react-router-dom";

type ActiveTab = "revenue" | "users" | "services" | "orders";

const serviceName = (id: string) =>
  serviceCatalog.find((s) => s.id === id)?.title || `Service ${id}`;

const npr = (n: number) => "NPR " + Math.round(n).toLocaleString("en-IN");

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [pendingQuotes, setPendingQuotes] = useState<FullQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeTab, setActiveTab] = useState<ActiveTab>("revenue");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [statsRes, revRes, servRes, orderRes, growthRes, actRes, quotes] = await Promise.all([
          analyticsApi.getStats(),
          analyticsApi.getRevenueChartData(),
          analyticsApi.getServiceChartData(),
          analyticsApi.getOrderStatsData(),
          analyticsApi.getUserGrowthData(),
          analyticsApi.getRecentActivities(),
          quoteApi.getAll(),
        ]);

        setStats(statsRes);
        setRevenueData(revRes);
        setServiceData(servRes.map((s: any) => ({ name: serviceName(s.serviceId), value: s.count })));
        setOrderData(orderRes);
        setUserGrowth(growthRes);
        setActivities(actRes);
        setPendingQuotes(quotes.filter((q) => q.status === "Pending"));
      } catch (err) {
        console.error("Failed to load analytics", err);
        setError(true);
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
  const tooltipStyle = { borderRadius: "2px", border: `1px solid ${tooltipBorder}`, backgroundColor: tooltipBg, color: tooltipText };

  if (loading) {
    return (
      <div className="p-16 text-center text-sm font-semibold text-muted">
        Loading analytics from the database…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-16 text-center space-y-2">
        <p className="text-sm font-semibold text-err">Could not load dashboard analytics.</p>
        <p className="text-xs text-muted">Check that the backend is running, then refresh.</p>
      </div>
    );
  }

  const growth = stats?.monthlyGrowth as number | null;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl tracking-tight text-ink">Admin Command Center</h1>
        <p className="text-sm text-muted mt-1.5">
          Live analytics for revenue, quotes, clients and print operations — rolling 12-month window.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border border-line rounded-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-sm bg-accent-soft text-accent flex items-center justify-center shrink-0">
            <DollarSign size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono text-muted uppercase tracking-wide">Gross Income</p>
              {growth !== null && growth !== undefined && (
                <span className={`flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${growth >= 0 ? "text-ok bg-accent-soft" : "text-err bg-paper-dim"}`}>
                  {growth >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {growth >= 0 ? "+" : ""}{growth}%
                </span>
              )}
            </div>
            <p className="text-2xl font-display mt-1 truncate text-ink">{npr(stats?.totalRevenue || 0)}</p>
            <p className="text-[10px] text-faint mt-0.5">Month-over-month vs last month</p>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-sm bg-accent-soft text-accent flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-mono text-muted uppercase tracking-wide">Quote Requests</p>
            <p className="text-2xl font-display mt-1 truncate text-ink">{stats?.totalQuotes ?? 0}</p>
            <p className="text-[10px] text-faint mt-0.5">{stats?.pendingQuotes ?? 0} pending review</p>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-sm bg-ink text-inverse flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-mono text-muted uppercase tracking-wide">Registered Clients</p>
            <p className="text-2xl font-display mt-1 truncate text-ink">{stats?.totalCustomers ?? 0}</p>
            <p className="text-[10px] text-faint mt-0.5">{stats?.totalOrders ?? 0} orders placed</p>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-sm bg-ink text-inverse flex items-center justify-center shrink-0">
            <Layers size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-mono text-muted uppercase tracking-wide">Service Lines</p>
            <p className="text-2xl font-display mt-1 truncate text-ink">{stats?.totalServices ?? 0}</p>
            <p className="text-[10px] text-faint mt-0.5">{stats?.totalProjects ?? 0} portfolio projects</p>
          </div>
        </Card>
      </div>

      {/* Analytics View */}
      <Card className="border border-line rounded-sm p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
          {(["revenue", "users", "services", "orders"] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-mono rounded-full transition-all cursor-pointer capitalize ${
                activeTab === tab ? "bg-accent text-accent-ink" : "text-muted hover:bg-paper-dim"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="h-80 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === "revenue" ? (
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={accentStroke} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={accentStroke} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" stroke="transparent" tick={{ fill: axisTickFill, fontWeight: 600 }} />
                <YAxis stroke="transparent" tick={{ fill: axisTickFill }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => npr(Number(v))} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke={accentStroke} strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            ) : activeTab === "users" ? (
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="name" stroke="transparent" tick={{ fill: axisTickFill }} />
                <YAxis stroke="transparent" tick={{ fill: axisTickFill }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line type="monotone" name="New clients" dataKey="newUsers" stroke={accentStroke} strokeWidth={2.5} />
                <Line type="monotone" name="Total clients" dataKey="totalUsers" stroke={COLORS[3]} strokeWidth={2.5} />
              </LineChart>
            ) : activeTab === "services" ? (
              serviceData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted">No quote data yet.</div>
              ) : (
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                  <XAxis dataKey="name" stroke="transparent" tick={{ fill: axisTickFill }} />
                  <YAxis stroke="transparent" tick={{ fill: axisTickFill }} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" name="Quote requests" fill={accentStroke} radius={[2, 2, 0, 0]}>
                    {serviceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )
            ) : (
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis dataKey="name" stroke="transparent" tick={{ fill: axisTickFill }} />
                <YAxis stroke="transparent" tick={{ fill: axisTickFill }} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="orders" name="Orders" fill={accentStroke} radius={[2, 2, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Real business insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-line">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted uppercase tracking-wide">
              <ShoppingBag size={14} className="text-accent" /> Avg Order Value
            </div>
            <p className="text-lg font-display text-ink">{npr(stats?.avgOrderValue || 0)}</p>
            <p className="text-[11px] text-faint">Total revenue divided by orders placed</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted uppercase tracking-wide">
              <Percent size={14} className="text-accent" /> Quote Conversion
            </div>
            <p className="text-lg font-display text-ink">{stats?.conversionRate ?? 0}%</p>
            <p className="text-[11px] text-faint">Approved quotes vs total requests</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted uppercase tracking-wide">
              <TrendingUp size={14} className="text-ok" /> Revenue Growth
            </div>
            <p className="text-lg font-display text-ink">
              {growth === null || growth === undefined ? "—" : `${growth >= 0 ? "+" : ""}${growth}%`}
            </p>
            <p className="text-[11px] text-faint">This month vs last month</p>
          </div>
        </div>
      </Card>

      {/* Pending quotes + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border border-line rounded-sm overflow-hidden">
          <div className="p-6 border-b border-line flex justify-between items-center">
            <h3 className="font-display text-sm text-ink uppercase tracking-wide flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-warn" /> Pending Quotes
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
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Material</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Estimate</th>
                  <th className="p-4 font-mono text-muted uppercase tracking-wide text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pendingQuotes.slice(0, 5).map((q) => (
                  <tr key={q.id} className="hover:bg-paper-dim transition-colors">
                    <td className="p-4 font-mono text-ink">{q.id}</td>
                    <td className="p-4 text-ink-soft font-medium">{q.customerName}</td>
                    <td className="p-4 text-muted truncate max-w-[150px]">{q.material}</td>
                    <td className="p-4 font-mono text-ink">{npr(Number(q.estimatedPrice) || 0)}</td>
                    <td className="p-4">
                      <Link to="/admin/quotes" className="text-xs font-mono text-accent hover:underline">
                        Review &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
                {pendingQuotes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted">
                      All quotes have been reviewed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm space-y-5">
          <h3 className="font-display text-sm text-ink uppercase tracking-wide border-b border-line pb-2">System Activity Log</h3>
          <div className="space-y-4">
            {activities.length === 0 && (
              <p className="text-xs text-muted">No recent activity recorded.</p>
            )}
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
