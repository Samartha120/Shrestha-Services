import { prisma } from "../config/prisma.js";

export interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio?: string | null;
  readTime?: string | null;
  image?: string | null;
  featured?: boolean;
  published?: boolean;
  relatedSlugs?: string[];
}

export const blogRepository = {
  // Public: only published posts.
  findPublished: async (category?: string) => {
    return prisma.blogPost.findMany({
      where: {
        published: true,
        ...(category && category !== "All"
          ? { category: { equals: category, mode: "insensitive" } }
          : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  },

  findPublishedBySlug: async (slug: string) => {
    return prisma.blogPost.findFirst({
      where: { slug, published: true },
    });
  },

  findManyBySlugs: async (slugs: string[]) => {
    if (slugs.length === 0) return [];
    return prisma.blogPost.findMany({
      where: { slug: { in: slugs }, published: true },
      orderBy: { createdAt: "desc" },
    });
  },

  // Admin: all posts regardless of published state.
  findAll: async () => {
    return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  },

  findById: async (id: string) => {
    return prisma.blogPost.findUnique({ where: { id } });
  },

  findBySlug: async (slug: string) => {
    return prisma.blogPost.findUnique({ where: { slug } });
  },

  create: async (data: BlogPostData) => {
    return prisma.blogPost.create({ data });
  },

  update: async (id: string, data: Partial<BlogPostData>) => {
    return prisma.blogPost.update({ where: { id }, data });
  },

  delete: async (id: string) => {
    return prisma.blogPost.delete({ where: { id } });
  },
};
