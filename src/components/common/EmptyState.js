import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function EmptyState({ title, description, action, }) {
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "\r\n      flex\r\n      flex-col\r\n      items-center\r\n      justify-center\r\n      rounded-2xl\r\n      border\r\n      border-dashed\r\n      border-slate-300\r\n      p-12\r\n      text-center\r\n      ", children: [_jsx("h3", { className: "text-xl font-semibold", children: title }), description && (_jsx("p", { className: "mt-2 text-slate-500", children: description })), action && (_jsx("div", { className: "mt-6", children: action }))] }));
}
