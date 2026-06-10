import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Tabs({ tabs, }) {
    const [active, setActive] = useState(0);
    return (_jsxs("div", { children: [_jsx("div", { className: "flex gap-2 border-b", children: tabs.map((tab, index) => (_jsxs("button", { onClick: () => setActive(index), className: "\r\n              relative\r\n              px-4\r\n              py-3\r\n              ", children: [tab.label, active ===
                            index && (_jsx(motion.div, { layoutId: "tab-indicator", className: "\r\n                  absolute\r\n                  bottom-0\r\n                  left-0\r\n                  right-0\r\n                  h-0.5\r\n                  bg-blue-600\r\n                  " }))] }, tab.label))) }), _jsx(motion.div, { initial: {
                    opacity: 0,
                    y: 10,
                }, animate: {
                    opacity: 1,
                    y: 0,
                }, className: "py-6", children: tabs[active]
                    ?.content }, active)] }));
}
