import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Radio({ checked, value, label, onChange, }) {
    return (_jsxs("label", { className: "\r\n      flex\r\n      items-center\r\n      gap-2\r\n      cursor-pointer\r\n      ", children: [_jsx("input", { type: "radio", checked: checked, value: value, onChange: () => onChange(value) }), _jsx("span", { children: label })] }));
}
