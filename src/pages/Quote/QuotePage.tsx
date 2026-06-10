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
import type { Service } from "@/types/service.types";

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

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const STEP_COUNT = 3;

export default function QuotePage() {
  const navigate = useNavigate();
  const { submitQuote, isLoading } = useQuoteStore();
  const { user } = useAuthStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
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
      } catch (err) {
        toast.error("Failed to load services");
      } finally {
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
      if (watchMaterial.includes("Star")) multiplier = 1.3;
      else if (watchMaterial.includes("Backlit")) multiplier = 1.8;
      else if (watchMaterial.includes("Blockout")) multiplier = 2.2;
      else if (watchMaterial.includes("3mm")) multiplier = 2.0;
      else if (watchMaterial.includes("5mm")) multiplier = 3.0;
      else if (watchMaterial.includes("LED")) multiplier = 6.0;

      const price = Math.round(width * height * baseRate * multiplier * quantity);
      setEstimatedPrice(price);
    } else {
      setEstimatedPrice(0);
    }
  }, [selectedService, watchMaterial, watchWidth, watchHeight, watchQuantity]);

  const onDrop = (acceptedFiles: File[]) => {
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

  const onSubmit = async (formData: any) => {
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
    } catch (err: any) {
      toast.error(err.message || "Failed to submit quote");
    }
  };

  const isStep1Complete =
    watchServiceId && watchMaterial && watchWidth && watchHeight && watchQuantity;
  const isStep2Complete =
    watchCustomerName && watchEmail && watchPhone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 bg-clip-text text-transparent mb-3">
            Request a Quote
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Get a personalized estimate for your custom printing project
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {Array.from({ length: STEP_COUNT }).map((_, i) => (
              <motion.div key={i} className="flex items-center flex-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => i < currentStep && setCurrentStep(i)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all cursor-pointer ${
                    i === currentStep
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : i < currentStep
                      ? "bg-green-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {i < currentStep ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    i + 1
                  )}
                </motion.div>

                {i < STEP_COUNT - 1 && (
                  <div
                    className={`flex-1 h-1 mx-3 rounded-full transition-all ${
                      i < currentStep
                        ? "bg-green-600"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-sm font-medium">
            <span className="text-slate-600 dark:text-slate-400">Project Details</span>
            <span className="text-slate-600 dark:text-slate-400">Your Information</span>
            <span className="text-slate-600 dark:text-slate-400">Review & Submit</span>
          </div>
        </div>

        {/* Form Container */}
        <Card glass animated={false} className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <div className="p-8 sm:p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* STEP 1: Project Details */}
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Project Details</h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        Start by telling us about your printing project
                      </p>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Select Service *
                      </label>
                      {servicesLoading ? (
                        <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-12 rounded-xl" />
                      ) : (
                        <select
                          {...register("serviceId")}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-600 p-3 bg-white dark:bg-slate-800 transition-all focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        >
                          <option value="">Choose a service...</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.title}
                            </option>
                          ))}
                        </select>
                      )}
                      {errors.serviceId && (
                        <p className="text-red-500 text-sm mt-2">{errors.serviceId.message}</p>
                      )}
                    </div>

                    {/* Material Selection */}
                    {selectedService?.materials && selectedService.materials.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <label className="block text-sm font-semibold mb-3">
                          Material *
                        </label>
                        <select
                          {...register("material")}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-600 p-3 bg-white dark:bg-slate-800 transition-all focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        >
                          <option value="">Select material...</option>
                          {selectedService.materials.map((mat) => (
                            <option key={mat} value={mat}>
                              {mat}
                            </option>
                          ))}
                        </select>
                        {errors.material && (
                          <p className="text-red-500 text-sm mt-2">{errors.material.message}</p>
                        )}
                      </motion.div>
                    )}

                    {/* Dimensions Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Width (feet)"
                        type="number"
                        step="0.5"
                        placeholder="e.g., 10"
                        {...register("width")}
                        error={errors.width?.message}
                        leftIcon={<Package size={18} className="text-slate-400" />}
                      />
                      <Input
                        label="Height (feet)"
                        type="number"
                        step="0.5"
                        placeholder="e.g., 8"
                        {...register("height")}
                        error={errors.height?.message}
                        leftIcon={<Package size={18} className="text-slate-400" />}
                      />
                    </div>

                    {/* Quantity */}
                    <Input
                      label="Quantity"
                      type="number"
                      min="1"
                      placeholder="1"
                      {...register("quantity")}
                      error={errors.quantity?.message}
                      leftIcon={<Droplets size={18} className="text-slate-400" />}
                    />

                    {/* Price Estimation Box */}
                    {estimatedPrice > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-blue-600/10 to-blue-700/10 dark:from-blue-600/20 dark:to-blue-700/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign size={20} className="text-blue-600" />
                          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                            Estimated Price
                          </span>
                        </div>
                        <div className="text-4xl font-bold text-blue-600">
                          NPR {estimatedPrice.toLocaleString()}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          This is an estimate. Final price may vary based on detailed review.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: Customer Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Your Information</h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        Help us contact you about your quote
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Full Name *"
                        type="text"
                        placeholder="John Doe"
                        {...register("customerName")}
                        error={errors.customerName?.message}
                      />
                      <Input
                        label="Email *"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        error={errors.email?.message}
                      />
                    </div>

                    <Input
                      label="Phone Number *"
                      type="tel"
                      placeholder="+977 98XXXXXXXX"
                      {...register("phone")}
                      error={errors.phone?.message}
                    />

                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Additional Notes
                      </label>
                      <textarea
                        {...register("notes")}
                        placeholder="Any special requirements, design details, or preferences..."
                        rows={6}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-600 p-4 bg-white dark:bg-slate-800 transition-all focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Review & File Upload */}
                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Review & Upload</h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        Review your quote details and upload design files
                      </p>
                    </div>

                    {/* Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Service
                        </p>
                        <p className="text-lg font-bold mt-1">
                          {selectedService?.title || "Not selected"}
                        </p>
                      </div>

                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Material
                        </p>
                        <p className="text-lg font-bold mt-1">
                          {watchMaterial || "Not selected"}
                        </p>
                      </div>

                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Dimensions
                        </p>
                        <p className="text-lg font-bold mt-1">
                          {watchWidth || 0} x {watchHeight || 0} ft
                        </p>
                      </div>

                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Quantity
                        </p>
                        <p className="text-lg font-bold mt-1">{watchQuantity || 0} unit(s)</p>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                      <p className="text-sm font-semibold opacity-90">Estimated Total Price</p>
                      <p className="text-5xl font-bold mt-2">
                        NPR {estimatedPrice.toLocaleString()}
                      </p>
                      <p className="text-sm opacity-75 mt-4">
                        Final quote will be provided after our team reviews your project details.
                      </p>
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Upload Design Files (Optional)
                      </label>
                      <div
                        {...getRootProps()}
                        className={`rounded-2xl border-2 border-dashed transition-all p-8 text-center cursor-pointer ${
                          isDragActive
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                            : "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FileUp size={40} className="mx-auto text-blue-600 mb-3" />
                        </motion.div>
                        <p className="text-sm font-semibold mb-1">
                          {isDragActive
                            ? "Drop files here..."
                            : "Drag & drop your design files here"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Supported: Images, PDF, ZIP, DOCX
                        </p>
                      </div>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 space-y-2"
                        >
                          {uploadedFiles.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3"
                            >
                              <div className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-green-600" />
                                <span className="text-sm font-medium">{file.name}</span>
                              </div>
                              <span className="text-xs text-slate-500">
                                {(file.size / 1024 / 1024).toFixed(1)} MB
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  leftIcon={<ArrowLeft size={18} />}
                >
                  Previous
                </Button>

                {currentStep < STEP_COUNT - 1 ? (
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => {
                      if (currentStep === 0 && !isStep1Complete) {
                        toast.error("Please complete all fields on this step");
                        return;
                      }
                      if (currentStep === 1 && !isStep2Complete) {
                        toast.error("Please complete all required fields");
                        return;
                      }
                      setCurrentStep(currentStep + 1);
                    }}
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Submit Quote Request
                  </Button>
                )}
              </div>
            </form>
          </div>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center text-sm text-slate-600 dark:text-slate-400"
        >
          <p>
            Need help?{" "}
            <a href="/contact" className="text-blue-600 hover:underline font-semibold">
              Contact our team
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
