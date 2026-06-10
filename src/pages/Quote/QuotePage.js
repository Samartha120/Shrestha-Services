import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FileUp, CircleCheck as CheckCircle2, ArrowRight, ArrowLeft, DollarSign, Package, Droplets } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { serviceApi } from "@/services/serviceApi";
import { useQuoteStore } from "@/store/quoteStore";
import { useAuthStore } from "@/store/authStore";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
// Validation schema
const quoteFormSchema = z.object({
    serviceId: z.string().min(1, "Please select a service"),
    material: z.string().min(1, "Please select a material"),
    width: z.union([z.number().positive(), z.literal("")]).optional(),
    height: z.union([z.number().positive(), z.literal("")]).optional(),
    quantity: z.union([z.number().positive(), z.string()]),
    customerName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Invalid phone number"),
    notes: z.string().optional(),
});
const STEP_COUNT = 3;
export default function QuotePage() {
    const navigate = useNavigate();
    const { submitQuote, isLoading } = useQuoteStore();
    const { user } = useAuthStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [servicesLoading, setServicesLoading] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: {
            customerName: user?.name || "",
            email: user?.email || "",
            phone: "",
            quantity: 1,
        },
    });
    const watchServiceId = watch("serviceId");
    const watchMaterial = watch("material");
    const watchWidth = watch("width");
    const watchHeight = watch("height");
    const watchQuantity = watch("quantity");
    const watchCustomerName = watch("customerName");
    const watchEmail = watch("email");
    const watchPhone = watch("phone");
    // Load services
    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await serviceApi.getAll();
                setServices(data);
            }
            catch (err) {
                toast.error("Failed to load services");
            }
            finally {
                setServicesLoading(false);
            }
        };
        loadServices();
    }, []);
    // Update selected service
    useEffect(() => {
        if (watchServiceId) {
            const service = services.find((s) => s.id === watchServiceId);
            setSelectedService(service || null);
            if (service?.materials && service.materials.length > 0) {
                setValue("material", "");
            }
        }
    }, [watchServiceId, services, setValue]);
    // Calculate price
    useEffect(() => {
        if (selectedService && watchMaterial && watchWidth && watchHeight && watchQuantity) {
            const width = typeof watchWidth === 'number' ? watchWidth : 1;
            const height = typeof watchHeight === 'number' ? watchHeight : 1;
            const quantity = typeof watchQuantity === 'number' ? watchQuantity : 1;
            const baseRate = selectedService.basePrice || 15;
            // Material multiplier matching quoteApi logic
            let multiplier = 1.0;
            if (watchMaterial.includes("Star"))
                multiplier = 1.3;
            else if (watchMaterial.includes("Backlit"))
                multiplier = 1.8;
            else if (watchMaterial.includes("Blockout"))
                multiplier = 2.2;
            else if (watchMaterial.includes("3mm"))
                multiplier = 2.0;
            else if (watchMaterial.includes("5mm"))
                multiplier = 3.0;
            else if (watchMaterial.includes("LED"))
                multiplier = 6.0;
            const price = Math.round(width * height * baseRate * multiplier * quantity);
            setEstimatedPrice(price);
        }
        else {
            setEstimatedPrice(0);
        }
    }, [selectedService, watchMaterial, watchWidth, watchHeight, watchQuantity]);
    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
            toast.success(`${acceptedFiles.length} file(s) uploaded`);
        }
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".gif"],
            "application/pdf": [".pdf"],
            "application/x-zip-compressed": [".zip"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
    });
    const onSubmit = async (formData) => {
        try {
            const quoteData = {
                ...formData,
                width: formData.width ? Number(formData.width) : undefined,
                height: formData.height ? Number(formData.height) : undefined,
                quantity: Number(formData.quantity),
                file: uploadedFiles[0],
            };
            await submitQuote(quoteData);
            toast.success("Quote submitted successfully!");
            navigate("/quote/success");
        }
        catch (err) {
            toast.error(err.message || "Failed to submit quote");
        }
    };
    const isStep1Complete = watchServiceId && watchMaterial && watchWidth && watchHeight && watchQuantity;
    const isStep2Complete = watchCustomerName && watchEmail && watchPhone;
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "mb-12 text-center", children: [_jsx("h1", { className: "text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 bg-clip-text text-transparent mb-3", children: "Request a Quote" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400 text-lg", children: "Get a personalized estimate for your custom printing project" })] }), _jsxs("div", { className: "mb-12", children: [_jsx("div", { className: "flex justify-between items-center", children: Array.from({ length: STEP_COUNT }).map((_, i) => (_jsxs(motion.div, { className: "flex items-center flex-1", children: [_jsx(motion.div, { whileHover: { scale: 1.05 }, onClick: () => i < currentStep && setCurrentStep(i), className: `flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all cursor-pointer ${i === currentStep
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                            : i < currentStep
                                                ? "bg-green-600 text-white"
                                                : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"}`, children: i < currentStep ? (_jsx(CheckCircle2, { size: 24 })) : (i + 1) }), i < STEP_COUNT - 1 && (_jsx("div", { className: `flex-1 h-1 mx-3 rounded-full transition-all ${i < currentStep
                                            ? "bg-green-600"
                                            : "bg-slate-200 dark:bg-slate-700"}` }))] }, i))) }), _jsxs("div", { className: "flex justify-between mt-6 text-sm font-medium", children: [_jsx("span", { className: "text-slate-600 dark:text-slate-400", children: "Project Details" }), _jsx("span", { className: "text-slate-600 dark:text-slate-400", children: "Your Information" }), _jsx("span", { className: "text-slate-600 dark:text-slate-400", children: "Review & Submit" })] })] }), _jsx(Card, { glass: true, animated: false, className: "border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl", children: _jsx("div", { className: "p-8 sm:p-12", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs(AnimatePresence, { mode: "wait", children: [currentStep === 0 && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Project Details" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Start by telling us about your printing project" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-3", children: "Select Service *" }), servicesLoading ? (_jsx("div", { className: "animate-pulse bg-slate-200 dark:bg-slate-700 h-12 rounded-xl" })) : (_jsxs("select", { ...register("serviceId"), className: "w-full rounded-xl border border-slate-300 dark:border-slate-600 p-3 bg-white dark:bg-slate-800 transition-all focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400", children: [_jsx("option", { value: "", children: "Choose a service..." }), services.map((service) => (_jsx("option", { value: service.id, children: service.title }, service.id)))] })), errors.serviceId && (_jsx("p", { className: "text-red-500 text-sm mt-2", children: errors.serviceId.message }))] }), selectedService?.materials && selectedService.materials.length > 0 && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, children: [_jsx("label", { className: "block text-sm font-semibold mb-3", children: "Material *" }), _jsxs("select", { ...register("material"), className: "w-full rounded-xl border border-slate-300 dark:border-slate-600 p-3 bg-white dark:bg-slate-800 transition-all focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400", children: [_jsx("option", { value: "", children: "Select material..." }), selectedService.materials.map((mat) => (_jsx("option", { value: mat, children: mat }, mat)))] }), errors.material && (_jsx("p", { className: "text-red-500 text-sm mt-2", children: errors.material.message }))] })), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(Input, { label: "Width (feet)", type: "number", step: "0.5", placeholder: "e.g., 10", ...register("width"), error: errors.width?.message, leftIcon: _jsx(Package, { size: 18, className: "text-slate-400" }) }), _jsx(Input, { label: "Height (feet)", type: "number", step: "0.5", placeholder: "e.g., 8", ...register("height"), error: errors.height?.message, leftIcon: _jsx(Package, { size: 18, className: "text-slate-400" }) })] }), _jsx(Input, { label: "Quantity", type: "number", min: "1", placeholder: "1", ...register("quantity"), error: errors.quantity?.message, leftIcon: _jsx(Droplets, { size: 18, className: "text-slate-400" }) }), estimatedPrice > 0 && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-gradient-to-r from-blue-600/10 to-blue-700/10 dark:from-blue-600/20 dark:to-blue-700/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(DollarSign, { size: 20, className: "text-blue-600" }), _jsx("span", { className: "text-sm font-semibold text-slate-600 dark:text-slate-400", children: "Estimated Price" })] }), _jsxs("div", { className: "text-4xl font-bold text-blue-600", children: ["NPR ", estimatedPrice.toLocaleString()] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2", children: "This is an estimate. Final price may vary based on detailed review." })] }))] }, "step1")), currentStep === 1 && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Your Information" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Help us contact you about your quote" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [_jsx(Input, { label: "Full Name *", type: "text", placeholder: "John Doe", ...register("customerName"), error: errors.customerName?.message }), _jsx(Input, { label: "Email *", type: "email", placeholder: "john@example.com", ...register("email"), error: errors.email?.message })] }), _jsx(Input, { label: "Phone Number *", type: "tel", placeholder: "+977 98XXXXXXXX", ...register("phone"), error: errors.phone?.message }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-3", children: "Additional Notes" }), _jsx("textarea", { ...register("notes"), placeholder: "Any special requirements, design details, or preferences...", rows: 6, className: "w-full rounded-xl border border-slate-300 dark:border-slate-600 p-4 bg-white dark:bg-slate-800 transition-all focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none" })] })] }, "step2")), currentStep === 2 && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Review & Upload" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Review your quote details and upload design files" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-slate-100 dark:bg-slate-800 rounded-xl p-4", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400", children: "Service" }), _jsx("p", { className: "text-lg font-bold mt-1", children: selectedService?.title || "Not selected" })] }), _jsxs("div", { className: "bg-slate-100 dark:bg-slate-800 rounded-xl p-4", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400", children: "Material" }), _jsx("p", { className: "text-lg font-bold mt-1", children: watchMaterial || "Not selected" })] }), _jsxs("div", { className: "bg-slate-100 dark:bg-slate-800 rounded-xl p-4", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400", children: "Dimensions" }), _jsxs("p", { className: "text-lg font-bold mt-1", children: [watchWidth || 0, " x ", watchHeight || 0, " ft"] })] }), _jsxs("div", { className: "bg-slate-100 dark:bg-slate-800 rounded-xl p-4", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400", children: "Quantity" }), _jsxs("p", { className: "text-lg font-bold mt-1", children: [watchQuantity || 0, " unit(s)"] })] })] }), _jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white", children: [_jsx("p", { className: "text-sm font-semibold opacity-90", children: "Estimated Total Price" }), _jsxs("p", { className: "text-5xl font-bold mt-2", children: ["NPR ", estimatedPrice.toLocaleString()] }), _jsx("p", { className: "text-sm opacity-75 mt-4", children: "Final quote will be provided after our team reviews your project details." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold mb-3", children: "Upload Design Files (Optional)" }), _jsxs("div", { ...getRootProps(), className: `rounded-2xl border-2 border-dashed transition-all p-8 text-center cursor-pointer ${isDragActive
                                                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                                                                : "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"}`, children: [_jsx("input", { ...getInputProps() }), _jsx(motion.div, { initial: { scale: 1 }, whileHover: { scale: 1.1 }, transition: { type: "spring", stiffness: 300 }, children: _jsx(FileUp, { size: 40, className: "mx-auto text-blue-600 mb-3" }) }), _jsx("p", { className: "text-sm font-semibold mb-1", children: isDragActive
                                                                        ? "Drop files here..."
                                                                        : "Drag & drop your design files here" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Supported: Images, PDF, ZIP, DOCX" })] }), uploadedFiles.length > 0 && (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mt-4 space-y-2", children: uploadedFiles.map((file, idx) => (_jsxs("div", { className: "flex items-center justify-between bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle2, { size: 18, className: "text-green-600" }), _jsx("span", { className: "text-sm font-medium", children: file.name })] }), _jsxs("span", { className: "text-xs text-slate-500", children: [(file.size / 1024 / 1024).toFixed(1), " MB"] })] }, idx))) }))] })] }, "step3"))] }), _jsxs("div", { className: "flex justify-between gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700", children: [_jsx(Button, { type: "button", variant: "outline", size: "lg", onClick: () => setCurrentStep(Math.max(0, currentStep - 1)), disabled: currentStep === 0, leftIcon: _jsx(ArrowLeft, { size: 18 }), children: "Previous" }), currentStep < STEP_COUNT - 1 ? (_jsx(Button, { type: "button", size: "lg", onClick: () => {
                                                if (currentStep === 0 && !isStep1Complete) {
                                                    toast.error("Please complete all fields on this step");
                                                    return;
                                                }
                                                if (currentStep === 1 && !isStep2Complete) {
                                                    toast.error("Please complete all required fields");
                                                    return;
                                                }
                                                setCurrentStep(currentStep + 1);
                                            }, rightIcon: _jsx(ArrowRight, { size: 18 }), children: "Next" })) : (_jsx(Button, { type: "submit", size: "lg", loading: isLoading, disabled: isLoading, children: "Submit Quote Request" }))] })] }) }) }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "mt-12 text-center text-sm text-slate-600 dark:text-slate-400", children: _jsxs("p", { children: ["Need help?", " ", _jsx("a", { href: "/contact", className: "text-blue-600 hover:underline font-semibold", children: "Contact our team" })] }) })] }) }));
}
