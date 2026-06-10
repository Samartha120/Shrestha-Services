import { create } from "zustand";
import { galleryApi } from "@/services/galleryApi";
export const useGalleryStore = create((set) => ({
    galleryItems: [],
    isLoading: false,
    error: null,
    fetchGalleryItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await galleryApi.getAll();
            set({ galleryItems: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load gallery items", isLoading: false });
        }
    },
    fetchItemsByCategory: async (category) => {
        set({ isLoading: true, error: null });
        try {
            const data = await galleryApi.getByCategory(category);
            set({ galleryItems: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load category items", isLoading: false });
        }
    },
    createGalleryItem: async (itemData) => {
        set({ isLoading: true, error: null });
        try {
            await galleryApi.create(itemData);
            const data = await galleryApi.getAll();
            set({ galleryItems: data, isLoading: false });
        }
        catch (err) {
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
        }
        catch (err) {
            set({ error: err.message || "Failed to delete item", isLoading: false });
            throw err;
        }
    },
}));
