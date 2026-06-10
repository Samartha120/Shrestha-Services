import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, } from "react";
import { motion, AnimatePresence, } from "framer-motion";
export default function Tooltip({ content, children, }) {
    const [open, setOpen] = useState(false);
    return (_jsxs("div", { className: "\r\n      relative\r\n      inline-block\r\n      ", onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), children: [children, _jsx(AnimatePresence, { children: open && (_jsx(motion.div, { initial: {
                        opacity: 0,
                        y: 5,
                    }, animate: {
                        opacity: 1,
                        y: 0,
                    }, exit: {
                        opacity: 0,
                        y: 5,
                    }, className: "\r\n            absolute\r\n            bottom-full\r\n            left-1/2\r\n            mb-2\r\n            -translate-x-1/2\r\n            rounded-lg\r\n            bg-slate-900\r\n            px-3\r\n            py-2\r\n            text-xs\r\n            text-white\r\n            whitespace-nowrap\r\n            ", children: content })) })] }));
}
