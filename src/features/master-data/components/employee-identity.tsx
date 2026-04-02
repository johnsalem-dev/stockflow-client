import { 
  Search, UserPlus, MoreVertical, CheckCircle2, 
  AlertCircle, ShieldCheck, ChevronDown 
} from "lucide-react"
import * as React from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { 
  AppCard, 
  AppCardContent, 
  AppCardHeader 
} from "@/components/app-ui/app-card"
import { AppDataGrid } from "@/components/app-ui/app-data-grid"
import { Button } from "@/components/app-ui/button"
import { CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Employee = {
  id: string
  name: string
  email: string
  department: string
  access: "Full Access" | "Restricted" | string
  validation: string
  isValid: boolean
  avatar: string
}

// 1. Data Mockup based on the directory image
const employees: Employee[] = [
  {
    id: "992-PX",
    name: "Eleanor Shellstrop",
    email: "e.shell@company.com",
    department: "Administration",
    access: "Full Access",
    validation: "Verified",
    isValid: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor",
  },
  {
    id: "451-LQ",
    name: "Chidi Anagonye",
    email: "c.anag@company.com",
    department: "Information Technology",
    access: "Restricted",
    validation: "Missing ID Proof",
    isValid: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chidi",
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

const TABLE_GRID =
  "grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_auto] items-center px-3"

export const EmployeeDirectory = () => {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = React.useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        id: "profile",
        header: "Employee Profile",
        accessorFn: (row) => `${row.name} ${row.email}`,
        cell: ({ row }) => {
          const emp = row.original
          return (
            <div className="flex items-center gap-2.5">
              <img
                src={emp.avatar}
                alt=""
                className="w-9 h-9 rounded-lg bg-muted border border-border/50"
              />
              <div>
                <p className="text-[13px] font-bold text-foreground leading-snug">
                  {emp.name}
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
        id: "corpId",
        header: "Corp ID",
        accessorKey: "id",
        cell: ({ getValue }) => (
          <span className="bg-muted px-2 py-1 rounded text-[10px] font-mono font-bold text-muted-foreground">
            EID-{String(getValue())}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ getValue }) => (
          <div className="text-sm text-foreground/80 font-medium">
            {String(getValue())}
          </div>
        ),
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
        accessorFn: (row) => (row.isValid ? "Verified" : row.validation),
        cell: ({ row }) => <ValidationStatus isValid={row.original.isValid} />,
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
    ],
    []
  )

  const table = useReactTable({
    data: employees,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  })

  return (
    <AppCard className="w-full border-none shadow-none bg-card">
      <AppCardHeader className="flex-row items-center justify-between p-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-md">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-xl font-bold">Employee Identity Directory</CardTitle>
          </div>
          <CardDescription>
            Linking individual records to Corporate Employee IDs for immutable tracking.
          </CardDescription>
        </div>
        <Button variant="primary" className="gap-2 px-4 h-11">
          <UserPlus className="h-4 w-4" /> Register New Employee
        </Button>
      </AppCardHeader>

      <AppCardContent className="p-6 pt-4 mt-0">
        {/* Filters Section */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name, ID, or department..." 
              className="w-full bg-muted/30 border border-transparent focus:border-primary/50 h-10 pl-10 pr-4 rounded-lg text-sm transition-all outline-none"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          {["All Departments", "Active Status"].map(filter => (
            <Button key={filter} variant="outline" className="h-10 px-4 gap-3 border-none bg-muted/20 font-medium">
              {filter} <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          ))}
        </div>

        {/* Directory List Container */}
        <AppDataGrid
          table={table}
          gridClassName={TABLE_GRID}
          headerRowClassName="py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 mb-2"
          rowClassName="py-3 hover:bg-muted/30 transition-colors rounded-xl border border-transparent hover:border-border/50 group"
        />
      </AppCardContent>
    </AppCard>
  )
}