import api from "./api";
import type { Project } from "@/types/project.types";

export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    const res = await api.get("/projects");
    return res.data.data;
  },

  getBySlug: async (slug: string): Promise<Project | undefined> => {
    try {
      const res = await api.get(`/projects/${slug}`);
      return res.data.data;
    } catch (err) {
      return undefined;
    }
  },

  create: async (projectData: Omit<Project, "id">): Promise<Project> => {
    const res = await api.post("/projects", projectData);
    return res.data.data;
  },

  update: async (id: string, projectData: Partial<Project>): Promise<Project> => {
    const res = await api.put(`/projects/${id}`, projectData);
    return res.data.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await api.delete(`/projects/${id}`);
    return res.data.status === "success";
  },
};