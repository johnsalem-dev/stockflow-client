import type { CatalogItem } from "@/types/api";

// mockData.ts
export const mockCatalogData: CatalogItem[] = [
    {
      id: "1",
      sku: "OS-PAP-A4-001",
      name: "Premium A4 Copy Paper (80gsm)",
      category: "Paper Supplies",
      uomPrimary: "Reams",
      uomSecondary: "(Box of 5)",
      balance: 450,
      status: "IN STOCK",
      lastModifiedDate: "Oct 24, 2023",
      lastModifiedTime: "14:20",
    },
    {
      id: "2",
      sku: "OS-INK-HP67-B",
      name: "HP 67XL Black Ink Cartridge",
      category: "Printer Consumables",
      uomPrimary: "Units",
      uomSecondary: "(Pieces)",
      balance: 12,
      status: "CRITICAL",
      lastModifiedDate: "Oct 22, 2023",
      lastModifiedTime: "09:15",
    },
    // Add more as needed...
  ];