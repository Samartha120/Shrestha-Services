import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
export const serviceApi = {
    getAll: async () => {
        await delay(500);
        const db = getMockDb();
        return db.services;
    },
    getBySlug: async (slug) => {
        await delay(300);
        const db = getMockDb();
        return db.services.find((s) => s.slug === slug);
    },
    create: async (serviceData) => {
        await delay(800);
        const db = getMockDb();
        const newService = {
            ...serviceData,
            id: `service-${Date.now()}`,
        };
        db.services.push(newService);
        updateMockDb("ss_services", db.services);
        return newService;
    },
    update: async (id, serviceData) => {
        await delay(800);
        const db = getMockDb();
        const idx = db.services.findIndex((s) => s.id === id);
        if (idx === -1)
            throw new Error("Service not found");
        db.services[idx] = {
            ...db.services[idx],
            ...serviceData,
        };
        updateMockDb("ss_services", db.services);
        return db.services[idx];
    },
    delete: async (id) => {
        await delay(600);
        const db = getMockDb();
        const filtered = db.services.filter((s) => s.id !== id);
        if (filtered.length === db.services.length)
            return false;
        updateMockDb("ss_services", filtered);
        return true;
    },
};
