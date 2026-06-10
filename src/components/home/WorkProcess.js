import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, Printer, CheckCircle2 } from "lucide-react";
const steps = [
    {
        icon: MessageSquare,
        title: "Consultation",
        description: "Discuss your requirements and get expert advice.",
    },
    {
        icon: PenTool,
        title: "Design & Proof",
        description: "Create designs and get your approval before printing.",
    },
    {
        icon: Printer,
        title: "Production",
        description: "High-quality printing using top-of-the-line equipment.",
    },
    {
        icon: CheckCircle2,
        title: "Delivery",
        description: "Safe and timely delivery to your doorstep.",
    },
];
export default function WorkProcess() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (_jsx("section", { ref: ref, className: "py-20 lg:py-28 bg-white dark:bg-slate-950", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("span", { className: "inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full mb-4", children: "Our Process" }), _jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4", children: "How We Work" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto", children: "Simple, transparent, and efficient process from start to finish" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4", children: steps.map((step, idx) => {
                                const Icon = step.icon;
                                return (_jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }, transition: { duration: 0.6, delay: idx * 0.15 }, className: "relative text-center", children: [_jsxs("div", { className: "relative z-10 w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl", children: [_jsx("span", { className: "absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-slate-950 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400 border-4 border-blue-100 dark:border-blue-800", children: idx + 1 }), _jsx(Icon, { className: "w-14 h-14 text-white" })] }), _jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2", children: step.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: step.description })] }, idx));
                            }) })] })] }) }));
}
