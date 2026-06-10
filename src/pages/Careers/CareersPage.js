import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Users, Heart, Zap, Award, Briefcase, FileText, } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
const positions = [
    {
        id: "1",
        title: "Senior Graphic Designer",
        department: "Design",
        type: "Full-time",
        location: "Biratnagar",
        salary: "NPR 60,000 - 80,000",
        description: "We're looking for a creative and experienced graphic designer to lead our design projects and mentor junior designers.",
        requirements: [
            "5+ years of graphic design experience",
            "Proficiency in Adobe Creative Suite",
            "Strong portfolio of print and digital work",
            "Excellent communication skills",
        ],
    },
    {
        id: "2",
        title: "Production Manager",
        department: "Operations",
        type: "Full-time",
        location: "Biratnagar",
        salary: "NPR 50,000 - 70,000",
        description: "Manage our printing production operations, quality control, and ensure timely delivery of all projects.",
        requirements: [
            "3+ years in production management",
            "Knowledge of printing processes",
            "Strong organizational skills",
            "Leadership experience",
        ],
    },
    {
        id: "3",
        title: "Account Executive",
        department: "Sales",
        type: "Full-time",
        location: "Biratnagar",
        salary: "NPR 40,000 - 60,000",
        description: "Build and maintain client relationships, identify new business opportunities, and drive sales growth.",
        requirements: [
            "2+ years in sales or account management",
            "Excellent negotiation skills",
            "CRM software experience",
            "Track record of meeting targets",
        ],
    },
    {
        id: "4",
        title: "Web Developer",
        department: "Technology",
        type: "Full-time",
        location: "Biratnagar",
        salary: "NPR 45,000 - 65,000",
        description: "Develop and maintain our web presence, creating responsive and user-friendly websites for our business.",
        requirements: [
            "3+ years of web development",
            "React, TypeScript, and Tailwind CSS knowledge",
            "Responsive design expertise",
            "Git and modern development practices",
        ],
    },
    {
        id: "5",
        title: "Content Marketing Specialist",
        department: "Marketing",
        type: "Part-time",
        location: "Remote",
        salary: "NPR 30,000 - 40,000",
        description: "Create engaging content for our blog, social media, and marketing materials that showcase our expertise.",
        requirements: [
            "2+ years in content creation",
            "SEO knowledge",
            "Strong writing skills",
            "Social media management experience",
        ],
    },
];
const benefits = [
    {
        icon: Heart,
        title: "Health & Wellness",
        description: "Comprehensive health insurance and wellness programs",
    },
    {
        icon: Zap,
        title: "Professional Growth",
        description: "Training, certifications, and career development opportunities",
    },
    {
        icon: Users,
        title: "Collaborative Culture",
        description: "Work in a supportive environment with talented professionals",
    },
    {
        icon: Award,
        title: "Competitive Compensation",
        description: "Competitive salaries and performance-based bonuses",
    },
    {
        icon: Briefcase,
        title: "Flexible Work",
        description: "Flexible hours and remote work options available",
    },
    {
        icon: Clock,
        title: "Work-Life Balance",
        description: "Generous leave policies and time off",
    },
];
export default function CareersPage() {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
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
    return (_jsxs("div", { className: "min-h-screen bg-white dark:bg-slate-900", children: [_jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 pb-16", children: [_jsx("div", { className: "absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50" }), _jsx("div", { className: "absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40" }), _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center", children: [_jsxs("h1", { className: "text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6", children: ["Join Our", " ", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Team" })] }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300", children: "Be part of a growing company that's transforming the printing industry with innovation and excellence." })] }) })] }), _jsx("section", { className: "py-20", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6", children: "Our Culture" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto", children: "We believe in creating an environment where talented individuals can do their best work, grow professionally, and make a real impact." })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16", children: benefits.map((benefit, idx) => {
                                const Icon = benefit.icon;
                                return (_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "p-8 h-full", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4", children: _jsx(Icon, { className: "w-6 h-6 text-blue-600 dark:text-blue-400" }) }), _jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2", children: benefit.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: benefit.description })] }) }, idx));
                            }) })] }) }), _jsx("section", { className: "py-20 bg-slate-50 dark:bg-slate-800/50", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6", children: "Open Positions" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300", children: "Explore current job opportunities at Shrestha Services." })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "space-y-4", children: positions.map((position) => (_jsx(motion.div, { variants: itemVariants, children: _jsx("div", { className: "p-8 cursor-pointer transition-all rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)]", onClick: () => setSelectedPosition(selectedPosition?.id === position.id ? null : position), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-grow", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4", children: [_jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: position.title }), _jsx("span", { className: "inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold", children: position.type })] }), _jsxs("div", { className: "flex flex-wrap gap-4 mb-4 text-slate-600 dark:text-slate-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Briefcase, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: position.department })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: position.location })] }), _jsx("div", { className: "text-sm font-semibold text-blue-600 dark:text-blue-400", children: position.salary })] }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: position.description }), selectedPosition?.id === position.id && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "mt-6 pt-6 border-t border-slate-200 dark:border-slate-700", children: [_jsx("h4", { className: "font-semibold text-slate-900 dark:text-white mb-3", children: "Requirements:" }), _jsx("ul", { className: "space-y-2", children: position.requirements.map((req, idx) => (_jsxs("li", { className: "flex items-start gap-2 text-slate-600 dark:text-slate-400", children: [_jsx("span", { className: "text-blue-600 dark:text-blue-400 mt-1", children: "\u2022" }), req] }, idx))) }), _jsx("div", { className: "mt-6 flex gap-3", children: _jsxs(Button, { variant: "primary", size: "md", onClick: () => setShowApplicationForm(true), children: ["Apply Now", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] }))] }), _jsx(ArrowRight, { className: `w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ml-4 ${selectedPosition?.id === position.id
                                                    ? "rotate-90"
                                                    : ""}` })] }) }) }, position.id))) })] }) }), showApplicationForm && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: _jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: "Apply Now" }), _jsx("button", { onClick: () => setShowApplicationForm(false), className: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300", children: "\u2715" })] }), _jsxs("form", { className: "space-y-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-900 dark:text-white mb-2", children: "First Name" }), _jsx("input", { type: "text", className: "w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600", placeholder: "John" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-900 dark:text-white mb-2", children: "Last Name" }), _jsx("input", { type: "text", className: "w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600", placeholder: "Doe" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-900 dark:text-white mb-2", children: "Email" }), _jsx("input", { type: "email", className: "w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600", placeholder: "john@example.com" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-900 dark:text-white mb-2", children: "Phone Number" }), _jsx("input", { type: "tel", className: "w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600", placeholder: "+977 98..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-900 dark:text-white mb-2", children: "Message" }), _jsx("textarea", { rows: 4, className: "w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600", placeholder: "Tell us about yourself..." })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { variant: "primary", size: "lg", className: "flex-grow", children: "Submit Application" }), _jsx(Button, { variant: "outline", size: "lg", onClick: () => setShowApplicationForm(false), children: "Cancel" })] })] })] }) }) })), _jsx("section", { className: "py-20", children: _jsx("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-12", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center", children: _jsx(FileText, { className: "w-8 h-8 text-blue-600" }) }) }), _jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: "Don't See Your Dream Role?" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 mb-8", children: "Send us your resume and we'll keep it on file for future opportunities that match your skills and interests." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/contact", children: _jsxs(Button, { variant: "primary", size: "lg", children: ["Send Resume", _jsx(ArrowRight, { className: "w-5 h-5 ml-2" })] }) }), _jsx("a", { href: "mailto:careers@shresthaservices.com", className: "inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "careers@shresthaservices.com" })] })] }) }) })] }));
}
