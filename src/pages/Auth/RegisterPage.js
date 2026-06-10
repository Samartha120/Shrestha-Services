import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Printer, Check } from "lucide-react";
import { motion } from "framer-motion";
export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, error: authError, clearError } = useAuthStore();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState("");
    // Step 1 Fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Step 2 Fields
    const [companyName, setCompanyName] = useState("");
    const [registrationId, setRegistrationId] = useState("");
    const [industryType, setIndustryType] = useState("");
    // Step 3 Fields
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [zip, setZip] = useState("");
    const [street, setStreet] = useState("");
    // Step 4: Terms
    const [agreeTerms, setAgreeTerms] = useState(false);
    const handleNextStep = () => {
        setValidationError("");
        if (step === 1) {
            if (!name || !email || !password) {
                setValidationError("Please complete all fields in Step 1.");
                return;
            }
        }
        else if (step === 2) {
            if (!companyName || !industryType) {
                setValidationError("Company Name and Industry Type are required.");
                return;
            }
        }
        else if (step === 3) {
            if (!city || !stateName || !street) {
                setValidationError("City, State, and Street address are required.");
                return;
            }
        }
        setStep((prev) => prev + 1);
    };
    const handlePrevStep = () => {
        setValidationError("");
        setStep((prev) => Math.max(1, prev - 1));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");
        clearError();
        if (!agreeTerms) {
            setValidationError("You must agree to the Terms & Conditions.");
            return;
        }
        setLoading(true);
        try {
            await register({
                name,
                email,
                password,
                companyName,
                registrationId,
                industryType,
                city,
                stateName,
                zip,
                street,
            });
            setStep(5);
            setTimeout(() => {
                navigate("/dashboard");
            }, 2500);
        }
        catch (err) {
            // Handled by store
        }
        finally {
            setLoading(false);
        }
    };
    const steps = [
        { number: 1, label: "Account Info" },
        { number: 2, label: "Business Details" },
        { number: 3, label: "Address Details" },
        { number: 4, label: "Review & Terms" },
    ];
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12", children: _jsxs("div", { className: "w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl", children: [step < 5 ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center mb-8 text-center", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md mb-3", children: _jsx(Printer, { className: "h-5 w-5 text-white" }) }), _jsx("h2", { className: "text-xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Create Your Account" }), _jsx("p", { className: "text-xs text-slate-550 mt-1 dark:text-slate-400", children: "Register your business for digital printing & advertising services" })] }), _jsxs("div", { className: "mb-8 flex justify-between items-center relative", children: [_jsx("div", { className: "absolute left-0 right-0 h-1 bg-slate-100 dark:bg-slate-850 top-1/2 -translate-y-1/2 -z-10 rounded-full", children: _jsx(motion.div, { className: "h-full bg-blue-600 rounded-full", initial: { width: "0%" }, animate: { width: `${((step - 1) / (steps.length - 1)) * 100}%` }, transition: { duration: 0.4, ease: "easeInOut" } }) }), steps.map((s) => (_jsxs("div", { className: "flex flex-col items-center bg-white dark:bg-slate-900 px-3 z-10", children: [_jsx(motion.div, { initial: false, animate: {
                                                backgroundColor: step > s.number ? "#2563eb" : step === s.number ? "#eff6ff" : "#f8fafc",
                                                borderColor: step >= s.number ? "#2563eb" : "#e2e8f0",
                                                scale: step === s.number ? 1.15 : 1.0,
                                            }, className: `h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${step > s.number
                                                ? "text-white bg-blue-600 border-blue-650"
                                                : step === s.number
                                                    ? "text-blue-600 shadow-md shadow-blue-500/20 dark:bg-blue-955/40 dark:border-blue-500"
                                                    : "text-slate-400 dark:bg-slate-850 dark:border-slate-700"}`, children: step > s.number ? (_jsx(motion.div, { initial: { scale: 0, rotate: -30 }, animate: { scale: 1, rotate: 0 }, transition: { type: "spring", stiffness: 300, damping: 20 }, children: _jsx(Check, { size: 16, className: "stroke-[3]" }) })) : (_jsx("span", { children: s.number })) }), _jsx("span", { className: `text-[10px] font-bold mt-1.5 hidden sm:block ${step >= s.number ? "text-blue-650 dark:text-blue-405" : "text-slate-450 dark:text-slate-500"}`, children: s.label })] }, s.number)))] }), (validationError || authError) && (_jsx("div", { className: "mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-650 dark:text-red-400 font-semibold", children: validationError || authError })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [step === 1 && (_jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "Full Name", value: name, onChange: (e) => setName(e.target.value), placeholder: "Prabin Shrestha" }), _jsx(Input, { label: "Email Address", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "name@company.com" }), _jsx(Input, { label: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Choose a strong password" })] })), step === 2 && (_jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "Company Name", value: companyName, onChange: (e) => setCompanyName(e.target.value), placeholder: "Shrestha Prints Pvt. Ltd." }), _jsx(Input, { label: "Government Registration ID (PAN/VAT)", value: registrationId, onChange: (e) => setRegistrationId(e.target.value), placeholder: "PAN 600123456" }), _jsx(Input, { label: "Industry Type", value: industryType, onChange: (e) => setIndustryType(e.target.value), placeholder: "Retail / Hospitality / Marketing" })] })), step === 3 && (_jsxs("div", { className: "space-y-4 grid grid-cols-2 gap-4", children: [_jsx("div", { className: "col-span-2", children: _jsx(Input, { label: "Street Address", value: street, onChange: (e) => setStreet(e.target.value), placeholder: "Main Road, Ward 10" }) }), _jsx(Input, { label: "City", value: city, onChange: (e) => setCity(e.target.value), placeholder: "Biratnagar" }), _jsx(Input, { label: "State / Province", value: stateName, onChange: (e) => setStateName(e.target.value), placeholder: "Koshi Province" }), _jsx("div", { className: "col-span-2", children: _jsx(Input, { label: "Postal Code (ZIP)", value: zip, onChange: (e) => setZip(e.target.value), placeholder: "56600" }) })] })), step === 4 && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-150 dark:border-slate-800/80 text-sm space-y-3 text-slate-800 dark:text-slate-200", children: [_jsx("h4", { className: "font-bold border-b border-slate-200 dark:border-slate-800 pb-2 text-slate-900 dark:text-white", children: "Review Your Details" }), _jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", name] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", email] }), _jsxs("p", { children: [_jsx("strong", { children: "Company:" }), " ", companyName || "N/A"] }), _jsxs("p", { children: [_jsx("strong", { children: "PAN/VAT:" }), " ", registrationId || "N/A"] }), _jsxs("p", { children: [_jsx("strong", { children: "Address:" }), " ", street, ", ", city, ", ", stateName, " ", zip] })] }), _jsxs("label", { className: "flex items-start gap-3 text-sm cursor-pointer select-none", children: [_jsx("input", { type: "checkbox", checked: agreeTerms, onChange: (e) => setAgreeTerms(e.target.checked), className: "mt-1 rounded border-slate-350 dark:border-slate-800 text-blue-650 focus:ring-blue-500" }), _jsx("span", { className: "text-slate-655 dark:text-slate-350 font-semibold", children: "I agree to the Terms of Service and Privacy Policy of Shrestha Services Pvt. Ltd." })] })] })), _jsxs("div", { className: "flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800", children: [step > 1 ? (_jsx(Button, { type: "button", variant: "outline", onClick: handlePrevStep, children: "Back" })) : (_jsx("div", {})), step < 4 ? (_jsx(Button, { type: "button", onClick: handleNextStep, children: "Continue" })) : (_jsx(Button, { type: "submit", loading: loading, children: "Register Account" }))] })] })] })) : (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "flex flex-col items-center justify-center py-12 text-center space-y-4", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: [0, 1.25, 1] }, transition: { duration: 0.6, ease: "easeOut" }, className: "h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10", children: _jsx(Check, { size: 40, className: "stroke-[3]" }) }), _jsx("h3", { className: "text-2xl font-extrabold text-slate-900 dark:text-white", children: "Registration Complete!" }), _jsx("p", { className: "text-sm text-slate-550 dark:text-slate-450 max-w-sm font-semibold", children: "Welcome to Shrestha Services. Your client dashboard is being customized for your printing requirements..." }), _jsxs("div", { className: "flex items-center gap-2 pt-4", children: [_jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" }), _jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" }), _jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-blue-600 animate-bounce" })] })] })), _jsxs("div", { className: "mt-8 text-center text-sm text-slate-500", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "font-semibold text-blue-600 dark:text-blue-400 hover:underline", children: "Sign in" })] })] }) }));
}
