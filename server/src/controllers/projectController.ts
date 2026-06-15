import { Response, NextFunction } from "express";
import { projectService } from "../services/projectService.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";

export const projectController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const projects = await projectService.getAll();
      res.status(200).json({ status: "success", data: projects });
    } catch (err) {
      next(err);
    }
  },

  getBySlug: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const project = await projectService.getBySlug(slug);
      if (!project) {
        res.status(404).json({ status: "error", message: "Project not found" });
        return;
      }
      res.status(200).json({ status: "success", data: project });
    } catch (err) {
      next(err);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.create(req.body);
      res.status(201).json({ status: "success", data: project });
    } catch (err) {
      next(err);
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const project = await projectService.update(id, req.body);
      res.status(200).json({ status: "success", data: project });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await projectService.delete(id);
      res.status(200).json({ status: "success", message: "Project deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
