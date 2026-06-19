import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Printer, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Google sign-in failed:', error);
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
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      // Error handled by store
    } finally {
      setLoading(false);
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
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="h-16 w-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-6"
          >
            <Printer className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">
            Log in to manage your quotes and printing orders
          </p>
        </div>

        {/* Credentials Tip */}
        <div className="mb-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-5 text-xs space-y-1.5">
          <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-2">Quick Test Credentials:</p>
          <div className="grid grid-cols-2 gap-4 text-slate-600 dark:text-slate-350">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Customer Acc:</p>
              <p>customer@shrestha.com</p>
              <p>customer123</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Admin Acc:</p>
              <p>admin@shrestha.com</p>
              <p>admin123</p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {(validationError || authError) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400 font-semibold"
          >
            {validationError || authError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            leftIcon={<Mail size={20} className="text-slate-400" />}
          />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-base font-semibold text-slate-800 dark:text-slate-200">Password</label>
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock size={20} className="text-slate-400" />}
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

          <Button type="submit" loading={loading} className="w-full mt-4 py-3 text-lg">
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
          <div className="mx-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            or continue with
          </div>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
        >
          <svg className="h-6 w-6" viewBox="0 0 48 48">
            <defs>
              <path id="g" fill="none" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13.2-5.9-13.2-13S16.8 11 24 11c3.4 0 6.5 1.3 8.8 3.4l6.6-6.6C36.2 5.4 30.5 3 24 3 12.5 3 3 12.5 3 24s9.5 21 21 21 12.5 0 21-9.5 21-21c0-1.4-.1-2.8-.5-4z"/>
            </defs>
            <clipPath id="a">
              <use href="#g"/>
            </clipPath>
            <path fill="#4285F4" d="M9.8 29.6l3 3.8C14.5 37 19 40 24 40c5 0 9.5-1.8 13-4.8l-3.8-3.2"/>
            <path fill="#34A853" d="M44 24c0-1.4-.1-2.8-.5-4H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-5 0-9.5-1.8-13-4.8l-3.8 3.2 4 3.5"/>
            <path fill="#FBBC05" d="M24 40c3.4 0 6.5-1.3 8.8-3.4l3.8 3.2C33.2 43.4 29 45 24 45 14.5 45 7 39.5 4 32l3.8-3.2"/>
            <path fill="#EA4335" d="M24 9c2.3 0 4.4.8 6 2.3l4.5-4.5C31.8 4.1 28.2 2.5 24 2.5 14.5 2.5 7 8 4.3 15.5l3.5 4.2"/>
          </svg>
          <span className="text-base font-semibold">
            Continue with Google
          </span>
        </button>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-base text-slate-500">
          New to Shrestha Services?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Create an account
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
