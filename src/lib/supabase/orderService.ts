import api from "@/services/api";
import type { Order } from "@/types/order.types";

export const orderService = {
  getAll: async (): Promise<Order[]> => {
    const res = await api.get("/orders");
    const orders = res.data.data.orders;
    return orders.map((o: any) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      totalAmount: Number(o.totalAmount),
      status: o.status || "Pending",
    }));
  },

  getByUserId: async (_userId: string): Promise<Order[]> => {
    // The Express backend automatically filters orders for the logged-in customer context
    const res = await api.get("/orders");
    const orders = res.data.data.orders;
    return orders.map((o: any) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      totalAmount: Number(o.totalAmount),
      status: o.status || "Pending",
    }));
  },

  getByCustomerEmail: async (_email: string): Promise<Order[]> => {
    // The Express backend automatically filters orders for the logged-in customer context
    const res = await api.get("/orders");
    const orders = res.data.data.orders;
    return orders.map((o: any) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      totalAmount: Number(o.totalAmount),
      status: o.status || "Pending",
    }));
  },

  getById: async (id: string): Promise<Order | null> => {
    try {
      const res = await api.get(`/orders/${id}`);
      const o = res.data.data.order;
      if (!o) return null;
      return {
        id: o.id,
        orderNumber: o.orderNumber,
        customerName: o.customerName,
        totalAmount: Number(o.totalAmount),
        status: o.status || "Pending",
      };
    } catch (err) {
      return null;
    }
  },

  createFromQuote: async (quoteId: string, _userId: string, totalAmount: number): Promise<Order> => {
    // Backend automatically creates the order when a quote is approved.
    // If needed manually, this hits the backend order status updates.
    const res = await api.patch(`/orders/create-from-quote`, { quoteId, totalAmount });
    const o = res.data.data.order;
    return {
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customerName,
      totalAmount: Number(o.totalAmount),
      status: o.status || "Pending",
    };
  },
};
