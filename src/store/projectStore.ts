import { create } from "zustand";
import type { Project } from "@/types/project.types";
import { projectApi } from "@/services/projectApi";

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProjectBySlug: (slug: string) => Promise<void>;
  createProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await projectApi.getAll();
      set({ projects: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load projects", isLoading: false });
    }
  },

  fetchProjectBySlug: async (slug: string) => {
    set({ isLoading: true, error: null, selectedProject: null });
    try {
      const data = await projectApi.getBySlug(slug);
      if (!data) throw new Error("Project not found");
      set({ selectedProject: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load project details", isLoading: false });
    }
  },

  createProject: async (projectData) => {
    set({ isLoading: true, error: null });
    try {
      await projectApi.create(projectData);
      const data = await projectApi.getAll();
      set({ projects: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to create project", isLoading: false });
      throw err;
    }
  },

  updateProject: async (id, projectData) => {
    set({ isLoading: true, error: null });
    try {
      await projectApi.update(id, projectData);
      const data = await projectApi.getAll();
      set({ projects: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to update project", isLoading: false });
      throw err;
    }
  },

  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await projectApi.delete(id);
      const data = await projectApi.getAll();
      set({ projects: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to delete project", isLoading: false });
      throw err;
    }
  },
}));
