import { prisma } from "../config/prisma.js";

export const galleryRepository = {
  findAll: async () => {
    return prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findByCategory: async (category: string) => {
    return prisma.galleryImage.findMany({
      where: {
        category: {
          equals: category,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  create: async (data: {
    title: string;
    image: string;
    category: string;
    description?: string | null;
  }) => {
    return prisma.galleryImage.create({
      data,
    });
  },

  delete: async (id: string) => {
    return prisma.galleryImage.delete({
      where: { id },
    });
  },
};
