import { jsx as _jsx } from "react/jsx-runtime";
import { User } from "lucide-react";
const sizeMap = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
};
export default function Avatar({ src, alt, size = "md", }) {
    if (!src) {
        return (_jsx("div", { className: `
        ${sizeMap[size]}
        flex
        items-center
        justify-center
        rounded-full
        bg-slate-200
        `, children: _jsx(User, { size: 22 }) }));
    }
    return (_jsx("img", { src: src, alt: alt, className: `
      ${sizeMap[size]}
      rounded-full
      object-cover
      ` }));
}
