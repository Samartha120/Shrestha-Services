import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState, } from "react";
import { Eye, EyeOff, } from "lucide-react";
const Input = forwardRef(({ label, error, helperText, leftIcon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    return (_jsxs("div", { className: "space-y-2", children: [label && (_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300", children: label })), _jsxs("div", { className: "relative", children: [leftIcon && (_jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500", children: leftIcon })), _jsx("input", { ref: ref, type: isPassword
                            ? showPassword
                                ? "text"
                                : "password"
                            : type, className: `
            w-full
            rounded-xl
            border
            bg-white
            dark:bg-slate-900/50
            text-slate-950
            dark:text-slate-50
            placeholder-slate-400
            dark:placeholder-slate-500
            px-4
            py-3
            transition-all
            duration-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            ${leftIcon
                            ? "pl-10"
                            : ""}
            ${error
                            ? "border-red-500 bg-red-50/10 focus:ring-red-500/50"
                            : "border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700"}
            `, ...props }), isPassword && (_jsx("button", { type: "button", className: "\r\n              absolute\r\n              right-3\r\n              top-1/2\r\n              -translate-y-1/2\r\n              text-slate-400\r\n              hover:text-slate-600\r\n              dark:hover:text-slate-350\r\n              ", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { size: 18 })) : (_jsx(Eye, { size: 18 })) }))] }), helperText && (_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: helperText })), error && (_jsx("p", { className: "text-sm text-red-500 dark:text-red-400 font-medium", children: error }))] }));
});
Input.displayName = "Input";
export default Input;
