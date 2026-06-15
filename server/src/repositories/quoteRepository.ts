import { prisma } from "../config/prisma.js";

export const quoteRepository = {
  create: async (data: any) => {
    return prisma.quote.create({
      data,
    });
  },

  findById: async (id: string) => {
    return prisma.quote.findUnique({
      where: { id },
    });
  },

  findAll: async () => {
    return prisma.quote.findMany({
      orderBy: { date: "desc" },
    });
  },

  findByEmail: async (email: string) => {
    return prisma.quote.findMany({
      where: { email },
      orderBy: { date: "desc" },
    });
  },

  updateStatus: async (id: string, status: string, estimatedPrice?: number) => {
    return prisma.quote.update({
      where: { id },
      data: {
        status,
        ...(estimatedPrice !== undefined ? { estimatedPrice } : {}),
      },
    });
  },

  delete: async (id: string) => {
    return prisma.quote.delete({
      where: { id },
    });
  },
};
