import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Breadcrumb({ items, }) {
    return (_jsx("nav", { "aria-label": "breadcrumb", children: _jsx("ol", { className: "flex items-center gap-2 text-sm text-slate-500", children: items.map((item, index) => {
                const last = index === items.length - 1;
                return (_jsxs(motion.li, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex items-center gap-2", children: [last ? (_jsx("span", { className: "font-medium text-slate-900", children: item.label })) : (_jsx(Link, { to: item.href || "#", className: "hover:text-blue-600", children: item.label })), !last && (_jsx(ChevronRight, { size: 14 }))] }, item.label));
            }) }) }));
}
