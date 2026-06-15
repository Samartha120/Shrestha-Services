import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    image: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().uuid().optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().uuid().optional(),
  }),
});
