import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
import type { Project } from "@/types/project.types";

export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    await delay(500);
    const db = getMockDb();
    return db.projects;
  },

  getBySlug: async (slug: string): Promise<Project | undefined> => {
    await delay(300);
    const db = getMockDb();
    return db.projects.find((p) => p.slug === slug);
  },

  create: async (projectData: Omit<Project, "id">): Promise<Project> => {
    await delay(800);
    const db = getMockDb();
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
    };
    db.projects.push(newProject);
    updateMockDb("ss_projects", db.projects);
    return newProject;
  },

  update: async (id: string, projectData: Partial<Project>): Promise<Project> => {
    await delay(800);
    const db = getMockDb();
    const idx = db.projects.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Project not found");

    db.projects[idx] = {
      ...db.projects[idx],
      ...projectData,
    };
    updateMockDb("ss_projects", db.projects);
    return db.projects[idx];
  },

  delete: async (id: string): Promise<boolean> => {
    await delay(600);
    const db = getMockDb();
    const filtered = db.projects.filter((p) => p.id !== id);
    if (filtered.length === db.projects.length) return false;
    updateMockDb("ss_projects", filtered);
    return true;
  },
};