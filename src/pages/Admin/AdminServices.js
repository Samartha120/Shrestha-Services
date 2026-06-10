import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useServiceStore } from "@/store/serviceStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Dialog from "@/components/ui/Dialog";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
export default function AdminServices() {
    const { services, fetchServices, createService, updateService, deleteService, isLoading } = useServiceStore();
    const [editingService, setEditingService] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    // Form Fields
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState(0);
    const [materials, setMaterials] = useState("");
    const [features, setFeatures] = useState("");
    useEffect(() => {
        fetchServices();
    }, []);
    const openCreateModal = () => {
        setEditingService(null);
        setTitle("");
        setSlug("");
        setDescription("");
        setBasePrice(15);
        setMaterials("Normal Flex (280 GSM), Star Flex (340 GSM)");
        setFeatures("Weather Resistant, Vibrant CMYK Colors");
        setModalOpen(true);
    };
    const openEditModal = (s) => {
        setEditingService(s);
        setTitle(s.title);
        setSlug(s.slug);
        setDescription(s.description);
        setBasePrice(s.basePrice || 15);
        setMaterials((s.materials || []).join(", "));
        setFeatures((s.features || []).join(", "));
        setModalOpen(true);
    };
    const handleSave = async (e) => {
        e.preventDefault();
        if (!title || !slug || !description) {
            toast.error("Please fill in all required fields.");
            return;
        }
        const payload = {
            title,
            slug,
            description,
            image: editingService?.image || "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80",
            category: editingService?.category || "Flex & Banner Printing",
            basePrice: Number(basePrice),
            materials: materials.split(",").map((x) => x.trim()).filter(Boolean),
            features: features.split(",").map((x) => x.trim()).filter(Boolean),
        };
        try {
            if (editingService) {
                await updateService(editingService.id, payload);
                toast.success("Service updated successfully");
            }
            else {
                await createService(payload);
                toast.success("New printing service cataloged");
            }
            setModalOpen(false);
        }
        catch (err) {
            toast.error("Failed to save printing service specifications");
        }
    };
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this service?"))
            return;
        try {
            await deleteService(id);
            toast.success("Service deleted successfully");
        }
        catch (err) {
            toast.error("Failed to delete service from catalog");
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Services Catalog" }), _jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Manage your digital printing machinery outputs, material pricing options, and specifications." })] }), _jsx(Button, { onClick: openCreateModal, leftIcon: _jsx(Plus, { size: 16 }), className: "shrink-0", children: "Add Service Type" })] }), isLoading ? (_jsx("div", { className: "p-12 text-center text-sm text-slate-500", children: "Loading catalog..." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((s) => (_jsxs(Card, { className: "border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col justify-between", children: [_jsxs("div", { className: "relative h-44 bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0", children: [_jsx("img", { src: s.image, alt: s.title, className: "w-full h-full object-cover" }), _jsxs("div", { className: "absolute top-3 right-3 px-2 py-1 bg-black/60 rounded text-[10px] uppercase font-bold text-white tracking-widest", children: ["NPR ", s.basePrice || 15, "/sq.ft"] })] }), _jsxs("div", { className: "p-5 flex-1 flex flex-col justify-between space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-bold text-base text-slate-950 dark:text-white", children: s.title }), _jsx("p", { className: "text-xs text-slate-500 line-clamp-3", children: s.description })] }), _jsxs("div", { className: "flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0", children: [_jsx("button", { onClick: () => openEditModal(s), className: "p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 transition-colors", children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { onClick: () => handleDelete(s.id), className: "p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 hover:text-red-600 transition-colors", children: _jsx(Trash2, { size: 14 }) })] })] })] }, s.id))) })), modalOpen && (_jsx(Dialog, { open: modalOpen, onClose: () => setModalOpen(false), title: editingService ? `Edit Service - ${editingService.title}` : "Create Printing Service", children: _jsxs("form", { onSubmit: handleSave, className: "space-y-5 pt-4 text-sm", children: [_jsx(Input, { label: "Service Title", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g. Backlit Flex Board", required: true }), _jsx(Input, { label: "Slug Identifier (URL)", value: slug, onChange: (e) => setSlug(e.target.value), placeholder: "e.g. backlit-flex-board", required: true }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Catalog Description" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Details of print machine outputs, resolution specifications...", className: "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 min-h-[100px] focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-white", required: true })] }), _jsx(Input, { label: "Base Price per sq. ft. (NPR)", type: "number", value: basePrice, onChange: (e) => setBasePrice(Number(e.target.value)), placeholder: "15", required: true }), _jsx(Input, { label: "Materials (Comma separated list)", value: materials, onChange: (e) => setMaterials(e.target.value), placeholder: "Avery Vinyl, Frosted glass decals..." }), _jsx(Input, { label: "Features / Key properties (Comma separated)", value: features, onChange: (e) => setFeatures(e.target.value), placeholder: "Weather Resistant, Spot UV..." }), _jsxs("div", { className: "flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setModalOpen(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: "Save Changes" })] })] }) }))] }));
}
