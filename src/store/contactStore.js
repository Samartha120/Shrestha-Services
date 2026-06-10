import { create } from "zustand";
import { contactApi } from "@/services/contactApi";
export const useContactStore = create((set) => ({
    inquiries: [],
    isLoading: false,
    error: null,
    submitInquiry: async (formData) => {
        set({ isLoading: true, error: null });
        try {
            await contactApi.submit(formData);
            set({ isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to send inquiry", isLoading: false });
            throw err;
        }
    },
    fetchInquiries: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await contactApi.getAll();
            set({ inquiries: data, isLoading: false });
        }
        catch (err) {
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
        }
        catch (err) {
            set({ error: err.message || "Failed to delete inquiry", isLoading: false });
            throw err;
        }
    },
}));
