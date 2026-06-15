import api from "./api";
import type { Service } from "@/types/service.types";

export const serviceApi = {
  getAll: async (): Promise<Service[]> => {
    const res = await api.get("/services");
    return res.data.data;
  },

  getBySlug: async (slug: string): Promise<Service | undefined> => {
    try {
      const res = await api.get(`/services/${slug}`);
      return res.data.data;
    } catch (err) {
      return undefined;
    }
  },

  create: async (serviceData: Omit<Service, "id">): Promise<Service> => {
    const res = await api.post("/services", serviceData);
    return res.data.data;
  },

  update: async (id: string, serviceData: Partial<Service>): Promise<Service> => {
    const res = await api.put(`/services/${id}`, serviceData);
    return res.data.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/services/${id}`);
    return res.data.status === "success";
  },
};