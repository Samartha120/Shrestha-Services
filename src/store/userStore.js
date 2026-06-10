import { create } from "zustand";
import { usersApi } from "@/services/usersApi";
export const useUserStore = create((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await usersApi.getAll();
            set({ users: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load user list", isLoading: false });
        }
    },
    updateUserRole: async (id, role) => {
        set({ isLoading: true, error: null });
        try {
            await usersApi.updateRole(id, role);
            const data = await usersApi.getAll();
            set({ users: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to update user role", isLoading: false });
            throw err;
        }
    },
    deleteUser: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await usersApi.delete(id);
            const data = await usersApi.getAll();
            set({ users: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to delete user", isLoading: false });
            throw err;
        }
    },
}));
