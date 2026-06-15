import { galleryRepository } from "../repositories/galleryRepository.js";

export const galleryService = {
  getAll: async () => {
    return galleryRepository.findAll();
  },

  getByCategory: async (category: string) => {
    return galleryRepository.findByCategory(category);
  },

  create: async (data: any) => {
    return galleryRepository.create(data);
  },

  delete: async (id: string) => {
    await galleryRepository.delete(id);
    return true;
  },
};
