import api from "./api";

export interface CustomerFile {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  createdAt: string;
}

// The backend serves uploaded files statically from its own origin (not the
// /api/v1 path), so derive that origin from the configured API URL.
export const fileBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/api\/v1\/?$/, "");

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

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/files/${id}`);
    return res.data.status === "success";
  },
};
