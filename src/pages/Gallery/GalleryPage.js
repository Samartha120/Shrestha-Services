import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGalleryStore } from "@/store/galleryStore";
const CATEGORIES = [
    "All",
    "Signage & Boards",
    "Flex & Banner Printing",
    "Digital & Custom Decals",
    "Branding & Advertising Solutions",
];
export default function GalleryPage() {
    const { galleryItems, isLoading, fetchGalleryItems } = useGalleryStore();
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const gridRef = useRef(null);
    const gridInView = useInView(gridRef, { once: true, margin: "-100px" });
    useEffect(() => {
        fetchGalleryItems();
    }, [fetchGalleryItems]);
    // Filter items based on selected category
    const filteredItems = activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());
    // Set current image index when selected image changes
    useEffect(() => {
        if (selectedImage) {
            const index = filteredItems.findIndex((item) => item.id === selectedImage.id);
            setCurrentImageIndex(index >= 0 ? index : 0);
        }
    }, [selectedImage, filteredItems]);
    const handlePrevImage = () => {
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1;
        setSelectedImage(filteredItems[newIndex]);
    };
    const handleNextImage = () => {
        const newIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
        setSelectedImage(filteredItems[newIndex]);
    };
    // Masonry grid layout with different aspect ratios
    const getAspectRatioClass = (index) => {
        const patterns = ["aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[16/9]"];
        return patterns[index % patterns.length];
    };
    return (_jsxs("div", { className: "bg-slate-50 dark:bg-slate-950 min-h-screen", children: [_jsx(motion.section, { ref: heroRef, initial: { opacity: 0 }, animate: heroInView ? { opacity: 1 } : { opacity: 0 }, transition: { duration: 0.8 }, className: "relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950", children: _jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [_jsx(motion.h1, { initial: { opacity: 0, y: 20 }, animate: heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, transition: { duration: 0.8, delay: 0.1 }, className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6", children: "Our Print Portfolio" }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, animate: heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, transition: { duration: 0.8, delay: 0.2 }, className: "text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-2", children: "Showcasing our finest printing solutions and premium branding work" }), _jsx(motion.div, { initial: { opacity: 0, scaleX: 0 }, animate: heroInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }, transition: { duration: 0.8, delay: 0.3 }, className: "inline-block h-1 bg-gradient-to-r from-blue-500 to-cyan-400 w-20 origin-left" })] }) }), _jsx("section", { className: "sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsx("div", { className: "flex flex-wrap gap-3 justify-center", children: CATEGORIES.map((category) => (_jsx(motion.button, { onClick: () => setActiveCategory(category), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: `px-6 py-2.5 rounded-full font-semibold transition-all text-sm sm:text-base ${activeCategory === category
                                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"}`, children: category }, category))) }) }) }), isLoading && (_jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20", children: _jsx("div", { className: "flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" }) }) })), !isLoading && (_jsx(motion.section, { ref: gridRef, className: "py-16 lg:py-20 px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "max-w-6xl mx-auto", children: filteredItems.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max", children: filteredItems.map((item, idx) => (_jsx(motion.div, { initial: { opacity: 0, y: 40 }, animate: gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }, transition: {
                                duration: 0.6,
                                delay: Math.min(idx * 0.08, 0.4),
                            }, className: `group cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${getAspectRatioClass(idx)}`, onClick: () => setSelectedImage(item), children: _jsxs("div", { className: "relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-900", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 flex items-center justify-center overflow-hidden", children: _jsx("img", { src: item.image, alt: item.title, className: "w-full h-full object-cover" }) }), _jsxs(motion.div, { initial: { opacity: 0 }, whileHover: { opacity: 1 }, transition: { duration: 0.3 }, className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6", children: [_jsx("h3", { className: "text-xl sm:text-2xl font-bold text-white mb-2", children: item.title }), _jsx("p", { className: "text-blue-300 font-semibold text-sm mb-3", children: item.category }), item.description && (_jsx("p", { className: "text-slate-200 text-sm line-clamp-2", children: item.description }))] }), _jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white to-transparent" })] }) }, item.id))) })) : (_jsx("div", { className: "text-center py-20", children: _jsx("p", { className: "text-slate-400 text-lg", children: "No items found in this category" }) })) }) })), _jsx(AnimatePresence, { children: selectedImage && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: "fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4", onClick: () => setSelectedImage(null), children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.3 }, className: "relative w-full max-w-4xl flex flex-col", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { onClick: () => setSelectedImage(null), className: "absolute -top-12 right-0 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors", children: _jsx(X, { className: "w-8 h-8" }) }), _jsxs("div", { className: "relative w-full bg-black rounded-xl overflow-hidden mb-6", children: [_jsx("div", { className: "aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 to-black", children: _jsx("img", { src: selectedImage.image, alt: selectedImage.title, className: "w-full h-full object-contain" }) }), filteredItems.length > 1 && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handlePrevImage, className: "absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm", children: _jsx(ChevronLeft, { className: "w-6 h-6" }) }), _jsx("button", { onClick: handleNextImage, className: "absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm", children: _jsx(ChevronRight, { className: "w-6 h-6" }) })] })), filteredItems.length > 1 && (_jsxs("div", { className: "absolute bottom-4 right-4 bg-black/60 px-4 py-2 rounded-full text-white text-sm font-semibold backdrop-blur-sm", children: [currentImageIndex + 1, " / ", filteredItems.length] }))] }), _jsxs("div", { className: "text-white", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-2", children: selectedImage.title }), _jsx("p", { className: "text-blue-400 font-semibold mb-3", children: selectedImage.category }), selectedImage.description && (_jsx("p", { className: "text-slate-300 leading-relaxed", children: selectedImage.description }))] })] }) })) }), _jsx(motion.section, { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: { once: true, margin: "-100px" }, className: "py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-slate-900 border-t border-slate-700", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6", children: "Ready to Elevate Your Brand?" }), _jsx("p", { className: "text-lg text-slate-300 mb-8 max-w-2xl mx-auto", children: "Get a custom quote for your printing and branding needs. Our team is ready to bring your vision to life." }), _jsx(motion.a, { href: "/contact", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all", children: "Get Your Quote Today" })] }) })] }));
}
