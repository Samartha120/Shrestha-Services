import api from "./api";
import type { Order } from "@/types/order.types";

const mapOrder = (o: any): Order => ({
  id: o.id,
  orderNumber: o.orderNumber,
  customerName: o.customerName,
  totalAmount: Number(o.totalAmount),
  status: o.status || "Pending",
});

export const ordersApi = {
  // The Express backend scopes orders to the logged-in user (customers see
  // only their own; admins/superadmins see all), so a single endpoint serves both.
  getAll: async (): Promise<Order[]> => {
    const res = await api.get("/orders");
    return (res.data.data.orders as any[]).map(mapOrder);
  },

  getById: async (id: string): Promise<Order | null> => {
    try {
      const res = await api.get(`/orders/${id}`);
      const o = res.data.data.order;
      return o ? mapOrder(o) : null;
    } catch {
      return null;
    }
  },
};
