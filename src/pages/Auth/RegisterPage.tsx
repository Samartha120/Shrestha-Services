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
    } else if (step === 2) {
      if (!companyName || !industryType) {
        setValidationError("Company Name and Industry Type are required.");
        return;
      }
    } else if (step === 3) {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err) {
      // Handled by store
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Account Info" },
    { number: 2, label: "Business Details" },
    { number: 3, label: "Address Details" },
    { number: 4, label: "Review & Terms" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
        
        {step < 5 ? (
          <>
            {/* Header */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md mb-3">
                <Printer className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Create Your Account</h2>
              <p className="text-xs text-slate-550 mt-1 dark:text-slate-400">
                Register your business for digital printing & advertising services
              </p>
            </div>

            {/* Step Indicator */}
            <div className="mb-8 flex justify-between items-center relative">
              {/* Animated Progress connector lines */}
              <div className="absolute left-0 right-0 h-1 bg-slate-100 dark:bg-slate-850 top-1/2 -translate-y-1/2 -z-10 rounded-full">
                <motion.div
                  className="h-full bg-blue-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
              
              {steps.map((s) => (
                <div key={s.number} className="flex flex-col items-center bg-white dark:bg-slate-900 px-3 z-10">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: step > s.number ? "#2563eb" : step === s.number ? "#eff6ff" : "#f8fafc",
                      borderColor: step >= s.number ? "#2563eb" : "#e2e8f0",
                      scale: step === s.number ? 1.15 : 1.0,
                    }}
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      step > s.number
                        ? "text-white bg-blue-600 border-blue-650"
                        : step === s.number
                        ? "text-blue-600 shadow-md shadow-blue-500/20 dark:bg-blue-955/40 dark:border-blue-500"
                        : "text-slate-400 dark:bg-slate-850 dark:border-slate-700"
                    }`}
                  >
                    {step > s.number ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check size={16} className="stroke-[3]" />
                      </motion.div>
                    ) : (
                      <span>{s.number}</span>
                    )}
                  </motion.div>
                  <span className={`text-[10px] font-bold mt-1.5 hidden sm:block ${
                    step >= s.number ? "text-blue-650 dark:text-blue-405" : "text-slate-450 dark:text-slate-500"
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Errors */}
            {(validationError || authError) && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-650 dark:text-red-400 font-semibold">
                {validationError || authError}
              </div>
            )}

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Prabin Shrestha"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a strong password"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <Input
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Shrestha Prints Pvt. Ltd."
                  />
                  <Input
                    label="Government Registration ID (PAN/VAT)"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value)}
                    placeholder="PAN 600123456"
                  />
                  <Input
                    label="Industry Type"
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    placeholder="Retail / Hospitality / Marketing"
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input
                      label="Street Address"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Main Road, Ward 10"
                    />
                  </div>
                  <Input
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Biratnagar"
                  />
                  <Input
                    label="State / Province"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="Koshi Province"
                  />
                  <div className="col-span-2">
                    <Input
                      label="Postal Code (ZIP)"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="56600"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-150 dark:border-slate-800/80 text-sm space-y-3 text-slate-800 dark:text-slate-200">
                    <h4 className="font-bold border-b border-slate-200 dark:border-slate-800 pb-2 text-slate-900 dark:text-white">Review Your Details</h4>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Company:</strong> {companyName || "N/A"}</p>
                    <p><strong>PAN/VAT:</strong> {registrationId || "N/A"}</p>
                    <p><strong>Address:</strong> {street}, {city}, {stateName} {zip}</p>
                  </div>

                  <label className="flex items-start gap-3 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 rounded border-slate-350 dark:border-slate-800 text-blue-650 focus:ring-blue-500"
                    />
                    <span className="text-slate-655 dark:text-slate-350 font-semibold">
                      I agree to the Terms of Service and Privacy Policy of Shrestha Services Pvt. Ltd.
                    </span>
                  </label>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <Button type="button" onClick={handleNextStep}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" loading={loading}>
                    Register Account
                  </Button>
                )}
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.25, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10"
            >
              <Check size={40} className="stroke-[3]" />
            </motion.div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Registration Complete!</h3>
            <p className="text-sm text-slate-550 dark:text-slate-450 max-w-sm font-semibold">
              Welcome to Shrestha Services. Your client dashboard is being customized for your printing requirements...
            </p>
            <div className="flex items-center gap-2 pt-4">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-bounce" />
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}
