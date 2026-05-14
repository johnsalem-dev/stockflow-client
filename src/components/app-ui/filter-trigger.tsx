import { Button } from '@/components/ui/button'; // Adjust your shadcn path
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface FilterTriggerProps {
  label: string;
  value?: string | null;
  isActive?: boolean;
  isRemovable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string
}

export const FilterTrigger = forwardRef<HTMLButtonElement, FilterTriggerProps>(
  ({ label, value, isActive, isRemovable, onRemove, className, onClick, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost" 
      size="sm" 
      onClick={onClick}
      {...props}
      className={cn(
        "h-9 px-3 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all",
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/20" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        isRemovable && "pl-3 pr-2 flex items-center",
        className
      )}
    >
      <span>{label}: {value || "ALL"}</span>
      
      {isRemovable ? (
        <div 
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening a dropdown if clicked
            onRemove?.();
          }}
          className="ml-2 flex items-center justify-center bg-background/50 hover:bg-background rounded-full h-4 w-4 transition-colors"
        >
          <X className="h-2.5 w-2.5 text-muted-foreground hover:text-foreground transition-colors" />
        </div>
      ) : (
        <ChevronDown className="ml-1.5 h-3 w-3 opacity-50" />
      )}
    </Button>
  );
});

FilterTrigger.displayName = "FilterTrigger";