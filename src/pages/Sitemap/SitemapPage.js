import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Hop as Home, Briefcase, FileText, Users, MapPin, Lock, ChartBar as BarChart3, ArrowRight, Mail } from "lucide-react";
import Card from "@/components/ui/Card";
const siteMap = [
    {
        title: "Main Pages",
        icon: Home,
        links: [
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Contact Us", path: "/contact" },
            { name: "Gallery", path: "/gallery" },
        ],
    },
    {
        title: "Services",
        icon: Briefcase,
        links: [
            { name: "All Services", path: "/services" },
            { name: "Business Cards", path: "/services" },
            { name: "Brochures", path: "/services" },
            { name: "Signage & Banners", path: "/services" },
            { name: "Packaging", path: "/services" },
            { name: "Custom Printing", path: "/services" },
        ],
    },
    {
        title: "Resources",
        icon: FileText,
        links: [
            { name: "Blog", path: "/blog" },
            { name: "FAQ", path: "/faq" },
            { name: "Project Portfolio", path: "/gallery" },
            { name: "Testimonials", path: "/about" },
        ],
    },
    {
        title: "Customer",
        icon: Users,
        links: [
            { name: "Get a Quote", path: "/quote" },
            { name: "Order Tracking", path: "/quote" },
            { name: "Sample Request", path: "/contact" },
            { name: "Support", path: "/contact" },
        ],
    },
    {
        title: "Company",
        icon: MapPin,
        links: [
            { name: "Careers", path: "/careers" },
            { name: "Our Team", path: "/about" },
            { name: "Company News", path: "/blog" },
            { name: "Awards & Recognition", path: "/about" },
        ],
    },
    {
        title: "Legal",
        icon: Lock,
        links: [
            { name: "Privacy Policy", path: "/privacy" },
            { name: "Terms & Conditions", path: "/terms" },
            { name: "Cookie Policy", path: "/privacy" },
            { name: "Accessibility", path: "/" },
        ],
    },
];
export default function SitemapPage() {
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
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-slate-900", children: [_jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 pb-16", children: [_jsx("div", { className: "absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50" }), _jsx("div", { className: "absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40" }), _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center", children: [_jsxs("h1", { className: "text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6", children: ["Site", " ", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Map" })] }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300", children: "Explore all pages and resources available on Shrestha Services website." })] }) })] }), _jsx("section", { className: "py-20", children: _jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: siteMap.map((category, idx) => {
                            const Icon = category.icon;
                            return (_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "p-8 h-full", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center", children: _jsx(Icon, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }), _jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white", children: category.title })] }), _jsx("nav", { className: "space-y-3", children: category.links.map((link, linkIdx) => (_jsxs(Link, { to: link.path, className: "group flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300", children: [_jsx("span", { className: "text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors", children: link.name }), _jsx(ArrowRight, { className: "w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" })] }, linkIdx))) })] }) }, idx));
                        }) }) }) }), _jsx("section", { className: "py-20 bg-slate-50 dark:bg-slate-800/50", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-4", children: "Website Overview" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300", children: "Quick navigation to help you find what you need" })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid md:grid-cols-4 gap-6", children: [
                                { label: "Total Pages", value: "25+", icon: BarChart3 },
                                { label: "Services", value: "6+", icon: Briefcase },
                                { label: "Blog Posts", value: "6", icon: FileText },
                                { label: "Resources", value: "20+", icon: MapPin },
                            ].map((stat, idx) => {
                                const StatIcon = stat.icon;
                                return (_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "p-6 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4", children: _jsx(StatIcon, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }), _jsx("p", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-2", children: stat.value }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: stat.label })] }) }, idx));
                            }) })] }) }), _jsx("section", { className: "py-20", children: _jsx("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-12", children: [_jsx(Mail, { className: "w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: "Can't Find What You're Looking For?" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 mb-8", children: "Our support team is here to help. Get in touch with any questions about navigating our website or services." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors", children: ["Contact Support", _jsx(ArrowRight, { className: "w-5 h-5" })] }), _jsx(Link, { to: "/faq", className: "inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "View FAQ" })] })] }) }) })] }));
}
