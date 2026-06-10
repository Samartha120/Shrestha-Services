import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle } from "lucide-react";
export default function ErrorMessage({ message, }) {
    return (_jsxs("div", { className: "\r\n      flex\r\n      items-center\r\n      gap-3\r\n      rounded-xl\r\n      bg-red-50\r\n      border\r\n      border-red-200\r\n      p-4\r\n      text-red-600\r\n      ", children: [_jsx(AlertCircle, { size: 18 }), _jsx("span", { children: message })] }));
}
