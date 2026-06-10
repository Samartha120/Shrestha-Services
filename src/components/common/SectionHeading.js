import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function SectionHeading({ title, subtitle, center = true, }) {
    return (_jsxs(motion.div, { initial: {
            opacity: 0,
            y: 20,
        }, whileInView: {
            opacity: 1,
            y: 0,
        }, viewport: {
            once: true,
        }, className: center
            ? "text-center mb-12"
            : "mb-12", children: [_jsx("h2", { className: "\r\n        text-3xl\r\n        md:text-4xl\r\n        font-bold\r\n        ", children: title }), subtitle && (_jsx("p", { className: "\r\n          mt-3\r\n          text-slate-500\r\n          max-w-2xl\r\n          mx-auto\r\n          ", children: subtitle }))] }));
}
