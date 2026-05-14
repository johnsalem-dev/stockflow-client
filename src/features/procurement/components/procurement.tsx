import React from "react";
import { usePurchases } from "../api/get-purchases"
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type SortingState } from "@tanstack/react-table";
import { getPurchaseColumns } from "./purchases-columns";
import { AppDataGrid } from "@/components/app-ui/app-data-grid";
import { cn } from "@/lib/utils";
import { useUpdatePurchaseStatus } from "../api/update-purchase";
import type { TransactionStatus } from "@/types/api";

const gridLayout = "grid grid-cols-[40px_110px_2fr_1fr_80px_110px_100px_130px] items-center px-6 gap-4";

const ProcurementTable = () => {
    const { data, isSuccess } = usePurchases({
        params: { page: 1, limit: 10 },
        queryConfig: {
            placeholderData: (previousData) => previousData, // Keeps UI stable during fetch
        },
    });

    const { mutate: mutatePurchaseStatus, isPending, isSuccess: isUpdatePurchaseStatus} = useUpdatePurchaseStatus()

    const handleStatusChange = (id: number, newStatus: TransactionStatus) => {
        const payload = {
            id, 
            data: {
                status: newStatus
            }
        }
        mutatePurchaseStatus(payload)
        console.log(id, newStatus)
    }

    const [globalFilter, setGlobalFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([])
    const columns = React.useMemo(() => 
        getPurchaseColumns({ 
            onStatusChange: handleStatusChange,
            isUpdating: isPending 
        }), 
    [isPending, isUpdatePurchaseStatus]);

    const table = useReactTable({
        data: isSuccess ?  data.data : [],
        columns,
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: (row) => !!row.original.items?.length,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "includesString",
    })


    return (
        <div>

            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <AppDataGrid
                table={table}
                gridClassName={cn(gridLayout, "w-full")}
                
                headerRowClassName={cn(
                    "py-4 text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]",
                    "border-b border-border/50"
                )}
                
                rowClassName={cn(
                    "py-4 transition-all duration-200 border-b border-border/40",
                    "hover:bg-accent/40 group cursor-default relative",
                    "data-[state=expanded]:bg-accent/20"
                )}

                cellClassName="min-w-0" 

                renderExpandedRow={(row) => (
                    <div className="bg-muted/20 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className={cn(gridLayout, "py-2 opacity-50")}>
                            <div className="col-start-3 text-[10px] font-bold uppercase tracking-tighter">Item Detail</div>
                            <div className="col-start-5 text-[10px] font-bold uppercase tracking-tighter text-right">Qty</div>
                            <div className="col-start-6 text-[10px] font-bold uppercase tracking-tighter text-right">Rate</div>
                            <div className="col-start-7 text-[10px] font-bold uppercase tracking-tighter text-right">Subtotal</div>
                        </div>

                        <div className="space-y-0.5">
                            {row.original.items.map((item) => (
                                <div key={item.id} className={cn(gridLayout, "py-2 group/item hover:bg-background/50 transition-colors")}>
                                    <div className="col-start-3 flex flex-col">
                                        <span className="text-sm font-medium text-foreground/90">
                                            {item.item.name}
                                        </span>
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase">
                                            {item.item.sku}
                                        </span>
                                    </div>
                                    
                                    <div className="col-start-5 text-right font-mono text-sm">
                                        {item.quantity}
                                    </div>
                                    
                                    <div className="col-start-6 text-right font-mono text-sm text-muted-foreground">
                                        ${Number(item.rate).toFixed(2)}
                                    </div>

                                    <div className="col-start-7 text-right font-mono text-sm font-bold text-primary">
                                        ${(Number(item.quantity) * Number(item.rate)).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            />
            </div>
        </div>
    )
}

export default ProcurementTable