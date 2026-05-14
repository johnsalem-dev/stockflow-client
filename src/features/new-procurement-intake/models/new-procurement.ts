import { z } from "zod";

export const RefSourceEnum = z.enum(["IGP_BOOK", "MAPLE"]);

const PurchaseItemSchema = z.object({
  itemId: z.number({ message: "Item selection is required" }),
  quantity: z.number({ message: "Quantity must be a number" })
    .min(0.01, "Quantity must be greater than 0"),
  rate: z.number({ message: "Rate must be a number" })
  .min(0.01, "Rate must be greater than 0")
});

export const PurchaseFormSchema = z.object({

  supplier: z
  .object({
    label: z.string().min(1, "Label is required"),
    value: z.union([z.string(), z.number()]),
  }, { error: "Unit of Measure is required" })
  .nullable()
  .refine((val) => val !== null, "Unit of Measure is required"),

  sourceType: RefSourceEnum, 
  
  referenceNo: z.string({ message: "Reference ID is required" })
    .min(1, "Reference ID is required")
    .max(50, "Reference ID cannot exceed 50 characters"),
  
  purchaseDate: z.date({
    message: "Purchase date is required",
  }),

  items: z.array(PurchaseItemSchema)
    .min(1, "You must add at least one item to reconcile."),
});

export type PurchaseFormValues = z.infer<typeof PurchaseFormSchema>;