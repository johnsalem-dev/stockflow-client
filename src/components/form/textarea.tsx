import { cn } from '@/lib/utils';
import * as React from 'react';
import { type UseFormRegisterReturn, type FieldError } from 'react-hook-form';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  registration: Partial<UseFormRegisterReturn>;
  error?: FieldError;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, registration, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2 w-full mb-4">
        <label
          htmlFor={registration.name}
          className="text-sm font-medium leading-none text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <textarea
          id={registration.name}
          className={cn(
            /* BASE: Swapped #F1F3F6 for bg-muted/50. Added border-input for definition. */
            "flex min-h-[120px] w-full rounded-md border border-input px-3 py-2 text-sm",
            "ring-offset-background transition-all placeholder:text-muted-foreground",
            /* FOCUS: Shifts to pure background and shows the brand 'ring' */
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:bg-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            /* ERROR: Dynamic destructive state */
            error && "ring-2 ring-destructive border-destructive",
            className
          )}
          ref={ref}
          {...registration}
          {...props}
        />

        {/* ERROR MESSAGE: Consistent with Select/Input error styling */}
        {error?.message && (
          <span className="text-[11px] font-bold text-destructive uppercase tracking-tight italic" role="alert">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';