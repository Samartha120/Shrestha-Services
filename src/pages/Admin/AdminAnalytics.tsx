import { useEffect, useState } from "react";
import { analyticsApi } from "@/services/analyticsApi";
import Card from "@/components/ui/Card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from "recharts";
import { Activity, BarChart3, Coins, Users } from "lucide-react";

export default function AdminAnalytics() {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [visitorData, setVisitorData] = useState<any[]>([]);
  const [quoteData, setQuoteData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const rev = await analyticsApi.getRevenueChartData();
        const vis = await analyticsApi.getVisitorChartData();
        const quo = await analyticsApi.getQuoteChartData();
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
    return <div className="p-12 text-center text-sm text-slate-500">Syncing analytics data...</div>;
  }

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Analytics Control</h1>
        <p className="text-sm text-slate-500 mt-1">
          Detailed metrics showing billing revenues, customer quotes, and portal visitors.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Coins size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Avg Order Value</p>
            <p className="text-lg font-bold">NPR 16,340</p>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <BarChart3 size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Conversion Rate</p>
            <p className="text-lg font-bold">42.8%</p>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Monthly Visitors</p>
            <p className="text-lg font-bold">8,432 Hits</p>
          </div>
        </Card>

        <Card className="p-5 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Activity size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active Inquiries</p>
            <p className="text-lg font-bold">14 Inbound</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Gross Revenue Monthly bar chart */}
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-250 uppercase tracking-wider">Monthly Invoices Issued</h3>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Visitors line chart */}
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-250 uppercase tracking-wider">Monthly Portal Visitors</h3>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quote conversion and submissions */}
        <Card className="lg:col-span-2 p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-250 uppercase tracking-wider">Quotes Submissions vs Approvals (Weekly)</h3>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quoteData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Bar dataKey="submitted" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

    </div>
  );
}
