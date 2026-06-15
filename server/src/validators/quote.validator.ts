import { z } from "zod";

export const createQuoteSchema = z.object({
  body: z.object({
    serviceId: z.string().min(1, "serviceId is required"),
    customerName: z.string().min(2, "customerName must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(7, "phone must be at least 7 digits"),
    width: z.union([z.number(), z.string()]).transform((v) => Number(v)).optional(),
    height: z.union([z.number(), z.string()]).transform((v) => Number(v)).optional(),
    notes: z.string().optional(),
    material: z.string().min(1, "material option is required"),
    quantity: z.union([z.number(), z.string()]).transform((v) => Number(v)).default(1),
  }),
});

export const updateQuoteStatusSchema = z.object({
  body: z.object({
    status: z.enum(["Pending", "Approved", "Rejected"]),
    priceOverride: z.number().optional(),
  }),
});
