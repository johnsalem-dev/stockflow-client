import { z } from 'zod';

export const categorySchema = z.object({
  emoji: z.string().min(1, 'Required').max(5, 'Too long'), // Allowing enough length for complex emojis
  name: z.string().min(1, 'Category name is required'),
  code: z.string().min(2, 'Code must be at least 2 characters'),
  departmentId: z.string().min(1, 'Please select a department'),
  description: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;