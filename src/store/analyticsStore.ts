import { create } from "zustand";
import { analyticsApi } from "@/services/analyticsApi";

interface AnalyticsState {
  stats: any | null;
  revenueData: any[];
  visitorData: any[];
  serviceData: any[];
  quoteData: any[];
  activities: any[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  stats: null,
  revenueData: [],
  visitorData: [],
  serviceData: [],
  quoteData: [],
  activities: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [stats, revenue, visitors, services, quotes, activities] = await Promise.all([
        analyticsApi.getStats(),
        analyticsApi.getRevenueChartData(),
        analyticsApi.getVisitorChartData(),
        analyticsApi.getServiceChartData(),
        analyticsApi.getQuoteChartData(),
        analyticsApi.getRecentActivities()
      ]);

      set({
        stats,
        revenueData: revenue,
        visitorData: visitors,
        serviceData: services,
        quoteData: quotes,
        activities,
        isLoading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to load dashboard data", isLoading: false });
    }
  },
}));
