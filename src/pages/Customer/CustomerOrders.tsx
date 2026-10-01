import { useEffect, useState } from "react";
import { ordersApi } from "@/services/ordersApi";
import { useAuthStore } from "@/store/authStore";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/common/Button";
import Dialog from "@/components/ui/Dialog";
import { Link } from "react-router-dom";
import { Package, Truck, Printer, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function CustomerOrders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    setError(false);
    try {
      // Backend scopes /orders to the authenticated user (customers get their
      // own orders, admins get all), so one call covers both roles.
      const userOrders = await ordersApi.getAll();
      setOrders(userOrders);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return 1;
      case "approved": return 2;
      case "printing": return 3;
      case "shipped": return 4;
      case "delivered": return 5;
      default: return 1;
    }
  };

  const steps = [
    { label: "Approved", sublabel: "Order confirmed & queued", icon: CheckCircle2 },
    { label: "Design Verified", sublabel: "Artwork prepress check passed", icon: FileText },
    { label: "Printing Line", sublabel: "In-production on press", icon: Printer },
    { label: "Shipped", sublabel: "Dispatched for delivery", icon: Truck },
    { label: "Delivered", sublabel: "Order complete", icon: Package },
  ];

  const getOrderStatusVariant = (status: string) => {
    if (status === "Delivered") return "success";
    if (status === "Printing") return "primary";
    if (status === "Shipped") return "primary";
    return "warning";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted">
          <Link to="/my-dashboard" className="hover:underline hover:text-ink transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-ink">Orders</span>
        </div>
        <h1 className="font-display text-2xl tracking-tight text-ink">Your Printing Orders</h1>
        <p className="text-sm text-muted">
          Monitor manufacturing status, design verifications, and delivery updates.
        </p>
      </div>

      {/* Orders Table */}
      <Card className="border border-line rounded-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="h-7 w-7 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            <p className="text-sm text-muted">Retrieving active orders...</p>
          </div>
        ) : error ? (
          <div className="p-16 text-center space-y-4">
            <div>
              <p className="font-semibold text-err">Couldn't load your orders.</p>
              <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
                There was a problem reaching the server. Please check your
                connection and try again.
              </p>
            </div>
            <Button variant="outline" onClick={fetchOrders}>
              Try again
            </Button>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="h-16 w-16 rounded-sm bg-accent-soft flex items-center justify-center mx-auto">
              <Package size={28} className="text-accent" />
            </div>
            <div>
              <p className="font-semibold text-ink">No printing orders yet</p>
              <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
                Once your quote requests are approved and paid, they will appear here as orders.
              </p>
            </div>
            <Link
              to="/quote"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline mt-2"
            >
              Request a quote <ArrowRight size={12} />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-paper-dim border-b border-line">
                  <th className="p-4 text-xs font-mono text-muted uppercase tracking-wide">Order #</th>
                  <th className="p-4 text-xs font-mono text-muted uppercase tracking-wide">Customer</th>
                  <th className="p-4 text-xs font-mono text-muted uppercase tracking-wide">Total</th>
                  <th className="p-4 text-xs font-mono text-muted uppercase tracking-wide">Status</th>
                  <th className="p-4 text-xs font-mono text-muted uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-paper-dim transition-colors">
                    <td className="p-4 font-bold text-ink font-mono text-xs">{o.orderNumber}</td>
                    <td className="p-4 font-medium text-ink-soft">{o.customerName}</td>
                    <td className="p-4 font-semibold text-ink">NPR {o.totalAmount?.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant={getOrderStatusVariant(o.status)}>{o.status}</Badge>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                      >
                        Track Progress <ArrowRight size={11} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Order Tracking Modal */}
      {selectedOrder && (
        <Dialog
          open={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Production Tracker — ${selectedOrder.orderNumber}`}
        >
          <div className="space-y-6 pt-4 text-sm">

            {/* Summary strip */}
            <div className="flex items-center justify-between bg-paper-dim p-4 rounded-sm border border-line">
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-wide">Order Value</p>
                <p className="text-xl font-extrabold text-ink mt-0.5">NPR {selectedOrder.totalAmount?.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-muted uppercase tracking-wide">Current Status</p>
                <Badge variant={getOrderStatusVariant(selectedOrder.status)} className="mt-1">
                  {selectedOrder.status}
                </Badge>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-muted uppercase tracking-wide">Production Line Progress</p>

              <div className="relative pl-7 space-y-5">
                {/* Vertical line */}
                <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-line-strong rounded-full" />

                {steps.map((st, idx) => {
                  const currentStep = getStatusStep(selectedOrder.status);
                  const isCompleted = idx + 1 < currentStep;
                  const isActive = idx + 1 === currentStep;
                  const Icon = st.icon;

                  return (
                    <div key={idx} className="flex items-start gap-3 relative">
                      {/* Step dot */}
                      <div
                        className={`absolute -left-[23px] h-5 w-5 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 ${
                          isCompleted
                            ? "border-ok bg-accent-soft"
                            : isActive
                            ? "border-accent bg-accent-soft"
                            : "border-line bg-surface"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={11} className="text-ok" />
                        ) : isActive ? (
                          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-faint" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex items-center gap-3 pb-1">
                        <div
                          className={`h-8 w-8 rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                            isCompleted
                              ? "bg-accent-soft text-ok"
                              : isActive
                              ? "bg-accent-soft text-accent"
                              : "bg-paper-dim text-muted"
                          }`}
                        >
                          <Icon size={15} />
                        </div>
                        <div>
                          <p className={`font-bold text-xs ${isActive ? "text-ink" : isCompleted ? "text-ink-soft" : "text-muted"}`}>
                            {st.label}
                          </p>
                          <p className={`text-[10px] mt-0.5 ${isActive ? "text-accent" : "text-muted"}`}>
                            {st.sublabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-line">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close Tracker
              </Button>
            </div>
          </div>
        </Dialog>
      )}

    </div>
  );
}
