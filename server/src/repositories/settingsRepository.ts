import { prisma } from "../config/prisma.js";

export const settingsRepository = {
  getCompanyInfo: async () => {
    return prisma.companySettings.findFirst();
  },

  saveCompanyInfo: async (data: {
    name: string;
    logo?: string | null;
    email: string;
    phone: string;
    address: string;
    description?: string | null;
  }) => {
    const existing = await prisma.companySettings.findFirst();

    if (existing) {
      return prisma.companySettings.update({
        where: { id: existing.id },
        data,
      });
    }

    return prisma.companySettings.create({
      data,
    });
  },
};
