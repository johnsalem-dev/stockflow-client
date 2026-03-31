import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  preTitle?: string;
  children?: ReactNode;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  description, 
  preTitle, 
  children, 
  className 
}: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>
      {/* Left Column: Typography Block */}
      <div className="space-y-1">
        {preTitle && (
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {preTitle}
          </p>
        )}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {/* Right Column: Action Slot */}
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
};