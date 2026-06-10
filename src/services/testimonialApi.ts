import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
import type { Testimonial } from "@/types/testimonial.types";

export const testimonialApi = {
  getAll: async (): Promise<Testimonial[]> => {
    await delay(400);
    const db = getMockDb();
    return db.testimonials;
  },

  create: async (testimonialData: Omit<Testimonial, "id">): Promise<Testimonial> => {
    await delay(600);
    const db = getMockDb();
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: `t-${Date.now()}`,
    };
    db.testimonials.push(newTestimonial);
    updateMockDb("ss_testimonials", db.testimonials);
    return newTestimonial;
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(400);
    const db = getMockDb();
    const filtered = db.testimonials.filter((t) => t.id !== id);
    if (filtered.length === db.testimonials.length) return false;
    updateMockDb("ss_testimonials", filtered);
    return true;
  },
};