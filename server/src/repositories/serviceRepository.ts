import { prisma } from "../config/prisma.js";

export const serviceRepository = {
  findAll: async () => {
    return prisma.service.findMany({
      orderBy: { title: "asc" },
    });
  },

  findBySlug: async (slug: string) => {
    return prisma.service.findUnique({
      where: { slug },
    });
  },

  findById: async (id: string) => {
    return prisma.service.findUnique({
      where: { id },
    });
  },

  create: async (data: {
    title: string;
    slug: string;
    description: string;
    image?: string | null;
    category: string;
    basePrice: number;
    materials: string[];
    features: string[];
  }) => {
    return prisma.service.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        image: data.image,
        category: data.category,
        basePrice: data.basePrice,
        materials: data.materials,
        features: data.features,
      },
    });
  },

  update: async (id: string, data: Partial<{
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category: string;
    basePrice: number;
    materials: string[];
    features: string[];
  }>) => {
    return prisma.service.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return prisma.service.delete({
      where: { id },
    });
  },
};
