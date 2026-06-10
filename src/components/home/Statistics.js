import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { statistics } from "@/data/statistics";
import { CheckCircle, Users, TrendingUp, Award } from "lucide-react";
const iconMap = {
    "Projects Completed": CheckCircle,
    "Happy Clients": Users,
    "Years Experience": TrendingUp,
    "Awards": Award,
};
function AnimatedCounter({ end }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    useEffect(() => {
        if (isInView) {
            let currentCount = 0;
            const step = end / 50;
            const timer = setInterval(() => {
                currentCount += step;
                if (currentCount >= end) {
                    setCount(end);
                    clearInterval(timer);
                }
                else {
                    setCount(Math.floor(currentCount));
                }
            }, 30);
            return () => clearInterval(timer);
        }
    }, [isInView, end]);
    return (_jsxs("span", { ref: ref, className: "text-4xl sm:text-5xl font-bold", children: [count, "+"] }));
}
export default function Statistics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (_jsxs("section", { ref: ref, className: "py-20 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" }), _jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12", children: statistics.map((stat, idx) => {
                        const Icon = iconMap[stat.label];
                        return (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }, transition: { duration: 0.6, delay: idx * 0.15 }, className: "text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4", children: _jsx(Icon, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-white mb-2", children: _jsx(AnimatedCounter, { end: stat.value }) }), _jsx("p", { className: "text-blue-100 font-medium text-lg", children: stat.label })] }, stat.label));
                    }) }) })] }));
}
