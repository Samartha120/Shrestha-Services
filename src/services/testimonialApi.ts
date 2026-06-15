import api from "./api";
import type { Testimonial } from "@/types/testimonial.types";

export const testimonialApi = {
  getAll: async (): Promise<Testimonial[]> => {
    const res = await api.get("/testimonials");
    return res.data.data;
  },

  create: async (testimonialData: Omit<Testimonial, "id">): Promise<Testimonial> => {
    const res = await api.post("/testimonials", testimonialData);
    return res.data.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/testimonials/${id}`);
    return res.data.status === "success";
  },
};