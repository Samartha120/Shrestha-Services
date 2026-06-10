import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, } from "react";
const TextArea = forwardRef(({ label, error, ...props }, ref) => {
    return (_jsxs("div", { className: "space-y-2", children: [label && (_jsx("label", { className: "block text-sm font-semibold text-slate-700 dark:text-slate-300", children: label })), _jsx("textarea", { ref: ref, rows: 6, className: "\r\n          w-full\r\n          rounded-xl\r\n          border\r\n          border-slate-300\r\n          dark:border-slate-800\r\n          bg-white\r\n          dark:bg-slate-900/50\r\n          text-slate-950\r\n          dark:text-slate-50\r\n          placeholder-slate-400\r\n          dark:placeholder-slate-500\r\n          p-4\r\n          transition-all\r\n          duration-300\r\n          focus:outline-none\r\n          focus:ring-2\r\n          focus:ring-blue-500\r\n          focus:border-blue-500\r\n          hover:border-slate-400\r\n          dark:hover:border-slate-700\r\n          ", ...props }), error && (_jsx("p", { className: "text-sm font-medium text-red-500 dark:text-red-400", children: error }))] }));
});
TextArea.displayName =
    "TextArea";
export default TextArea;
