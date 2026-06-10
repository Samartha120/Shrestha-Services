import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronRight, Zap } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
export default function ProjectDetailsPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { selectedProject, fetchProjectBySlug, isLoading, projects } = useProjectStore();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    useEffect(() => {
        if (slug) {
            fetchProjectBySlug(slug);
        }
    }, [slug, fetchProjectBySlug]);
    // Get related projects (all except current)
    const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-block", children: _jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400" }) }), _jsx("p", { className: "mt-4 text-slate-600 dark:text-slate-400 font-medium", children: "Loading project details..." })] }) }));
    }
    if (!selectedProject) {
        return (_jsx("div", { className: "min-h-screen bg-white dark:bg-slate-950", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-4", children: "Project Not Found" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400 mb-8", children: "Sorry, we couldn't find the project you're looking for." }), _jsxs(Link, { to: "/projects", className: "inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to Projects"] })] }) }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-slate-950", children: [_jsx("div", { className: "sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Link, { to: "/", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors", children: "Home" }), _jsx(ChevronRight, { className: "w-4 h-4 text-slate-400 dark:text-slate-600" }), _jsx(Link, { to: "/projects", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors", children: "Projects" }), _jsx(ChevronRight, { className: "w-4 h-4 text-slate-400 dark:text-slate-600" }), _jsx("span", { className: "text-slate-900 dark:text-white font-semibold", children: selectedProject.title })] }) }) }), _jsxs("section", { className: "relative h-[500px] lg:h-[600px] overflow-hidden", children: [_jsx(motion.div, { initial: { opacity: 0, scale: 1.05 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8 }, className: "absolute inset-0", children: _jsx("img", { src: selectedProject.image, alt: selectedProject.title, className: "w-full h-full object-cover" }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "absolute inset-0 flex items-end", children: _jsxs("div", { className: "w-full px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20 max-w-7xl mx-auto", children: [_jsxs(motion.div, { variants: itemVariants, className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full" }), _jsx("span", { className: "text-sm font-semibold text-blue-300 uppercase tracking-wider", children: "Case Study" })] }), _jsx(motion.h1, { variants: itemVariants, className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight", children: selectedProject.title }), _jsx(motion.p, { variants: itemVariants, className: "text-base lg:text-lg text-white/80 max-w-2xl", children: selectedProject.description })] }) })] }), _jsx("section", { className: "py-16 lg:py-24", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { ref: ref, variants: containerVariants, initial: "hidden", animate: isInView ? "visible" : "hidden", className: "space-y-12 lg:space-y-16", children: [_jsxs(motion.div, { variants: itemVariants, children: [_jsx("h2", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-6", children: "Project Overview" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6", children: selectedProject.description }), _jsx("p", { className: "text-base text-slate-600 dark:text-slate-300 leading-relaxed", children: "This premium project showcases our expertise in delivering exceptional results that exceed client expectations. Every detail was carefully planned and executed to ensure the highest quality standards." })] }), _jsxs(motion.div, { variants: itemVariants, children: [_jsx("h2", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-8", children: "Highlights" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                                            {
                                                title: "Premium Quality",
                                                description: "Highest grade materials and precision craftsmanship",
                                            },
                                            {
                                                title: "Expert Execution",
                                                description: "Professional team with years of industry experience",
                                            },
                                            {
                                                title: "On-Time Delivery",
                                                description: "Strict adherence to timelines without compromising quality",
                                            },
                                            {
                                                title: "Client Satisfaction",
                                                description: "100% dedicated to exceeding client expectations",
                                            },
                                        ].map((highlight, idx) => (_jsx(motion.div, { variants: cardVariants, className: "p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl hover:shadow-lg transition-shadow duration-300", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "p-2 bg-blue-600 rounded-lg shrink-0 mt-1", children: _jsx(Zap, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-2", children: highlight.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-300", children: highlight.description })] })] }) }, idx))) })] }), _jsxs(motion.div, { variants: itemVariants, children: [_jsx("h2", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-8", children: "Project Details" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
                                            { label: "Duration", value: "3-4 weeks" },
                                            { label: "Team Size", value: "5+ members" },
                                            { label: "Revisions", value: "Unlimited" },
                                            { label: "Complexity", value: "High" },
                                        ].map((stat, idx) => (_jsxs(motion.div, { variants: cardVariants, className: "p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center border border-slate-200 dark:border-slate-700", children: [_jsx("p", { className: "text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2", children: stat.value }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: stat.label })] }, idx))) })] })] }) }) }), relatedProjects.length > 0 && (_jsx("section", { className: "py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 }, children: [_jsxs(motion.div, { variants: itemVariants, className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4", children: "More Case Studies" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-400", children: "Explore other premium projects showcasing our expertise" })] }), _jsx(motion.div, { variants: containerVariants, className: "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8", children: relatedProjects.map((project) => (_jsxs(motion.div, { variants: cardVariants, className: "group relative overflow-hidden rounded-2xl h-64 md:h-72", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("img", { src: project.image, alt: project.title, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" }), _jsx("div", { className: "absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" })] }), _jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-6 z-10", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:translate-y-0 transition-transform", children: project.title }), _jsxs(Link, { to: `/projects/${project.slug}`, className: "inline-flex items-center gap-2 w-fit px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300", children: ["View", _jsx(ArrowRight, { className: "w-4 h-4" })] })] })] }, project.id))) })] }) }) })), _jsxs("section", { className: "relative py-16 lg:py-24 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900" }), _jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" }), _jsx("div", { className: "absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -ml-36 -mb-36" }), _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.5 }, className: "text-center", children: [_jsx(motion.h2, { variants: itemVariants, className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6", children: "Ready for a Similar Project?" }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-white/90 mb-10", children: "Let's discuss how we can bring your vision to life with the same excellence, attention to detail, and professionalism you see in our portfolio." }), _jsxs(motion.div, { variants: itemVariants, className: "flex flex-wrap justify-center gap-4", children: [_jsxs(Link, { to: "/quote", className: "inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95", children: ["Request a Quote", _jsx(ArrowRight, { className: "w-5 h-5" })] }), _jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 rounded-2xl hover:bg-white/30 transition-all duration-300 active:scale-95", children: "Contact Us" })] })] }) })] }), _jsx("section", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs(motion.button, { whileHover: { x: -4 }, onClick: () => navigate("/projects"), className: "inline-flex items-center gap-2 px-6 py-3 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group", children: [_jsx(ArrowLeft, { className: "w-5 h-5 group-hover:-translate-x-1 transition-transform" }), "Back to All Projects"] }) }) })] }));
}
