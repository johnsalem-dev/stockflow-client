import { PageHeader } from "@/components/layouts/page-header";
import { Button } from "@/components/app-ui/button";
import {
  AppCard,
  AppCardContent,
  AppCardHeader,
  AppCardLabel,
  AppCardValue,
} from "@/components/app-ui/app-card";
import { UploadCloud } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { CategoryManagement } from "./components/categories";
import { DepartmentManagement } from "./components/department-management";
import { EmployeeDirectory } from "./components/employee-identity";

export const MasterDataGrid = () => {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Establishing Source of Truth"
        description="Define organizational structures, categories, and personnel to initialize system integrity."
      >
        <Button size="sm" variant="outline">
          Export Master file
        </Button>
        <Button size="sm">
          <UploadCloud className="mr-2 h-4 w-4" />
          Bulk Import
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
    
        <div className="lg:col-span-6">
            <DepartmentManagement />
        </div>

        <div className="lg:col-span-6">
            <CategoryManagement />
        </div>

        <div className="lg:col-span-12">
            <EmployeeDirectory />
        </div>
    </div>
</div>
  );
};
