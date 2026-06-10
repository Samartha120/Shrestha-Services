import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Package } from "lucide-react";
import { useServiceStore } from "@/store/serviceStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/ui/Badge";
const CATEGORY_COLORS = {
    "Flex & Banner Printing": "primary",
    "Signage & Boards": "success",
    "Digital & Custom Decals": "warning",
    "Branding & Advertising Solutions": "danger",
    "Marketing Materials": "primary",
};
export default function ServicesPage() {
    const { services, fetchServices, isLoading } = useServiceStore();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredServices, setFilteredServices] = useState([]);
    const containerRef = useRef(null);
    const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });
    useEffect(() => {
        fetchServices();
    }, [fetchServices]);
    // Extract unique categories
    const categories = Array.from(new Set(services.filter((s) => s.category).map((s) => s.category)));
    // Filter services based on selected category
    useEffect(() => {
        if (selectedCategory) {
            setFilteredServices(services.filter((s) => s.category === selectedCategory));
        }
        else {
            setFilteredServices(services);
        }
    }, [selectedCategory, services]);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800", children: [_jsxs(motion.section, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 }, className: "relative px-6 py-20 sm:px-8 md:py-28 overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 -z-10", children: [_jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" })] }), _jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 }, children: _jsxs("h1", { className: "text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight", children: ["Our Premium Printing", " ", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent", children: "Services" })] }) }), _jsx(motion.p, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 }, className: "text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8", children: "Discover our comprehensive range of professional printing and branding solutions tailored to elevate your business visibility and impact." }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3 }, children: _jsx(Link, { to: "/quote", children: _jsxs(Button, { size: "lg", className: "gap-2", children: ["Get a Quote ", _jsx(ArrowRight, { size: 18 })] }) }) })] })] }), _jsx(motion.section, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, className: "px-6 sm:px-8 py-10", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-6", children: "Filter by Category" }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => setSelectedCategory(null), className: `px-5 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === null
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`, children: "All Services" }), categories.map((category) => (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => setSelectedCategory(category), className: `px-5 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`, children: category }, category)))] })] }) }), _jsx("section", { className: "px-6 sm:px-8 py-12", ref: containerRef, children: _jsx("div", { className: "max-w-6xl mx-auto", children: isLoading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: Array.from({ length: 6 }).map((_, i) => (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: i * 0.1 }, className: "bg-slate-200 dark:bg-slate-700 rounded-3xl h-96 animate-pulse" }, i))) })) : filteredServices.length === 0 ? (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-16", children: _jsx("p", { className: "text-slate-600 dark:text-slate-400 text-lg", children: "No services found in this category." }) })) : (_jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: isContainerInView ? "visible" : "hidden", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredServices.map((service) => (_jsx(motion.div, { variants: itemVariants, exit: { opacity: 0, y: 20 }, layoutId: service.id, children: _jsxs(Card, { className: "h-full flex flex-col overflow-hidden group dark:bg-slate-800 dark:border-slate-700", children: [_jsxs("div", { className: "relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-700", children: [_jsx(motion.img, { src: service.image, alt: service.title, className: "w-full h-full object-cover", whileHover: { scale: 1.12 }, transition: { duration: 0.5 } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })] }), _jsxs("div", { className: "flex flex-col flex-1 p-6", children: [service.category && (_jsx("div", { className: "mb-3", children: _jsx(Badge, { variant: CATEGORY_COLORS[service.category] || "primary", children: service.category }) })), _jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2", children: service.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1", children: service.description }), service.basePrice && (_jsx("div", { className: "mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl", children: _jsxs("p", { className: "text-sm text-blue-600 dark:text-blue-400 font-semibold", children: ["Starting from NPR ", service.basePrice, "/sq.ft"] }) })), service.features && service.features.length > 0 && (_jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2", children: "Key Features:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: service.features.slice(0, 3).map((feature, idx) => (_jsxs("div", { className: "text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full flex items-center gap-1", children: [_jsx(Zap, { size: 12, className: "text-blue-600" }), feature] }, idx))) })] })), _jsx(Link, { to: `/services/${service.slug}`, children: _jsxs(motion.button, { whileHover: { x: 8 }, className: "text-blue-600 dark:text-blue-400 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all", children: ["Learn More ", _jsx(ArrowRight, { size: 16 })] }) })] })] }) }, service.id))) }) })) }) }), _jsx(motion.section, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.6 }, viewport: { once: true }, className: "px-6 sm:px-8 py-16 md:py-24", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsx(Card, { className: "bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white dark:from-blue-700 dark:to-blue-600 overflow-hidden", children: _jsxs("div", { className: "relative p-12 md:p-16", children: [_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsx(Package, { size: 200, className: "absolute -top-20 -right-20" }) }), _jsxs("div", { className: "relative z-10", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Ready to Get Started?" }), _jsx("p", { className: "text-blue-50 text-lg mb-8 max-w-xl", children: "Let's discuss your printing needs and create a customized solution that brings your vision to life." }), _jsx(Link, { to: "/quote", children: _jsxs(Button, { variant: "outline", size: "lg", className: "bg-white text-blue-600 hover:bg-blue-50 font-semibold gap-2", children: ["Request a Quote ", _jsx(ArrowRight, { size: 18 })] }) })] })] }) }) }) })] }));
}
