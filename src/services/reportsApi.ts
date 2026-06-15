import api from "./api";

export interface ReportItem {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  size: string;
  url: string;
}

export const reportsApi = {
  getAll: async (): Promise<ReportItem[]> => {
    const res = await api.get("/admin/reports");
    return res.data.data;
  },

  generate: async (title: string, type: string): Promise<ReportItem> => {
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      title,
      type,
      createdAt: new Date().toISOString(),
      size: type === "PDF" ? "1.8 MB" : "150 KB",
      url: "#download-new",
    };
    return newReport;
  }
};
