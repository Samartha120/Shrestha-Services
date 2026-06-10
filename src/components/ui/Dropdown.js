import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, } from "react";
import { motion, AnimatePresence, } from "framer-motion";
import { ChevronDown, } from "lucide-react";
export default function Dropdown({ options, value, onChange, }) {
    const [open, setOpen] = useState(false);
    const selected = options.find((o) => o.value === value);
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setOpen(!open), className: "\r\n        flex\r\n        w-full\r\n        items-center\r\n        justify-between\r\n        rounded-xl\r\n        border\r\n        px-4\r\n        py-3\r\n        ", children: [selected?.label ||
                        "Select", _jsx(ChevronDown, {})] }), _jsx(AnimatePresence, { children: open && (_jsx(motion.div, { initial: {
                        opacity: 0,
                        y: 10,
                    }, animate: {
                        opacity: 1,
                        y: 0,
                    }, exit: {
                        opacity: 0,
                        y: 10,
                    }, className: "\r\n            absolute\r\n            z-20\r\n            mt-2\r\n            w-full\r\n            rounded-xl\r\n            border\r\n            bg-white\r\n            shadow-lg\r\n            ", children: options.map((option) => (_jsx("button", { className: "\r\n                  block\r\n                  w-full\r\n                  px-4\r\n                  py-3\r\n                  text-left\r\n                  hover:bg-slate-50\r\n                  ", onClick: () => {
                            onChange(option.value);
                            setOpen(false);
                        }, children: option.label }, option.value))) })) })] }));
}
