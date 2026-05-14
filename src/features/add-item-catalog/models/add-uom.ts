import z from "zod";

export const createUomInputSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(50, 'Name must be 50 characters or less'),
  });
  
  export type CreateUomInput = z.infer<typeof createUomInputSchema>;