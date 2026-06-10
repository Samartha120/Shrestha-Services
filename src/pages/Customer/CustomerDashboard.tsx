import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useQuoteStore } from "@/store/quoteStore";
import { useNotificationStore } from "@/store/notificationStore";
import { FileText, Plus, Clock, CheckCircle2, ChevronRight, Bell, HelpCircle, ArrowRight, Upload, UserCog } from "lucide-react";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Bar */}
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-8 md:p-10 text-white shadow-xl overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 h-64 w-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-2xl" />
        
        <div className="space-y-2 relative z-10">
          <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30">
            Client Portal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-2 text-white">
            Hello, {user?.name || "Client"}
          </h1>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Welcome back to Shrestha Services. Easily monitor your print orders, manage flex banner dimensions, and review graphic layout estimates.
          </p>
        </div>
        
        <Link
          to="/quote"
          className="mt-6 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 shrink-0 relative z-10"
        >
          <Plus size={16} />
          New Quote Request
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Quote Orders</p>
            <p className="text-3xl font-extrabold mt-1 text-slate-900 dark:text-white">{quotes.length}</p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
          <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Estimations</p>
            <p className="text-3xl font-extrabold mt-1 text-slate-900 dark:text-white">{pendingQuotes.length}</p>
          </div>
        </Card>

        <Card className="p-6 border border-slate-200/80 dark:border-slate-800 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Approved Layouts</p>
            <p className="text-3xl font-extrabold mt-1 text-slate-900 dark:text-white">{approvedQuotes.length}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Quotes Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Recent Quote Requests</h3>
            <Link to="/dashboard/quotes" className="text-xs font-bold text-blue-650 dark:text-blue-400 flex items-center gap-0.5 hover:underline">
              View All Quotes <ChevronRight size={14} />
            </Link>
          </div>

          <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="p-16 text-center text-sm font-semibold text-slate-500">Loading layout quotes...</div>
            ) : quotes.length === 0 ? (
              <div className="p-16 text-center text-slate-500 dark:text-slate-450 space-y-4">
                <FileText size={48} className="mx-auto text-slate-350 dark:text-slate-600" />
                <p className="font-bold text-base">No quote requests submitted yet.</p>
                <p className="text-xs max-w-sm mx-auto leading-relaxed text-slate-400">
                  Submit a custom flex design layout or banner dimensions to get a detailed pricing estimate.
                </p>
                <Link to="/quote" className="inline-flex items-center gap-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold px-4 py-2.5 rounded-xl text-xs hover:opacity-90">
                  Submit Estimation Request <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800">
                      <th className="p-4 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">Quote ID</th>
                      <th className="p-4 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">Dimensions (WxH)</th>
                      <th className="p-4 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">Material</th>
                      <th className="p-4 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">Price Estimate</th>
                      <th className="p-4 font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                    {quotes.slice(0, 5).map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                        <td className="p-4 font-bold text-slate-950 dark:text-slate-50">{q.id}</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{q.width} x {q.height} ft</td>
                        <td className="p-4 text-slate-750 dark:text-slate-300 truncate max-w-[150px] font-semibold">{q.material}</td>
                        <td className="p-4 font-bold text-slate-950 dark:text-slate-50">NPR {q.estimatedPrice}</td>
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

          {/* Quick Portal Action Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/files" className="group flex items-center justify-between p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all shadow-sm">
              <span className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"><Upload size={18} /></span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Design Uploads</span>
                  <span className="text-[10px] text-slate-400">Upload print-ready assets</span>
                </span>
              </span>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/dashboard/profile" className="group flex items-center justify-between p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all shadow-sm">
              <span className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400"><UserCog size={18} /></span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Portal Settings</span>
                  <span className="text-[10px] text-slate-400">Update company & PAN/VAT</span>
                </span>
              </span>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Quick Actions & Notifications Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Bell size={20} className="text-blue-600" /> System Alerts
            </h3>
          </div>
          
          <Card className="border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 shadow-sm bg-white dark:bg-slate-900/60">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="flex gap-3.5 border-b border-slate-100 dark:border-slate-850 pb-4 last:border-b-0 last:pb-0">
                <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${!notif.read ? "bg-blue-600 shadow-md shadow-blue-500" : "bg-slate-300 dark:bg-slate-700"}`} />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{notif.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-xs text-slate-450 text-center py-6">No recent alerts or notifications.</p>
            )}
          </Card>

          <Card className="border border-slate-200/80 dark:border-slate-800 p-6 space-y-4 shadow-sm bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900/65 dark:to-slate-900/25">
            <h4 className="font-extrabold text-sm text-slate-950 dark:text-white flex items-center gap-2">
              <HelpCircle size={18} className="text-indigo-650" /> Need Printing Help?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
              If you have custom layout specifications (roadside billboard sizes, acrylic glow structures, vehicle decals), please contact our design support team.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/contact" className="w-full text-center text-xs font-bold border border-slate-250 dark:border-slate-800 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-200 cursor-pointer">
                Contact Sales Support
              </Link>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
