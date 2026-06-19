import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Printer, Check, ChevronRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, error: authError, clearError } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 shadow-2xl"
      >
        
        {step < 5 ? (
          <>
            {/* Header */}
            <div className="flex flex-col items-center mb-10 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-4"
              >
                <Printer className="h-7 w-7 text-white" />
              </motion.div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Create Your Account</h2>
              <p className="text-base text-slate-600 mt-2 dark:text-slate-400">
                Register your business for digital printing & advertising services
              </p>
            </div>

            {/* Enhanced Step Indicator with Arrows */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                {steps.map((s, index) => (
                  <div key={s.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={false}
                        animate={{
                          backgroundColor: step > s.number ? "#2563eb" : step === s.number ? "#eff6ff" : "#f8fafc",
                          borderColor: step >= s.number ? "#2563eb" : "#e2e8f0",
                          scale: step === s.number ? 1.2 : 1.0,
                        }}
                        className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-extrabold border-2 transition-all duration-300 ${
                          step > s.number
                            ? "text-white bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/30"
                            : step === s.number
                            ? "text-blue-600 shadow-xl shadow-blue-500/30 dark:bg-blue-950/40 dark:border-blue-500"
                            : "text-slate-400 dark:bg-slate-800 dark:border-slate-700"
                        }`}
                      >
                        {step > s.number ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <Check size={20} className="stroke-[3]" />
                          </motion.div>
                        ) : (
                          <span>{s.number}</span>
                        )}
                      </motion.div>
                      <span className={`text-xs font-bold mt-3 ${
                        step >= s.number ? "text-blue-700 dark:text-blue-400" : "text-slate-500 dark:text-slate-500"
                      }`}>
                        {s.label}
                      </span>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="flex items-center mx-2 sm:mx-4">
                        {/* Arrow indicator */}
                        <motion.div
                          animate={{
                            x: step > s.number ? [0, 5, 0] : 0,
                            opacity: step > s.number ? 1 : 0.4
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          <ChevronRight 
                            className={`h-6 w-6 ${
                              step > s.number 
                                ? "text-blue-600 dark:text-blue-400" 
                                : "text-slate-300 dark:text-slate-600"
                            }`} 
                          />
                        </motion.div>
                        {/* Progress line */}
                        <div className="w-12 sm:w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ml-2">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                            initial={{ width: "0%" }}
                            animate={{ width: step > s.number ? "100%" : "0%" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          />
                        </div>
                        <ChevronRight 
                          className={`h-6 w-6 ml-2 ${
                            step > s.number 
                              ? "text-blue-600 dark:text-blue-400" 
                              : "text-slate-300 dark:text-slate-600"
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Errors */}
            {(validationError || authError) && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-650 dark:text-red-400 font-semibold">
                {validationError || authError}
              </div>
            )}

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 && (
                <div className="space-y-6">
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
                  <div className="space-y-2">
                    <label className="text-base font-semibold text-slate-800 dark:text-slate-200">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
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
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-sm space-y-3 text-slate-800 dark:text-slate-200">
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
                      className="mt-1 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-600 dark:text-slate-400 font-semibold">
                      I agree to the Terms of Service and Privacy Policy of Shrestha Services Pvt. Ltd.
                    </span>
                  </label>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handlePrevStep} className="px-8 py-3 text-base">
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <Button type="button" onClick={handleNextStep} className="px-10 py-3 text-base flex items-center gap-2">
                    Continue
                    <ChevronRight size={18} />
                  </Button>
                ) : (
                  <Button type="submit" loading={loading} className="px-10 py-3 text-base">
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
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm font-semibold">
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
      </motion.div>
    </div>
  );
}
