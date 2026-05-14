import React from "react";
import { useIssuances } from "../api/get-issuances"; // Assuming this hook exists
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type SortingState } from "@tanstack/react-table";
import { AppDataGrid } from "@/components/app-ui/app-data-grid";
import { cn } from "@/lib/utils";
import { IssuanceColumns } from "./issuance-columns";

// Modified grid layout to accommodate the Receiver and Action columns
const gridLayout = "grid grid-cols-[40px_130px_110px_2fr_100px_100px_150px_60px] items-center px-6 gap-4";

const IssuanceTable = () => {
    const { data, isSuccess } = useIssuances({
        params: { page: 1, limit: 10 },
        queryConfig: {
            placeholderData: (previousData) => previousData,
        },
    });

    const [globalFilter, setGlobalFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([])
    const columns = React.useMemo(() => IssuanceColumns, []);

    const updateStatus = ({id, status}: {id: number, status: string}) => {
        console.log(id, status)
    }

    const table = useReactTable({
        data: isSuccess ? data.data : [],
        columns: columns, 
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // We pass the functions here so the columns can access them via 'meta'
        meta: {
            onStatusChange: (id: number, status: string) => updateStatus({ id, status }),
            isUpdating: false
        }
    });

    return (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <AppDataGrid
                table={table}
                gridClassName={cn(gridLayout, "w-full")}
                headerRowClassName={cn(
                    "py-4 text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]",
                    "border-b border-border/50 bg-muted/5"
                )}
                rowClassName={cn(
                    "py-4 transition-all duration-200 border-b border-border/40",
                    "hover:bg-accent/40 group cursor-default relative"
                )}
                cellClassName="min-w-0" 
            />
        </div>
    )
}

export default IssuanceTable;