import { z } from "zod";

export const submitInquirySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().optional().nullable(),
    message: z.string().min(1, "Message is required"),
    subject: z.string().optional().nullable(),
  }),
});
