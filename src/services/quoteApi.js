import { getMockDb, updateMockDb, delay } from "@/utils/mockDb";
export const quoteApi = {
    getAll: async () => {
        await delay(600);
        const db = getMockDb();
        return db.quotes;
    },
    getByCustomerEmail: async (email) => {
        await delay(400);
        const db = getMockDb();
        return db.quotes.filter((q) => q.email.toLowerCase() === email.toLowerCase());
    },
    getById: async (id) => {
        await delay(300);
        const db = getMockDb();
        return db.quotes.find((q) => q.id === id);
    },
    submit: async (quoteData) => {
        await delay(1200);
        const db = getMockDb();
        // Simple price calculation logic based on dimensions and quantity
        const width = quoteData.width || 1;
        const height = quoteData.height || 1;
        const quantity = quoteData.quantity || 1;
        // Find service to check base price
        const service = db.services.find((s) => s.id === quoteData.serviceId);
        const baseRate = service?.basePrice || 15;
        // Material multiplier
        let multiplier = 1.0;
        if (quoteData.material.includes("Star"))
            multiplier = 1.3;
        else if (quoteData.material.includes("Backlit"))
            multiplier = 1.8;
        else if (quoteData.material.includes("Blockout"))
            multiplier = 2.2;
        else if (quoteData.material.includes("3mm"))
            multiplier = 2.0;
        else if (quoteData.material.includes("5mm"))
            multiplier = 3.0;
        else if (quoteData.material.includes("LED"))
            multiplier = 6.0;
        const estimatedPrice = Math.round(width * height * baseRate * multiplier * quantity);
        const newQuote = {
            id: `q-${100 + db.quotes.length + 1}`,
            serviceId: quoteData.serviceId,
            customerName: quoteData.customerName,
            email: quoteData.email,
            phone: quoteData.phone,
            width: quoteData.width,
            height: quoteData.height,
            notes: quoteData.notes,
            status: "Pending",
            estimatedPrice,
            material: quoteData.material,
            quantity,
            fileUrl: quoteData.file ? quoteData.file.name : undefined,
            fileType: quoteData.file ? quoteData.file.type : undefined,
            fileWeight: quoteData.file ? `${(quoteData.file.size / (1024 * 1024)).toFixed(1)} MB` : undefined,
            date: new Date().toISOString(),
        };
        db.quotes.push(newQuote);
        updateMockDb("ss_quotes", db.quotes);
        // Create a new notification for admin
        const newNotification = {
            id: `n-${Date.now()}`,
            title: "New Quote Request",
            message: `${quoteData.customerName} submitted a quote request for ${service?.title || "Printing"} (${newQuote.id})`,
            read: false
        };
        db.notifications.unshift(newNotification);
        updateMockDb("ss_notifications", db.notifications);
        return newQuote;
    },
    updateStatus: async (id, status, priceOverride) => {
        await delay(700);
        const db = getMockDb();
        const idx = db.quotes.findIndex((q) => q.id === id);
        if (idx === -1)
            throw new Error("Quote not found");
        db.quotes[idx].status = status;
        if (priceOverride !== undefined) {
            db.quotes[idx].estimatedPrice = priceOverride;
        }
        updateMockDb("ss_quotes", db.quotes);
        // Send a notification to customer
        const newNotification = {
            id: `n-${Date.now()}`,
            title: `Quote ${status}`,
            message: `Your quote request ${id} has been ${status.toLowerCase()}${priceOverride !== undefined ? ` with price NPR ${priceOverride}` : ""}.`,
            read: false
        };
        db.notifications.unshift(newNotification);
        updateMockDb("ss_notifications", db.notifications);
        return db.quotes[idx];
    },
    delete: async (id) => {
        await delay(500);
        const db = getMockDb();
        const filtered = db.quotes.filter((q) => q.id !== id);
        if (filtered.length === db.quotes.length)
            return false;
        updateMockDb("ss_quotes", filtered);
        return true;
    }
};
