import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search, X, } from "lucide-react";
export default function SearchBar({ value, onChange, placeholder = "Search...", }) {
    return (_jsxs("div", { className: "relative", children: [_jsx(Search, { size: 18, className: "\r\n        absolute\r\n        left-3\r\n        top-1/2\r\n        -translate-y-1/2\r\n        text-slate-400\r\n        " }), _jsx("input", { value: value, placeholder: placeholder, onChange: (e) => onChange(e.target.value), className: "\r\n        w-full\r\n        rounded-xl\r\n        border\r\n        border-slate-300\r\n        py-3\r\n        pl-10\r\n        pr-10\r\n        " }), value && (_jsx("button", { onClick: () => onChange(""), className: "\r\n          absolute\r\n          right-3\r\n          top-1/2\r\n          -translate-y-1/2\r\n          ", children: _jsx(X, { size: 16 }) }))] }));
}
