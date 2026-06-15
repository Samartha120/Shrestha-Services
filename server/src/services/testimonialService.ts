import { testimonialRepository } from "../repositories/testimonialRepository.js";

export const testimonialService = {
  getAll: async () => {
    return testimonialRepository.findAll();
  },

  create: async (data: any, userId?: string) => {
    return testimonialRepository.create({
      customerName: data.customerName,
      rating: data.rating,
      review: data.review,
      userId,
    });
  },

  delete: async (id: string) => {
    await testimonialRepository.delete(id);
    return true;
  },
};
