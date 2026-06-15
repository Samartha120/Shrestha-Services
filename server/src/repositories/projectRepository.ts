import { prisma } from "../config/prisma.js";

export const projectRepository = {
  findAll: async () => {
    return prisma.project.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  },

  findBySlug: async (slug: string) => {
    return prisma.project.findUnique({
      where: { slug },
      include: { category: true },
    });
  },

  findById: async (id: string) => {
    return prisma.project.findUnique({
      where: { id },
      include: { category: true },
    });
  },

  create: async (data: {
    title: string;
    slug: string;
    image?: string | null;
    description?: string | null;
    categoryId?: string | null;
  }) => {
    return prisma.project.create({
      data,
      include: { category: true },
    });
  },

  update: async (id: string, data: Partial<{
    title: string;
    slug: string;
    image: string | null;
    description: string | null;
    categoryId: string | null;
  }>) => {
    return prisma.project.update({
      where: { id },
      data,
      include: { category: true },
    });
  },

  delete: async (id: string) => {
    return prisma.project.delete({
      where: { id },
    });
  },
};
