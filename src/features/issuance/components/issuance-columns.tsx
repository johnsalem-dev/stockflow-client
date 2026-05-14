import { cn, formatTableDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Issuance } from "@/types/api";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const IssuanceColumns: ColumnDef<Issuance>[] = [
  {
    accessorKey: "referenceNo",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Ref No</span>,
    cell: ({ row }) => (
      <code className="text-[11px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded border border-border/50">
        {row.original.referenceNo}
      </code>
    ),
  },
  {
    accessorKey: "issuanceDate",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Date</span>,
    cell: ({ row }) => {
      const { dateFormatted, timeFormatted } = formatTableDate(row.original.issuanceDate);
      return (
        <div className="flex flex-col text-[11px] leading-tight">
          <span className="font-bold text-foreground/70">{dateFormatted}</span>
          <span className="text-[10px] opacity-60 italic">{timeFormatted}</span>
        </div>
      );
    },
  },
  {
    id: "receiver",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Receiver</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 border border-border shrink-0">
          <AvatarFallback className="text-[10px] bg-primary/5 text-primary font-bold">
            {row.original.employee.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-sm font-bold text-foreground truncate">
            {row.original.employee.fullName}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            {row.original.employee.employeeId}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "employee.department.name",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Department</span>,
    cell: ({ row }) => (
      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-tight">
        {row.original.employee.department.name}
      </span>
    ),
  },
  {
    accessorKey: "sourceType",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Source</span>,
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-[9px] font-black px-1.5 py-0 h-4 bg-muted/80 text-muted-foreground border-none">
        {row.original.sourceType.replace('_', ' ')}
      </Badge>
    ),
  },
  {
    id: "items",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest text-right block w-full">Items</span>,
    cell: ({ row }) => (
      <div className="text-right w-full">
        <span className="text-sm font-black tabular-nums">{row.original._count.items}</span>
      </div>
    ),
  },
  {
    accessorKey: "remarks",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest">Remarks</span>,
    cell: ({ row }) => {
      const remarks = row.original.remarks;
      
      if (!remarks) return <span className="text-muted-foreground/30 ml-2">—</span>;

      return (
       
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-[11px] text-muted-foreground italic line-clamp-1 max-w-[180px] cursor-help px-1">
                "{remarks}"
              </p>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="max-w-[300px] text-[11px] bg-popover border border-border shadow-xl p-3"
            >
              <p className="text-primary leading-relaxed">{remarks}</p>
            </TooltipContent>
          </Tooltip>
      );
    },
  },
];