import { create } from "zustand";
import type { Service } from "@/types/service.types";
import { serviceApi } from "@/services/serviceApi";

interface ServiceState {
  services: Service[];
  selectedService: Service | null;
  isLoading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  fetchServiceBySlug: (slug: string) => Promise<void>;
  createService: (service: Omit<Service, "id">) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  selectedService: null,
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await serviceApi.getAll();
      set({ services: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load services", isLoading: false });
    }
  },

  fetchServiceBySlug: async (slug: string) => {
    set({ isLoading: true, error: null, selectedService: null });
    try {
      const data = await serviceApi.getBySlug(slug);
      if (!data) throw new Error("Service not found");
      set({ selectedService: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load service detail", isLoading: false });
    }
  },

  createService: async (serviceData) => {
    set({ isLoading: true, error: null });
    try {
      await serviceApi.create(serviceData);
      const data = await serviceApi.getAll();
      set({ services: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to create service", isLoading: false });
      throw err;
    }
  },

  updateService: async (id, serviceData) => {
    set({ isLoading: true, error: null });
    try {
      await serviceApi.update(id, serviceData);
      const data = await serviceApi.getAll();
      set({ services: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to update service", isLoading: false });
      throw err;
    }
  },

  deleteService: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await serviceApi.delete(id);
      const data = await serviceApi.getAll();
      set({ services: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to delete service", isLoading: false });
      throw err;
    }
  },
}));
