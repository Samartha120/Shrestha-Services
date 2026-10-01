import { z } from "zod";

export const createBlogPostSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().optional(),
    excerpt: z.string().min(1, "Excerpt is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    author: z.string().min(1, "Author is required"),
    authorBio: z.string().optional().nullable(),
    readTime: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
    relatedSlugs: z.array(z.string()).optional(),
  }),
});

export const updateBlogPostSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    slug: z.string().optional(),
    excerpt: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    authorBio: z.string().optional().nullable(),
    readTime: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
    relatedSlugs: z.array(z.string()).optional(),
  }),
});
