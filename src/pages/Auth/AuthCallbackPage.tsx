import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/services/authApi";
import { useReducedMotion } from "framer-motion";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated, setToken, checkAuth } = useAuthStore();
  const reduce = useReducedMotion();
  const [status, setStatus] = useState("Authenticating…");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setStatus("Processing authentication…");

        // 1. Get the session from Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          throw new Error(sessionError?.message || "No session found");
        }

        setStatus("Signing in…");

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
      } catch (err) {
        setStatus("Authentication failed");
        setError(err instanceof Error ? err.message : "Something went wrong.");
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-5 text-ink">
      {/* Wordmark */}
      <div className="flex flex-col items-center leading-none">
        <span className="font-display text-3xl font-semibold tracking-tight">
          Shrestha
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
          Services
        </span>
      </div>

      {/* CMYK progress bar */}
      <div className="mt-10 flex h-1 w-40 overflow-hidden rounded-full">
        <span className="flex-1 bg-[#22b4d6]" />
        <span className="flex-1 bg-[#e6559b]" />
        <span className="flex-1 bg-[#f4c020]" />
        <span className="flex-1 bg-ink" />
      </div>

      {/* Spinner + status */}
      <div className="mt-10 flex flex-col items-center gap-4">
        {!error && (
          <span
            className={`h-8 w-8 rounded-full border-2 border-line border-t-accent ${
              reduce ? "" : "animate-spin"
            }`}
            aria-hidden
          />
        )}
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
          {status}
        </p>
        {error ? (
          <p className="max-w-xs text-center text-sm text-err">{error}</p>
        ) : (
          <p className="max-w-xs text-center text-sm text-ink-soft text-pretty">
            Please wait while we sign you in.
          </p>
        )}
      </div>
    </div>
  );
}
