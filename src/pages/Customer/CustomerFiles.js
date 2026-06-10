import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useQuoteStore } from "@/store/quoteStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import { Upload, FileText, Download, AlertCircle, Trash2, FileImage, FileCode, CheckCircle2, } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const getFileIcon = (type) => {
    if (type.includes("image"))
        return FileImage;
    if (type.includes("postscript") || type.includes("pdf") || type.includes("eps"))
        return FileCode;
    return FileText;
};
const printGuideItems = [
    {
        title: "Color Profile",
        desc: "All banners must use CMYK color profile (not RGB) to ensure correct ink output ratios.",
        color: "blue",
    },
    {
        title: "Resolution Settings",
        desc: "Large flex printing requires minimum 150 DPI. Large banner decals can use 72–100 DPI.",
        color: "indigo",
    },
    {
        title: "Outline Text Fonts",
        desc: "Convert all text to vector outlines (curves) in Illustrator/CorelDraw to avoid missing font errors.",
        color: "violet",
    },
];
const templates = [
    { label: "Standard Roll-up (3×6 ft)", ext: ".AI" },
    { label: "Outdoor Flex Banner (4×8 ft)", ext: ".CDR" },
    { label: "Business Cards (3.5×2 in)", ext: ".PDF" },
    { label: "A4 Flyer Template", ext: ".PDF" },
];
export default function CustomerFiles() {
    const { user } = useAuthStore();
    const { quotes, fetchQuotesByEmail } = useQuoteStore();
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(null);
    useEffect(() => {
        if (user?.email) {
            fetchQuotesByEmail(user.email);
        }
    }, [user]);
    // Aggregate files from quotes
    useEffect(() => {
        const list = [];
        quotes.forEach((q) => {
            if (q.fileUrl) {
                list.push({
                    id: `file-${q.id}`,
                    name: q.fileUrl,
                    size: q.fileWeight || "2.1 MB",
                    type: q.fileType || "image/jpeg",
                    quoteId: q.id,
                    uploadedAt: q.date || new Date().toISOString(),
                });
            }
        });
        setFiles(list);
    }, [quotes]);
    const handleUploadClick = () => {
        setUploading(true);
        setTimeout(() => {
            const mockFile = {
                id: `file-up-${Date.now()}`,
                name: `branding_logo_vector_${Date.now().toString().slice(-4)}.ai`,
                size: "8.4 MB",
                type: "application/postscript",
                uploadedAt: new Date().toISOString(),
            };
            setFiles((prev) => [mockFile, ...prev]);
            setUploading(false);
            toast.success("Design file uploaded successfully.");
        }, 1500);
    };
    const handleDeleteFile = (id) => {
        setDeleting(id);
        setTimeout(() => {
            setFiles((prev) => prev.filter((f) => f.id !== id));
            setDeleting(null);
            toast.success("File removed from design drafts.");
        }, 600);
    };
    const handleTemplateDownload = (label) => {
        toast.success(`Downloading template: "${label}"`);
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400", children: [_jsx(Link, { to: "/dashboard", className: "hover:underline hover:text-slate-700 dark:hover:text-slate-200 transition-colors", children: "Dashboard" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-slate-900 dark:text-slate-100", children: "Design Files" })] }), _jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Design & Template Files" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Upload high-resolution vector artwork (AI, PDF, EPS) for flex printing prepress." })] }), _jsx(Button, { onClick: handleUploadClick, loading: uploading, leftIcon: _jsx(Upload, { size: 16 }), className: "shrink-0", children: "Upload Artwork Draft" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Active Design Uploads" }), _jsxs("span", { className: "text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full font-semibold", children: [files.length, " file", files.length !== 1 ? "s" : ""] })] }), _jsx(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden", children: files.length === 0 ? (_jsxs("div", { className: "p-16 text-center space-y-3", children: [_jsx("div", { className: "h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mx-auto", children: _jsx(FileText, { size: 24, className: "text-blue-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-700 dark:text-slate-300 text-sm", children: "No files uploaded yet" }), _jsx("p", { className: "text-xs text-slate-400 mt-1 max-w-xs mx-auto", children: "Upload files when requesting quotes, or add files directly to your dashboard drafts." })] }), _jsx(Button, { onClick: handleUploadClick, loading: uploading, leftIcon: _jsx(Upload, { size: 14 }), className: "mx-auto text-xs py-1.5 px-4 h-8", children: "Upload First File" })] })) : (_jsx("div", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: files.map((file) => {
                                        const Icon = getFileIcon(file.type);
                                        const isDeleting = deleting === file.id;
                                        return (_jsxs("div", { className: `p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all duration-300 ${isDeleting ? "opacity-40 pointer-events-none" : ""}`, children: [_jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0", children: _jsx(Icon, { size: 18 }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-slate-100 truncate", children: file.name }), _jsxs("p", { className: "text-xs text-slate-400 dark:text-slate-500 mt-0.5", children: [file.size, " \u2022 ", file.type, " \u2022 ", new Date(file.uploadedAt).toLocaleDateString()] }), file.quoteId && (_jsxs("span", { className: "inline-block mt-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded-md", children: ["Linked Quote ", file.quoteId] }))] })] }), _jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [_jsx("button", { onClick: () => toast.success(`Downloading "${file.name}"`), className: "p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl transition-colors", title: "Download file", children: _jsx(Download, { size: 15 }) }), _jsx("button", { onClick: () => handleDeleteFile(file.id), className: "p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors", title: "Delete file", children: _jsx(Trash2, { size: 15 }) })] })] }, file.id));
                                    }) })) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Prepress Print Guide" }), _jsx(Card, { className: "border border-slate-200/80 dark:border-slate-800 p-5 space-y-4", children: printGuideItems.map((item, i) => (_jsxs("div", { className: "flex gap-3 items-start", children: [_jsx("div", { className: "h-7 w-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0 mt-0.5", children: _jsx(AlertCircle, { size: 13, className: "text-blue-500" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-xs text-slate-800 dark:text-slate-200", children: item.title }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed", children: item.desc })] })] }, i))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider", children: "Empty Templates" }), _jsx(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800", children: templates.map((tpl, i) => (_jsxs("button", { onClick: () => handleTemplateDownload(tpl.label), className: "w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors text-left", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsx(CheckCircle2, { size: 14, className: "text-emerald-500 shrink-0" }), _jsx("span", { className: "text-xs font-medium text-slate-700 dark:text-slate-300 truncate", children: tpl.label })] }), _jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [_jsx("span", { className: "text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded", children: tpl.ext }), _jsx(Download, { size: 13, className: "text-blue-500" })] })] }, i))) })] })] })] })] }));
}
