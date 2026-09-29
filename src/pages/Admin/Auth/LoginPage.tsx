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
    <div className="min-h-screen flex items-center justify-center bg-paper px-4 py-12">
      <div className="w-full max-w-md bg-surface border border-line rounded-sm p-8 shadow-[var(--shadow-sm)] relative overflow-hidden">

        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center relative z-10">
          <div className="h-14 w-14 rounded-sm bg-ink flex items-center justify-center mb-4">
            <ShieldCheck className="h-7 w-7 text-inverse" />
          </div>
          <p className="text-xs uppercase tracking-wide text-muted mb-2">Admin Portal</p>
          <h2 className="font-display text-2xl tracking-tight text-ink">Admin Control Center</h2>
          <p className="text-xs text-muted mt-2">
            Authorized administrative personnel only.
          </p>
        </div>

        {/* Credentials Tip */}
        <div className="mb-6 bg-accent-soft border border-line rounded-sm p-4 text-xs space-y-1">
          <p className="font-semibold text-accent">Admin Account Info:</p>
          <p className="text-ink-soft">Email: <span className="font-mono text-ink">admin@shrestha.com</span></p>
          <p className="text-ink-soft">Password: <span className="font-mono text-ink">admin123</span></p>
        </div>

        {/* Error Alert */}
        {(validationError || authError) && (
          <div className="mb-6 p-4 rounded-sm bg-accent-soft border border-line text-sm text-err">
            {validationError || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="text-sm font-medium text-ink-soft block mb-2">Admin Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shresthaservices.com.np"
              leftIcon={<Mail size={18} className="text-muted" />}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink-soft block mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock size={18} className="text-muted" />}
              required
            />
          </div>

          <Button type="submit" loading={loading} className="w-full mt-2 rounded-full bg-ink text-inverse hover:bg-accent">
            Secure Log In
          </Button>
        </form>

      </div>
    </div>
  );
}
