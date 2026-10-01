import api from "./api";

export type ReportType = "revenue" | "orders" | "quotes" | "users";

export const reportsApi = {
  // Fetch a CSV export for the given category and trigger a browser download.
  download: async (type: ReportType): Promise<void> => {
    const res = await api.get(`/admin/reports/${type}/export`, {
      responseType: "blob",
    });

    const blob = new Blob([res.data], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}-report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
