import { quoteRepository } from "../repositories/quoteRepository.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";

export const quoteService = {
  submit: async (quoteData: any, file?: any) => {
    const baseRate = 15;
    let multiplier = 1.0;
    
    // Price estimation rules matching frontend logic
    if (quoteData.material.includes("Star")) multiplier = 1.3;
    else if (quoteData.material.includes("Backlit")) multiplier = 1.8;
    else if (quoteData.material.includes("Blockout")) multiplier = 2.2;
    else if (quoteData.material.includes("3mm")) multiplier = 2.0;
    else if (quoteData.material.includes("5mm")) multiplier = 3.0;
    else if (quoteData.material.includes("LED")) multiplier = 6.0;

    const width = Number(quoteData.width) || 1;
    const height = Number(quoteData.height) || 1;
    const quantity = Number(quoteData.quantity) || 1;
    const estimatedPrice = Math.round(width * height * baseRate * multiplier * quantity);

    const quoteId = `q-${100 + Math.floor(Math.random() * 900)}`;
    const fileUrl = file ? `/uploads/${file.filename}` : null;

    const newQuote = await quoteRepository.create({
      id: quoteId,
      serviceId: quoteData.serviceId,
      customerName: quoteData.customerName,
      email: quoteData.email,
      phone: quoteData.phone,
      width,
      height,
      notes: quoteData.notes || null,
      estimatedPrice,
      material: quoteData.material,
      quantity,
      fileUrl,
      fileType: file ? file.mimetype : null,
      fileWeight: file ? `${(file.size / 1024).toFixed(1)} KB` : null,
    });

    logger.info(`[Quote System] Registered quote request ID: ${quoteId} for: ${quoteData.customerName}`);
    return newQuote;
  },

  getAll: async () => {
    return quoteRepository.findAll();
  },

  getByEmail: async (email: string) => {
    return quoteRepository.findByEmail(email);
  },

  getById: async (id: string) => {
    return quoteRepository.findById(id);
  },

  updateStatus: async (id: string, status: string, priceOverride?: number) => {
    const updatedQuote = await quoteRepository.updateStatus(id, status, priceOverride);
    
    const userRecord = await prisma.user.findUnique({
      where: { email: updatedQuote.email },
    });

    if (userRecord) {
      // Generate system alert notification
      await prisma.notification.create({
        data: {
          title: `Quote ${status}`,
          message: `Your quote request ${id} has been ${status.toLowerCase()}${priceOverride !== undefined ? ` with price NPR ${priceOverride}` : ""}.`,
          userId: userRecord.id,
        },
      });

      // Auto order generation upon confirmation
      if (status === "Approved") {
        const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const orderStatusRecord = await prisma.orderStatus.findUnique({
          where: { name: "Approved" },
        });

        await prisma.order.create({
          data: {
            orderNumber,
            customerName: updatedQuote.customerName,
            userId: userRecord.id,
            statusId: orderStatusRecord?.id || null,
            totalAmount: priceOverride !== undefined ? priceOverride : updatedQuote.estimatedPrice,
            quoteId: id,
          },
        });
        
        logger.info(`[Quote System] Approved quote ${id} -> Automatically generated Order: ${orderNumber}`);
      }
    }

    return updatedQuote;
  },

  delete: async (id: string) => {
    await quoteRepository.delete(id);
    return true;
  },
};
