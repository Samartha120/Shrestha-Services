import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AnimatePresence, motion, } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, } from "react";
export default function Dialog({ open, title, description, children, onClose, }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);
    return (_jsx(AnimatePresence, { children: open && (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "\r\n            fixed\r\n            inset-0\r\n            bg-black/50\r\n            backdrop-blur-sm\r\n            z-50\r\n            ", onClick: onClose, initial: {
                        opacity: 0,
                    }, animate: {
                        opacity: 1,
                    }, exit: {
                        opacity: 0,
                    } }), _jsxs(motion.div, { initial: {
                        opacity: 0,
                        scale: 0.9,
                        y: 20,
                    }, animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }, exit: {
                        opacity: 0,
                        scale: 0.9,
                        y: 20,
                    }, transition: {
                        duration: 0.25,
                    }, className: "\r\n            fixed\r\n            left-1/2\r\n            top-1/2\r\n            z-50\r\n            w-full\r\n            max-w-lg\r\n            -translate-x-1/2\r\n            -translate-y-1/2\r\n            rounded-3xl\r\n            bg-white\r\n            p-6\r\n            shadow-2xl\r\n            ", children: [_jsxs("div", { className: "\r\n              mb-4\r\n              flex\r\n              items-start\r\n              justify-between\r\n              ", children: [_jsxs("div", { children: [title && (_jsx("h2", { className: "\r\n                    text-xl\r\n                    font-bold\r\n                    ", children: title })), description && (_jsx("p", { className: "\r\n                    mt-1\r\n                    text-sm\r\n                    text-slate-500\r\n                    ", children: description }))] }), _jsx("button", { onClick: onClose, className: "\r\n                rounded-lg\r\n                p-2\r\n                hover:bg-slate-100\r\n                ", children: _jsx(X, { size: 18 }) })] }), children] })] })) }));
}
