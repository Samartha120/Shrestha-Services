import api from "./api";
import type { LoginPayload } from "@/types/auth.types";

export const authApi = {
  login: async (payload: LoginPayload) => {
    const res = await api.post("/auth/login", payload);
    const data = res.data.data;
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    return data;
  },

  register: async (payload: any) => {
    const res = await api.post("/auth/register", payload);
    const user = res.data.data.user;
    // For registration, we might not get token instantly unless auto-login is configured,
    // but the backend register endpoint returns { user }. Let's auto log in or prompt user.
    return user;
  },

  forgotPassword: async (email: string) => {
    await api.post("/auth/forgot-password", { email });
    return { success: true };
  },

  resetPassword: async (_token: string, password: string) => {
    // Send password reset update to backend
    await api.post("/auth/reset-password", { password });
    return { success: true };
  },

  me: async () => {
    const res = await api.get("/auth/me");
    return res.data.data.user;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // Ignore network errors on logout
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return { success: true };
  },
};