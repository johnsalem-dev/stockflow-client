import { FilterBar, FilterBarGroup, FilterBarIcon } from "@/components/app-ui/filter-bar";
import { FilterTrigger } from "@/components/app-ui/filter-trigger";
import { CategoryDropdown } from "./category-dropdown";
import type { Table } from "@tanstack/react-table";
import type { Category } from "@/types/api";

type InventoryToolbarProps<Tdata> = {
    table: Table<Tdata>;
    categories: Category[];
    currentCategory: string;
    currentStatus: string;
}

export function InventoryToolbar<TData>({ table, categories, currentCategory, currentStatus }: InventoryToolbarProps<TData>) {
    return (
      <FilterBar>
        {/* LEFT SIDE: Filters */}
        <FilterBarGroup>
          <FilterBarIcon />
          
          {/* Category Dropdown (Logic moved out of the layout) */}
          <CategoryDropdown 
            categories={categories}
            currentCategory={currentCategory}
            onSelect={(val) => table.getColumn("category")?.setFilterValue(val)} 
          />
  
          {/* UOM Filter */}
          <FilterTrigger label="UOM" value="ANY" />
  
          {/* Status Filter */}
          <FilterTrigger 
            label="STATUS" 
            value={currentStatus} 
            isActive={!!currentStatus}
            isRemovable={!!currentStatus}
            onRemove={() => table.getColumn("status")?.setFilterValue("")}
            onClick={() => {
              if (!currentStatus) table.getColumn("status")?.setFilterValue("LOW STOCK")
            }}
          />
        </FilterBarGroup>
  

      </FilterBar>
    );
  }