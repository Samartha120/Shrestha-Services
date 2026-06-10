import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
export const projectApi = {
    getAll: async () => {
        await delay(500);
        const db = getMockDb();
        return db.projects;
    },
    getBySlug: async (slug) => {
        await delay(300);
        const db = getMockDb();
        return db.projects.find((p) => p.slug === slug);
    },
    create: async (projectData) => {
        await delay(800);
        const db = getMockDb();
        const newProject = {
            ...projectData,
            id: `project-${Date.now()}`,
        };
        db.projects.push(newProject);
        updateMockDb("ss_projects", db.projects);
        return newProject;
    },
    update: async (id, projectData) => {
        await delay(800);
        const db = getMockDb();
        const idx = db.projects.findIndex((p) => p.id === id);
        if (idx === -1)
            throw new Error("Project not found");
        db.projects[idx] = {
            ...db.projects[idx],
            ...projectData,
        };
        updateMockDb("ss_projects", db.projects);
        return db.projects[idx];
    },
    delete: async (id) => {
        await delay(600);
        const db = getMockDb();
        const filtered = db.projects.filter((p) => p.id !== id);
        if (filtered.length === db.projects.length)
            return false;
        updateMockDb("ss_projects", filtered);
        return true;
    },
};
