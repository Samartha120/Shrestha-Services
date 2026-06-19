import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/services/authApi";
import { Printer } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated, setToken, checkAuth } = useAuthStore();
  const [status, setStatus] = useState("Authenticating...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setStatus("Processing authentication...");

        // 1. Get the session from Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          throw new Error(sessionError?.message || "No session found");
        }

        setStatus("Signing in...");

        // 2. Exchange the Google auth info for our backend token
        const loginData = await authApi.googleLogin(session.access_token);

        // 3. Set auth state
        setToken(loginData.token);
        setUser(loginData.user);
        setIsAuthenticated(true);

        // 4. Check user role and redirect
        const user = await checkAuth();
        if (user) {
          if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }
        }
      } catch (err: any) {
        setStatus("Authentication failed");
        setError(err.message);
        console.error("Auth callback failed:", err);

        // Redirect to login after delay
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate, setUser, setIsAuthenticated, setToken, checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
            <Printer className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            {status}
          </h2>
          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Please wait while we sign you in...
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
