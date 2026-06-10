import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { useContactStore } from "@/store/contactStore";
import { companyData } from "@/data/company";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Card from "@/components/ui/Card";
import { Mail, Phone, MapPin, Clock, Globe, ArrowRight } from "lucide-react";
import { toast } from "sonner";
const subjects = [
    "General Inquiry",
    "Quote Request",
    "Custom Project",
    "Technical Support",
    "Bulk Order",
];
const businessHours = [
    { day: "Sunday", hours: "9:30 AM - 7:00 PM" },
    { day: "Monday", hours: "9:30 AM - 7:00 PM" },
    { day: "Tuesday", hours: "9:30 AM - 7:00 PM" },
    { day: "Wednesday", hours: "9:30 AM - 7:00 PM" },
    { day: "Thursday", hours: "9:30 AM - 7:00 PM" },
    { day: "Friday", hours: "9:30 AM - 7:00 PM" },
    { day: "Saturday", hours: "Closed" },
];
export default function ContactPage() {
    const { submitInquiry, isLoading } = useContactStore();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: subjects[0],
        message: "",
    });
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.phone.trim())
            newErrors.phone = "Phone is required";
        if (!formData.subject)
            newErrors.subject = "Subject is required";
        if (!formData.message.trim())
            newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        try {
            await submitInquiry(formData);
            toast.success("Inquiry sent successfully! We'll contact you soon.");
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: subjects[0],
                message: "",
            });
            setErrors({});
        }
        catch {
            toast.error("Failed to send inquiry. Please try again.");
        }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950", children: [_jsx("div", { className: "absolute top-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" }), _jsx("div", { className: "absolute bottom-40 left-20 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-20" }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28", children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "text-center max-w-3xl mx-auto mb-16", children: [_jsxs(motion.div, { variants: itemVariants, className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6", children: [_jsxs("span", { className: "relative flex h-2 w-2", children: [_jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" }), _jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-blue-500" })] }), _jsx("span", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "We're Here to Help" })] }), _jsxs(motion.h1, { variants: itemVariants, className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6", children: ["Get in ", _jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Touch" })] }), _jsx(motion.p, { variants: itemVariants, className: "text-lg text-slate-600 dark:text-slate-300", children: "Have questions about our printing services? We're excited to hear from you. Send us a message and we'll respond as soon as possible." })] }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [_jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "lg:col-span-2", children: _jsxs(Card, { className: "p-8 sm:p-10", children: [_jsx(motion.h2, { variants: itemVariants, className: "text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8", children: "Send us a Message" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Input, { label: "Full Name", type: "text", placeholder: "John Doe", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), error: errors.name, className: errors.name ? "border-red-500" : "" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Input, { label: "Email Address", type: "email", placeholder: "john@example.com", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), error: errors.email }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Input, { label: "Phone Number", type: "tel", placeholder: "+977 98 00000000", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }), error: errors.phone }) }), _jsxs(motion.div, { variants: itemVariants, children: [_jsx("label", { className: "text-sm font-medium text-slate-900 dark:text-white block mb-2", children: "Subject" }), _jsx("select", { value: formData.subject, onChange: (e) => setFormData({ ...formData, subject: e.target.value }), className: `
                      w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                      text-slate-900 dark:text-white transition-all duration-300
                      focus:ring-2 focus:ring-blue-500
                      ${errors.subject ? "border-red-500" : "border-slate-300 dark:border-slate-700"}
                    `, children: subjects.map((subject) => (_jsx("option", { value: subject, children: subject }, subject))) }), errors.subject && _jsx("p", { className: "text-sm text-red-500 mt-2", children: errors.subject })] }), _jsxs(motion.div, { variants: itemVariants, children: [_jsx("label", { className: "text-sm font-medium text-slate-900 dark:text-white block mb-2", children: "Message" }), _jsx("textarea", { placeholder: "Tell us about your project...", rows: 5, value: formData.message, onChange: (e) => setFormData({ ...formData, message: e.target.value }), className: `
                      w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                      text-slate-900 dark:text-white transition-all duration-300
                      focus:ring-2 focus:ring-blue-500 resize-none
                      ${errors.message ? "border-red-500" : "border-slate-300 dark:border-slate-700"}
                    ` }), errors.message && _jsx("p", { className: "text-sm text-red-500 mt-2", children: errors.message })] }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Button, { type: "submit", loading: isLoading, className: "w-full bg-blue-600 hover:bg-blue-700 text-white text-base h-12", rightIcon: _jsx(ArrowRight, { size: 18 }), children: "Send Message" }) })] })] }) }), _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "space-y-6", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "p-6 h-full", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0", children: _jsx(Mail, { className: "h-6 w-6 text-blue-600 dark:text-blue-400" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-white", children: "Email" }), _jsx("a", { href: `mailto:${companyData.email}`, className: "text-sm text-blue-600 dark:text-blue-400 hover:underline break-all", children: companyData.email })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "p-6 h-full", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0", children: _jsx(Phone, { className: "h-6 w-6 text-blue-600 dark:text-blue-400" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-white", children: "Phone" }), _jsx("a", { href: `tel:${companyData.phone}`, className: "text-sm text-blue-600 dark:text-blue-400 hover:underline", children: companyData.phone })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "p-6 h-full", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0", children: _jsx(MapPin, { className: "h-6 w-6 text-blue-600 dark:text-blue-400" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-white", children: "Location" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: companyData.address })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "p-6 h-full", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-white mb-4", children: "Connect With Us" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("a", { href: "#", "aria-label": "Website", className: "h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors", children: _jsx(Globe, { size: 18 }) }), _jsx("a", { href: `mailto:${companyData.email}`, "aria-label": "Email", className: "h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors", children: _jsx(Mail, { size: 18 }) }), _jsx("a", { href: `tel:${companyData.phone}`, "aria-label": "Phone", className: "h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors", children: _jsx(Phone, { size: 18 }) })] })] }) })] })] }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, children: _jsxs(Card, { className: "p-8 sm:p-10 overflow-hidden", children: [_jsxs(motion.h2, { variants: itemVariants, className: "text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3", children: [_jsx(Clock, { className: "h-8 w-8 text-blue-600 dark:text-blue-400" }), "Business Hours"] }), _jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: businessHours.map((item, idx) => (_jsxs(motion.div, { variants: itemVariants, custom: idx, className: "p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700", children: [_jsx("p", { className: "font-semibold text-slate-900 dark:text-white", children: item.day }), _jsx("p", { className: `text-sm ${item.hours === "Closed" ? "text-red-600 dark:text-red-400 font-semibold" : "text-slate-600 dark:text-slate-400"}`, children: item.hours })] }, item.day))) })] }) }) }), _jsx("section", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.5 }, children: _jsx(Card, { className: "overflow-hidden h-96 sm:h-[500px]", children: _jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114509.3016234857!2d87.20243214901203!3d26.48375038588986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6d267547f203%3A0x645927a9412d694d!2sBiratnagar%2C%20Nepal!5e0!3m2!1sen!2s!4v1234567890", width: "100%", height: "100%", style: { border: 0 }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", title: "Shrestha Services Location" }) }) }) })] }));
}
