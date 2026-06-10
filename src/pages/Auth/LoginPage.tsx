import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Printer, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

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
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-100/50 dark:shadow-none">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
            <Printer className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Log in to manage your quotes and printing orders
          </p>
        </div>

        {/* Credentials Tip */}
        <div className="mb-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 text-xs space-y-1.5">
          <p className="font-semibold text-blue-700 dark:text-blue-400">Quick Test Credentials:</p>
          <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-350">
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">Customer Acc:</p>
              <p>customer@shrestha.com</p>
              <p>customer123</p>
            </div>
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">Admin Acc:</p>
              <p>admin@shrestha.com</p>
              <p>admin123</p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {(validationError || authError) && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
            {validationError || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            leftIcon={<Mail size={18} className="text-slate-400" />}
          />

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Password</label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock size={18} className="text-slate-400" />}
            />
          </div>

          <Button type="submit" loading={loading} className="w-full mt-2">
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-500">
          New to Shrestha Services?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}
