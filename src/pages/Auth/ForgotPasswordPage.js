import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Mail, CheckCircle } from "lucide-react";
export default function ForgotPasswordPage() {
    const { forgotPassword, error, clearError } = useAuthStore();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        if (!email)
            return;
        setLoading(true);
        try {
            await forgotPassword(email);
            setSuccess(true);
        }
        catch (err) {
            // handled
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12", children: _jsx("div", { className: "w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl", children: success ? (_jsxs("div", { className: "text-center space-y-4 py-6", children: [_jsx(CheckCircle, { className: "h-16 w-16 text-emerald-500 mx-auto" }), _jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Email Sent" }), _jsx("p", { className: "text-sm text-slate-500 max-w-sm mx-auto", children: "If an account with that email exists, we've sent instructions to reset your password." }), _jsx("div", { className: "pt-6", children: _jsx(Link, { to: "/login", className: "text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline", children: "Back to Sign In" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center mb-8 text-center", children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Reset Password" }), _jsx("p", { className: "text-sm text-slate-500 mt-2", children: "Enter your email address and we'll send you a recovery link" })] }), error && (_jsx("div", { className: "mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsx(Input, { label: "Email Address", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "name@company.com", leftIcon: _jsx(Mail, { size: 18, className: "text-slate-400" }), required: true }), _jsx(Button, { type: "submit", loading: loading, className: "w-full", children: "Send Reset Link" })] }), _jsx("div", { className: "mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-sm", children: _jsx(Link, { to: "/login", className: "font-semibold text-blue-600 dark:text-blue-400 hover:underline", children: "Back to Sign In" }) })] })) }) }));
}
