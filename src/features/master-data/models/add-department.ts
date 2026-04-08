import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  code: z.string().min(2, 'Code must be at least 2 characters').max(5, 'Code must be less than 5 characters'),
  headId: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;