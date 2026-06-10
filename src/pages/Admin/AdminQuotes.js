import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useQuoteStore } from "@/store/quoteStore";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { FileText, Check, X, FileType } from "lucide-react";
import { toast } from "sonner";
export default function AdminQuotes() {
    const { quotes, fetchQuotes, updateQuoteStatus, isLoading } = useQuoteStore();
    const [filter, setFilter] = useState("all");
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [priceOverride, setPriceOverride] = useState("");
    const [auditModalOpen, setAuditModalOpen] = useState(false);
    useEffect(() => {
        fetchQuotes();
    }, []);
    const handleAuditClick = (q) => {
        setSelectedQuote(q);
        setPriceOverride(q.estimatedPrice.toString());
        setAuditModalOpen(true);
    };
    const handleUpdateStatus = async (status) => {
        if (!selectedQuote)
            return;
        const finalPrice = priceOverride ? Number(priceOverride) : undefined;
        try {
            await updateQuoteStatus(selectedQuote.id, status, finalPrice);
            toast.success(`Quote status updated to ${status}`);
            setAuditModalOpen(false);
            setSelectedQuote(null);
        }
        catch (err) {
            toast.error("Failed to update status");
        }
    };
    const filteredQuotes = quotes.filter((q) => {
        if (filter === "all")
            return true;
        return q.status.toLowerCase() === filter.toLowerCase();
    });
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Quote Requests" }), _jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Review layout design specs, override pricing calculators, and dispatch approvals." })] }), _jsx("div", { className: "flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3", children: ["all", "pending", "approved", "rejected"].map((tab) => (_jsx("button", { onClick: () => setFilter(tab), className: `px-4 py-2 text-xs font-bold rounded-xl transition-all capitalize ${filter === tab
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"}`, children: tab }, tab))) }), _jsx(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden", children: isLoading ? (_jsx("div", { className: "p-12 text-center text-sm text-slate-500", children: "Syncing quotes catalog..." })) : filteredQuotes.length === 0 ? (_jsxs("div", { className: "p-16 text-center text-slate-450 text-sm space-y-2", children: [_jsx(FileText, { size: 44, className: "mx-auto text-slate-300" }), _jsx("p", { className: "font-semibold text-slate-700 dark:text-slate-300", children: "No quotes found" }), _jsxs("p", { className: "text-xs", children: ["There are no quotes matching the filter status \"", filter, "\"."] })] })) : (_jsx("div", { className: "overflow-x-auto text-sm", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800", children: [_jsx("th", { className: "p-4 font-semibold text-slate-500", children: "ID" }), _jsx("th", { className: "p-4 font-semibold text-slate-500", children: "Client Info" }), _jsx("th", { className: "p-4 font-semibold text-slate-500", children: "Dimensions (WxH)" }), _jsx("th", { className: "p-4 font-semibold text-slate-500", children: "Material Choice" }), _jsx("th", { className: "p-4 font-semibold text-slate-500", children: "Price Quote" }), _jsx("th", { className: "p-4 font-semibold text-slate-500", children: "Status" }), _jsx("th", { className: "p-4 font-semibold text-slate-500 text-right", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: filteredQuotes.map((q) => (_jsxs("tr", { className: "hover:bg-slate-50/50 dark:hover:bg-slate-900/30", children: [_jsx("td", { className: "p-4 font-bold", children: q.id }), _jsx("td", { className: "p-4", children: _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-900 dark:text-white", children: q.customerName }), _jsxs("p", { className: "text-xs text-slate-500 mt-0.5", children: [q.email, " \u2022 ", q.phone] })] }) }), _jsxs("td", { className: "p-4", children: [q.width, " x ", q.height, " ft"] }), _jsx("td", { className: "p-4 truncate max-w-[150px]", children: q.material }), _jsxs("td", { className: "p-4 font-semibold", children: ["NPR ", q.estimatedPrice] }), _jsx("td", { className: "p-4", children: _jsx(Badge, { variant: q.status === "Approved"
                                                    ? "success"
                                                    : q.status === "Pending"
                                                        ? "warning"
                                                        : "danger", children: q.status }) }), _jsx("td", { className: "p-4 text-right", children: _jsx("button", { onClick: () => handleAuditClick(q), className: "text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline", children: "Audit specs" }) })] }, q.id))) })] }) })) }), auditModalOpen && selectedQuote && (_jsx(Dialog, { open: auditModalOpen, onClose: () => setAuditModalOpen(false), title: `Quote Spec Audit - ${selectedQuote.id}`, children: _jsxs("div", { className: "space-y-6 pt-4 text-sm", children: [_jsxs("div", { className: "grid grid-cols-2 gap-y-4 gap-x-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-slate-400", children: "Client Name" }), _jsx("p", { className: "font-bold text-slate-800 dark:text-slate-200 mt-0.5", children: selectedQuote.customerName })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-slate-400", children: "Contact" }), _jsx("p", { className: "font-bold text-slate-800 dark:text-slate-200 mt-0.5", children: selectedQuote.phone })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-slate-400", children: "Dimensions" }), _jsxs("p", { className: "font-bold text-slate-800 dark:text-slate-200 mt-0.5", children: [selectedQuote.width, " x ", selectedQuote.height, " ft"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-slate-400", children: "Material" }), _jsx("p", { className: "font-bold text-slate-800 dark:text-slate-200 mt-0.5", children: selectedQuote.material })] })] }), selectedQuote.notes && (_jsxs("div", { className: "bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-150/40 dark:border-slate-800", children: [_jsx("p", { className: "text-xs font-semibold text-slate-400", children: "Specifications Notes:" }), _jsxs("p", { className: "text-slate-700 dark:text-slate-350 mt-1 italic", children: ["\"", selectedQuote.notes, "\""] })] })), selectedQuote.fileUrl && (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800", children: [_jsx(FileType, { className: "h-8 w-8 text-blue-600 shrink-0" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "font-bold text-slate-800 dark:text-slate-200 truncate", children: selectedQuote.fileUrl }), _jsxs("p", { className: "text-xs text-slate-500", children: [selectedQuote.fileWeight || "Unknown size", " \u2022 ", selectedQuote.fileType || "PDF / Layout"] })] })] })), _jsxs("div", { className: "space-y-2 pt-2", children: [_jsx("label", { className: "text-sm font-semibold", children: "Override Estimated Price (NPR)" }), _jsx(Input, { type: "number", value: priceOverride, onChange: (e) => setPriceOverride(e.target.value), placeholder: "NPR 0" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "danger", leftIcon: _jsx(X, { size: 14 }), onClick: () => handleUpdateStatus("Rejected"), children: "Reject Quote" }), _jsx(Button, { variant: "primary", leftIcon: _jsx(Check, { size: 14 }), onClick: () => handleUpdateStatus("Approved"), children: "Approve Quote" })] }), _jsx(Button, { variant: "outline", onClick: () => setAuditModalOpen(false), children: "Cancel Audit" })] })] }) }))] }));
}
