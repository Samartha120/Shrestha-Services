import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AuthShell, { authLabelClass } from "@/components/auth/AuthShell";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, error: authError, clearError } = useAuthStore();
  const reduce = useReducedMotion();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const registrationPayload = location.state || {};
  const email = registrationPayload.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    clearError();
    try {
      await useAuthStore.getState().sendOtp(email);
      setCountdown(60);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    clearError();
    try {
      await useAuthStore.getState().verifyOtp(email, otp.join(""));
      await register(registrationPayload);
      navigate("/my-dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const fade = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <AuthShell
      statement="One code stands between you and your account."
      note="We've sent a six-digit verification code to your inbox. Enter it below to finish setting up."
    >
      <motion.div {...fade(0)}>
        <span className="inline-flex items-center gap-3 eyebrow">
          <span className="h-px w-6 bg-accent" aria-hidden />
          Verification
        </span>
        <h2 className="mt-5 font-display text-4xl leading-tight text-ink">
          Verify your email.
        </h2>
        <p className="mt-3 text-ink-soft text-pretty">
          We've sent a verification code to{" "}
          <span className="font-semibold text-ink">{email}</span>
        </p>
      </motion.div>

      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <p className="border-l-2 border-err bg-accent-soft/40 px-4 py-3 text-sm font-medium text-err">
              {authError}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div {...fade(1)} className="mt-8">
        <label className={authLabelClass}>Verification code</label>
        <div className="mt-3 flex justify-between gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 w-full rounded-sm border border-line bg-transparent text-center font-display text-2xl text-ink transition-colors focus:border-accent focus:outline-none"
              autoFocus={index === 0}
              onFocus={(e) => e.currentTarget.select()}
            />
          ))}
        </div>
      </motion.div>

      <motion.div {...fade(2)} className="mt-5 text-sm">
        {countdown > 0 ? (
          <p className="text-ink-soft">
            Resend code in{" "}
            <span className="font-mono font-semibold text-accent">{countdown}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={loading}
            className="font-semibold text-ink-soft transition-colors hover:text-accent disabled:opacity-50"
          >
            {loading ? "Sending…" : "Resend verification code"}
          </button>
        )}
      </motion.div>

      <motion.button
        {...fade(3)}
        type="button"
        onClick={handleVerify}
        disabled={verifying || otp.some((d) => !d)}
        className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-60"
      >
        {verifying ? "Verifying…" : "Verify & continue"}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>

      <motion.div {...fade(4)} className="mt-8">
        <Link
          to="/register"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to sign up
        </Link>
      </motion.div>
    </AuthShell>
  );
}
