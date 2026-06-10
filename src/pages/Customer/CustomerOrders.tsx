import { useEffect, useState } from "react";
import { getMockDb } from "@/utils/mockDb";
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
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    const fetchOrders = () => {
      setLoading(true);
      try {
        const db = getMockDb();
        const userOrders = db.orders.filter(
          (o) => o.customerName.includes(user?.name || "") || user?.role === "admin"
        );
        setOrders(userOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
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
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link to="/dashboard" className="hover:underline hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-100">Orders</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Your Printing Orders</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Monitor manufacturing status, design verifications, and delivery updates.
        </p>
      </div>

      {/* Orders Table */}
      <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="h-7 w-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            <p className="text-sm text-slate-500">Retrieving active orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
              <Package size={28} className="text-slate-400" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">No printing orders yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Once your quote requests are approved and paid, they will appear here as orders.
              </p>
            </div>
            <Link
              to="/quote"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Request a quote <ArrowRight size={12} />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800">
                  <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order #</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100 font-mono text-xs">{o.orderNumber}</td>
                    <td className="p-4 font-medium text-slate-700 dark:text-slate-300">{o.customerName}</td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">NPR {o.totalAmount?.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant={getOrderStatusVariant(o.status)}>{o.status}</Badge>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
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
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Order Value</p>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">NPR {selectedOrder.totalAmount?.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Current Status</p>
                <Badge variant={getOrderStatusVariant(selectedOrder.status)} className="mt-1">
                  {selectedOrder.status}
                </Badge>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="space-y-3">
              <p className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Production Line Progress</p>

              <div className="relative pl-7 space-y-5">
                {/* Vertical line */}
                <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700/60 rounded-full" />

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
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                            : isActive
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={11} className="text-emerald-500" />
                        ) : isActive ? (
                          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex items-center gap-3 pb-1">
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isCompleted
                              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500"
                              : isActive
                              ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          }`}
                        >
                          <Icon size={15} />
                        </div>
                        <div>
                          <p className={`font-bold text-xs ${isActive ? "text-slate-900 dark:text-white" : isCompleted ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}`}>
                            {st.label}
                          </p>
                          <p className={`text-[10px] mt-0.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}>
                            {st.sublabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
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
