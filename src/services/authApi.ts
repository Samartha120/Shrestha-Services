import api from "./api";
import type { LoginPayload } from "@/types/auth.types";

export const authApi = {
  login: async (payload: LoginPayload) => {
    const response = await api.post(
      "/auth/login",
      payload
    );

    return response.data;
  },

  register: async (payload: unknown) => {
    const response = await api.post(
      "/auth/register",
      payload
    );

    return response.data;
  },

  forgotPassword: async (
    email: string
  ) => {
    const response = await api.post(
      "/auth/forgot-password",
      { email }
    );

    return response.data;
  },

  resetPassword: async (
    token: string,
    password: string
  ) => {
    const response = await api.post(
      "/auth/reset-password",
      {
        token,
        password,
      }
    );

    return response.data;
  },

  me: async () => {
    const response = await api.get(
      "/auth/profile"
    );

    return response.data;
  },

  logout: async () => {
    const response = await api.post(
      "/auth/logout"
    );

    return response.data;
  },
};