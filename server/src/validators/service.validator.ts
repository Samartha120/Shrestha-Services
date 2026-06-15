import { z } from "zod";

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    basePrice: z.union([z.number(), z.string()]).transform((v) => Number(v)),
    materials: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
  }),
});

export const updateServiceSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    basePrice: z.union([z.number(), z.string()]).transform((v) => Number(v)).optional(),
    materials: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
  }),
});
