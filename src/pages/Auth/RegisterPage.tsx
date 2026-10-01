import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Check, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AuthShell, { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { sendOtp, error: authError, clearError } = useAuthStore();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2
  const [companyName, setCompanyName] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [industryType, setIndustryType] = useState("");

  // Step 3
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");

  // Step 4
  const [agreeTerms, setAgreeTerms] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 6) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;
    return strength;
  };
  const passwordStrength = getPasswordStrength(password);

  const handleNextStep = () => {
    setValidationError("");
    clearError();
    if (step === 1) {
      if (!name || !email || !password || !confirmPassword) {
        setValidationError("Please complete all fields in this step.");
        return;
      }
      if (password.length < 6) {
        setValidationError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setValidationError("Passwords do not match.");
        return;
      }
    } else if (step === 2) {
      if (!companyName || !industryType) {
        setValidationError("Company name and industry type are required.");
        return;
      }
    } else if (step === 3) {
      if (!city || !stateName || !street) {
        setValidationError("City, state and street address are required.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setValidationError("");
    clearError();
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    clearError();

    if (step < 4) {
      handleNextStep();
      return;
    }

    if (!agreeTerms) {
      setValidationError("You must agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    try {
      await sendOtp(email);
      navigate("/verify-otp", {
        state: {
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
        },
      });
    } catch {
      // Handled by store
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Business" },
    { number: 3, label: "Address" },
    { number: 4, label: "Review" },
  ];

  const fade = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
        };

  const stepFade = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -16 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      };

  const currentStep = steps.find((s) => s.number === step);

  return (
    <AuthShell
      statement="Set up your shop. We'll take it from the press."
      note="One account to request quotes, approve proofs and track every board, banner and print through to delivery."
    >
      {step < 5 ? (
        <>
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-3 eyebrow">
              <span className="h-px w-6 bg-accent" aria-hidden />
              New account
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink">
              Create your account.
            </h2>
            <p className="mt-3 text-ink-soft text-pretty">
              Register your business for printing & signage services.
            </p>
          </motion.div>

          {/* Step meter — restrained editorial ticks */}
          <motion.div {...fade(1)} className="mt-8">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]">
              <span className="text-ink">
                Step {step} — {currentStep?.label}
              </span>
              <span className="text-muted">{step} / 4</span>
            </div>
            <div className="mt-3 flex gap-1.5">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className="h-0.5 flex-1 overflow-hidden bg-line"
                >
                  <motion.div
                    className="h-full bg-accent"
                    initial={false}
                    animate={{ width: step >= s.number ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {(validationError || authError) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden"
              >
                <p className="border-l-2 border-err bg-accent-soft/40 px-4 py-3 text-sm font-medium text-err">
                  {validationError || authError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div key={step} {...stepFade} className="flex flex-col gap-6">
                {step === 1 && (
                  <>
                    <div>
                      <label className={authLabelClass}>Full name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Prabin Shrestha"
                        autoComplete="name"
                        className={authFieldClass}
                      />
                    </div>
                    <div>
                      <label className={authLabelClass}>Email address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        autoComplete="email"
                        className={authFieldClass}
                      />
                    </div>
                    <div>
                      <label className={authLabelClass}>Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Choose a strong password"
                          autoComplete="new-password"
                          className={`${authFieldClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {password && (
                        <div className="mt-2 h-0.5 w-full overflow-hidden bg-line">
                          <motion.div
                            className="h-full"
                            initial={{ width: "0%" }}
                            animate={{
                              width: `${passwordStrength}%`,
                              backgroundColor:
                                passwordStrength < 50
                                  ? "var(--color-err, #d8402a)"
                                  : passwordStrength < 75
                                  ? "#c98a12"
                                  : "var(--color-ok, #2f8f5b)",
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className={authLabelClass}>Confirm password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          autoComplete="new-password"
                          className={`${authFieldClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className={authLabelClass}>Company name</label>
                      <input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Shrestha Prints Pvt. Ltd."
                        className={authFieldClass}
                      />
                    </div>
                    <div>
                      <label className={authLabelClass}>
                        Government registration ID (PAN/VAT)
                      </label>
                      <input
                        value={registrationId}
                        onChange={(e) => setRegistrationId(e.target.value)}
                        placeholder="PAN 600123456"
                        className={authFieldClass}
                      />
                    </div>
                    <div>
                      <label className={authLabelClass}>Industry type</label>
                      <input
                        value={industryType}
                        onChange={(e) => setIndustryType(e.target.value)}
                        placeholder="Retail / Hospitality / Marketing"
                        className={authFieldClass}
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <label className={authLabelClass}>Street address</label>
                      <input
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Main Road, Ward 10"
                        className={authFieldClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className={authLabelClass}>City</label>
                        <input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Biratnagar"
                          className={authFieldClass}
                        />
                      </div>
                      <div>
                        <label className={authLabelClass}>State / Province</label>
                        <input
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          placeholder="Koshi Province"
                          className={authFieldClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={authLabelClass}>Postal code (ZIP)</label>
                      <input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="56600"
                        className={authFieldClass}
                      />
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="rounded-sm border border-line bg-paper-dim/60 p-5 text-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                        Review your details
                      </p>
                      <dl className="mt-4 space-y-2.5 text-ink-soft">
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted">Name</dt>
                          <dd className="text-right text-ink">{name}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted">Email</dt>
                          <dd className="text-right text-ink">{email}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted">Company</dt>
                          <dd className="text-right text-ink">{companyName || "—"}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted">PAN/VAT</dt>
                          <dd className="text-right text-ink">{registrationId || "—"}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted">Address</dt>
                          <dd className="text-right text-ink">
                            {[street, city, stateName, zip].filter(Boolean).join(", ")}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <label className="flex cursor-pointer select-none items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-line-strong text-accent focus:ring-accent"
                      />
                      <span className="text-ink-soft">
                        I agree to the{" "}
                        <Link to="/terms" className="text-ink underline decoration-accent underline-offset-2">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-ink underline decoration-accent underline-offset-2">
                          Privacy Policy
                        </Link>{" "}
                        of Shrestha Services.
                      </span>
                    </label>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-9 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={loading}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-60"
                >
                  {loading && step === 1 ? "Sending code…" : "Continue"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-60"
                >
                  {loading ? "Creating account…" : "Create account"}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </form>

          <p className="mt-8 text-sm text-ink-soft">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              Sign in
            </Link>
          </p>
        </>
      ) : (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-10 text-center"
        >
          <motion.span
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: reduce ? 1 : [0, 1.2, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-ok text-ok"
          >
            <Check size={32} className="stroke-[2.5]" />
          </motion.span>
          <h3 className="mt-7 font-display text-3xl text-ink">
            You're all set.
          </h3>
          <p className="mt-3 max-w-sm text-ink-soft text-pretty">
            Welcome to Shrestha Services. We're setting up your dashboard —
            you'll be there in a moment.
          </p>
          <div className="mt-7 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent [animation-delay:-0.3s] motion-safe:animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-accent [animation-delay:-0.15s] motion-safe:animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-accent motion-safe:animate-bounce" />
          </div>
        </motion.div>
      )}
    </AuthShell>
  );
}
