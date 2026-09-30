import { create } from "zustand";
import type { User, LoginPayload } from "@/types/auth.types";
import { authApi } from "@/services/authApi";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<User>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  register: (payload: any) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<User | null>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,

  login: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { user, token } = await authApi.login(payload);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return user;
    } catch (err: any) {
      set({ error: err.message || "Login failed", isLoading: false });
      throw err;
    }
  },

  sendOtp: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.sendOtp(email);
      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to send OTP", isLoading: false });
      throw err;
    }
  },

  verifyOtp: async (email, otp) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.verifyOtp(email, otp);
      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Invalid OTP", isLoading: false });
      throw err;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.register(payload);
      // The register endpoint returns only the created user (no token). To land the
      // user on the dashboard we establish a real session by logging in with the same
      // credentials, which stores the access token and hydrates the auth state.
      if (payload?.email && payload?.password) {
        const { user, token } = await authApi.login({
          email: payload.email,
          password: payload.password,
        });
        set({ user, token, isAuthenticated: true, isLoading: false });
        return user;
      }
      set({ isLoading: false });
      return null;
    } catch (err: any) {
      set({ error: err.message || "Registration failed", isLoading: false });
      throw err;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.forgotPassword(email);
      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Request failed", isLoading: false });
      throw err;
    }
  },

  resetPassword: async (password, token) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.resetPassword(token, password);
      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Reset failed", isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    // Local JWT mode: the access token in localStorage is the source of truth.
    const cachedToken = localStorage.getItem("accessToken");
    const cachedUser = localStorage.getItem("currentUser");

    // No token means the user simply isn't logged in — do NOT call /auth/me.
    // (A 401 from an unauthenticated /auth/me used to clobber a fresh login,
    // bouncing the user back to /login instead of the dashboard.)
    if (!cachedToken) {
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return null;
    }

    // Optimistically hydrate from cache to avoid a redirect flicker.
    if (cachedUser) {
      try {
        set({ user: JSON.parse(cachedUser), token: cachedToken, isAuthenticated: true });
      } catch {
        // ignore malformed cache
      }
    }

    // Validate the token against the backend.
    set({ isLoading: true });
    try {
      const user = await authApi.me();
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        set({ user, token: cachedToken, isAuthenticated: true, isLoading: false });
        return user;
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return null;
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return null;
    }
  },

  clearError: () => set({ error: null }),

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

