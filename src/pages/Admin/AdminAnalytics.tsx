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
    <div className="bg-surface border border-line rounded-sm shadow-[var(--shadow-sm)] px-4 py-3 text-sm">
      <p className="text-xs font-mono text-muted mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-ink-soft capitalize">{entry.name}:</span>
          <span className="font-mono text-ink">
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
  trend?: number | null;
  trendLabel: string;
  tone: "accent" | "ink";
}

const toneMap = {
  accent: { bg: "bg-accent-soft", text: "text-accent" },
  ink: { bg: "bg-ink", text: "text-inverse" },
};

const KpiCard = ({ icon: Icon, label, value, trend, trendLabel, tone }: KpiCardProps) => {
  const { bg, text } = toneMap[tone];
  const hasTrend = trend !== undefined && trend !== null;
  const isPositive = (trend ?? 0) >= 0;
  return (
    <Card className="p-5 border border-line rounded-sm group transition-shadow duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className={`h-11 w-11 rounded-sm ${bg} ${text} flex items-center justify-center shrink-0`}>
          <Icon size={20} />
        </div>
        {hasTrend && (
          <div
            className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full bg-accent-soft ${
              isPositive ? "text-ok" : "text-err"
            }`}
          >
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(trend as number)}%
          </div>
        )}
      </div>
      <div className="mt-4 space-y-0.5">
        <p className="text-2xl font-display tracking-tight text-ink">{value}</p>
        <p className="text-xs font-mono text-muted uppercase tracking-wide">{label}</p>
        <p className="text-[11px] text-faint pt-1">{trendLabel}</p>
      </div>
    </Card>
  );
};

export default function AdminAnalytics() {
  const { isDark } = useTheme();
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [quoteData, setQuoteData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const gridStroke = isDark ? "rgba(44,40,34,0.9)" : "rgba(230,225,214,0.9)";
  const axisTickFill = isDark ? "#948b7d" : "#776f64";
  const barFill1 = isDark ? "url(#revenueGradDark)" : "url(#revenueGrad)";
  const lineStroke = isDark ? "#f2603f" : "#d8402a";
  const lineDotStroke = isDark ? "#201d18" : "#ffffff";

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [st, rev, growth, quo] = await Promise.all([
          analyticsApi.getStats(),
          analyticsApi.getRevenueChartData(),
          analyticsApi.getUserGrowthData(),
          analyticsApi.getQuoteChartData(),
        ]);
        setStats(st);
        setRevenueData(rev);
        setGrowthData(growth);
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
        <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <p className="text-sm text-muted">Syncing analytics engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl tracking-tight text-ink">Analytics Control</h1>
          <p className="text-sm text-muted mt-1">
            Real-time metrics tracking billing revenues, quote conversions, and portal traffic.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted bg-surface-2 border border-line px-3 py-1.5 rounded-full">
          <Activity size={13} className="text-ok" />
          Live data
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          icon={Coins}
          label="Avg Order Value"
          value={`NPR ${(stats?.avgOrderValue || 0).toLocaleString("en-IN")}`}
          trendLabel="Revenue ÷ orders placed"
          tone="accent"
        />
        <KpiCard
          icon={BarChart3}
          label="Conversion Rate"
          value={`${stats?.conversionRate ?? 0}%`}
          trendLabel="Approved quotes ÷ total"
          tone="ink"
        />
        <KpiCard
          icon={Users}
          label="Registered Clients"
          value={String(stats?.totalCustomers ?? 0)}
          trendLabel="Verified customer accounts"
          tone="accent"
        />
        <KpiCard
          icon={Activity}
          label="Pending Quotes"
          value={`${stats?.pendingQuotes ?? 0} Open`}
          trend={stats?.monthlyGrowth}
          trendLabel="Awaiting review"
          tone="ink"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Monthly Revenue Bar Chart */}
        <Card className="p-6 border border-line rounded-sm space-y-5">
          <div className="space-y-0.5">
            <h3 className="font-display text-sm text-ink uppercase tracking-wide">Monthly Invoices Issued</h3>
            <p className="text-xs text-faint">Total NPR revenue billed per month</p>
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
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(216,64,42,0.07)" }} />
                <Bar
                  dataKey="revenue"
                  fill={barFill1}
                  radius={[2, 2, 0, 0]}
                />
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d8402a" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#d8402a" stopOpacity={0.55} />
                  </linearGradient>
                  <linearGradient id="revenueGradDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f2603f" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#f2603f" stopOpacity={0.55} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Client Growth Line Chart */}
        <Card className="p-6 border border-line rounded-sm space-y-5">
          <div className="space-y-0.5">
            <h3 className="font-display text-sm text-ink uppercase tracking-wide">Client Growth</h3>
            <p className="text-xs text-faint">Cumulative registered clients per month</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
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
                  allowDecimals={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(216,64,42,0.3)", strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="totalUsers"
                  name="total clients"
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
        <Card className="lg:col-span-2 p-6 border border-line rounded-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <h3 className="font-display text-sm text-ink uppercase tracking-wide">Quote Submissions vs Approvals</h3>
              <p className="text-xs text-faint">Weekly quote conversion funnel</p>
            </div>
            <div className="flex gap-4 text-xs font-mono text-muted shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-muted" />
                Submitted
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
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
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(216,64,42,0.07)" }} />
                <Bar dataKey="submitted" fill={isDark ? "#948b7d" : "#776f64"} radius={[2, 2, 0, 0]} />
                <Bar dataKey="approved" fill={isDark ? "#f2603f" : "#d8402a"} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
}
