import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Award, Users, Zap } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
export default function ProjectsPage() {
    const { projects, fetchProjects, isLoading } = useProjectStore();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    useEffect(() => {
        fetchProjects();
    }, []);
    const statistics = [
        { label: "500+ Projects", icon: Award, value: "500+" },
        { label: "350+ Happy Clients", icon: Users, value: "350+" },
        { label: "10+ Years Experience", icon: Zap, value: "10+" },
    ];
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-slate-950", children: [_jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 pb-16 lg:pt-32 lg:pb-20", children: [_jsx("div", { className: "absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-40" }), _jsx("div", { className: "absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30" }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "text-center", children: [_jsxs(motion.div, { variants: itemVariants, className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6", children: [_jsxs("span", { className: "relative flex h-2 w-2", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-blue-500" })] }), _jsx("span", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "Showcasing Our Excellence" })] }), _jsxs(motion.h1, { variants: itemVariants, className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight", children: ["Our ", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Portfolio" })] }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed", children: "Explore our collection of premium printing and signage projects that showcase our commitment to excellence, innovation, and client satisfaction." }), _jsx(motion.div, { variants: itemVariants, className: "flex flex-wrap justify-center gap-4", children: _jsxs(Link, { to: "/quote", className: "group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 active:scale-95", children: ["Request Your Project", _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })] }) })] }) })] }), _jsx("section", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx(motion.div, { ref: ref, variants: containerVariants, initial: "hidden", animate: isInView ? "visible" : "hidden", className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: statistics.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (_jsxs(motion.div, { variants: itemVariants, className: "flex items-center gap-4 text-center md:text-left", children: [_jsx("div", { className: "p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl", children: _jsx(Icon, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-3xl font-bold text-slate-900 dark:text-white", children: stat.value }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: stat.label })] })] }, idx));
                        }) }) }) }), _jsx("section", { className: "py-20 lg:py-28", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: isLoading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8", children: [...Array(4)].map((_, idx) => (_jsx("div", { className: "h-96 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-3xl animate-pulse" }, idx))) })) : projects.length === 0 ? (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-400", children: "No projects available at the moment." }) })) : (_jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10", children: projects.map((project) => (_jsxs(motion.div, { variants: cardVariants, className: "group relative overflow-hidden rounded-3xl h-96 lg:h-96", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("img", { src: project.image, alt: project.title, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" }), _jsx("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" })] }), _jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-10", children: [_jsxs(motion.div, { initial: { y: 20, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, transition: { duration: 0.4, delay: 0.1 }, className: "mb-4", children: [_jsx("h3", { className: "text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight", children: project.title }), _jsx("div", { className: "h-1 w-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, whileHover: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, className: "mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: _jsx("p", { className: "text-white/90 text-sm lg:text-base line-clamp-2", children: project.description }) }), _jsxs(Link, { to: `/projects/${project.slug}`, className: "inline-flex items-center gap-2 w-fit px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 group/btn hover:shadow-lg transform group-hover:translate-x-1", children: ["View Case Study", _jsx(ArrowRight, { className: "w-4 h-4 group-hover/btn:translate-x-1 transition-transform" })] })] })] }, project.id))) })) }) }), _jsxs("section", { className: "relative py-16 lg:py-24 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900" }), _jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" }), _jsx("div", { className: "absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -ml-36 -mb-36" }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.5 }, className: "text-center", children: [_jsx(motion.h2, { variants: itemVariants, className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6", children: "Ready to See Your Project Come to Life?" }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-white/90 max-w-2xl mx-auto mb-10", children: "Join hundreds of satisfied clients who have transformed their ideas into stunning reality with Shrestha Services." }), _jsxs(motion.div, { variants: itemVariants, className: "flex flex-wrap justify-center gap-4", children: [_jsxs(Link, { to: "/quote", className: "inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95", children: ["Get Your Free Quote", _jsx(ArrowRight, { className: "w-5 h-5" })] }), _jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 rounded-2xl hover:bg-white/30 transition-all duration-300 active:scale-95", children: "Contact Us" })] })] }) })] })] }));
}
