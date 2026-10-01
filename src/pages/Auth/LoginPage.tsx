import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/supabaseClient";
import AuthShell, { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuthStore();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    clearError();

    if (!email || !password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const user = await login({ email, password });
      navigate(user.role === "admin" ? "/admin/dashboard" : "/my-dashboard");
    } catch {
      // Error surfaced via store
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
      statement="Sign in, and pick up where the ink left off."
      note="Track quotes, approve proofs and follow every job from the press to your door — all from one account."
    >
      <motion.div {...fade(0)}>
        <span className="inline-flex items-center gap-3 eyebrow">
          <span className="h-px w-6 bg-accent" aria-hidden />
          Account
        </span>
        <h2 className="mt-5 font-display text-4xl leading-tight text-ink">
          Welcome back.
        </h2>
        <p className="mt-3 text-ink-soft text-pretty">
          Log in to manage your quotes and printing orders.
        </p>
      </motion.div>

      {/* Demo credentials — kept for testing, styled quietly */}
      <motion.div
        {...fade(1)}
        className="mt-7 rounded-sm border border-dashed border-line bg-paper-dim/60 p-4 text-xs"
      >
        <p className="font-semibold uppercase tracking-[0.14em] text-muted">
          Demo logins
        </p>
        <div className="mt-2 grid grid-cols-2 gap-4 font-mono text-ink-soft">
          <div>
            <p className="text-ink">Customer</p>
            <p>customer@shrestha.com</p>
            <p>customer123</p>
          </div>
          <div>
            <p className="text-ink">Admin</p>
            <p>admin@shrestha.com</p>
            <p>admin123</p>
          </div>
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

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <motion.div {...fade(2)}>
          <label className={authLabelClass}>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            autoComplete="email"
            className={authFieldClass}
          />
        </motion.div>

        <motion.div {...fade(3)}>
          <div className="flex items-center justify-between">
            <label className={authLabelClass}>Password</label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-ink-soft transition-colors hover:text-accent"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
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

        <motion.button
          {...fade(4)}
          type="submit"
          disabled={loading}
          className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </form>

      {/* Divider */}
      <motion.div {...fade(5)} className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          or
        </span>
        <span className="h-px flex-1 bg-line" />
      </motion.div>

      <motion.button
        {...fade(6)}
        type="button"
        onClick={handleGoogleSignIn}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-line-strong bg-paper px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-paper-dim"
      >
        <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden>
          <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2 5.1-4.4 6.7v5.6h7.1c4.1-3.8 6.6-9.4 6.6-16.3z" />
          <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.6c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z" />
          <path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.5A22 22 0 0 0 2 24c0 3.6.9 7 2.5 10l7.3-5.8z" />
          <path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
        </svg>
        Continue with Google
      </motion.button>

      <motion.p {...fade(7)} className="mt-8 text-sm text-ink-soft">
        New to Shrestha Services?{" "}
        <Link
          to="/register"
          className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
        >
          Create an account
        </Link>
      </motion.p>
    </AuthShell>
  );
}
