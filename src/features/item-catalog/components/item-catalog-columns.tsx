import { cn, formatTableDate } from "@/lib/utils"
import type { ColumnDef } from "@tanstack/react-table";
import type { ItemSummary } from "@/types/api";
import { Badge } from "@/components/ui/badge"; // Ensure this path matches your shadcn components
import { ItemStatus } from "@/config/consts";

export const CatalogColumns: ColumnDef<ItemSummary>[] = [
  {
    accessorKey: "sku",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">SKU ID</span>,
    cell: ({ row }) => (
      <code className="text-[11px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
        {row.original.item_sku}
      </code>
    ),
  },
  {
    accessorKey: "name",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Item Name</span>,
    cell: ({ row }) => (
      <span className="text-sm font-bold text-foreground tracking-tight">
        {row.original.item_name}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Category</span>,
    cell: ({ row }) => (
      /* Using 'outline' variant for Category to keep it clean, 
         swapping hardcoded indigo for primary-tinted logic */
      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] font-bold uppercase">
        {row.original.group_item}
      </Badge>
    ),
  },
  {
    accessorKey: "uomPrimary",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">UOM</span>,
    cell: ({ row }) => (
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-bold text-foreground">{row.original.uom}</span>
        {/* <span className="text-[10px] text-muted-foreground uppercase font-medium">{row.original.uomSecondary}</span> */}
      </div>
    ),
  },
  {
    accessorKey: "balance",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Balance</span>,
    cell: ({ row }) => (
      <span className="text-sm font-black tabular-nums">{row.original.current_balance}</span>
    ),
  },
  {
    accessorKey: "status",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Status</span>,
    cell: ({ row }) => {
      const status = row.original.inventory_status;
      
      return (
        <Badge
          className={cn(
            "text-[10px] font-black uppercase tracking-tighter px-2 py-0",
            status === "IN_STOCK" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 shadow-none",
            status === "LOW_STOCK" && "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 shadow-none",
            status === "OUT_OF_STOCK" && "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 shadow-none"
          )}
        >
          {ItemStatus[status]}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastModifiedDate",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Last Modified</span>,
    cell: ({ row }) => {
      const lastModifiedStr = row.original.last_modified;
      const { dateFormatted, timeFormatted } = formatTableDate(lastModifiedStr);
      return(
      <div className="flex flex-col text-[11px] text-muted-foreground leading-tight">
        <span className="font-bold text-foreground/70">{dateFormatted}</span>
        <span className="text-[10px] opacity-60 italic">{timeFormatted}</span>
      </div>
    )},
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex justify-end">
         {/* Actions logic usually goes here */}
      </div>
    ),
  },
]