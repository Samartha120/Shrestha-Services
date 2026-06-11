import { useEffect, useState } from "react";
import { analyticsApi } from "@/services/analyticsApi";
import Card from "@/components/ui/Card";
import { useTheme } from "@/providers/ThemeProvider";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, TrendingDown, Activity, ChartBar as BarChart3, Coins, Users } from "lucide-react";

// --- Custom themed tooltip for charts ---
interface TooltipEntry { name: string; value: number; color: string; }
interface ChartTooltipProps { active?: boolean; payload?: TooltipEntry[]; label?: string; }

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl px-4 py-3 text-sm">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-700 dark:text-slate-300 capitalize">{entry.name}:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {entry.name === "revenue"
              ? `NPR ${entry.value.toLocaleString()}`
              : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

interface KpiCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: number;
  trendLabel: string;
  color: "blue" | "emerald" | "indigo" | "cyan";
}

const colorMap = {
  blue: { bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-600 dark:text-blue-400" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-600 dark:text-emerald-400" },
  indigo: { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-600 dark:text-indigo-400" },
  cyan: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-600 dark:text-cyan-400" },
};

const KpiCard = ({ icon: Icon, label, value, trend, trendLabel, color }: KpiCardProps) => {
  const { bg, text } = colorMap[color];
  const isPositive = trend >= 0;
  return (
    <Card className="p-5 border border-slate-200/80 dark:border-slate-800 group hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className={`h-11 w-11 rounded-2xl ${bg} ${text} flex items-center justify-center shrink-0`}>
          <Icon size={20} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPositive
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
              : "bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400"
          }`}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="mt-4 space-y-0.5">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">{trendLabel}</p>
      </div>
    </Card>
  );
};

export default function AdminAnalytics() {
  const { isDark } = useTheme();
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [visitorData, setVisitorData] = useState<any[]>([]);
  const [quoteData, setQuoteData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const gridStroke = isDark ? "rgba(51,65,85,0.35)" : "rgba(226,232,240,0.6)";
  const axisTickFill = isDark ? "#94a3b8" : "#64748b";
  const barFill1 = isDark ? "url(#revenueGradDark)" : "url(#revenueGrad)";
  const lineStroke = isDark ? "#a5b4fc" : "#6366f1";
  const lineDotStroke = isDark ? "#1e293b" : "#ffffff";

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
      } catch (err) {
        console.error("Failed to load analytics records", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-sm text-slate-500">Syncing analytics engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Analytics Control</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time metrics tracking billing revenues, quote conversions, and portal traffic.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
          <Activity size={13} className="text-emerald-500" />
          Live data
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          icon={Coins}
          label="Avg Order Value"
          value="NPR 16,340"
          trend={8.2}
          trendLabel="vs. last 30 days"
          color="blue"
        />
        <KpiCard
          icon={BarChart3}
          label="Conversion Rate"
          value="42.8%"
          trend={3.5}
          trendLabel="quotes → orders"
          color="emerald"
        />
        <KpiCard
          icon={Users}
          label="Monthly Visitors"
          value="8,432"
          trend={-2.1}
          trendLabel="portal sessions"
          color="indigo"
        />
        <KpiCard
          icon={Activity}
          label="Active Inquiries"
          value="14 Inbound"
          trend={12.0}
          trendLabel="pending responses"
          color="cyan"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Monthly Revenue Bar Chart */}
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 space-y-5">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Monthly Invoices Issued</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Total NPR revenue billed per month</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis
                  dataKey="name"
                  stroke="transparent"
                  tick={{ fill: axisTickFill, fontSize: 11, fontWeight: 500 }}
                />
                <YAxis
                  stroke="transparent"
                  tick={{ fill: axisTickFill, fontSize: 11 }}
                  width={60}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: isDark ? "rgba(148,163,184,0.06)" : "rgba(148,163,184,0.08)" }} />
                <Bar
                  dataKey="revenue"
                  fill={barFill1}
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="revenueGradDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Monthly Visitors Line Chart */}
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 space-y-5">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Monthly Portal Visitors</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Unique sessions on the customer portal</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="name"
                  stroke="transparent"
                  tick={{ fill: axisTickFill, fontSize: 11, fontWeight: 500 }}
                />
                <YAxis
                  stroke="transparent"
                  tick={{ fill: axisTickFill, fontSize: 11 }}
                  width={50}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: isDark ? "rgba(165,180,252,0.3)" : "rgba(99,102,241,0.3)", strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke={lineStroke}
                  strokeWidth={2.5}
                  dot={{ fill: lineStroke, r: 4, strokeWidth: 2, stroke: lineDotStroke }}
                  activeDot={{ r: 6, stroke: lineStroke, strokeWidth: 2, fill: lineDotStroke }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quotes Submissions vs Approvals */}
        <Card className="lg:col-span-2 p-6 border border-slate-200/80 dark:border-slate-800 space-y-5">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Quote Submissions vs Approvals</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Weekly quote conversion funnel</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-slate-500 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-slate-400" />
                Submitted
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                Approved
              </span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quoteData} barGap={4} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                <XAxis
                  dataKey="name"
                  stroke="transparent"
                  tick={{ fill: axisTickFill, fontSize: 11, fontWeight: 500 }}
                />
                <YAxis
                  stroke="transparent"
                  tick={{ fill: axisTickFill, fontSize: 11 }}
                  width={40}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: isDark ? "rgba(148,163,184,0.06)" : "rgba(148,163,184,0.08)" }} />
                <Bar dataKey="submitted" fill={isDark ? "#64748b" : "#94a3b8"} radius={[5, 5, 0, 0]} />
                <Bar dataKey="approved" fill={isDark ? "#34d399" : "#10b981"} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
}
