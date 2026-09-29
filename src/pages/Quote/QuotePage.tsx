import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FileUp,
  CircleCheck as CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Package,
  Droplets,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

import { serviceApi } from "@/services/serviceApi";
import { useQuoteStore } from "@/store/quoteStore";
import { useAuthStore } from "@/store/authStore";
import type { Service } from "@/types/service.types";

import { Container, Eyebrow, Reveal } from "@/components/marketing/primitives";
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
const STEP_LABELS = ["Project details", "Your information", "Review & submit"];

const fieldClass =
  "w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted";

export default function QuotePage() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
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

  const stepTransition = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="bg-paper text-ink">
      {/* Header */}
      <section className="border-b border-line py-16 lg:py-20">
        <Container>
          <Reveal>
            <Eyebrow>Request a quote</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.03] text-balance">
              Let's price the job.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Three short steps. Tell us what you need, how to reach you, then
              review the estimate before you send it over.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Form */}
      <section className="py-14 lg:py-20">
        <Container className="max-w-3xl">
          {/* Step meter */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Step {currentStep + 1} — {STEP_LABELS[currentStep]}
            </p>
            <div className="mt-3 flex gap-2">
              {Array.from({ length: STEP_COUNT }).map((_, i) => {
                const done = i < currentStep;
                const active = i === currentStep;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Step ${i + 1}: ${STEP_LABELS[i]}`}
                    onClick={() => i < currentStep && setCurrentStep(i)}
                    disabled={i >= currentStep}
                    className={`h-0.5 flex-1 rounded-full transition-colors ${
                      done || active ? "bg-accent" : "bg-line"
                    } ${i < currentStep ? "cursor-pointer" : "cursor-default"}`}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex justify-between font-mono text-[11px] tracking-wide text-faint">
              <span>01 Details</span>
              <span>02 Information</span>
              <span>03 Review</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* STEP 1: Project Details */}
              {currentStep === 0 && (
                <motion.div key="step1" {...stepTransition} className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl text-ink">Project details</h2>
                    <p className="mt-1 text-ink-soft">
                      Start by telling us about your printing project.
                    </p>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className={labelClass}>Select service *</label>
                    {servicesLoading ? (
                      <div className="mt-3 h-10 animate-pulse rounded-sm bg-surface-2" />
                    ) : (
                      <select {...register("serviceId")} className={`${fieldClass} mt-3 appearance-none`}>
                        <option value="">Choose a service…</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    )}
                    {errors.serviceId && (
                      <p className="mt-1.5 text-xs text-err">{errors.serviceId.message}</p>
                    )}
                  </div>

                  {/* Material Selection */}
                  {selectedService?.materials && selectedService.materials.length > 0 && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className={labelClass}>Material *</label>
                      <select {...register("material")} className={`${fieldClass} mt-3 appearance-none`}>
                        <option value="">Select material…</option>
                        {selectedService.materials.map((mat) => (
                          <option key={mat} value={mat}>
                            {mat}
                          </option>
                        ))}
                      </select>
                      {errors.material && (
                        <p className="mt-1.5 text-xs text-err">{errors.material.message}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Dimensions Grid */}
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <Input
                      label="Width (feet)"
                      type="number"
                      step="0.5"
                      placeholder="e.g., 10"
                      {...register("width")}
                      error={errors.width?.message}
                      leftIcon={<Package size={18} className="text-muted" />}
                    />
                    <Input
                      label="Height (feet)"
                      type="number"
                      step="0.5"
                      placeholder="e.g., 8"
                      {...register("height")}
                      error={errors.height?.message}
                      leftIcon={<Package size={18} className="text-muted" />}
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
                    leftIcon={<Droplets size={18} className="text-muted" />}
                  />

                  {/* Price Estimation */}
                  {estimatedPrice > 0 && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-y border-line py-5"
                    >
                      <p className={labelClass}>Estimated price</p>
                      <p className="mt-2 font-mono text-3xl text-ink">
                        NPR {estimatedPrice.toLocaleString()}
                      </p>
                      <p className="mt-2 text-xs text-muted">
                        This is an estimate. Final price may vary based on detailed review.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: Customer Information */}
              {currentStep === 1 && (
                <motion.div key="step2" {...stepTransition} className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl text-ink">Your information</h2>
                    <p className="mt-1 text-ink-soft">
                      Help us contact you about your quote.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <Input
                      label="Full name *"
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
                    label="Phone number *"
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    {...register("phone")}
                    error={errors.phone?.message}
                  />

                  <div>
                    <label className={labelClass}>Additional notes</label>
                    <textarea
                      {...register("notes")}
                      placeholder="Any special requirements, design details, or preferences…"
                      rows={5}
                      className={`${fieldClass} mt-3 resize-none`}
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Review & File Upload */}
              {currentStep === 2 && (
                <motion.div key="step3" {...stepTransition} className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl text-ink">Review & upload</h2>
                    <p className="mt-1 text-ink-soft">
                      Review your quote details and upload design files.
                    </p>
                  </div>

                  {/* Summary — hairline rows */}
                  <dl className="divide-y divide-line border-y border-line">
                    {[
                      { k: "Service", v: selectedService?.title || "Not selected" },
                      { k: "Material", v: watchMaterial || "Not selected" },
                      {
                        k: "Dimensions",
                        v: `${watchWidth || 0} × ${watchHeight || 0} ft`,
                        mono: true,
                      },
                      { k: "Quantity", v: `${watchQuantity || 0} unit(s)`, mono: true },
                    ].map((row) => (
                      <div key={row.k} className="flex items-center justify-between py-4">
                        <dt className={labelClass}>{row.k}</dt>
                        <dd
                          className={`text-right text-ink ${
                            row.mono ? "font-mono" : "font-medium"
                          }`}
                        >
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Price Summary — ink band */}
                  <div className="rounded-sm bg-ink p-8 text-inverse">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-inverse/70">
                      Estimated total price
                    </p>
                    <p className="mt-2 font-mono text-4xl">
                      NPR {estimatedPrice.toLocaleString()}
                    </p>
                    <p className="mt-4 text-sm text-inverse/70">
                      Final quote will be provided after our team reviews your project details.
                    </p>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className={labelClass}>Upload design files (optional)</label>
                    <div
                      {...getRootProps()}
                      className={`mt-3 cursor-pointer rounded-sm border border-dashed p-8 text-center transition-colors ${
                        isDragActive
                          ? "border-accent bg-accent-soft"
                          : "border-line hover:border-accent"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <FileUp size={32} className="mx-auto mb-3 text-accent" strokeWidth={1.5} />
                      <p className="text-sm font-medium text-ink">
                        {isDragActive
                          ? "Drop files here…"
                          : "Drag & drop your design files here"}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Supported: Images, PDF, ZIP, DOCX
                      </p>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <motion.ul
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 divide-y divide-line border-y border-line"
                      >
                        {uploadedFiles.map((file, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between py-3"
                          >
                            <span className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-ok" strokeWidth={1.5} />
                              <span className="text-sm text-ink">{file.name}</span>
                            </span>
                            <span className="font-mono text-xs text-muted">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between gap-4 border-t border-line pt-8">
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
                <Button type="submit" size="lg" loading={isLoading} disabled={isLoading}>
                  Submit quote request
                </Button>
              )}
            </div>
          </form>

          {/* Footer */}
          <p className="mt-12 text-center text-sm text-muted">
            Need help?{" "}
            <a href="/contact" className="font-semibold text-accent hover:underline">
              Contact our team
            </a>
          </p>
        </Container>
      </section>
    </div>
  );
}
