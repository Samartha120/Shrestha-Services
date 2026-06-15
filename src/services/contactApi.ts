import api from "./api";
import type { Contact, ContactFormData } from "@/types/contact.types";

export const contactApi = {
  submit: async (formData: ContactFormData): Promise<Contact> => {
    const res = await api.post("/inquiries", formData);
    return res.data.data;
  },

  getAll: async (): Promise<Contact[]> => {
    const res = await api.get("/inquiries");
    return res.data.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/inquiries/${id}`);
    return res.data.status === "success";
  },
};