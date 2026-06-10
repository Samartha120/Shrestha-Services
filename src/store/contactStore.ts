import { create } from "zustand";
import type { Contact, ContactFormData } from "@/types/contact.types";
import { contactApi } from "@/services/contactApi";

interface ContactState {
  inquiries: Contact[];
  isLoading: boolean;
  error: string | null;
  submitInquiry: (formData: ContactFormData) => Promise<void>;
  fetchInquiries: () => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
}

export const useContactStore = create<ContactState>((set) => ({
  inquiries: [],
  isLoading: false,
  error: null,

  submitInquiry: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      await contactApi.submit(formData);
      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to send inquiry", isLoading: false });
      throw err;
    }
  },

  fetchInquiries: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await contactApi.getAll();
      set({ inquiries: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load inquiries", isLoading: false });
    }
  },

  deleteInquiry: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await contactApi.delete(id);
      set((state) => ({
        inquiries: state.inquiries.filter((c) => c.id !== id),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to delete inquiry", isLoading: false });
      throw err;
    }
  },
}));
