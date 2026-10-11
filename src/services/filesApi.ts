import api from "./api";

export interface CustomerFile {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  createdAt: string;
}

// The backend serves PUBLIC marketing assets statically from its own origin
// (not the /api/v1 path). Private customer artwork is NOT served statically —
// it is fetched through authorized /files/:id/download or /quotes/:id/file.
export const fileBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/api\/v1\/?$/, "");

// Trigger a browser "save as" for an in-memory blob.
function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const filesApi = {
  list: async (): Promise<CustomerFile[]> => {
    const res = await api.get("/files");
    return res.data.data.files;
  },

  upload: async (file: File): Promise<CustomerFile> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data.file;
  },

  // Authorized download of a private design file (ownership checked server-side).
  download: async (id: string, fileName: string): Promise<void> => {
    const res = await api.get(`/files/${id}/download`, { responseType: "blob" });
    saveBlob(res.data as Blob, fileName);
  },

  // Authorized download of a quote attachment.
  downloadQuoteFile: async (quoteId: string, fileName: string): Promise<void> => {
    const res = await api.get(`/quotes/${quoteId}/file`, { responseType: "blob" });
    saveBlob(res.data as Blob, fileName);
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/files/${id}`);
    return res.data.status === "success";
  },
};
