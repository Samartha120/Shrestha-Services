import { prisma } from "../config/prisma.js";

export const orderRepository = {
  create: async (data: { orderNumber: string; customerName: string; userId: string; statusId: string; totalAmount: number; quoteId?: string }) => {
    return prisma.order.create({
      data,
      include: { status: true },
    });
  },

  findById: async (id: string) => {
    return prisma.order.findUnique({
      where: { id },
      include: { status: true, items: true },
    });
  },

  findAll: async () => {
    return prisma.order.findMany({
      include: { status: true },
      orderBy: { createdAt: "desc" },
    });
  },

  findByUserId: async (userId: string) => {
    return prisma.order.findMany({
      where: { userId },
      include: { status: true },
      orderBy: { createdAt: "desc" },
    });
  },

  updateStatus: async (id: string, statusId: string) => {
    return prisma.order.update({
      where: { id },
      data: { statusId },
      include: { status: true },
    });
  },
};
