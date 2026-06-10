import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useQuoteStore } from "@/store/quoteStore";
import { useNotificationStore } from "@/store/notificationStore";
import { FileText, Plus, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const { quotes, fetchQuotesByEmail, isLoading } = useQuoteStore();
  const { notifications, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    if (user?.email) {
      fetchQuotesByEmail(user.email);
    }
    fetchNotifications();
  }, [user]);

  const pendingQuotes = quotes.filter((q) => q.status === "Pending");
  const approvedQuotes = quotes.filter((q) => q.status === "Approved");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Hello, {user?.name || "Client"}
          </h1>
          <p className="text-slate-400 text-sm">
            Welcome to Shrestha Services. Track your flex banners, acrylic boards, and signage print orders.
          </p>
        </div>
        <Link
          to="/quote"
          className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 shrink-0"
        >
          <Plus size={16} />
          Request New Quote
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Quotes</p>
            <p className="text-2xl font-bold mt-0.5">{quotes.length}</p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Approval</p>
            <p className="text-2xl font-bold mt-0.5">{pendingQuotes.length}</p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Approved Quotes</p>
            <p className="text-2xl font-bold mt-0.5">{approvedQuotes.length}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Quotes Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold tracking-tight">Recent Quote Requests</h3>
            <Link to="/dashboard/quotes" className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center text-sm text-slate-500">Loading your quotes...</div>
            ) : quotes.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm space-y-2">
                <FileText size={40} className="mx-auto text-slate-300" />
                <p>No quote requests submitted yet.</p>
                <p className="text-xs">Submit a custom print layout design to calculate estimated costs.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                      <th className="p-4 font-semibold text-slate-500">ID</th>
                      <th className="p-4 font-semibold text-slate-500">Dimensions (WxH)</th>
                      <th className="p-4 font-semibold text-slate-500">Material</th>
                      <th className="p-4 font-semibold text-slate-500">Price Estimate</th>
                      <th className="p-4 font-semibold text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {quotes.slice(0, 5).map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <td className="p-4 font-bold text-slate-900 dark:text-slate-100">{q.id}</td>
                        <td className="p-4">{q.width} x {q.height} ft</td>
                        <td className="p-4 truncate max-w-[150px]">{q.material}</td>
                        <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">NPR {q.estimatedPrice}</td>
                        <td className="p-4">
                          <Badge
                            variant={
                              q.status === "Approved"
                                ? "success"
                                : q.status === "Pending"
                                ? "warning"
                                : "danger"
                            }
                          >
                            {q.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions & Notifications Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold tracking-tight">System Notifications</h3>
          <Card className="border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 last:border-b-0 last:pb-0">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${!notif.read ? "bg-blue-600" : "bg-slate-350"}`} />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{notif.title}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">No recent alerts or notifications.</p>
            )}
          </Card>

          <Card className="border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Need Printing Help?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              If you have custom requirements (e.g. roadside billboards, large event backdrops, or multiple design files), get in touch directly.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/contact" className="w-full text-center text-xs font-semibold border border-slate-200 dark:border-slate-800 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                Contact Sales Support
              </Link>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
