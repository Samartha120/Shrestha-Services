import { z } from "zod";

export const saveCompanyInfoSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Company name is required"),
    logo: z.string().optional(),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    description: z.string().optional(),
  }),
});
