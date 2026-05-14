import * as React from "react"
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type SortingState
} from "@tanstack/react-table"
import { mockCatalogData } from "../mock-data"
import { AppDataGrid } from "@/components/app-ui/app-data-grid"
import { CatalogColumns } from "./item-catalog-columns"
import { CatalogToolbar } from "./item-catalog-toolbar"
import { useItems } from "../apis/get-items"
import { useCategories } from "@/features/master-data/apis/category/get-categories"
import { TABLE_GRID } from "@/config/consts"


// This string aligns exactly with the 8 columns defined above


export const ItemCatalog = () => {
    const { data } = useItems({
        params: { page: 1, limit: 10, search: '' },
        queryConfig: {
          placeholderData: (previousData) => previousData, // Keeps UI stable during fetch
        },
      });
    const { data: categories } = useCategories({
        params: { page: 1, }
    })
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([])
    const columns = React.useMemo(() => CatalogColumns, [])

    const table = useReactTable({
        data: data ? data.data : [],
        columns,
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "includesString",
    })
    const criticalCount = mockCatalogData.filter(item => item.status === 'CRITICAL').length

    return (
        <div>
                <CatalogToolbar 
                    table={table} 
                    totalItems={mockCatalogData.length} 
                    criticalCount={criticalCount} 
                    categories={categories ?? []}
                    />
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <AppDataGrid
                    table={table}
                    gridClassName={TABLE_GRID}
                    headerRowClassName="py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 mb-2"
                    rowClassName="py-3 hover:bg-muted/30 transition-colors rounded-xl border border-transparent hover:border-border/50 group"
                    cellClassName="flex items-center"
                    />
            </div>
        </div>
    )
}