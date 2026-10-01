import { Response, NextFunction } from "express";
import { blogService } from "../services/blogService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const blogController = {
  // Public: list published posts (optional ?category= filter).
  list: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const category = typeof req.query.category === "string" ? req.query.category : undefined;
      const posts = await blogService.getPublished(category);
      res.status(200).json({ status: "success", data: posts });
    } catch (err) {
      next(err);
    }
  },

  // Public: single published post by slug + related posts.
  getBySlug: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const result = await blogService.getBySlug(slug);
      if (!result) {
        res.status(404).json({ status: "error", message: "Blog post not found" });
        return;
      }
      res.status(200).json({ status: "success", data: result });
    } catch (err) {
      next(err);
    }
  },

  // Admin: list every post regardless of published state.
  adminList: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const posts = await blogService.getAll();
      res.status(200).json({ status: "success", data: posts });
    } catch (err) {
      next(err);
    }
  },

  adminGetById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const post = await blogService.getById(req.params.id);
      if (!post) {
        res.status(404).json({ status: "error", message: "Blog post not found" });
        return;
      }
      res.status(200).json({ status: "success", data: post });
    } catch (err) {
      next(err);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const post = await blogService.create(req.body);
      res.status(201).json({ status: "success", data: post });
    } catch (err) {
      next(err);
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const post = await blogService.update(req.params.id, req.body);
      res.status(200).json({ status: "success", data: post });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await blogService.delete(req.params.id);
      res.status(200).json({ status: "success", message: "Blog post deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
