import { create } from "zustand";
import { quoteApi } from "@/services/quoteApi";
export const useQuoteStore = create((set) => ({
    quotes: [],
    selectedQuote: null,
    isLoading: false,
    error: null,
    fetchQuotes: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await quoteApi.getAll();
            set({ quotes: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load quotes", isLoading: false });
        }
    },
    fetchQuotesByEmail: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const data = await quoteApi.getByCustomerEmail(email);
            set({ quotes: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load customer quotes", isLoading: false });
        }
    },
    submitQuote: async (quoteData) => {
        set({ isLoading: true, error: null });
        try {
            const newQuote = await quoteApi.submit(quoteData);
            set((state) => ({
                quotes: [newQuote, ...state.quotes],
                isLoading: false,
            }));
            return newQuote;
        }
        catch (err) {
            set({ error: err.message || "Failed to submit quote request", isLoading: false });
            throw err;
        }
    },
    updateQuoteStatus: async (id, status, priceOverride) => {
        set({ isLoading: true, error: null });
        try {
            await quoteApi.updateStatus(id, status, priceOverride);
            const data = await quoteApi.getAll();
            set({ quotes: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to update quote status", isLoading: false });
            throw err;
        }
    },
    deleteQuote: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await quoteApi.delete(id);
            set((state) => ({
                quotes: state.quotes.filter((q) => q.id !== id),
                isLoading: false,
            }));
        }
        catch (err) {
            set({ error: err.message || "Failed to delete quote", isLoading: false });
            throw err;
        }
    },
}));
