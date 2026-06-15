import { inquiryRepository } from "../repositories/inquiryRepository.js";
import { prisma } from "../config/prisma.js";

export const inquiryService = {
  getAll: async () => {
    return inquiryRepository.findAll();
  },

  submit: async (data: any) => {
    const inquiry = await inquiryRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.subject ? `[${data.subject}] ${data.message}` : data.message,
    });

    // Create system notification for all admins or general admin view
    await prisma.notification.create({
      data: {
        title: "New Customer Inquiry",
        message: `Inquiry from ${data.name}: "${data.subject || "No Subject"}"`,
      },
    });

    return inquiry;
  },

  delete: async (id: string) => {
    await inquiryRepository.delete(id);
    return true;
  },
};
