import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you are using tailwind-merge/clsx;
import { AppCard, AppCardIcon, AppCardLabel, AppCardValue } from './app-card';

export type KPICardVariant = 'default' | 'destructive' | 'warning' | 'success';
export type KPICardLayout = 'vertical' | 'horizontal';

export interface KPICardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: KPICardVariant;
  layout?: KPICardLayout;
  badge?: React.ReactNode; // Used for the trend/percentage pill in vertical layout
  className?: string;
}

export function KPICard({
  label,
  value,
  icon,
  variant = 'default',
  layout = 'vertical', // Defaulting to the standard dashboard card
  badge,
  className,
}: KPICardProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <AppCard
      className={cn(
        "transition-colors relative",
        
        // --- LAYOUT OVERRIDES ---
        isHorizontal
          ? "flex-row items-center px-5 py-3 rounded-2xl min-w-[190px] min-h-0"
          : "flex-col p-5 rounded-xl min-w-[200px] min-h-[140px] justify-between",

        // --- VARIANT OVERRIDES ---
        // Horizontal variant backgrounds
        isHorizontal && variant === 'default' && "bg-muted/30 border-border",
        isHorizontal && variant === 'destructive' && "bg-destructive/10 border-destructive/20",
        
        // Vertical variant backgrounds (usually solid white/theme-bg)
        !isHorizontal && "bg-card border-border shadow-sm", 

        className
      )}
    >
      {/* ============================== */}
      {/* 1. VERTICAL LAYOUT (IMAGE 1)   */}
      {/* ============================== */}
      {!isHorizontal && (
        <>
          <div className="flex items-start justify-between w-full mb-4">
            <AppCardIcon
              className={cn(
                variant === 'destructive' && "bg-destructive/10 text-destructive",
                variant === 'warning' && "bg-amber-100 text-amber-600"
              )}
            >
              {icon}
            </AppCardIcon>
            {badge && <div className="ml-auto">{badge}</div>}
          </div>
          
          <div className="flex flex-col gap-1 mt-auto">
            <AppCardLabel className="text-muted-foreground text-sm font-medium">
              {label}
            </AppCardLabel>
            <AppCardValue className="text-3xl font-bold tracking-tight">
              {value}
            </AppCardValue>
          </div>
        </>
      )}

      {/* ============================== */}
      {/* 2. HORIZONTAL LAYOUT (IMAGE 2) */}
      {/* ============================== */}
      {isHorizontal && (
        <>
          <div className="flex flex-col gap-1">
            <AppCardLabel
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
                variant === 'destructive' ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {label}
            </AppCardLabel>
            
            <AppCardValue className="text-2xl font-extrabold">
              {value}
            </AppCardValue>
          </div>

          <AppCardIcon
            className={cn(
              "ml-auto transition-colors",
              variant === 'destructive' ? "bg-destructive/20 text-destructive" : "bg-primary/10 text-primary"
            )}
          >
            {icon}
          </AppCardIcon>
        </>
      )}
    </AppCard>
  );
}