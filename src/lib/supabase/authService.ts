import { supabase } from "./supabaseClient";
import type { LoginPayload, User } from "@/types/auth.types";

export const authService = {
  login: async (payload: LoginPayload): Promise<{ user: User; token: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("No user found");

    // Fetch user details and role from public schema
    const profile = await authService.getUserProfile(data.user.id);
    if (!profile) throw new Error("User profile not synced");

    return {
      user: profile,
      token: data.session?.access_token || "",
    };
  },

  register: async (payload: any): Promise<User> => {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
        },
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Registration failed");

    // Fetch profile (may take a split second for DB trigger)
    let profile = await authService.getUserProfile(data.user.id);
    let attempts = 0;
    while (!profile && attempts < 5) {
      await new Promise((r) => setTimeout(r, 200));
      profile = await authService.getUserProfile(data.user.id);
      attempts++;
    }

    if (!profile) {
      // Fallback
      profile = {
        id: data.user.id,
        name: payload.name,
        email: payload.email,
        role: "customer",
      };
    }

    return profile;
  },

  forgotPassword: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw new Error(error.message);
  },

  resetPassword: async (password: string): Promise<void> => {
    // In Supabase, the user is authenticated from the password reset email link
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(error.message);
  },

  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  getUserProfile: async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, avatar, roles(name)")
      .eq("id", userId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: (data.roles as any)?.name || "customer",
      avatar: data.avatar || undefined,
    };
  },

  checkAuth: async (): Promise<User | null> => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.user) return null;

    return await authService.getUserProfile(session.user.id);
  },
};
