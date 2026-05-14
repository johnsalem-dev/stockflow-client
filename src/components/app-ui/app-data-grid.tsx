import React, { Fragment, type ReactNode } from "react"
import { flexRender, type Table, type Row } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

type AppDataGridProps<TData> = {
  table: Table<TData>
  gridClassName: string
  headerRowClassName?: string
  rowClassName?: string
  cellClassName?: string
  // New Prop: Function that takes the row and returns a ReactNode
  renderExpandedRow?: (row: Row<TData>) => ReactNode 
}

export function AppDataGrid<TData>({
  table,
  gridClassName,
  headerRowClassName,
  rowClassName,
  cellClassName,
  renderExpandedRow, // Destructure the new prop
}: AppDataGridProps<TData>) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header Groups */}
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className={cn(gridClassName, headerRowClassName)}>
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort()
              const sortDir = header.column.getIsSorted()
              return (
                <div
                  key={header.id}
                  className={cn(
                    "flex items-center", // Ensure vertical alignment in header
                    canSort && "select-none cursor-pointer hover:text-foreground/80 transition-colors",
                    cellClassName
                  )}
                  onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                >
                  <div className="flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {sortDir ? (
                      <span className="text-[9px] opacity-60">
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        {/* Data Rows */}
        <div className="space-y-1">
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              {/* Main Row */}
              <div className={cn(gridClassName, rowClassName)}>
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className={cellClassName}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>

              {/* Conditional Expanded Row */}
              {renderExpandedRow && row.getIsExpanded() && (
                <div className="w-full animate-in fade-in slide-in-from-top-1 duration-200">
                  {renderExpandedRow(row)}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}