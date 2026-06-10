import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/common/Button";
import { faqData } from "@/data/faq";
export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const categories = ["all", "General", "Services", "Shipping", "Design"];
    const filteredFaqs = faqData.filter((item) => {
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });
    const accordionItems = filteredFaqs.map((item) => ({
        title: item.question,
        content: item.answer,
    }));
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-slate-900", children: [_jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 pb-16", children: [_jsx("div", { className: "absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50" }), _jsx("div", { className: "absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40" }), _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center", children: [_jsxs("h1", { className: "text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6", children: ["Frequently Asked", " ", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Questions" })] }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300 mb-12", children: "Find answers to common questions about our printing services, processes, and policies." }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.2 }, className: "relative max-w-2xl mx-auto", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search questions...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-all duration-300" })] })] }) })] }), _jsx("section", { className: "py-20", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.3 }, className: "flex flex-wrap gap-3 mb-16 justify-center", children: categories.map((cat) => (_jsx("button", { onClick: () => setSelectedCategory(cat), className: `px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === cat
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"}`, children: cat.charAt(0).toUpperCase() + cat.slice(1) }, cat))) }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "space-y-4", children: accordionItems.length > 0 ? (_jsx(_Fragment, { children: _jsx(Accordion, { items: accordionItems }) })) : (_jsx(motion.div, { variants: itemVariants, className: "text-center py-12", children: _jsx("p", { className: "text-slate-600 dark:text-slate-400 text-lg", children: "No questions match your search. Please try different keywords." }) })) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-12 text-center", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center", children: _jsx(MessageSquare, { className: "w-8 h-8 text-blue-600" }) }) }), _jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: "Didn't Find Your Answer?" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto", children: "Can't find what you're looking for? Reach out to our support team and we'll be happy to help." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/contact", children: _jsxs(Button, { variant: "primary", size: "lg", children: ["Contact Us", _jsx(ArrowRight, { className: "w-5 h-5 ml-2" })] }) }), _jsx(Link, { to: "/quote", children: _jsx(Button, { variant: "outline", size: "lg", children: "Get a Quote" }) })] })] })] }) })] }));
}
