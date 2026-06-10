import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
export default function Accordion({ items, }) {
    const [active, setActive] = useState(null);
    return (_jsx("div", { className: "space-y-4", children: items.map((item, index) => {
            const isOpen = active === index;
            return (_jsxs("div", { className: "\r\n            rounded-2xl\r\n            border\r\n            border-slate-200\r\n            overflow-hidden\r\n            ", children: [_jsxs("button", { onClick: () => setActive(isOpen
                            ? null
                            : index), className: "\r\n              flex\r\n              w-full\r\n              items-center\r\n              justify-between\r\n              p-5\r\n              ", children: [_jsx("span", { className: "font-medium", children: item.title }), _jsx(motion.div, { animate: {
                                    rotate: isOpen
                                        ? 180
                                        : 0,
                                }, children: _jsx(ChevronDown, {}) })] }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: {
                                height: 0,
                                opacity: 0,
                            }, animate: {
                                height: "auto",
                                opacity: 1,
                            }, exit: {
                                height: 0,
                                opacity: 0,
                            }, children: _jsx("div", { className: "p-5 pt-0", children: item.content }) })) })] }, index));
        }) }));
}
