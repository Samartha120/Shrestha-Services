import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Lock, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "mock-token";
  const { resetPassword, error, clearError } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

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
    } catch (err) {
      // handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
        
        {success ? (
          <div className="text-center space-y-4 py-6">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
            <h2 className="text-2xl font-bold tracking-tight">Password Reset Successfully</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Your password has been changed. Redirection you to the sign in page in 3 seconds...
            </p>
            <div className="pt-6">
              <Link to="/login" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Go to Sign In Now
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Set New Password</h2>
              <p className="text-sm text-slate-500 mt-2">
                Enter your new security password below
              </p>
            </div>

            {(validationError || error) && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
                {validationError || error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock size={18} className="text-slate-400" />}
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock size={18} className="text-slate-400" />}
                required
              />

              <Button type="submit" loading={loading} className="w-full">
                Reset Password
              </Button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
