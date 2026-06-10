import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { reportsApi } from "@/services/reportsApi";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/ui/Badge";
import { DownloadCloud, FileSpreadsheet, Plus, FileText, BarChart3, Users, Receipt, } from "lucide-react";
import { toast } from "sonner";
const reportTypes = [
    {
        value: "revenue",
        label: "Revenues Sheet & Income",
        sublabel: "Monthly billing summary",
        icon: Receipt,
        color: "blue",
    },
    {
        value: "orders",
        label: "Print Orders Dispatch List",
        sublabel: "Order fulfillment breakdown",
        icon: BarChart3,
        color: "indigo",
    },
    {
        value: "quotes",
        label: "Audited Customer Quotes",
        sublabel: "Quote specification summaries",
        icon: FileText,
        color: "emerald",
    },
    {
        value: "users",
        label: "Registered Business PAN/VAT",
        sublabel: "Client verification records",
        icon: Users,
        color: "amber",
    },
];
const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
    indigo: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400",
    emerald: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
    amber: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
};
export default function AdminReports() {
    const [reports, setReports] = useState([]);
    const [generating, setGenerating] = useState(false);
    const [selectedType, setSelectedType] = useState("revenue");
    const [loading, setLoading] = useState(true);
    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await reportsApi.getAll();
            setReports(data);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReports();
    }, []);
    const handleGenerate = async () => {
        setGenerating(true);
        try {
            const selected = reportTypes.find((r) => r.value === selectedType);
            const title = selected?.label || "Report";
            const type = selectedType === "revenue" || selectedType === "quotes" ? "PDF" : "CSV";
            const newReport = await reportsApi.generate(title, type);
            setReports((prev) => [newReport, ...prev]);
            toast.success(`"${title}" generated successfully.`);
        }
        catch (err) {
            toast.error("Failed to generate report sheets");
        }
        finally {
            setGenerating(false);
        }
    };
    const handleDownload = (title) => {
        toast.success(`Downloading "${title}"`);
    };
    const selectedTypeInfo = reportTypes.find((r) => r.value === selectedType);
    const SelectedIcon = selectedTypeInfo?.icon || FileSpreadsheet;
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Financial & Order Reports" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: "Export audit sheets, PAN/VAT summaries, and print operations spreadsheets." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "space-y-5", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Generate Export" }), _jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Report Category" }), _jsx("div", { className: "space-y-2", children: reportTypes.map((rt) => {
                                                    const Icon = rt.icon;
                                                    const isSelected = selectedType === rt.value;
                                                    return (_jsxs("button", { onClick: () => setSelectedType(rt.value), className: `w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${isSelected
                                                            ? "border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                                                            : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"}`, children: [_jsx("div", { className: `h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? colorClasses[rt.color] : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`, children: _jsx(Icon, { size: 15 }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: `text-xs font-bold truncate ${isSelected ? "text-blue-700 dark:text-blue-300" : "text-slate-800 dark:text-slate-200"}`, children: rt.label }), _jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: rt.sublabel })] }), isSelected && (_jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 ml-auto" }))] }, rt.value));
                                                }) })] }), _jsx("div", { className: `p-3 rounded-xl border border-dashed ${selectedTypeInfo
                                            ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20"
                                            : "border-slate-200 dark:border-slate-700"}`, children: _jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400", children: [_jsx(SelectedIcon, { size: 13, className: "text-blue-500 shrink-0" }), _jsxs("span", { children: ["Will export as ", _jsx("strong", { children: selectedType === "revenue" || selectedType === "quotes" ? "PDF" : "CSV" })] })] }) }), _jsx(Button, { onClick: handleGenerate, loading: generating, leftIcon: _jsx(Plus, { size: 15 }), className: "w-full", children: "Compile Report Sheet" })] })] }), _jsxs("div", { className: "lg:col-span-2 space-y-5", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Generated Catalog" }), _jsx(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden", children: loading ? (_jsx("div", { className: "p-12 text-center text-sm text-slate-500", children: "Checking spreadsheets index..." })) : reports.length === 0 ? (_jsxs("div", { className: "p-16 text-center space-y-3", children: [_jsx("div", { className: "h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto", children: _jsx(FileSpreadsheet, { size: 24, className: "text-slate-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-700 dark:text-slate-300 text-sm", children: "No reports compiled" }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Select a report category on the left to export records." })] })] })) : (_jsx("div", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: reports.map((rep) => (_jsxs("div", { className: "p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors", children: [_jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0", children: _jsx(FileSpreadsheet, { size: 18 }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white truncate", children: rep.title }), _jsxs("p", { className: "text-[11px] text-slate-400 dark:text-slate-500 mt-0.5", children: [rep.size, " \u2022 ", rep.type, " \u2022 Generated ", new Date(rep.createdAt || rep.date).toLocaleDateString()] })] })] }), _jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [_jsx(Badge, { variant: "success", children: "Completed" }), _jsx("button", { onClick: () => handleDownload(rep.title), className: "p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl transition-colors", title: "Download sheet", children: _jsx(DownloadCloud, { size: 17 }) })] })] }, rep.id))) })) })] })] })] }));
}
