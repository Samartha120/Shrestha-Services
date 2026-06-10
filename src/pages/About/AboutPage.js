import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import Card from "@/components/ui/Card";
import { Award, Users, Zap, Target, CircleCheck as CheckCircle2 } from "lucide-react";
const stats = [
    { value: "10+", label: "Years of Experience", icon: Award },
    { value: "500+", label: "Projects Completed", icon: CheckCircle2 },
    { value: "350+", label: "Happy Clients", icon: Users },
    { value: "15", label: "Awards Won", icon: Award },
];
const missionVisionValues = [
    {
        icon: Target,
        title: "Our Mission",
        description: "To deliver premium quality printing solutions that exceed customer expectations while maintaining the highest standards of craftsmanship and service excellence.",
    },
    {
        icon: Zap,
        title: "Our Vision",
        description: "To be the most trusted and innovative printing partner in Nepal, known for reliability, creativity, and unwavering commitment to customer success.",
    },
    {
        icon: Award,
        title: "Our Values",
        description: "Quality, integrity, innovation, and customer-centric approach guide every decision we make. We believe in building lasting relationships through trust and excellence.",
    },
];
const teamMembers = [
    {
        name: "Raj Shrestha",
        role: "Founder & CEO",
        initials: "RS",
        bio: "20+ years in printing industry",
    },
    {
        name: "Priya Sharma",
        role: "Operations Manager",
        initials: "PS",
        bio: "Expert in process optimization",
    },
    {
        name: "Amit Karki",
        role: "Design Lead",
        initials: "AK",
        bio: "Creative excellence specialist",
    },
    {
        name: "Sunita Thapa",
        role: "Quality Assurance",
        initials: "ST",
        bio: "Premium standards guardian",
    },
];
const timeline = [
    {
        year: "2014",
        title: "The Beginning",
        description: "Founded Shrestha Services with a vision to revolutionize printing in Nepal.",
    },
    {
        year: "2017",
        title: "Expansion",
        description: "Added advanced digital printing technology and expanded team to 15+ members.",
    },
    {
        year: "2020",
        title: "Innovation",
        description: "Launched eco-friendly printing solutions and won sustainability award.",
    },
    {
        year: "2024",
        title: "Excellence",
        description: "Achieved 500+ projects milestone and became industry benchmark for quality.",
    },
];
const equipmentCategories = [
    { name: "Digital Printers", count: 12, icon: "🖨️" },
    { name: "Offset Presses", count: 8, icon: "⚙️" },
    { name: "Finishing Equipment", count: 15, icon: "✂️" },
    { name: "Wide Format Printers", count: 6, icon: "📏" },
];
export default function AboutPage() {
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
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950", children: [_jsx("div", { className: "absolute top-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" }), _jsx("div", { className: "absolute bottom-40 left-20 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-20" }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "text-center max-w-3xl mx-auto", children: [_jsxs(motion.div, { variants: itemVariants, className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6", children: [_jsxs("span", { className: "relative flex h-2 w-2", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-blue-500" })] }), _jsx("span", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "Our Story" })] }), _jsxs(motion.h1, { variants: itemVariants, className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6", children: ["Crafting Excellence, ", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "One Print at a Time" })] }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-slate-600 dark:text-slate-300 mb-10", children: "From humble beginnings to industry leadership, Shrestha Services has been committed to delivering premium printing solutions with unmatched quality and reliability." })] }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, className: "grid md:grid-cols-3 gap-8", children: missionVisionValues.map((item, idx) => {
                        const Icon = item.icon;
                        return (_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "p-8 h-full", children: [_jsx("div", { className: "h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-6", children: _jsx(Icon, { className: "h-7 w-7 text-blue-600 dark:text-blue-400" }) }), _jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-3", children: item.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-400 leading-relaxed", children: item.description })] }) }, idx));
                    }) }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.5 }, children: _jsx(Card, { className: "p-8 sm:p-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 border-0 shadow-lg", children: _jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8", children: stats.map((stat, idx) => {
                                const Icon = stat.icon;
                                return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: idx * 0.1, duration: 0.5 }, className: "text-center text-white", children: [_jsx(Icon, { className: "h-8 w-8 mx-auto mb-3 opacity-80" }), _jsx("div", { className: "text-4xl sm:text-5xl font-bold mb-2", children: stat.value }), _jsx("div", { className: "text-sm opacity-90", children: stat.label })] }, idx));
                            }) }) }) }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, children: [_jsx(motion.h2, { variants: itemVariants, className: "text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4", children: "Meet Our Team" }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12", children: "Talented professionals dedicated to delivering excellence in every project" }), _jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: teamMembers.map((member, idx) => (_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "p-6 h-full text-center", children: [_jsx("div", { className: "h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl", children: member.initials }), _jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-1", children: member.name }), _jsx("p", { className: "text-sm text-blue-600 dark:text-blue-400 font-medium mb-3", children: member.role }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: member.bio })] }) }, idx))) })] }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, children: [_jsx(motion.h2, { variants: itemVariants, className: "text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12", children: "Our Journey" }), _jsx("div", { className: "space-y-8", children: timeline.map((item, idx) => (_jsx(motion.div, { variants: itemVariants, children: _jsxs("div", { className: "flex gap-6 sm:gap-8", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0", children: idx + 1 }), idx < timeline.length - 1 && (_jsx("div", { className: "w-1 h-20 bg-gradient-to-b from-blue-600 to-transparent mt-2" }))] }), _jsxs(Card, { className: "p-6 sm:p-8 flex-1", children: [_jsx("div", { className: "text-sm font-bold text-blue-600 dark:text-blue-400 mb-2", children: item.year }), _jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2", children: item.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: item.description })] })] }) }, idx))) })] }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, children: [_jsx(motion.h2, { variants: itemVariants, className: "text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-4", children: "Our Equipment" }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12", children: "State-of-the-art machinery ensuring premium quality on every project" }), _jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: equipmentCategories.map((category, idx) => (_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "p-8 text-center h-full", children: [_jsx("div", { className: "text-5xl mb-4", children: category.icon }), _jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-2", children: category.name }), _jsxs("p", { className: "text-3xl font-bold text-blue-600 dark:text-blue-400", children: [category.count, "+"] })] }) }, idx))) })] }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.5 }, children: _jsxs(Card, { className: "p-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/50", children: [_jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6", children: "Ready to bring your vision to life?" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8", children: "Let's work together to create something extraordinary. Get started with a free consultation today." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/quote", children: _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white h-12 px-8", children: "Get Free Quote" }) }), _jsx(Link, { to: "/contact", children: _jsx(Button, { variant: "outline", className: "h-12 px-8", children: "Contact Us" }) })] })] }) }) })] }));
}
