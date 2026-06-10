import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import Skeleton from "./Skeleton";
export default function Table({ data, columns, loading, emptyMessage = "No data found", }) {
    if (loading) {
        return (_jsx("div", { className: "space-y-3", children: Array.from({
                length: 5,
            }).map((_, index) => (_jsx(Skeleton, { className: "\r\n            h-12\r\n            w-full\r\n            " }, index))) }));
    }
    if (!data.length) {
        return (_jsx("div", { className: "\r\n        rounded-2xl\r\n        border\r\n        border-dashed\r\n        p-8\r\n        text-center\r\n        text-slate-500\r\n        ", children: emptyMessage }));
    }
    return (_jsx("div", { className: "\r\n      overflow-hidden\r\n      rounded-2xl\r\n      border\r\n      border-slate-200\r\n      ", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "\r\n          min-w-full\r\n          divide-y\r\n          divide-slate-200\r\n          ", children: [_jsx("thead", { className: "\r\n            bg-slate-50\r\n            ", children: _jsx("tr", { children: columns.map((column) => (_jsx("th", { className: "\r\n                    px-6\r\n                    py-4\r\n                    text-left\r\n                    text-sm\r\n                    font-semibold\r\n                    text-slate-700\r\n                    ", children: column.header }, String(column.key)))) }) }), _jsx("tbody", { className: "\r\n            divide-y\r\n            divide-slate-100\r\n            bg-white\r\n            ", children: data.map((row, rowIndex) => (_jsx("tr", { className: "\r\n                  transition-colors\r\n                  hover:bg-slate-50\r\n                  ", children: columns.map((column) => (_jsx("td", { className: "\r\n                        px-6\r\n                        py-4\r\n                        text-sm\r\n                        ", children: column.render
                                    ? column.render(row[column
                                        .key], row)
                                    : String(row[column
                                        .key]) }, String(column.key)))) }, rowIndex))) })] }) }) }));
}
