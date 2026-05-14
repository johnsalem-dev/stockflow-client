import { z } from 'zod';

export const createItemSchema = z.object({
  sku: z
    .string()
    .min(1, 'Select category to generate SKU.')
    .max(50, 'SKU cannot exceed 50 characters'),
  
  name: z
    .string()
    .min(1, 'Item name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  
  description: z
    .string()
    .optional(),
  
  uom: z
    .object({
      label: z.string().min(1, "Label is required"),
      value: z.union([z.string(), z.number()]),
    }, { error: "Unit of Measure is required" })
    .nullable()
    .refine((val) => val !== null, "Unit of Measure is required"),

  minThreshold: z.coerce
    .number()
    .int('Must be a whole number')
    .min(0, 'Threshold cannot be negative'),

  categoryId: z.coerce
    .number()
    .int()
    .min(1, 'Please select a valid category')
    .optional()
    .or(z.literal('')), 
});

export type CreateItemFormValues = z.infer<typeof createItemSchema>;