import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Printer, Check } from "lucide-react";

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
      navigate("/dashboard");
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
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md mb-3">
            <Printer className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Create Your Account</h2>
          <p className="text-xs text-slate-500 mt-1">
            Register your business for digital printing & advertising services
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 flex justify-between items-center relative">
          <div className="absolute left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 top-1/2 -translate-y-1/2 -z-10" />
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center bg-white dark:bg-slate-900 px-2 z-10">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                  step > s.number
                    ? "bg-blue-600 border-blue-600 text-white"
                    : step === s.number
                    ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-600"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                }`}
              >
                {step > s.number ? <Check size={14} /> : s.number}
              </div>
              <span className="text-[10px] font-medium text-slate-500 mt-1 hidden sm:block">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Errors */}
        {(validationError || authError) && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
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
                placeholder="Bagmati Province"
              />
              <div className="col-span-2">
                <Input
                  label="Postal Code (ZIP)"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="44600"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 text-sm space-y-3">
                <h4 className="font-bold border-b border-slate-200 dark:border-slate-800 pb-2">Review Your Details</h4>
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
                  className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-600 dark:text-slate-300">
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
