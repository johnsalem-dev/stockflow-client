import {
  AppCard,
  AppCardContent,
  AppCardHeader,
} from "@/components/app-ui/app-card";
import { CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const departments = [
  {
    id: "D001",
    name: "Operations",
    head: "Marcus Vane",
    shortName: "OPS",
    type: "blue",
  },
  {
    id: "D005",
    name: "Logistics & Supply",
    head: "Sarah Connor",
    shortName: "LOG",
    type: "green",
  },
  {
    id: "D009",
    name: "Finance Audit",
    head: "Elena Rodriguez",
    shortName: "FIN",
    type: "purple",
  },
  {
    id: "D012",
    name: "Systems Tech",
    head: "Julian Thorne",
    shortName: "TEC",
    type: "cyan",
  },
];

// Dark-mode friendly color mapping
const deptConfig = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  green: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
};

const DepartmentRow = ({ dept }: { dept: typeof departments[0] }) => (
  <div className="flex items-center justify-between p-4 border-b last:border-b-0 border-border transition-colors hover:bg-muted/50">
    <div className="flex items-center gap-4">
      {/* Icon Badge - Using the config for dark mode support */}
      <div className={cn(
        "flex items-center justify-center w-12 h-10 rounded-lg font-bold text-[11px] shrink-0 transition-colors",
        deptConfig[dept.type as keyof typeof deptConfig]
      )}>
        {dept.shortName}
      </div>
      
      <div>
        {/* Name goes white in dark theme via text-foreground */}
        <p className="font-semibold text-foreground leading-tight">
          {dept.name}
        </p>
        <p className="text-[10px] text-muted-foreground font-medium uppercase mt-1 tracking-wider">
          HEAD: <span className="text-foreground/70">{dept.head}</span>
        </p>
      </div>
    </div>

    {/* ID Code */}
    <div className="text-xs font-mono text-muted-foreground/50 ml-4">
      #{dept.id}
    </div>
  </div>
);

export const DepartmentManagement = () => {
  return (
    <AppCard className="w-full border-none shadow-none overflow-hidden bg-card"> 
      <AppCardHeader className="flex flex-row items-center justify-between pt-2 px-4 pb-2 space-y-0 border-b border-border bg-muted/20">
        <CardTitle className="text-foreground text-lg font-bold leading-tight">
          Department Management
        </CardTitle>
        <Building2 className="h-4 w-4 text-muted-foreground" />
      </AppCardHeader>
      
      <AppCardContent className="p-0 pt-0">
        <div className="flex flex-col w-full">
          {departments.map((dept) => (
            <DepartmentRow key={dept.id} dept={dept} />
          ))}
        </div>
      </AppCardContent>
    </AppCard>
  );
};