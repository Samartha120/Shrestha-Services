import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuthStore();
    const location = useLocation();
    if (isLoading) {
        return (_jsx("div", { className: "flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900", children: _jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" }) }));
    }
    return isAuthenticated ? (_jsx(Outlet, {})) : (_jsx(Navigate, { to: "/login", state: { from: location }, replace: true }));
}
