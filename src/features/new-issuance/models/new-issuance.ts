import { z } from "zod";

export const RefSourceEnum = z.enum(["IGP_BOOK", "MAPLE"]);

const IssuanceItemSchema = z.object({
  itemId: z.number({ message: "Item is required" }),
  quantity: z.number({ message: "Quantity is required" })
    .min(0.01, "Min quantity is 0.01"),
  uom: z.string().optional(),
  currentBalance: z.string().optional(),
});

export const IssuanceFormSchema = z.object({
  employee: z.object({
    label: z.string(),
    value: z.number(),
  }, { error: "Please select an employee" }).nullable()
    .refine((val) => val !== null, "Employee is required"),
    
  sourceType: RefSourceEnum,
  referenceNo: z.string().min(1, "Reference ID is required").max(50),
  remarks: z.string().optional(),
  items: z.array(IssuanceItemSchema).min(1, "At least one item is required"),
});

export type IssuanceFormValues = z.infer<typeof IssuanceFormSchema>;