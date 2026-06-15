import { z } from "zod";

export const createGalleryItemSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    image: z.string().min(1, "Image URL/path is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
  }),
});
