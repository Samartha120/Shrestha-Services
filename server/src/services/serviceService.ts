import { serviceRepository } from "../repositories/serviceRepository.js";

export const serviceService = {
  getAll: async () => {
    const services = await serviceRepository.findAll();
    return services.map(s => ({
      ...s,
      basePrice: Number(s.basePrice),
    }));
  },

  getBySlug: async (slug: string) => {
    const s = await serviceRepository.findBySlug(slug);
    if (!s) return undefined;
    return {
      ...s,
      basePrice: Number(s.basePrice),
    };
  },

  create: async (data: any) => {
    const s = await serviceRepository.create(data);
    return {
      ...s,
      basePrice: Number(s.basePrice),
    };
  },

  update: async (id: string, data: any) => {
    const s = await serviceRepository.update(id, data);
    return {
      ...s,
      basePrice: Number(s.basePrice),
    };
  },

  delete: async (id: string) => {
    await serviceRepository.delete(id);
    return true;
  },
};
