import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Printer, Mail, Lock } from "lucide-react";
export default function LoginPage() {
    const navigate = useNavigate();
    const { login, error: authError, clearError } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");
        clearError();
        if (!email || !password) {
            setValidationError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            const user = await login({ email, password });
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            }
            else {
                navigate("/dashboard");
            }
        }
        catch (err) {
            // Error handled by store
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12", children: _jsxs("div", { className: "w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-100/50 dark:shadow-none", children: [_jsxs("div", { className: "flex flex-col items-center mb-8 text-center", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4", children: _jsx(Printer, { className: "h-6 w-6 text-white" }) }), _jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Welcome Back" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1.5", children: "Log in to manage your quotes and printing orders" })] }), _jsxs("div", { className: "mb-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 text-xs space-y-1.5", children: [_jsx("p", { className: "font-semibold text-blue-700 dark:text-blue-400", children: "Quick Test Credentials:" }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-350", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-slate-700 dark:text-slate-300", children: "Customer Acc:" }), _jsx("p", { children: "customer@shrestha.com" }), _jsx("p", { children: "customer123" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-slate-700 dark:text-slate-300", children: "Admin Acc:" }), _jsx("p", { children: "admin@shrestha.com" }), _jsx("p", { children: "admin123" })] })] })] }), (validationError || authError) && (_jsx("div", { className: "mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400", children: validationError || authError })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsx(Input, { label: "Email Address", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "name@company.com", leftIcon: _jsx(Mail, { size: 18, className: "text-slate-400" }) }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("label", { className: "text-sm font-medium", children: "Password" }), _jsx(Link, { to: "/forgot-password", className: "text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline", children: "Forgot?" })] }), _jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", leftIcon: _jsx(Lock, { size: 18, className: "text-slate-400" }) })] }), _jsx(Button, { type: "submit", loading: loading, className: "w-full mt-2", children: "Sign In" })] }), _jsxs("div", { className: "mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-500", children: ["New to Shrestha Services?", " ", _jsx(Link, { to: "/register", className: "font-semibold text-blue-600 dark:text-blue-400 hover:underline", children: "Create an account" })] })] }) }));
}
