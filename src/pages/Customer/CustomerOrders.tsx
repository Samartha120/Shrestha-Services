import { useEffect, useState } from "react";
import { getMockDb } from "@/utils/mockDb";
import { useAuthStore } from "@/store/authStore";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/common/Button";
import Dialog from "@/components/ui/Dialog";
import { Link } from "react-router-dom";
import { Package, Truck, Printer, FileText, CheckCircle2 } from "lucide-react";

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
        // Return orders for current user or all if admin, filter appropriately
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

    if (user) {
      fetchOrders();
    }
  }, [user]);

  // Order status steps helper
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
    { label: "Approved", icon: CheckCircle2 },
    { label: "Design Verified", icon: FileText },
    { label: "Printing Line", icon: Printer },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: Package },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-100">Orders</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Your Printing Orders</h1>
        <p className="text-sm text-slate-500">
          Monitor manufacturing status, design verifications, and delivery updates.
        </p>
      </div>

      {/* List */}
      <Card className="border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">Retrieving active orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-16 text-center text-slate-450 text-sm space-y-2">
            <Package size={44} className="mx-auto text-slate-300" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">No printing orders</p>
            <p className="text-xs">Once your quote requests are approved and paid, they will appear here as orders.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                  <th className="p-4 font-semibold text-slate-500">Order Number</th>
                  <th className="p-4 font-semibold text-slate-500">Customer Name</th>
                  <th className="p-4 font-semibold text-slate-500">Total Price</th>
                  <th className="p-4 font-semibold text-slate-500">Print Status</th>
                  <th className="p-4 font-semibold text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/30">
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100">{o.orderNumber}</td>
                    <td className="p-4">{o.customerName}</td>
                    <td className="p-4 font-semibold">NPR {o.totalAmount}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          o.status === "Delivered"
                            ? "success"
                            : o.status === "Printing"
                            ? "primary"
                            : "warning"
                        }
                      >
                        {o.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Track Progress
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
          title={`Order Tracking - ${selectedOrder.orderNumber}`}
        >
          <div className="space-y-6 pt-4 text-sm">
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-150/40 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-400">Order Value</p>
                <p className="text-lg font-bold mt-0.5">NPR {selectedOrder.totalAmount}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Status</p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{selectedOrder.status}</p>
              </div>
            </div>

            {/* Tracking Steps Visualizer */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Production Line Progress</h4>
              
              <div className="relative pl-6 space-y-6">
                {/* Timeline Line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />

                {steps.map((st, idx) => {
                  const currentStep = getStatusStep(selectedOrder.status);
                  const isCompleted = idx + 1 < currentStep;
                  const isActive = idx + 1 === currentStep;
                  const Icon = st.icon;

                  return (
                    <div key={idx} className="flex items-start gap-4 relative">
                      {/* Circle Dot */}
                      <div
                        className={`absolute -left-[23px] h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 bg-white dark:bg-slate-950 transition-colors ${
                          isCompleted
                            ? "border-emerald-500 bg-emerald-50 text-emerald-500"
                            : isActive
                            ? "border-blue-600 bg-blue-50 text-blue-600 animate-pulse"
                            : "border-slate-200 dark:border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className={`h-1.5 w-1.5 rounded-full ${isCompleted ? "bg-emerald-500" : isActive ? "bg-blue-600" : "bg-transparent"}`} />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4.5 w-4.5 shrink-0 ${isCompleted ? "text-emerald-500" : isActive ? "text-blue-600" : "text-slate-400"}`} />
                        <div>
                          <p className={`font-semibold ${isActive ? "text-slate-900 dark:text-white" : isCompleted ? "text-slate-700 dark:text-slate-350" : "text-slate-400"}`}>
                            {st.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
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
