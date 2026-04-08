import {
  AppCard,
  AppCardContent,
  AppCardHeader,
} from "@/components/app-ui/app-card";
import { CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { cn, getDeptColorClass } from "@/lib/utils";
import { AddDepartmentDialog } from "../dialog/add-department";
import { useDepartments } from "../apis/departments/get-departments";
import type { Department } from "@/types/api";


const DepartmentRow = ({ dept }: { dept: Department }) => {
  const colorClass = getDeptColorClass(dept.name);
  
  return (
  <div className="flex items-center justify-between p-4 border-b last:border-b-0 border-border transition-colors hover:bg-muted/50">
    <div className="flex items-center gap-4">
      {/* Icon Badge - Using the config for dark mode support */}
      <div
      className={cn(
        "flex items-center justify-center w-12 h-10 rounded-lg font-bold text-[11px] shrink-0 text-white shadow-sm",
        colorClass
      )}
      >
        {dept.code}
      </div>
      
      <div>
        {/* Name goes white in dark theme via text-foreground */}
        <p className="font-semibold text-foreground leading-tight">
          {dept.name}
        </p>
        <p className="text-[10px] text-muted-foreground font-medium uppercase mt-1 tracking-wider">
          HEAD: <span className="text-foreground/70">{dept.headId}</span>
        </p>
      </div>
    </div>

    <div className="text-xs font-mono text-muted-foreground/50 ml-4">
      #{dept.id}
    </div>
  </div>
)};

export const DepartmentManagement = () => {
  const { data } = useDepartments();

  return (
    <AppCard className="w-full border-none shadow-none overflow-hidden bg-card"> 
      <AppCardHeader className="flex flex-row items-center gap-3 pt-4 px-4 pb-3 space-y-0 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 shrink-0">
            <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-foreground text-lg font-bold leading-tight">
            Department Management
          </CardTitle>
        </div>
        <AddDepartmentDialog />
      </AppCardHeader>
      
      <AppCardContent className="p-0 pt-0 h-[305px] overflow-y-auto custom-scrollbar">
        <div className="flex flex-col w-full">
          {data?.map((dept) => (
            <DepartmentRow key={dept.id} dept={dept} />
          ))}
        </div>
      </AppCardContent>
    </AppCard>
  );
};