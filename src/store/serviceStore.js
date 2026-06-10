import { create } from "zustand";
import { serviceApi } from "@/services/serviceApi";
export const useServiceStore = create((set) => ({
    services: [],
    selectedService: null,
    isLoading: false,
    error: null,
    fetchServices: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await serviceApi.getAll();
            set({ services: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load services", isLoading: false });
        }
    },
    fetchServiceBySlug: async (slug) => {
        set({ isLoading: true, error: null, selectedService: null });
        try {
            const data = await serviceApi.getBySlug(slug);
            if (!data)
                throw new Error("Service not found");
            set({ selectedService: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load service detail", isLoading: false });
        }
    },
    createService: async (serviceData) => {
        set({ isLoading: true, error: null });
        try {
            await serviceApi.create(serviceData);
            const data = await serviceApi.getAll();
            set({ services: data, isLoading: false });
        }
        catch (err) {
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
        }
        catch (err) {
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
        }
        catch (err) {
            set({ error: err.message || "Failed to delete service", isLoading: false });
            throw err;
        }
    },
}));
