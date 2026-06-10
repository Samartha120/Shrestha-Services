import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
export default function Chip({ label, removable, onRemove, }) {
    return (_jsxs("div", { className: "\r\n      inline-flex\r\n      items-center\r\n      gap-2\r\n      rounded-full\r\n      bg-slate-100\r\n      px-3\r\n      py-2\r\n      text-sm\r\n      ", children: [label, removable && (_jsx("button", { onClick: onRemove, children: _jsx(X, { size: 14 }) }))] }));
}
