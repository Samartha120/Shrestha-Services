import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
export default function AuthProvider({ children }) {
    const { checkAuth } = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    return _jsx(_Fragment, { children: children });
}
