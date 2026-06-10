import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Hop as Home, Search, Mail, ArrowRight, CircleAlert as AlertCircle } from "lucide-react";
import Button from "@/components/common/Button";
export default function NotFoundPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
            },
        },
    };
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" }), _jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30" }), _jsxs("div", { className: "relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [_jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "text-center", children: [_jsxs(motion.div, { variants: itemVariants, className: "relative mb-8", children: [_jsx(motion.div, { variants: floatingVariants, animate: "animate", className: "inline-block", children: _jsx("div", { className: "text-9xl sm:text-[150px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-none", children: "404" }) }), _jsx(motion.div, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", animate: {
                                            rotate: 360,
                                        }, transition: {
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }, children: _jsx(AlertCircle, { className: "w-32 h-32 text-blue-200 dark:text-blue-900/30 opacity-50" }) })] }), _jsx(motion.h1, { variants: itemVariants, className: "text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4", children: "Page Not Found" }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto", children: "Oops! It seems like the page you're looking for doesn't exist. This might have been moved or deleted." }), _jsxs(motion.div, { variants: itemVariants, className: "bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-12 border border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center justify-center gap-3 mb-4", children: [_jsx(Search, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }), _jsx("span", { className: "font-semibold text-slate-900 dark:text-white", children: "Need help?" })] }), _jsx("p", { className: "text-slate-600 dark:text-slate-400 mb-4", children: "Try searching for what you need or explore our main sections:" }), _jsxs("div", { className: "flex flex-wrap gap-2 justify-center", children: [_jsx(Link, { to: "/services", className: "px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium text-sm", children: "Services" }), _jsx(Link, { to: "/gallery", className: "px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium text-sm", children: "Gallery" }), _jsx(Link, { to: "/blog", className: "px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium text-sm", children: "Blog" }), _jsx(Link, { to: "/faq", className: "px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium text-sm", children: "FAQ" })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "flex flex-col sm:flex-row gap-4 justify-center mb-12", children: [_jsx(Link, { to: "/", children: _jsxs(Button, { variant: "primary", size: "lg", children: [_jsx(Home, { className: "w-5 h-5" }), "Back to Home"] }) }), _jsx(Link, { to: "/contact", children: _jsxs(Button, { variant: "outline", size: "lg", children: [_jsx(Mail, { className: "w-5 h-5" }), "Contact Support"] }) })] }), _jsxs(motion.div, { variants: itemVariants, className: "pt-8 border-t border-slate-200 dark:border-slate-700", children: [_jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mb-6", children: "Still can't find what you're looking for?" }), _jsxs("a", { href: "mailto:support@shresthaservices.com", className: "inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold group", children: ["Email our support team", _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] })] })] }), _jsx(motion.div, { className: "absolute top-20 left-10 w-8 h-8 bg-blue-400 rounded-full opacity-20", animate: {
                            y: [0, 30, 0],
                            x: [0, 20, 0],
                        }, transition: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        } }), _jsx(motion.div, { className: "absolute bottom-32 right-20 w-12 h-12 bg-indigo-400 rounded-lg opacity-20", animate: {
                            y: [0, -30, 0],
                            x: [0, -20, 0],
                        }, transition: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        } })] })] }));
}
