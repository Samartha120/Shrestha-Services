import api from "./api";
import type { QuoteRequest } from "@/types/quote.types";

export interface FullQuote extends QuoteRequest {
  id: string;
  status: string;
  estimatedPrice: number;
  material: string;
  quantity: number;
  fileUrl?: string;
  fileType?: string;
  fileWeight?: string;
  date: string;
}

export const quoteApi = {
  getAll: async (): Promise<FullQuote[]> => {
    const res = await api.get("/quotes");
    return res.data.data.quotes;
  },

  getByCustomerEmail: async (_email: string): Promise<FullQuote[]> => {
    // Express backend filters quotes by the authenticated user's context automatically
    const res = await api.get("/quotes");
    return res.data.data.quotes;
  },

  getById: async (id: string): Promise<FullQuote | undefined> => {
    try {
      const res = await api.get(`/quotes/${id}`);
      return res.data.data;
    } catch (err) {
      return undefined;
    }
  },

  submit: async (quoteData: QuoteRequest & { material: string; quantity: number; file?: File }): Promise<FullQuote> => {
    const formData = new FormData();
    formData.append("serviceId", quoteData.serviceId);
    formData.append("customerName", quoteData.customerName);
    formData.append("email", quoteData.email);
    formData.append("phone", quoteData.phone);
    if (quoteData.width) formData.append("width", String(quoteData.width));
    if (quoteData.height) formData.append("height", String(quoteData.height));
    if (quoteData.notes) formData.append("notes", quoteData.notes);
    formData.append("material", quoteData.material);
    formData.append("quantity", String(quoteData.quantity));
    
    if (quoteData.file) {
      formData.append("file", quoteData.file);
    }

    const res = await api.post("/quotes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data.quote;
  },

  updateStatus: async (id: string, status: string, priceOverride?: number): Promise<FullQuote> => {
    const res = await api.patch(`/quotes/${id}/status`, { status, priceOverride });
    return res.data.data.quote;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/quotes/${id}`);
    return res.data.status === "success";
  },
};