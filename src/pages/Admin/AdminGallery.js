import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGalleryStore } from "@/store/galleryStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";
export default function AdminGallery() {
    const { galleryItems, fetchGalleryItems, createGalleryItem, deleteGalleryItem, isLoading } = useGalleryStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState("all");
    // Form Fields
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Signage & Boards");
    const [description, setDescription] = useState("");
    useEffect(() => {
        fetchGalleryItems();
    }, []);
    const openCreateModal = () => {
        setTitle("");
        setCategory("Signage & Boards");
        setDescription("");
        setModalOpen(true);
    };
    const handleSave = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            toast.error("Please fill in all fields.");
            return;
        }
        const payload = {
            title,
            category,
            description,
            image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
        };
        try {
            await createGalleryItem(payload);
            toast.success("New gallery item uploaded successfully");
            setModalOpen(false);
        }
        catch (err) {
            toast.error("Failed to add image to showcase");
        }
    };
    const handleDelete = async (id) => {
        if (!confirm("Remove this print sample from the gallery?"))
            return;
        try {
            await deleteGalleryItem(id);
            toast.success("Sample removed successfully");
        }
        catch (err) {
            toast.error("Failed to delete gallery item");
        }
    };
    const categories = ["all", "Signage & Boards", "Flex & Banner Printing", "Digital & Custom Decals", "Branding & Advertising Solutions"];
    const filteredItems = galleryItems.filter((item) => {
        if (filter === "all")
            return true;
        return item.category.toLowerCase() === filter.toLowerCase();
    });
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Print Work Gallery" }), _jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Maintain and upload high resolution photos of flex prints and acrylic letters." })] }), _jsx(Button, { onClick: openCreateModal, leftIcon: _jsx(Plus, { size: 16 }), className: "shrink-0", children: "Upload Photo" })] }), _jsx("div", { className: "flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3", children: categories.map((cat) => (_jsx("button", { onClick: () => setFilter(cat), className: `px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${filter === cat
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"}`, children: cat === "all" ? "All Print Categories" : cat }, cat))) }), isLoading ? (_jsx("div", { className: "p-12 text-center text-sm text-slate-500", children: "Retrieving gallery files..." })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredItems.map((item) => (_jsxs(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col justify-between group", children: [_jsxs("div", { className: "relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0", children: [_jsx("img", { src: item.image, alt: item.title, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }), _jsxs("div", { className: "absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-white tracking-wide flex items-center gap-1.5", children: [_jsx(Tag, { size: 10 }), " ", item.category] })] }), _jsxs("div", { className: "p-4 flex-1 flex flex-col justify-between space-y-3", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h4", { className: "font-bold text-sm text-slate-900 dark:text-white leading-tight", children: item.title }), _jsx("p", { className: "text-xs text-slate-500 leading-normal", children: item.description })] }), _jsx("div", { className: "flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0", children: _jsx("button", { onClick: () => handleDelete(item.id), className: "p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors", title: "Remove Photo", children: _jsx(Trash2, { size: 16 }) }) })] })] }, item.id))) })), modalOpen && (_jsx(Dialog, { open: modalOpen, onClose: () => setModalOpen(false), title: "Upload Print Sample Photo", children: _jsxs("form", { onSubmit: handleSave, className: "space-y-5 pt-4 text-sm", children: [_jsx(Input, { label: "Photo / Spec Title", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g. Backlit Golden Mirror Signs", required: true }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Work Category" }), _jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white", children: [_jsx("option", { value: "Signage & Boards", children: "Signage & Boards" }), _jsx("option", { value: "Flex & Banner Printing", children: "Flex & Banner Printing" }), _jsx("option", { value: "Digital & Custom Decals", children: "Digital & Custom Decals" }), _jsx("option", { value: "Branding & Advertising Solutions", children: "Branding & Advertising Solutions" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Brief Description" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "What materials, inks, dimensions, or layout settings were used?", className: "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 min-h-[100px] focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white", required: true })] }), _jsxs("div", { className: "flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setModalOpen(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: "Upload Spec Image" })] })] }) }))] }));
}
