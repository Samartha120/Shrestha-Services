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
  const { quotes, fetchQuotesByEmail, isLoading, error } = useQuoteStore();
  const { notifications, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    if (user?.email) {
      fetchQuotesByEmail(user.email);
    }
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const pendingQuotes = quotes.filter((q) => q.status === "Pending");
  const approvedQuotes = quotes.filter((q) => q.status === "Approved");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Bar */}
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center bg-ink rounded-sm p-8 md:p-10 text-inverse overflow-hidden border border-line-strong">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--inverse) 1px, transparent 1px)",
            backgroundSize: "48px 100%",
          }}
        />
        <span aria-hidden className="absolute right-8 top-0 h-full w-px bg-accent/40" />

        <div className="space-y-2 relative z-10">
          <span className="text-[10px] bg-accent-soft text-accent font-mono uppercase tracking-wide px-3 py-1 rounded-full border border-accent">
            Client Portal
          </span>
          <h1 className="font-display text-3xl tracking-tight mt-2 text-inverse">
            Hello, {user?.name || "Client"}
          </h1>
          <p className="text-inverse/70 text-sm max-w-xl leading-relaxed">
            Welcome back to Shrestha Services. Easily monitor your print orders, manage flex banner dimensions, and review graphic layout estimates.
          </p>
        </div>

        <Link
          to="/quote"
          className="mt-6 md:mt-0 flex items-center gap-2 bg-accent hover:bg-accent-hover text-accent-ink text-sm font-bold px-6 py-3.5 rounded-full transition-all shrink-0 relative z-10"
        >
          <Plus size={16} />
          New Quote Request
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border border-line rounded-sm flex items-center gap-4 transition-all duration-300">
          <div className="h-12 w-12 rounded-sm bg-accent-soft text-accent flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wide">Total Quote Orders</p>
            <p className="text-3xl font-display mt-1 text-ink">{quotes.length}</p>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm flex items-center gap-4 transition-all duration-300">
          <div className="h-12 w-12 rounded-sm bg-accent-soft text-warn flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wide">Pending Estimations</p>
            <p className="text-3xl font-display mt-1 text-ink">{pendingQuotes.length}</p>
          </div>
        </Card>

        <Card className="p-6 border border-line rounded-sm flex items-center gap-4 transition-all duration-300">
          <div className="h-12 w-12 rounded-sm bg-accent-soft text-ok flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wide">Approved Layouts</p>
            <p className="text-3xl font-display mt-1 text-ink">{approvedQuotes.length}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Quotes Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-xl tracking-tight text-ink">Recent Quote Requests</h3>
            <Link to="/my-dashboard/quotes" className="text-xs font-bold text-accent flex items-center gap-0.5 hover:underline">
              View All Quotes <ChevronRight size={14} />
            </Link>
          </div>

          <Card className="border border-line rounded-sm overflow-hidden">
            {isLoading ? (
              <div className="p-16 text-center text-sm font-semibold text-muted">Loading layout quotes...</div>
            ) : error ? (
              <div className="p-16 text-center text-muted space-y-4">
                <FileText size={48} className="mx-auto text-faint" />
                <p className="font-bold text-base text-err">Couldn't load your quotes.</p>
                <p className="text-xs max-w-sm mx-auto leading-relaxed text-muted">
                  There was a problem reaching the server. Please check your connection and try again.
                </p>
                <button
                  onClick={() => user?.email && fetchQuotesByEmail(user.email)}
                  className="inline-flex items-center gap-1.5 border border-line-strong hover:border-accent hover:text-accent text-ink font-semibold px-4 py-2.5 rounded-full text-xs transition-colors"
                >
                  Try again
                </button>
              </div>
            ) : quotes.length === 0 ? (
              <div className="p-16 text-center text-muted space-y-4">
                <FileText size={48} className="mx-auto text-faint" />
                <p className="font-bold text-base text-ink">No quote requests submitted yet.</p>
                <p className="text-xs max-w-sm mx-auto leading-relaxed text-muted">
                  Submit a custom flex design layout or banner dimensions to get a detailed pricing estimate.
                </p>
                <Link to="/quote" className="inline-flex items-center gap-1 bg-ink hover:bg-accent-hover text-inverse font-semibold px-4 py-2.5 rounded-full text-xs transition-colors">
                  Submit Estimation Request <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-paper-dim border-b border-line">
                      <th className="p-4 font-mono text-muted uppercase tracking-wide text-[11px]">Quote ID</th>
                      <th className="p-4 font-mono text-muted uppercase tracking-wide text-[11px]">Dimensions (WxH)</th>
                      <th className="p-4 font-mono text-muted uppercase tracking-wide text-[11px]">Material</th>
                      <th className="p-4 font-mono text-muted uppercase tracking-wide text-[11px]">Price Estimate</th>
                      <th className="p-4 font-mono text-muted uppercase tracking-wide text-[11px]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {quotes.slice(0, 5).map((q) => (
                      <tr key={q.id} className="hover:bg-paper-dim transition-colors">
                        <td className="p-4 font-bold text-ink">{q.id}</td>
                        <td className="p-4 text-ink-soft font-medium">{q.width} x {q.height} ft</td>
                        <td className="p-4 text-ink-soft truncate max-w-[150px] font-semibold">{q.material}</td>
                        <td className="p-4 font-bold text-ink">NPR {q.estimatedPrice}</td>
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
            <Link to="/my-dashboard/files" className="group flex items-center justify-between p-5 rounded-sm border border-line bg-surface hover:bg-paper-dim transition-all">
              <span className="flex items-center gap-3">
                <span className="p-2.5 rounded-sm bg-accent-soft text-accent"><Upload size={18} /></span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-ink">Design Uploads</span>
                  <span className="text-[10px] text-muted">Upload print-ready assets</span>
                </span>
              </span>
              <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/my-dashboard/profile" className="group flex items-center justify-between p-5 rounded-sm border border-line bg-surface hover:bg-paper-dim transition-all">
              <span className="flex items-center gap-3">
                <span className="p-2.5 rounded-sm bg-accent-soft text-accent"><UserCog size={18} /></span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-ink">Portal Settings</span>
                  <span className="text-[10px] text-muted">Update company & PAN/VAT</span>
                </span>
              </span>
              <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Quick Actions & Notifications Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl tracking-tight text-ink flex items-center gap-2">
              <Bell size={20} className="text-accent" /> System Alerts
            </h3>
          </div>

          <Card className="border border-line rounded-sm p-6 space-y-4 bg-surface">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="flex gap-3.5 border-b border-line pb-4 last:border-b-0 last:pb-0">
                <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${!notif.read ? "bg-accent" : "bg-faint"}`} />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-ink leading-snug">{notif.title}</p>
                  <p className="text-xs text-ink-soft leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-xs text-muted text-center py-6">No recent alerts or notifications.</p>
            )}
          </Card>

          <Card className="border border-line rounded-sm p-6 space-y-4 bg-surface-2">
            <h4 className="font-display text-sm text-ink flex items-center gap-2">
              <HelpCircle size={18} className="text-accent" /> Need Printing Help?
            </h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              If you have custom layout specifications (roadside billboard sizes, acrylic glow structures, vehicle decals), please contact our design support team.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/contact" className="w-full text-center text-xs font-bold border border-line py-3 rounded-full hover:bg-paper-dim transition-colors text-ink-soft cursor-pointer">
                Contact Sales Support
              </Link>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
