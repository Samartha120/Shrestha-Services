import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
import type { Notification } from "@/types/notification.types";

export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => {
    await delay(300);
    const db = getMockDb();
    return db.notifications;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    await delay(200);
    const db = getMockDb();
    const idx = db.notifications.findIndex((n) => n.id === id);
    if (idx === -1) throw new Error("Notification not found");

    db.notifications[idx].read = true;
    updateMockDb("ss_notifications", db.notifications);
    return db.notifications[idx];
  },

  markAllAsRead: async (): Promise<Notification[]> => {
    await delay(300);
    const db = getMockDb();
    const updated = db.notifications.map((n) => ({ ...n, read: true }));
    updateMockDb("ss_notifications", updated);
    return updated;
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(200);
    const db = getMockDb();
    const filtered = db.notifications.filter((n) => n.id !== id);
    if (filtered.length === db.notifications.length) return false;
    updateMockDb("ss_notifications", filtered);
    return true;
  },
};
