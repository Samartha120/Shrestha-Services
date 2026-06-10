import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Divider({ label, }) {
    if (!label) {
        return (_jsx("div", { className: "\r\n        h-px\r\n        w-full\r\n        bg-slate-200\r\n        " }));
    }
    return (_jsxs("div", { className: "\r\n      flex\r\n      items-center\r\n      gap-4\r\n      ", children: [_jsx("div", { className: "h-px flex-1 bg-slate-200" }), _jsx("span", { className: "\r\n        text-sm\r\n        text-slate-500\r\n        ", children: label }), _jsx("div", { className: "h-px flex-1 bg-slate-200" })] }));
}
