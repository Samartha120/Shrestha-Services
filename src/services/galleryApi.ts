import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
import type { GalleryItem } from "@/types/gallery.types";

export const galleryApi = {
  getAll: async (): Promise<GalleryItem[]> => {
    await delay(400);
    const db = getMockDb();
    return db.gallery;
  },

  getByCategory: async (category: string): Promise<GalleryItem[]> => {
    await delay(300);
    const db = getMockDb();
    return db.gallery.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  },

  create: async (itemData: Omit<GalleryItem, "id">): Promise<GalleryItem> => {
    await delay(700);
    const db = getMockDb();
    const newItem: GalleryItem = {
      ...itemData,
      id: `gallery-${Date.now()}`,
    };
    db.gallery.push(newItem);
    updateMockDb("ss_gallery", db.gallery);
    return newItem;
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(500);
    const db = getMockDb();
    const filtered = db.gallery.filter((item) => item.id !== id);
    if (filtered.length === db.gallery.length) return false;
    updateMockDb("ss_gallery", filtered);
    return true;
  },
};