import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AnimatePresence, motion, } from "framer-motion";
import { X } from "lucide-react";
export default function Modal({ open, title, children, onClose, }) {
    return (_jsx(AnimatePresence, { children: open && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: {
                        opacity: 0,
                    }, animate: {
                        opacity: 1,
                    }, exit: {
                        opacity: 0,
                    }, onClick: onClose, className: "\r\n            fixed\r\n            inset-0\r\n            bg-black/50\r\n            backdrop-blur-sm\r\n            z-50\r\n            " }), _jsxs(motion.div, { initial: {
                        opacity: 0,
                        scale: 0.95,
                    }, animate: {
                        opacity: 1,
                        scale: 1,
                    }, exit: {
                        opacity: 0,
                        scale: 0.95,
                    }, className: "\r\n            fixed\r\n            left-1/2\r\n            top-1/2\r\n            z-50\r\n            w-full\r\n            max-w-xl\r\n            -translate-x-1/2\r\n            -translate-y-1/2\r\n            rounded-3xl\r\n            bg-white\r\n            p-6\r\n            shadow-2xl\r\n            ", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("h3", { className: "text-xl font-semibold", children: title }), _jsx("button", { onClick: onClose, children: _jsx(X, { size: 18 }) })] }), children] })] })) }));
}
