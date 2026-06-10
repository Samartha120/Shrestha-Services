import { create } from "zustand";
import type { QuoteRequest } from "@/types/quote.types";
import { quoteApi, type FullQuote } from "@/services/quoteApi";

interface QuoteState {
  quotes: FullQuote[];
  selectedQuote: FullQuote | null;
  isLoading: boolean;
  error: string | null;
  fetchQuotes: () => Promise<void>;
  fetchQuotesByEmail: (email: string) => Promise<void>;
  submitQuote: (quoteData: QuoteRequest & { material: string; quantity: number; file?: File }) => Promise<FullQuote>;
  updateQuoteStatus: (id: string, status: string, priceOverride?: number) => Promise<void>;
  deleteQuote: (id: string) => Promise<void>;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  quotes: [],
  selectedQuote: null,
  isLoading: false,
  error: null,

  fetchQuotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await quoteApi.getAll();
      set({ quotes: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load quotes", isLoading: false });
    }
  },

  fetchQuotesByEmail: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await quoteApi.getByCustomerEmail(email);
      set({ quotes: data, isLoading: false });
    } catch (err: any) {
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
    } catch (err: any) {
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
    } catch (err: any) {
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
    } catch (err: any) {
      set({ error: err.message || "Failed to delete quote", isLoading: false });
      throw err;
    }
  },
}));
