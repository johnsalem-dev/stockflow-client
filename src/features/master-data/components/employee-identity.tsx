import { 
  Search, ShieldCheck, ChevronDown, 
} from "lucide-react"
import * as React from "react"
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
import { AddEmployeeDialog } from "../dialog/add-employee"
import { useEmployees } from "../apis/employee/get-employees"
import type { Employee } from "@/types/api"
import { EmployeeColumns } from "./table-data/columns"



const TABLE_GRID =
  "grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_auto] items-center px-3"

export const EmployeeDirectory = () => {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const {data: employees} = useEmployees();
  const columns: ColumnDef<Employee>[] = React.useMemo(() => EmployeeColumns, []);


  const table = useReactTable({
    data: employees ?? [],
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
        <AddEmployeeDialog />
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