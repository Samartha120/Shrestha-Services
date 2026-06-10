import { create } from "zustand";
import type { GalleryItem } from "@/types/gallery.types";
import { galleryApi } from "@/services/galleryApi";

interface GalleryState {
  galleryItems: GalleryItem[];
  isLoading: boolean;
  error: string | null;
  fetchGalleryItems: () => Promise<void>;
  fetchItemsByCategory: (category: string) => Promise<void>;
  createGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  galleryItems: [],
  isLoading: false,
  error: null,

  fetchGalleryItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await galleryApi.getAll();
      set({ galleryItems: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load gallery items", isLoading: false });
    }
  },

  fetchItemsByCategory: async (category: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await galleryApi.getByCategory(category);
      set({ galleryItems: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load category items", isLoading: false });
    }
  },

  createGalleryItem: async (itemData) => {
    set({ isLoading: true, error: null });
    try {
      await galleryApi.create(itemData);
      const data = await galleryApi.getAll();
      set({ galleryItems: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to upload gallery item", isLoading: false });
      throw err;
    }
  },

  deleteGalleryItem: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await galleryApi.delete(id);
      const data = await galleryApi.getAll();
      set({ galleryItems: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to delete item", isLoading: false });
      throw err;
    }
  },
}));
