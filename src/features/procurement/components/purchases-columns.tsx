import { cn, formatTableDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react"; // Ensure lucide-react is installed

import type { Purchase, TransactionStatus } from "@/types/api"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ColumnDependencies = {
  onStatusChange: (id: number, newStatus: TransactionStatus) => void;
  isUpdating?: boolean;
};

export const getPurchaseColumns = ({onStatusChange, isUpdating}: ColumnDependencies) : ColumnDef<Purchase>[] => [
  {
    id: "expander",
    header: () => null, // No header needed for the expander column
    cell: ({ row }) => {
      // Only show the toggle if there are actually items to expand
      if (!row.original.items || row.original.items.length === 0) return null;

      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-muted"
          onClick={row.getToggleExpandedHandler()}
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "referenceNo",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Ref No</span>,
    cell: ({ row }) => (
      <code className="text-[11px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
        {row.original.referenceNo}
      </code>
    ),
  },
  {
    id: "itemsSummary",
    accessorFn: (row) => row.items?.[0]?.item?.name, 
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Items Summary</span>,
    cell: ({ row }) => {
      const itemsList = row.original.items || [];
      if (itemsList.length === 0) return <span className="text-xs text-muted-foreground">No items</span>;

      const firstItemName = itemsList[0].item?.name || `Item #${itemsList[0].itemId}`;
      const extraItemsCount = itemsList.length - 1;

      return (
        <div className="flex flex-col items-start leading-tight">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground tracking-tight truncate max-w-[200px]">
              {firstItemName}
            </span>
            {extraItemsCount > 0 && (
              <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 font-bold">
                +{extraItemsCount} more
              </Badge>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground uppercase font-medium mt-0.5">
            {row.original.sourceType.replace('_', ' ')}
          </span>
        </div>
      );
    },
  },
  {
    id: "supplier",
    accessorFn: (row) => row.supplier?.name,
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Supplier</span>,
    cell: ({ row }) => (
      <span className="text-xs font-semibold text-foreground/80">
        {row.original.supplier?.name || `Supplier #${row.original.supplierId}`}
      </span>
    ),
  },
  {
    id: "totalQuantity",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest text-right block w-full">Total Qty</span>,
    cell: ({ row }) => {
      const totalQty = (row.original.items || []).reduce((sum, current) => sum + (Number(current.quantity) || 0), 0);
      return <div className="text-right w-full"><span className="text-sm font-black tabular-nums">{totalQty}</span></div>;
    },
  },
  {
    id: "totalAmount",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest text-right block w-full">Total Amt</span>,
    cell: ({ row }) => {
      const totalAmount = (row.original.items || []).reduce((sum, current) => sum + ((Number(current.quantity) || 0) * (Number(current.rate) || 0)), 0);
      const formattedTotal = totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      return <div className="text-right w-full"><span className="text-sm font-medium tabular-nums text-foreground/80">{totalAmount > 0 ? formattedTotal : '-'}</span></div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Status</span>,
    cell: ({ row }) => {
      const status = row.original.status;
      const id = row.original.id;
  
      return (
        <Select 
          disabled={isUpdating}
          onValueChange={(value: TransactionStatus) => onStatusChange(id, value)} 
          value={status}
        >
          <SelectTrigger 
            className={cn(
              "h-7 w-fit min-w-[90px] text-[10px] font-black uppercase tracking-tighter border-none shadow-none focus:ring-0 transition-all px-2.5 rounded-full",              
              status === "VERIFIED" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
              status === "PENDING" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20",
              status === "CANCELLED" && "bg-destructive/10 text-destructive hover:bg-destructive/20"
            )}
          >
            <SelectValue />
          </SelectTrigger>
  
          <SelectContent className="border-border bg-popover shadow-xl">
            <SelectItem value="PENDING" className="text-[10px] font-bold uppercase focus:bg-amber-500/10 focus:text-amber-600">
              Pending
            </SelectItem>
            <SelectItem value="VERIFIED" className="text-[10px] font-bold uppercase focus:bg-emerald-500/10 focus:text-emerald-600">
              Verified
            </SelectItem>
            <SelectItem value="CANCELLED" className="text-[10px] font-bold uppercase focus:bg-destructive/10 focus:text-destructive">
              Cancelled
            </SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "purchaseDate",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Date</span>,
    cell: ({ row }) => {
      const { dateFormatted, timeFormatted } = formatTableDate(row.original.purchaseDate);
      return (
        <div className="flex flex-col text-[11px] text-muted-foreground leading-tight">
          <span className="font-bold text-foreground/70">{dateFormatted}</span>
          <span className="text-[10px] opacity-60 italic">{timeFormatted}</span>
        </div>
      );
    },
  },
];