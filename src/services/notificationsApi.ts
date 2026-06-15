import api from "./api";
import type { Notification } from "@/types/notification.types";

export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => {
    const res = await api.get("/notifications");
    return res.data.data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const res = await api.patch(`/notifications/${id}/read`);
    return res.data.data;
  },

  markAllAsRead: async (): Promise<Notification[]> => {
    const res = await api.patch("/notifications/read-all");
    return res.data.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/notifications/${id}`);
    return res.data.status === "success";
  },
};
