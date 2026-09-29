import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import AuthShell, { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  const { forgotPassword, error, clearError } = useAuthStore();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email) return;

    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess(true);
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
      statement="Locked out? We'll help you back in."
      note="Enter the email tied to your account and we'll send a secure link to reset your password."
    >
      {success ? (
        <motion.div {...fade(0)}>
          <CheckCircle className="h-12 w-12 text-ok" strokeWidth={1.5} />
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink">
            Check your inbox.
          </h2>
          <p className="mt-3 text-ink-soft text-pretty">
            If an account with that email exists, we've sent instructions to
            reset your password.
          </p>
          <Link
            to="/login"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to sign in
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
              Reset password.
            </h2>
            <p className="mt-3 text-ink-soft text-pretty">
              Enter your email address and we'll send you a recovery link.
            </p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden"
              >
                <p className="border-l-2 border-err bg-accent-soft/40 px-4 py-3 text-sm font-medium text-err">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <motion.div {...fade(1)}>
              <label className={authLabelClass}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                autoComplete="email"
                required
                className={authFieldClass}
              />
            </motion.div>

            <motion.button
              {...fade(2)}
              type="submit"
              disabled={loading}
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send reset link"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </form>

          <motion.p {...fade(3)} className="mt-8 text-sm text-ink-soft">
            Remembered it?{" "}
            <Link
              to="/login"
              className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              Back to sign in
            </Link>
          </motion.p>
        </>
      )}
    </AuthShell>
  );
}
