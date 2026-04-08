import * as React from 'react';
import { type UseFormRegisterReturn, type FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils'; // Assuming you have the standard shadcn 'cn' helper

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration: Partial<UseFormRegisterReturn>;
  error?: FieldError;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, registration, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2 w-full mb-4">
        <label
          htmlFor={registration.name}
          className="text-sm font-medium leading-none text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        
        <input
          id={registration.name}
          className={cn(
            "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...registration}
          {...props}
        />

        {/* ERROR MESSAGE: Swapped red-500 for destructive */}
        {error?.message && (
          <span className="text-[12px] font-medium text-destructive mt-1 italic" role="alert">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';