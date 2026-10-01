import api from "./api";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio?: string | null;
  readTime?: string | null;
  image?: string | null;
  featured: boolean;
  published: boolean;
  relatedSlugs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostInput {
  title: string;
  slug?: string;
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

export const blogApi = {
  // Public: all published posts, optionally filtered by category.
  getPublished: async (category?: string): Promise<BlogPost[]> => {
    const res = await api.get("/blog", {
      params: category && category !== "All" ? { category } : undefined,
    });
    return res.data.data;
  },

  // Public: single published post + related posts.
  getBySlug: async (
    slug: string
  ): Promise<{ post: BlogPost; related: BlogPost[] }> => {
    const res = await api.get(`/blog/${slug}`);
    return res.data.data;
  },

  // Admin management.
  adminGetAll: async (): Promise<BlogPost[]> => {
    const res = await api.get("/blog/admin");
    return res.data.data;
  },

  adminGetById: async (id: string): Promise<BlogPost> => {
    const res = await api.get(`/blog/admin/${id}`);
    return res.data.data;
  },

  create: async (data: BlogPostInput): Promise<BlogPost> => {
    const res = await api.post("/blog", data);
    return res.data.data;
  },

  update: async (id: string, data: Partial<BlogPostInput>): Promise<BlogPost> => {
    const res = await api.put(`/blog/${id}`, data);
    return res.data.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/blog/${id}`);
  },
};
