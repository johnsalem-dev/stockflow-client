export type Category = {
  id: number;
  emoji?: string;
  name: string;
  code: string;
  departmentId: number | string; // Maps to "PARENT DEPARTMENT"
  description?: string;
  department: {
    id: number;
    name: string;
    code: string;
  }
  _count: {
    items: number;
  }
};

export type Department = {
  id: number;
  name: string;
  code: string;
  description?: string;
  headId?: number;
  createdAt: string;
  updatedAt: string;
};

export type Employee = {
  id: number;
  fullName: string;
  employeeId: string;
  email: string;
  designation: string;
  departmentId: number | null;
  department?: Department | null;

};
export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

export type StockStatus = 'IN STOCK' | 'LOW STOCK' | 'CRITICAL';
export type TransactionStatus = 'PENDING' | 'VERIFIED' | 'CANCELLED';

export interface CatalogItem {
  id: string; // Internal ID
  sku: string;
  name: string;
  category: string;
  uomPrimary: string;
  uomSecondary: string;
  balance: number;
  status: StockStatus;
  lastModifiedDate: string;
  lastModifiedTime: string;
}

export type ItemSummary = {
  item_id: number;
  item_code: number;
  item_sku: string;
  item_name: string;
  group_item: string | null;
  description: string;
  uom: string;
  total_purchased: string | null;
  total_issued: string | null;
  current_balance: string | null;
  inventory_status: 'OUT_OF_STOCK' | 'LOW_STOCK' | 'IN_STOCK';
  last_modified: string;
};

export type ItemFilters = {
  category?: string;
  lowStock?: boolean;
  search?: string;
  page?: number;
  limit?: number;
};

export type UomMinimal = {
  id: number;
  name: string;
};

export type SupplierMinimal = {
  id: number;
  name: string;
};

export type Item = {
  id: number;
  sku: string;
  name: string;
  description?: string;
  uomId: number;
  minThreshold: number;
  categoryId?: number;
  createdAt: string;
};

export type PurchaseItem = {
  id: number;
  purchaseId: number;
  itemId: number;
  quantity: string;
  rate: string | null;
  item: Item; 
};

export type Purchase = {
  id: number;
  status: TransactionStatus; // Based on TransactionStatus enum
  purchaseDate: string;
  itemId: number;
  items: PurchaseItem[]; // Included relation
  supplierId: number;
  supplier: SupplierMinimal;
  sourceType: string;
  referenceNo: string;
  quantity: string;
  rate: string | null;
  createdAt: string;
};

export type PurchaseFilters = {
  supplierId?: number;
  startDate?: string;
  referenceNo?: string;
  page?: number;
  limit?: number;
};

export type Issuance = {
  id: number;
  issuanceDate: string;
  referenceNo: string;
  sourceType: string;
  employeeId: number;
  remarks: string;
  employee: {
    fullName: string;
    employeeId: string;
    department: {
      id: number;
      name: string;
    };
  };
  _count: {
    items: number;
  };
  createdAt: string;
};

export type IssuanceFilters = {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
};

