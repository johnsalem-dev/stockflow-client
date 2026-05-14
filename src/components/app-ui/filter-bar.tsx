import React from 'react';
import { cn } from '@/lib/utils';
import { ListFilter } from 'lucide-react';

interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FilterBar({ children, className, ...props }: FilterBarProps) {
  return (
    <div 
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 bg-muted/30 border border-border p-1.5 rounded-2xl shadow-sm transition-all",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function FilterBarGroup({ children, className, ...props }: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function FilterBarIcon({ className }: { className?: string }) {
  return (
    <div className={cn("px-3 text-muted-foreground hidden sm:block", className)}>
      <ListFilter className="h-5 w-5" />
    </div>
  );
}