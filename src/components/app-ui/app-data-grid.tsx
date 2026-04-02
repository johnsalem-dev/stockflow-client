import { flexRender, type Table } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

type AppDataGridProps<TData> = {
  table: Table<TData>
  gridClassName: string
  headerRowClassName?: string
  rowClassName?: string
  cellClassName?: string
}

export function AppDataGrid<TData>({
  table,
  gridClassName,
  headerRowClassName,
  rowClassName,
  cellClassName,
}: AppDataGridProps<TData>) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className={cn(gridClassName, headerRowClassName)}>
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort()
              const sortDir = header.column.getIsSorted()
              return (
                <div
                  key={header.id}
                  className={cn(
                    canSort &&
                      "select-none cursor-pointer hover:text-foreground/80 transition-colors",
                    cellClassName
                  )}
                  onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  aria-sort={
                    sortDir === "asc"
                      ? "ascending"
                      : sortDir === "desc"
                        ? "descending"
                        : "none"
                  }
                  role={canSort ? "button" : undefined}
                  tabIndex={canSort ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (!canSort) return
                    if (e.key === "Enter" || e.key === " ") header.column.toggleSorting()
                  }}
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

        <div className="space-y-1">
          {table.getRowModel().rows.map((row) => (
            <div key={row.id} className={cn(gridClassName, rowClassName)}>
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className={cellClassName}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

