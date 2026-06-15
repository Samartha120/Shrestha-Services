import { prisma } from "../config/prisma.js";

export const testimonialRepository = {
  findAll: async () => {
    return prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  create: async (data: {
    customerName: string;
    rating: number;
    review: string;
    userId?: string | null;
  }) => {
    return prisma.testimonial.create({
      data: {
        customerName: data.customerName,
        rating: data.rating,
        review: data.review,
        userId: data.userId,
      },
    });
  },

  delete: async (id: string) => {
    return prisma.testimonial.delete({
      where: { id },
    });
  },
};
