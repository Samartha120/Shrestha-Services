import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };
    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }
    componentDidCatch(error) {
        console.error(error);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { className: "\r\n          flex\r\n          min-h-[300px]\r\n          flex-col\r\n          items-center\r\n          justify-center\r\n          ", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Something went wrong" }), _jsx("button", { className: "\r\n            mt-4\r\n            rounded-lg\r\n            bg-blue-600\r\n            px-4\r\n            py-2\r\n            text-white\r\n            ", onClick: () => window.location.reload(), children: "Reload Page" })] }));
        }
        return this.props.children;
    }
}
