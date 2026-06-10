import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
export const usersApi = {
    getAll: async () => {
        await delay(500);
        const db = getMockDb();
        return db.users;
    },
    updateRole: async (id, role) => {
        await delay(600);
        const db = getMockDb();
        const idx = db.users.findIndex((u) => u.id === id);
        if (idx === -1)
            throw new Error("User not found");
        db.users[idx].role = role;
        updateMockDb("ss_users", db.users);
        return db.users[idx];
    },
    delete: async (id) => {
        await delay(500);
        const db = getMockDb();
        const filtered = db.users.filter((u) => u.id !== id);
        if (filtered.length === db.users.length)
            return false;
        updateMockDb("ss_users", filtered);
        return true;
    },
};
