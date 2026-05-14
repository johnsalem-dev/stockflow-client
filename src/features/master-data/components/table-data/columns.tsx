import { Button } from "@/components/app-ui/button";
import { cn } from "@/lib/utils";
import type { Employee } from "@/types/api";
import type { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, CheckCircle2, MoreVertical, User } from "lucide-react";

export const EmployeeColumns: ColumnDef<Employee>[] = [
      {
        id: "profile",
        header: "Employee Profile",
        accessorFn: (row) => `${row.fullName} ${row.email}`,
        cell: ({ row }) => {
          const emp = row.original
          return (
            <div className="flex items-center gap-2.5">
              {/* <img
                src={<PersonStanding />}
                alt=""
                className="w-9 h-9 rounded-lg bg-muted border border-border/50"
              /> */}
              <User />
              <div>
                <p className="text-[13px] font-bold text-foreground leading-snug">
                  {emp.fullName}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {emp.email}
                </p>
              </div>
            </div>
          )
        },
        enableSorting: true,
      },
      {
        id: "empID",
        header: "Employee ID",
        accessorKey: "employeeId",
        cell: ({ getValue }) => (
          <span className="bg-muted px-2 py-1 rounded text-[10px] font-mono font-bold text-muted-foreground">
            {String(getValue())}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => {
          const emp = row.original;
          return(
          <div className="text-sm text-foreground/80 font-medium">
            {emp.department?.name}
          </div>
        )},
        enableSorting: true,
      },
      {
        accessorKey: "access",
        header: "System Access",
        cell: ({ getValue }) => <AccessBadge type={String(getValue())} />,
        enableSorting: true,
      },
      {
        id: "validation",
        header: "Validation",
        // accessorFn: (row) => (row.isValid ? "Verified" : row.validation),
        cell: () => <ValidationStatus isValid={true} />,
        enableSorting: true,
      },
      {
        id: "settings",
        header: () => <div className="text-right">Settings</div>,
        cell: () => (
          <div className="text-right">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ]

  const AccessBadge = ({ type }: { type: string }) => {
    const isFull = type === "Full Access"
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border",
        isFull 
          ? "bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-500/20" 
          : "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-500/20"
      )}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {type}
      </span>
    )
  }
  
  const ValidationStatus = ({ isValid }: { isValid: boolean }) => (
    <div className={cn(
      "flex items-center gap-1.5 font-bold text-[10px]",
      isValid ? "text-green-600" : "text-red-600"
    )}>
      {isValid ? (
        <><CheckCircle2 className="h-3.5 w-3.5" /> VERIFIED</>
      ) : (
        <><AlertCircle className="h-3.5 w-3.5" /> MISSING ID PROOF</>
      )}
    </div>
  )