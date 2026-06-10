import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
export const contactApi = {
    submit: async (formData) => {
        await delay(700);
        const db = getMockDb();
        const newContact = {
            id: `c-${Date.now()}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: `${formData.subject ? `[${formData.subject}] ` : ""}${formData.message}`,
            createdAt: new Date().toISOString(),
        };
        db.inquiries.push(newContact);
        updateMockDb("ss_inquiries", db.inquiries);
        // Create system notification for admin
        const newNotification = {
            id: `n-${Date.now()}`,
            title: "New Customer Inquiry",
            message: `Inquiry from ${formData.name}: "${formData.subject || "No Subject"}"`,
            read: false
        };
        db.notifications.unshift(newNotification);
        updateMockDb("ss_notifications", db.notifications);
        return newContact;
    },
    getAll: async () => {
        await delay(500);
        const db = getMockDb();
        return db.inquiries;
    },
    delete: async (id) => {
        await delay(400);
        const db = getMockDb();
        const filtered = db.inquiries.filter((c) => c.id !== id);
        if (filtered.length === db.inquiries.length)
            return false;
        updateMockDb("ss_inquiries", filtered);
        return true;
    },
};
