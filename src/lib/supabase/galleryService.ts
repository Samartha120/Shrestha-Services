import { supabase } from "./supabaseClient";
import type { GalleryItem } from "@/types/gallery.types";

export const galleryService = {
  getAll: async (): Promise<GalleryItem[]> => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("id, title, image, category, description")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  getByCategory: async (category: string): Promise<GalleryItem[]> => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("id, title, image, category, description")
      .ilike("category", category)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  create: async (item: Omit<GalleryItem, "id">): Promise<GalleryItem> => {
    const { data, error } = await supabase
      .from("gallery_images")
      .insert({
        title: item.title,
        image: item.image,
        category: item.category,
        description: item.description,
      })
      .select("id, title, image, category, description")
      .single();

    if (error || !data) throw new Error(error.message);
    return data;
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    return !error;
  },

  uploadImage: async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error } = await supabase.storage
      .from("gallery-images")
      .upload(filePath, file);

    if (error) throw new Error(error.message);

    const { data } = supabase.storage
      .from("gallery-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};
