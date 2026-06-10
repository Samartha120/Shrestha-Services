import { create } from "zustand";
import { authApi } from "@/services/authApi";
export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("accessToken"),
    isAuthenticated: !!localStorage.getItem("accessToken"),
    isLoading: false,
    error: null,
    login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
            // Mock authorization validation
            let user;
            let token = "mock-jwt-token";
            if (payload.email === "admin@shrestha.com" && payload.password === "admin123") {
                user = { id: "u1", name: "Prabin Shrestha (Admin)", email: payload.email, role: "admin" };
            }
            else if (payload.email === "customer@shrestha.com" && payload.password === "customer123") {
                user = { id: "u2", name: "Suresh Thapa (Client)", email: payload.email, role: "customer" };
            }
            else {
                // Mock register login fallback
                const existingUsers = JSON.parse(localStorage.getItem("ss_users") || "[]");
                const matched = existingUsers.find((u) => u.email === payload.email);
                if (matched) {
                    user = { id: matched.id, name: matched.name, email: matched.email, role: matched.role };
                }
                else {
                    throw new Error("Invalid email or password. Use admin@shrestha.com (admin123) or customer@shrestha.com (customer123).");
                }
            }
            localStorage.setItem("accessToken", token);
            localStorage.setItem("currentUser", JSON.stringify(user));
            set({ user, token, isAuthenticated: true, isLoading: false });
            return user;
        }
        catch (err) {
            set({ error: err.message || "Login failed", isLoading: false });
            throw err;
        }
    },
    register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
            const dbUsers = JSON.parse(localStorage.getItem("ss_users") || "[]");
            const userExists = dbUsers.some((u) => u.email === payload.email);
            if (userExists)
                throw new Error("Email is already registered");
            const newUser = {
                id: `u-${Date.now()}`,
                name: payload.name,
                email: payload.email,
                role: "customer",
                createdAt: new Date().toISOString(),
            };
            dbUsers.push(newUser);
            localStorage.setItem("ss_users", JSON.stringify(dbUsers));
            // Automatically log the user in after registration
            const mockToken = "mock-jwt-token";
            localStorage.setItem("accessToken", mockToken);
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            set({
                user: { id: newUser.id, name: newUser.name, email: newUser.email, role: "customer" },
                token: mockToken,
                isAuthenticated: true,
                isLoading: false,
            });
            return newUser;
        }
        catch (err) {
            set({ error: err.message || "Registration failed", isLoading: false });
            throw err;
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            await authApi.forgotPassword(email);
            set({ isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Request failed", isLoading: false });
            throw err;
        }
    },
    resetPassword: async (password, token) => {
        set({ isLoading: true, error: null });
        try {
            await authApi.resetPassword(token, password);
            set({ isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Reset failed", isLoading: false });
            throw err;
        }
    },
    logout: async () => {
        set({ isLoading: true });
        try {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("currentUser");
            set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
        catch (err) {
            set({ isLoading: false });
        }
    },
    checkAuth: async () => {
        const token = localStorage.getItem("accessToken");
        const cachedUser = localStorage.getItem("currentUser");
        if (token && cachedUser) {
            const user = JSON.parse(cachedUser);
            set({ user, token, isAuthenticated: true });
            return user;
        }
        set({ user: null, token: null, isAuthenticated: false });
        return null;
    },
    clearError: () => set({ error: null }),
}));
