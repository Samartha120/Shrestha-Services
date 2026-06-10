import { create } from "zustand";
import { testimonialApi } from "@/services/testimonialApi";
export const useTestimonialStore = create((set) => ({
    testimonials: [],
    isLoading: false,
    error: null,
    fetchTestimonials: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await testimonialApi.getAll();
            set({ testimonials: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load testimonials", isLoading: false });
        }
    },
    addTestimonial: async (testimonialData) => {
        set({ isLoading: true, error: null });
        try {
            await testimonialApi.create(testimonialData);
            const data = await testimonialApi.getAll();
            set({ testimonials: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to add testimonial", isLoading: false });
            throw err;
        }
    },
    deleteTestimonial: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await testimonialApi.delete(id);
            const data = await testimonialApi.getAll();
            set({ testimonials: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to delete testimonial", isLoading: false });
            throw err;
        }
    },
}));
