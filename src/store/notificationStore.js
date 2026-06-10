import { create } from "zustand";
import { notificationsApi } from "@/services/notificationsApi";
export const useNotificationStore = create((set) => ({
    notifications: [],
    isLoading: false,
    error: null,
    fetchNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await notificationsApi.getAll();
            set({ notifications: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load notifications", isLoading: false });
        }
    },
    markAsRead: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await notificationsApi.markAsRead(id);
            const data = await notificationsApi.getAll();
            set({ notifications: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to mark read status", isLoading: false });
        }
    },
    markAllAsRead: async () => {
        set({ isLoading: true, error: null });
        try {
            await notificationsApi.markAllAsRead();
            const data = await notificationsApi.getAll();
            set({ notifications: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to mark all read status", isLoading: false });
        }
    },
    deleteNotification: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await notificationsApi.delete(id);
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id),
                isLoading: false,
            }));
        }
        catch (err) {
            set({ error: err.message || "Failed to delete notification", isLoading: false });
        }
    },
    addSystemNotification: (title, message) => {
        const newNotif = {
            id: `n-${Date.now()}`,
            title,
            message,
            read: false,
        };
        // Direct local update
        set((state) => {
            const updated = [newNotif, ...state.notifications];
            localStorage.setItem("ss_notifications", JSON.stringify(updated));
            return { notifications: updated };
        });
    },
}));
