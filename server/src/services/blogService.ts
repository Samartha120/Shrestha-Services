import { blogRepository, type BlogPostData } from "../repositories/blogRepository.js";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const blogService = {
  // Public list of published posts, optionally filtered by category.
  getPublished: async (category?: string) => {
    return blogRepository.findPublished(category);
  },

  // Public single post + its related published posts.
  getBySlug: async (slug: string) => {
    const post = await blogRepository.findPublishedBySlug(slug);
    if (!post) return undefined;

    let related = await blogRepository.findManyBySlugs(
      (post.relatedSlugs || []).filter((s) => s !== post.slug)
    );

    // Fall back to same-category posts if no explicit relations are set.
    if (related.length === 0) {
      const sameCategory = await blogRepository.findPublished(post.category);
      related = sameCategory.filter((p) => p.slug !== post.slug).slice(0, 3);
    }

    return { post, related };
  },

  // Admin: every post.
  getAll: async () => {
    return blogRepository.findAll();
  },

  getById: async (id: string) => {
    return blogRepository.findById(id);
  },

  create: async (data: BlogPostData) => {
    const slug = data.slug ? slugify(data.slug) : slugify(data.title);

    const existing = await blogRepository.findBySlug(slug);
    if (existing) {
      const err: any = new Error("A post with this slug already exists");
      err.statusCode = 409;
      throw err;
    }

    return blogRepository.create({ ...data, slug });
  },

  update: async (id: string, data: Partial<BlogPostData>) => {
    const current = await blogRepository.findById(id);
    if (!current) {
      const err: any = new Error("Blog post not found");
      err.statusCode = 404;
      throw err;
    }

    let slug = current.slug;
    if (data.slug && slugify(data.slug) !== current.slug) {
      slug = slugify(data.slug);
      const clash = await blogRepository.findBySlug(slug);
      if (clash && clash.id !== id) {
        const err: any = new Error("A post with this slug already exists");
        err.statusCode = 409;
        throw err;
      }
    }

    return blogRepository.update(id, { ...data, slug });
  },

  delete: async (id: string) => {
    const current = await blogRepository.findById(id);
    if (!current) {
      const err: any = new Error("Blog post not found");
      err.statusCode = 404;
      throw err;
    }
    await blogRepository.delete(id);
    return true;
  },
};
