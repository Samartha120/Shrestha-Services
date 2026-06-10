import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Clock, Zap, Shield, Award, Users } from "lucide-react";
const features = [
    {
        icon: Zap,
        title: "Fast Delivery",
        description: "Quick turnaround time for all orders with same-day service available.",
    },
    {
        icon: Award,
        title: "Premium Quality",
        description: "We use only the best materials and latest printing technology.",
    },
    {
        icon: Shield,
        title: "100% Satisfaction",
        description: "Your satisfaction is our priority. We won't stop until you're happy.",
    },
    {
        icon: Users,
        title: "Expert Team",
        description: "Skilled designers and printers with years of industry experience.",
    },
    {
        icon: Clock,
        title: "24/7 Support",
        description: "Round-the-clock customer support to answer your queries.",
    },
    {
        icon: CheckCircle,
        title: "Competitive Pricing",
        description: "Best prices in the market without compromising on quality.",
    },
];
export default function WhyChooseUs() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (_jsx("section", { ref: ref, className: "py-20 lg:py-28 bg-slate-50 dark:bg-slate-900", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("span", { className: "inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full mb-4", children: "Why Choose Us" }), _jsx("h2", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4", children: "What Makes Us Different" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto", children: "We don't just print - we create experiences that leave lasting impressions" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (_jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }, transition: { duration: 0.6, delay: idx * 0.1 }, whileHover: { y: -4 }, className: "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-8", children: [_jsx("div", { className: "w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6", children: _jsx(Icon, { className: "w-7 h-7 text-blue-600 dark:text-blue-400" }) }), _jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-3", children: feature.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-400 leading-relaxed", children: feature.description })] }, idx));
                    }) })] }) }));
}
