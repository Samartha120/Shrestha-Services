import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function PageHeader({ title, subtitle, }) {
    return (_jsxs(motion.div, { initial: {
            opacity: 0,
            y: 30,
        }, animate: {
            opacity: 1,
            y: 0,
        }, className: "py-16 text-center", children: [_jsx("h1", { className: "\r\n        text-4xl\r\n        md:text-5xl\r\n        font-bold\r\n        ", children: title }), subtitle && (_jsx("p", { className: "\r\n          mt-4\r\n          text-slate-500\r\n          max-w-2xl\r\n          mx-auto\r\n          ", children: subtitle }))] }));
}
