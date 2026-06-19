import { create } from "zustand";
import type { User, LoginPayload } from "@/types/auth.types";
import { authApi } from "@/services/authApi";
import { supabase } from "@/lib/supabase/supabaseClient";

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
      const user = await authApi.register(payload);
      const token = localStorage.getItem("accessToken");
      set({ user, token, isAuthenticated: !!token, isLoading: false });
      return user;
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
    // 1. Instantly load from localStorage if available to avoid flicker
    const cachedToken = localStorage.getItem("accessToken");
    const cachedUser = localStorage.getItem("currentUser");
    if (cachedToken && cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        set({ user: parsedUser, token: cachedToken, isAuthenticated: true });
      } catch (e) {
        // ignore
      }
    }

    // 2. Perform async check to see if the session is still active
    set({ isLoading: true });
    try {
      const user = await authApi.me();
      if (user) {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token || cachedToken;
        if (token) {
          localStorage.setItem("accessToken", token);
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
        set({ user, token, isAuthenticated: true, isLoading: false });
        return user;
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        return null;
      }
    } catch (err: any) {
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

