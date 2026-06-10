import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Pagination({ page, totalPages, onPageChange, }) {
    return (_jsxs("div", { className: "\r\n      flex\r\n      items-center\r\n      justify-center\r\n      gap-2\r\n      ", children: [_jsx("button", { disabled: page === 1, onClick: () => onPageChange(page - 1), children: "Prev" }), Array.from({
                length: totalPages,
            }).map((_, index) => (_jsx("button", { onClick: () => onPageChange(index + 1), className: `
          h-10
          w-10
          rounded-lg
          ${page === index + 1
                    ? "bg-blue-600 text-white"
                    : "border"}
          `, children: index + 1 }, index))), _jsx("button", { disabled: page === totalPages, onClick: () => onPageChange(page + 1), children: "Next" })] }));
}
