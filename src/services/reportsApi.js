import { delay } from "@/utils/mockDb";
export const reportsApi = {
    getAll: async () => {
        await delay(400);
        return [
            {
                id: "rep-1",
                title: "Q1 Financial Summary",
                type: "PDF",
                createdAt: new Date("2026-04-01").toISOString(),
                size: "2.4 MB",
                url: "#download-pdf"
            },
            {
                id: "rep-2",
                title: "May Order Breakdown Report",
                type: "CSV",
                createdAt: new Date("2026-06-01").toISOString(),
                size: "420 KB",
                url: "#download-csv"
            },
            {
                id: "rep-3",
                title: "Active Client Signage Audits",
                type: "PDF",
                createdAt: new Date("2026-06-05").toISOString(),
                size: "12.8 MB",
                url: "#download-pdf"
            }
        ];
    },
    generate: async (title, type) => {
        await delay(1500);
        const newReport = {
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
