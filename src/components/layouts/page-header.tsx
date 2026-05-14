import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { Location } from 'react-router';

interface PageHeaderProps {
  title: string;
  description?: string;
  preTitle?: string;
  route?: Location;
  children?: ReactNode;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  description, 
  preTitle, 
  route,
  children, 
  className 
}: PageHeaderProps) => {
 
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>

      <div className="space-y-1">
        {route &&  constructBreadcrumbedRouter(route)}
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


      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
};

const constructBreadcrumbedRouter = (loc: Location) => {
  const path = loc.pathname;
  if (!path || path === '/') return null;

  const segments = path.split('/').filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-1">
      {segments.map((segment, i) => (
        <div key={segment} className="flex items-center gap-2">
          <span className={cn(
            i === segments.length - 1 
              ? "text-blue-600"
              : "text-muted-foreground/80"
          )}>
            {decodeURIComponent(segment).replace(/-/g, ' ')}
          </span>
          {i < segments.length - 1 && (
            <span className="text-muted-foreground/30 font-light">/</span>
          )}
        </div>
      ))}
    </div>
  );
};