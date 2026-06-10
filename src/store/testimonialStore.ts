import { create } from "zustand";
import type { Testimonial } from "@/types/testimonial.types";
import { testimonialApi } from "@/services/testimonialApi";

interface TestimonialState {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  fetchTestimonials: () => Promise<void>;
  addTestimonial: (data: Omit<Testimonial, "id">) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set) => ({
  testimonials: [],
  isLoading: false,
  error: null,

  fetchTestimonials: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await testimonialApi.getAll();
      set({ testimonials: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load testimonials", isLoading: false });
    }
  },

  addTestimonial: async (testimonialData) => {
    set({ isLoading: true, error: null });
    try {
      await testimonialApi.create(testimonialData);
      const data = await testimonialApi.getAll();
      set({ testimonials: data, isLoading: false });
    } catch (err: any) {
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
    } catch (err: any) {
      set({ error: err.message || "Failed to delete testimonial", isLoading: false });
      throw err;
    }
  },
}));
