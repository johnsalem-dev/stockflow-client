import * as React from "react"
import { ListFilter, ChevronDown, Shapes, TriangleAlert, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/app-ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import type { Table } from "@tanstack/react-table"
import { AppCard, AppCardIcon, AppCardLabel, AppCardValue } from "@/components/app-ui/app-card"
import { KPICard } from "@/components/app-ui/kpi-card"
import { InventoryToolbar } from "./inventory-toolbar"
import type { Category } from "@/types/api"

interface CatalogToolbarProps<TData> {
  table: Table<TData>
  totalItems: number
  criticalCount: number
  categories: Category[]
}

export function CatalogToolbar<TData>({ table, totalItems, criticalCount, categories }: CatalogToolbarProps<TData>) {
  // const categories = ["Paper Supplies", "Printer Consumables", "Janitorial", "Pantry"]
  // const uoms = ["Reams", "Units", "Packs", "Cases"] // Preserved for your future use

  const currentCategory = (table.getColumn("category")?.getFilterValue() as string) ?? ""
  const currentStatus = (table.getColumn("status")?.getFilterValue() as string) ?? ""

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

      <InventoryToolbar
        table={table}
        categories={categories}
        currentCategory={currentCategory}
        currentStatus={currentStatus}
      />

      <div className="flex items-center gap-3">
        <KPICard 
          label="Total SKUs" 
          value={totalItems.toLocaleString()} 
          icon={<Shapes className="h-5 w-5" />} 
          variant="default" 
          layout="horizontal"
        />
        <KPICard 
          label="Critical Alert" 
          value={`${criticalCount} Items`} 
          icon={<TriangleAlert className="h-5 w-5" />} 
          variant="destructive" 
          layout="horizontal"
        />
      </div>
    </div>
  )
}
