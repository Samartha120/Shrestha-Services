import { projectRepository } from "../repositories/projectRepository.js";

export const projectService = {
  getAll: async () => {
    return projectRepository.findAll();
  },

  getBySlug: async (slug: string) => {
    return projectRepository.findBySlug(slug);
  },

  create: async (data: any) => {
    return projectRepository.create(data);
  },

  update: async (id: string, data: any) => {
    return projectRepository.update(id, data);
  },

  delete: async (id: string) => {
    await projectRepository.delete(id);
    return true;
  },
};
