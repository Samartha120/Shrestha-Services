import api from "./api";

export const analyticsApi = {
  getStats: async () => {
    const res = await api.get("/admin/stats");
    return res.data.data;
  },

  getRevenueChartData: async () => {
    const res = await api.get("/admin/revenue-chart");
    return res.data.data;
  },

  getVisitorChartData: async () => {
    const res = await api.get("/admin/visitor-chart");
    return res.data.data;
  },

  getServiceChartData: async () => {
    const res = await api.get("/admin/service-chart");
    return res.data.data;
  },

  getQuoteChartData: async () => {
    const res = await api.get("/admin/quote-chart");
    return res.data.data;
  },

  getRecentActivities: async () => {
    const res = await api.get("/admin/recent-activities");
    return res.data.data;
  },
};
