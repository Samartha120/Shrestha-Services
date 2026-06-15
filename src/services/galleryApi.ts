import api from "./api";
import type { GalleryItem } from "@/types/gallery.types";

export const galleryApi = {
  getAll: async (): Promise<GalleryItem[]> => {
    const res = await api.get("/gallery");
    return res.data.data;
  },

  getByCategory: async (category: string): Promise<GalleryItem[]> => {
    const res = await api.get(`/gallery/category/${category}`);
    return res.data.data;
  },

  create: async (itemData: Omit<GalleryItem, "id">): Promise<GalleryItem> => {
    const res = await api.post("/gallery", itemData);
    return res.data.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/gallery/${id}`);
    return res.data.status === "success";
  },
};