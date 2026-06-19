import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/common/Button";
import { Printer, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, error: authError, clearError } = useAuthStore();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = location.state?.email || "";
  const password = location.state?.password || "";
  const name = location.state?.name || "";

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
    } catch (err: any) {
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
      await register({ email, password, name });
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl shadow-slate-100/50 dark:shadow-none"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="h-16 w-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-6"
          >
            <Printer className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Verify Your Email
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            We've sent a verification code to{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>
          </p>
        </div>

        {(authError) && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400 font-semibold">
            {authError}
          </div>
        )}

        <div className="space-y-6 mb-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                autoFocus={index === 0}
                onFocus={(e) => e.currentTarget.select()}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            {countdown > 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Resend code in <span className="font-semibold text-blue-600 dark:text-blue-400">{countdown}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Resend verification code"}
              </button>
            )}
          </div>
        </div>

        <Button
          type="button"
          onClick={handleVerify}
          loading={verifying}
          className="w-full py-3 text-lg"
          disabled={otp.some(d => !d)}
        >
          Verify & Continue
        </Button>

        <div className="mt-6 flex items-center gap-2">
          <Link
            to="/register"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ArrowLeft size={16} />
            Back to Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
