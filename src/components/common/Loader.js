import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
export default function Loader({ text = "Loading...", }) {
    return (_jsxs("div", { className: "\r\n      flex\r\n      flex-col\r\n      items-center\r\n      justify-center\r\n      py-10\r\n      ", children: [_jsx(Loader2, { size: 32, className: "animate-spin" }), _jsx("p", { className: "mt-3 text-slate-500", children: text })] }));
}
