import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AuthShell, { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  const { resetPassword, error, clearError } = useAuthStore();
  const reduce = useReducedMotion();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    clearError();

    if (!password) {
      setValidationError("Please enter a password.");
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(password, token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch {
      // handled
    } finally {
      setLoading(false);
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
      statement="A fresh key for your account."
      note="Choose a strong new password. You'll use it the next time you sign in to track your jobs."
    >
      {success ? (
        <motion.div {...fade(0)}>
          <CheckCircle className="h-12 w-12 text-ok" strokeWidth={1.5} />
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink">
            Password reset.
          </h2>
          <p className="mt-3 text-ink-soft text-pretty">
            Your password has been changed. Redirecting you to the sign in page
            in a moment…
          </p>
          <Link
            to="/login"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
          >
            Go to sign in now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      ) : !token ? (
        <motion.div {...fade(0)}>
          <h2 className="font-display text-4xl leading-tight text-ink">
            Link not valid.
          </h2>
          <p className="mt-3 text-ink-soft text-pretty">
            This password reset link is missing or malformed. Request a new one
            and we'll email you a fresh link.
          </p>
          <Link
            to="/forgot-password"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
          >
            Request a new link
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      ) : (
        <>
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-3 eyebrow">
              <span className="h-px w-6 bg-accent" aria-hidden />
              Recovery
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ink">
              Set new password.
            </h2>
            <p className="mt-3 text-ink-soft text-pretty">
              Enter your new security password below.
            </p>
          </motion.div>

          <AnimatePresence>
            {(validationError || error) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden"
              >
                <p className="border-l-2 border-err bg-accent-soft/40 px-4 py-3 text-sm font-medium text-err">
                  {validationError || error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <motion.div {...fade(1)}>
              <label className={authLabelClass}>New password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
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
            </motion.div>

            <motion.div {...fade(2)}>
              <label className={authLabelClass}>Confirm new password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
                className={authFieldClass}
              />
            </motion.div>

            <motion.button
              {...fade(3)}
              type="submit"
              disabled={loading}
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-60"
            >
              {loading ? "Resetting…" : "Reset password"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </form>
        </>
      )}
    </AuthShell>
  );
}
