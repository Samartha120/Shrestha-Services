import { prisma } from "../config/prisma.js";

export const inquiryRepository = {
  findAll: async () => {
    return prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  create: async (data: {
    name: string;
    email: string;
    phone?: string | null;
    message: string;
  }) => {
    return prisma.contactInquiry.create({
      data,
    });
  },

  delete: async (id: string) => {
    return prisma.contactInquiry.delete({
      where: { id },
    });
  },
};
