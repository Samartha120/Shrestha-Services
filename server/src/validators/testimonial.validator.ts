import { z } from "zod";

export const createTestimonialSchema = z.object({
  body: z.object({
    customerName: z.string().min(1, "Customer name is required"),
    rating: z.union([z.number(), z.string()]).transform((v) => Number(v)).refine(r => r >= 1 && r <= 5, {
      message: "Rating must be between 1 and 5",
    }),
    review: z.string().min(1, "Review text is required"),
  }),
});
