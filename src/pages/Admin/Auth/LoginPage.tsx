import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { ShieldCheck, Mail, Lock } from "lucide-react";

export default function AdminLoginPage() {
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
        setValidationError("Access denied. This portal is restricted to Administrators only.");
      }
    } catch (err: any) {
      // Handled by store
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl dark:shadow-2xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />

        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center relative z-10">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Control Center</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Authorized administrative personnel only.
          </p>
        </div>

        {/* Credentials Tip */}
        <div className="mb-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 text-xs space-y-1">
          <p className="font-semibold text-blue-700 dark:text-blue-400">Admin Account Info:</p>
          <p className="text-slate-600 dark:text-slate-300">Email: <span className="font-mono text-slate-800 dark:text-slate-200">admin@shrestha.com</span></p>
          <p className="text-slate-600 dark:text-slate-300">Password: <span className="font-mono text-slate-800 dark:text-slate-200">admin123</span></p>
        </div>

        {/* Error Alert */}
        {(validationError || authError) && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/35 border border-red-100 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
            {validationError || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Admin Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shresthaservices.com.np"
              leftIcon={<Mail size={18} className="text-slate-400 dark:text-slate-500" />}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock size={18} className="text-slate-400 dark:text-slate-500" />}
              required
            />
          </div>

          <Button type="submit" loading={loading} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            Secure Log In
          </Button>
        </form>

      </div>
    </div>
  );
}
