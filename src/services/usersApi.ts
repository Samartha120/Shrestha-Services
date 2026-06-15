import api from "./api";
import type { UserProfile } from "@/types/user.types";

export const usersApi = {
  getAll: async (): Promise<UserProfile[]> => {
    const res = await api.get("/admin/users");
    return res.data.data;
  },

  updateRole: async (id: string, role: string): Promise<UserProfile> => {
    const res = await api.patch(`/admin/users/${id}/role`, { role });
    return res.data.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data.status === "success";
  },
};
