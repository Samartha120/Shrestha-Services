import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import Card from "@/components/ui/Card";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { User, Phone, MapPin, Landmark, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
export default function CustomerProfile() {
    const { user, checkAuth } = useAuthStore();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [registrationId, setRegistrationId] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [zip, setZip] = useState("");
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            // Load extra info from localStorage db profile if available
            const dbUsers = JSON.parse(localStorage.getItem("ss_users") || "[]");
            const matched = dbUsers.find((u) => u.email === user.email) || {};
            setCompanyName(matched.companyName || "");
            setRegistrationId(matched.registrationId || "");
            setPhone(matched.phone || "+977-9851088888");
            setStreet(matched.street || "Putalisadak Road");
            setCity(matched.city || "Kathmandu");
            setStateName(matched.stateName || "Bagmati Province");
            setZip(matched.zip || "44600");
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Update inside ss_users
            const dbUsers = JSON.parse(localStorage.getItem("ss_users") || "[]");
            const updatedUsers = dbUsers.map((u) => {
                if (u.email === email) {
                    return {
                        ...u,
                        name,
                        companyName,
                        registrationId,
                        phone,
                        street,
                        city,
                        stateName,
                        zip,
                    };
                }
                return u;
            });
            localStorage.setItem("ss_users", JSON.stringify(updatedUsers));
            // Also update currentUser details
            const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
            localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, name }));
            await checkAuth();
            toast.success("Business profile updated successfully");
        }
        catch (err) {
            toast.error("Failed to update profile");
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400", children: [_jsx(Link, { to: "/dashboard", className: "hover:underline", children: "Dashboard" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-slate-900 dark:text-slate-100", children: "Profile" })] }), _jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Business Profile" }), _jsx("p", { className: "text-sm text-slate-500", children: "Manage corporate info, PAN/VAT configurations, and dispatch billing addresses." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 text-center space-y-4", children: [_jsx("div", { className: "h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 text-2xl font-extrabold flex items-center justify-center mx-auto shadow-md", children: name.charAt(0) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold text-slate-900 dark:text-white", children: name }), _jsx("p", { className: "text-xs text-slate-500", children: email }), _jsx("p", { className: "inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-500 mt-2", children: "Customer Account" })] })] }), _jsxs(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800 space-y-4 text-xs", children: [_jsx("h4", { className: "font-bold text-slate-900 dark:text-white uppercase tracking-wider", children: "Verification Checklist" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-350", children: [_jsx(CheckCircle2, { size: 14, className: "text-emerald-500" }), _jsx("span", { children: "Email address verified" })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-355", children: [_jsx(CheckCircle2, { size: 14, className: "text-emerald-500" }), _jsx("span", { children: "Business credentials loaded" })] })] })] })] }), _jsx("div", { className: "lg:col-span-2", children: _jsx(Card, { className: "p-6 border border-slate-200/80 dark:border-slate-800", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(Input, { label: "Contact Representative Name", value: name, onChange: (e) => setName(e.target.value), leftIcon: _jsx(User, { size: 16, className: "text-slate-400" }), required: true }), _jsx(Input, { label: "Email Address (Static)", value: email, disabled: true, leftIcon: _jsx(Landmark, { size: 16, className: "text-slate-400" }), className: "bg-slate-50 text-slate-500" }), _jsx(Input, { label: "Company Name", value: companyName, onChange: (e) => setCompanyName(e.target.value), placeholder: "e.g. Acme Agency Pvt. Ltd." }), _jsx(Input, { label: "PAN or VAT Registration ID", value: registrationId, onChange: (e) => setRegistrationId(e.target.value), placeholder: "PAN number", leftIcon: _jsx(FileText, { size: 16, className: "text-slate-400" }) }), _jsx(Input, { label: "Contact Phone Number", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+977-98...", leftIcon: _jsx(Phone, { size: 16, className: "text-slate-400" }) })] }), _jsxs("div", { className: "space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800", children: [_jsxs("h3", { className: "font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2", children: [_jsx(MapPin, { size: 16, className: "text-slate-400" }), " Delivery Address"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx("div", { className: "md:col-span-2", children: _jsx(Input, { label: "Street Line", value: street, onChange: (e) => setStreet(e.target.value), placeholder: "e.g. Putalisadak Chowk" }) }), _jsx(Input, { label: "City", value: city, onChange: (e) => setCity(e.target.value), placeholder: "Kathmandu" }), _jsx(Input, { label: "State / Province", value: stateName, onChange: (e) => setStateName(e.target.value), placeholder: "Bagmati Province" }), _jsx("div", { className: "md:col-span-2", children: _jsx(Input, { label: "Postal (Zip) Code", value: zip, onChange: (e) => setZip(e.target.value), placeholder: "e.g. 44600" }) })] })] }), _jsx("div", { className: "flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800", children: _jsx(Button, { type: "submit", loading: saving, children: "Save Settings" }) })] }) }) })] })] }));
}
