import { prisma } from "../config/prisma.js";

export const userRepository = {
  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  },

  create: async (data: { id: string; email: string; name: string; roleId?: string; avatar?: string }) => {
    return prisma.user.create({
      data,
      include: { role: true },
    });
  },

  findAll: async () => {
    return prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: "desc" },
    });
  },

  updateRole: async (id: string, roleId: string) => {
    return prisma.user.update({
      where: { id },
      data: { roleId },
      include: { role: true },
    });
  },

  delete: async (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};
