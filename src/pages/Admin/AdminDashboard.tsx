import { useEffect, useState } from "react";
import { analyticsApi } from "@/services/analyticsApi";
import { getMockDb } from "@/utils/mockDb";
import {
  TrendingUp,
  DollarSign,
  FileText,
  Users,
  Layers,
  ShieldAlert,
  Clock,
  Printer
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import Card from "@/components/ui/Card";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [pendingQuotes, setPendingQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const COLORS = ["#3b82f6", "#6366f1", "#06b6d4", "#10b981"];

  if (loading) {
    return (
      <div className="p-12 text-center text-sm text-slate-500">
        Syncing admin intelligence center database...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time metrics, printing shop sales, and system activity records.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <DollarSign size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross Income</p>
            <p className="text-2xl font-bold mt-0.5 truncate">NPR {stats?.totalRevenue}</p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quote Orders</p>
            <p className="text-2xl font-bold mt-0.5 truncate">{stats?.totalQuotes}</p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Registered Clients</p>
            <p className="text-2xl font-bold mt-0.5 truncate">{stats?.totalCustomers}</p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Layers size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Flex Machinery</p>
            <p className="text-2xl font-bold mt-0.5 truncate">{stats?.totalServices} Lines</p>
          </div>
        </Card>
      </div>

      {/* Recharts Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Area Chart */}
        <Card className="lg:col-span-2 p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-250 uppercase tracking-wider">Revenue Stream Timeline</h3>
            <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
              <TrendingUp size={14} /> +18.5% Growth
            </span>
          </div>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Services Share Pie Chart */}
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-250 uppercase tracking-wider">Service Share Breakdowns</h3>
          <div className="h-56 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <Printer className="h-6 w-6 text-slate-450 dark:text-slate-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {serviceData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="text-slate-500 truncate">{item.name}</span>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pending Quotes Action Table */}
        <Card className="lg:col-span-2 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-amber-500" /> Pending Quotes Audit
            </h3>
            <Link to="/admin/quotes" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              View All Quotes
            </Link>
          </div>
          
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                  <th className="p-4 font-semibold text-slate-500">ID</th>
                  <th className="p-4 font-semibold text-slate-500">Customer</th>
                  <th className="p-4 font-semibold text-slate-500">Material Specs</th>
                  <th className="p-4 font-semibold text-slate-500">Price Estimate</th>
                  <th className="p-4 font-semibold text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {pendingQuotes.slice(0, 4).map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-4 font-bold">{q.id}</td>
                    <td className="p-4">{q.customerName}</td>
                    <td className="p-4 truncate max-w-[150px]">{q.material}</td>
                    <td className="p-4 font-semibold">NPR {q.estimatedPrice}</td>
                    <td className="p-4">
                      <Link to="/admin/quotes" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        Audit
                      </Link>
                    </td>
                  </tr>
                ))}
                {pendingQuotes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      All quotes are audited and processed!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Activity Logs Timeline */}
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-850 dark:text-slate-250 uppercase tracking-wider">System Activity Log</h3>
          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-3 relative pb-1">
                <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
                    <span className="font-bold">{act.user}</span>: {act.action}
                  </p>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
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
