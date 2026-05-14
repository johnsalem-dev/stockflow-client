import * as React from 'react';
import { type UseFormRegisterReturn, type FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react'; // Adding a custom arrow since you used appearance-none
import type { Option } from '@/types/form';


interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  registration: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  isLoading?: Boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, registration, error, className, isLoading, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2 w-full mb-4 group">
        <label
          htmlFor={registration.name}
          className="text-sm font-medium leading-none text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>

        <div className="relative">
          <select
            id={registration.name}
            className={cn(
              /* Swapped #F1F3F6 for bg-muted/50. It gives that 'filled' look in light mode 
                 and a subtle deep-gray in dark mode. */
              "flex h-11 w-full rounded-md border border-input px-3 py-2 text-sm",
              "appearance-none ring-offset-background transition-all",
              /* FOCUS: Using our brand ring and shifting background slightly */
              "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 focus:bg-background",
              "disabled:cursor-not-allowed disabled:opacity-50",
              /* ERROR: Using our destructive variable */
              error && "ring-2 ring-destructive border-destructive",
              className
            )}
            ref={ref}
            {...registration}
            {...props}
          >
            {isLoading ? <option>Loading...</option> : options.map(({ label, value, }) => (
              <option 
                key={String(value)} 
                value={value} 
                className="bg-background text-foreground"
              >
                {label}
              </option>
            ))}
          </select>

          {/* CUSTOM ARROW: Since you used appearance-none, we need an indicator! */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* ERROR MESSAGE: Swapped red-500 for destructive */}
        {error?.message && (
          <span className="text-[11px] font-bold text-destructive uppercase tracking-tight italic" role="alert">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';