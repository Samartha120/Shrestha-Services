import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useContactStore } from "@/store/contactStore";
import Card from "@/components/ui/Card";
import { Mail, Trash2, Phone, MessageSquare, ExternalLink, } from "lucide-react";
import { toast } from "sonner";
export default function AdminInquiries() {
    const { inquiries, fetchInquiries, deleteInquiry, isLoading } = useContactStore();
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    useEffect(() => {
        fetchInquiries();
    }, []);
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        setDeletingId(id);
        if (!confirm("Are you sure you want to delete this inquiry?")) {
            setDeletingId(null);
            return;
        }
        try {
            await deleteInquiry(id);
            toast.success("Inquiry deleted successfully");
            if (selectedInquiry?.id === id)
                setSelectedInquiry(null);
        }
        catch {
            toast.error("Failed to delete inquiry");
        }
        finally {
            setDeletingId(null);
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Customer Inquiries" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: "Review general messages, custom printing quotes, and sales consultation requests." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start", children: [_jsxs("div", { className: "lg:col-span-2 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Inbound Messages" }), inquiries.length > 0 && (_jsxs("span", { className: "text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full", children: [inquiries.length, " message", inquiries.length !== 1 ? "s" : ""] }))] }), _jsx(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden", children: isLoading ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", children: [_jsx("div", { className: "h-7 w-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" }), _jsx("p", { className: "text-sm text-slate-500", children: "Retrieving messages..." })] })) : inquiries.length === 0 ? (_jsxs("div", { className: "p-16 text-center space-y-3", children: [_jsx("div", { className: "h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto", children: _jsx(Mail, { size: 24, className: "text-slate-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-700 dark:text-slate-300 text-sm", children: "Inbox is empty" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Incoming website contact forms will register here." })] })] })) : (_jsx("div", { className: "divide-y divide-slate-100 dark:divide-slate-800/70", children: inquiries.map((inq) => {
                                        const isSelected = selectedInquiry?.id === inq.id;
                                        return (_jsxs("div", { onClick: () => setSelectedInquiry(inq), className: `px-5 py-4 flex items-start justify-between gap-4 cursor-pointer transition-colors ${isSelected
                                                ? "bg-blue-50/40 dark:bg-blue-950/20 border-l-2 border-blue-500"
                                                : "hover:bg-slate-50/50 dark:hover:bg-slate-900/30 border-l-2 border-transparent"}`, children: [_jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [_jsx("div", { className: "h-9 w-9 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5", children: inq.name.charAt(0).toUpperCase() }), _jsxs("div", { className: "min-w-0 space-y-0.5", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-bold text-sm text-slate-900 dark:text-white", children: inq.name }), _jsx("span", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-mono shrink-0", children: new Date(inq.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) })] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 truncate leading-relaxed", children: inq.message })] })] }), _jsx("button", { onClick: (e) => handleDelete(e, inq.id), disabled: deletingId === inq.id, className: "p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors shrink-0 mt-0.5", children: _jsx(Trash2, { size: 15 }) })] }, inq.id));
                                    }) })) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Message Detail" }), selectedInquiry ? (_jsxs(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden", children: [_jsxs("div", { className: "p-5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-base flex items-center justify-center shrink-0", children: selectedInquiry.name.charAt(0).toUpperCase() }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-slate-900 dark:text-white text-sm", children: selectedInquiry.name }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500", children: new Date(selectedInquiry.createdAt).toLocaleString("en-GB", {
                                                                    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                                                                }) })] })] }), _jsxs("div", { className: "space-y-2 text-xs", children: [_jsxs("div", { className: "flex items-center gap-2.5 text-slate-600 dark:text-slate-400", children: [_jsx(Mail, { size: 13, className: "text-slate-400 shrink-0" }), _jsxs("a", { href: `mailto:${selectedInquiry.email}`, className: "text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1", children: [selectedInquiry.email, _jsx(ExternalLink, { size: 10 })] })] }), selectedInquiry.phone && (_jsxs("div", { className: "flex items-center gap-2.5 text-slate-600 dark:text-slate-400", children: [_jsx(Phone, { size: 13, className: "text-slate-400 shrink-0" }), _jsx("span", { className: "font-mono", children: selectedInquiry.phone })] }))] })] }), _jsxs("div", { className: "p-5 space-y-3", children: [_jsx("p", { className: "font-bold text-xs text-slate-400 uppercase tracking-wider", children: "Message" }), _jsxs("div", { className: "p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap italic", children: ["\"", selectedInquiry.message, "\""] }), _jsxs("a", { href: `mailto:${selectedInquiry.email}?subject=Re: Your inquiry via Shrestha Services`, className: "flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors", children: [_jsx(Mail, { size: 13 }), "Reply via Email"] })] })] })) : (_jsxs(Card, { className: "border border-slate-200/80 dark:border-slate-800 p-10 text-center space-y-3", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto", children: _jsx(MessageSquare, { size: 20, className: "text-slate-400" }) }), _jsx("p", { className: "text-xs text-slate-400", children: "Select a message from the list to view details and contact options." })] }))] })] })] }));
}
