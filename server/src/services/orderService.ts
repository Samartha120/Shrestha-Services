import { orderRepository } from "../repositories/orderRepository.js";
import { prisma } from "../config/prisma.js";
import { logger } from "../config/logger.js";

export const orderService = {
  getAll: async () => {
    const orders = await orderRepository.findAll();
    return orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      totalAmount: Number(o.totalAmount),
      status: o.status?.name || "Pending",
    }));
  },

  getByUserId: async (userId: string) => {
    const orders = await orderRepository.findByUserId(userId);
    return orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      totalAmount: Number(o.totalAmount),
      status: o.status?.name || "Pending",
    }));
  },

  getById: async (id: string) => {
    const order = await orderRepository.findById(id);
    if (!order) return null;
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      totalAmount: Number(order.totalAmount),
      status: order.status?.name || "Pending",
      items: order.items.map((i) => ({
        id: i.id,
        serviceId: i.serviceId,
        quantity: i.quantity,
        price: Number(i.price),
        width: i.width ? Number(i.width) : null,
        height: i.height ? Number(i.height) : null,
        notes: i.notes,
        material: i.material,
      })),
    };
  },

  updateStatus: async (id: string, statusName: string) => {
    const orderStatusRecord = await prisma.orderStatus.findUnique({
      where: { name: statusName },
    });

    if (!orderStatusRecord) {
      throw new Error(`Invalid manufacturing status designation: ${statusName}`);
    }

    const updated = await orderRepository.updateStatus(id, orderStatusRecord.id);
    
    if (updated.userId) {
      await prisma.notification.create({
        data: {
          title: "Order Process Tracker",
          message: `Your printing order ${updated.orderNumber} status changed to ${statusName.toLowerCase()}.`,
          userId: updated.userId,
        },
      });
    }

    logger.info(`[Order System] Order ID: ${id} status updated to: ${statusName}`);

    return {
      id: updated.id,
      orderNumber: updated.orderNumber,
      customerName: updated.customerName,
      totalAmount: Number(updated.totalAmount),
      status: statusName,
    };
  },
};
