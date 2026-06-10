import { create } from "zustand";
import { projectApi } from "@/services/projectApi";
export const useProjectStore = create((set) => ({
    projects: [],
    selectedProject: null,
    isLoading: false,
    error: null,
    fetchProjects: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await projectApi.getAll();
            set({ projects: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load projects", isLoading: false });
        }
    },
    fetchProjectBySlug: async (slug) => {
        set({ isLoading: true, error: null, selectedProject: null });
        try {
            const data = await projectApi.getBySlug(slug);
            if (!data)
                throw new Error("Project not found");
            set({ selectedProject: data, isLoading: false });
        }
        catch (err) {
            set({ error: err.message || "Failed to load project details", isLoading: false });
        }
    },
    createProject: async (projectData) => {
        set({ isLoading: true, error: null });
        try {
            await projectApi.create(projectData);
            const data = await projectApi.getAll();
            set({ projects: data, isLoading: false });
        }
        catch (err) {
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
        }
        catch (err) {
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
        }
        catch (err) {
            set({ error: err.message || "Failed to delete project", isLoading: false });
            throw err;
        }
    },
}));
