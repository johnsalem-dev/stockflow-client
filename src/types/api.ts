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