import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    useEffect(() => {
        const fetchOrders = () => {
            setLoading(true);
            try {
                const db = getMockDb();
                const userOrders = db.orders.filter((o) => o.customerName.includes(user?.name || "") || user?.role === "admin");
                setOrders(userOrders);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        if (user)
            fetchOrders();
    }, [user]);
    const getStatusStep = (status) => {
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
    const getOrderStatusVariant = (status) => {
        if (status === "Delivered")
            return "success";
        if (status === "Printing")
            return "primary";
        if (status === "Shipped")
            return "primary";
        return "warning";
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400", children: [_jsx(Link, { to: "/dashboard", className: "hover:underline hover:text-slate-700 dark:hover:text-slate-200 transition-colors", children: "Dashboard" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-slate-900 dark:text-slate-100", children: "Orders" })] }), _jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Your Printing Orders" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Monitor manufacturing status, design verifications, and delivery updates." })] }), _jsx(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden", children: loading ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", children: [_jsx("div", { className: "h-7 w-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" }), _jsx("p", { className: "text-sm text-slate-500", children: "Retrieving active orders..." })] })) : orders.length === 0 ? (_jsxs("div", { className: "p-16 text-center space-y-4", children: [_jsx("div", { className: "h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto", children: _jsx(Package, { size: 28, className: "text-slate-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-700 dark:text-slate-300", children: "No printing orders yet" }), _jsx("p", { className: "text-xs text-slate-400 mt-1 max-w-xs mx-auto", children: "Once your quote requests are approved and paid, they will appear here as orders." })] }), _jsxs(Link, { to: "/quote", className: "inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-2", children: ["Request a quote ", _jsx(ArrowRight, { size: 12 })] })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800", children: [_jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Order #" }), _jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Customer" }), _jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Total" }), _jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800/70", children: orders.map((o) => (_jsxs("tr", { className: "hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors", children: [_jsx("td", { className: "p-4 font-bold text-slate-900 dark:text-slate-100 font-mono text-xs", children: o.orderNumber }), _jsx("td", { className: "p-4 font-medium text-slate-700 dark:text-slate-300", children: o.customerName }), _jsxs("td", { className: "p-4 font-semibold text-slate-900 dark:text-white", children: ["NPR ", o.totalAmount?.toLocaleString()] }), _jsx("td", { className: "p-4", children: _jsx(Badge, { variant: getOrderStatusVariant(o.status), children: o.status }) }), _jsx("td", { className: "p-4", children: _jsxs("button", { onClick: () => setSelectedOrder(o), className: "inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline", children: ["Track Progress ", _jsx(ArrowRight, { size: 11 })] }) })] }, o.id))) })] }) })) }), selectedOrder && (_jsx(Dialog, { open: !!selectedOrder, onClose: () => setSelectedOrder(null), title: `Production Tracker — ${selectedOrder.orderNumber}`, children: _jsxs("div", { className: "space-y-6 pt-4 text-sm", children: [_jsxs("div", { className: "flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-semibold text-slate-400 uppercase tracking-wider", children: "Order Value" }), _jsxs("p", { className: "text-xl font-extrabold text-slate-900 dark:text-white mt-0.5", children: ["NPR ", selectedOrder.totalAmount?.toLocaleString()] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-[10px] font-semibold text-slate-400 uppercase tracking-wider", children: "Current Status" }), _jsx(Badge, { variant: getOrderStatusVariant(selectedOrder.status), className: "mt-1", children: selectedOrder.status })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider", children: "Production Line Progress" }), _jsxs("div", { className: "relative pl-7 space-y-5", children: [_jsx("div", { className: "absolute left-[10px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700/60 rounded-full" }), steps.map((st, idx) => {
                                            const currentStep = getStatusStep(selectedOrder.status);
                                            const isCompleted = idx + 1 < currentStep;
                                            const isActive = idx + 1 === currentStep;
                                            const Icon = st.icon;
                                            return (_jsxs("div", { className: "flex items-start gap-3 relative", children: [_jsx("div", { className: `absolute -left-[23px] h-5 w-5 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 ${isCompleted
                                                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                                                            : isActive
                                                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
                                                                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950"}`, children: isCompleted ? (_jsx(CheckCircle2, { size: 11, className: "text-emerald-500" })) : isActive ? (_jsx("div", { className: "h-2 w-2 rounded-full bg-blue-500 animate-pulse" })) : (_jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" })) }), _jsxs("div", { className: "flex items-center gap-3 pb-1", children: [_jsx("div", { className: `h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isCompleted
                                                                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500"
                                                                    : isActive
                                                                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600"
                                                                        : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`, children: _jsx(Icon, { size: 15 }) }), _jsxs("div", { children: [_jsx("p", { className: `font-bold text-xs ${isActive ? "text-slate-900 dark:text-white" : isCompleted ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}`, children: st.label }), _jsx("p", { className: `text-[10px] mt-0.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`, children: st.sublabel })] })] })] }, idx));
                                        })] })] }), _jsx("div", { className: "flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800", children: _jsx(Button, { variant: "outline", onClick: () => setSelectedOrder(null), children: "Close Tracker" }) })] }) }))] }));
}
