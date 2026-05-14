import * as React from 'react';
import { useFormContext, Controller, type FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface RangeSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string;
  label: string;
  error?: FieldError;
  icon?: React.ReactNode;
  unit?: string;
  description?: string;
  min?: number;
  max?: number;
}

export const RangeSlider = React.forwardRef<HTMLInputElement, RangeSliderProps>(
  ({ name, label, error, icon, unit = '', description, min = 0, max = 100, className, ...props }, ref) => {

    const { control } = useFormContext();

    return (
      <div className="flex flex-col space-y-3 w-full mb-6">
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange, ...fieldProps } }) => {

            const numericValue = typeof value === 'number' ? value : min;
            
            const percentage = Math.round(((numericValue - min) / (max - min)) * 100);

            return (
              <>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={name}
                      className="text-sm font-medium leading-none text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {label}
                    </label>
                    {icon && <span className="text-destructive">{icon}</span>}
                  </div>
                  
                  <div className="bg-primary/10 border border-primary/20 text-primary text-[12px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                    {numericValue} {unit}
                  </div>
                </div>

                <input
                  type="range"
                  id={name}
                  min={min}
                  max={max}
                  className={cn(
                    /* REMOVED 'bg-muted/50' from here to let the inline style breathe */
                    "w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "",
                    className
                  )}
                  style={{
                    /* We use a 'Hard Stop' gradient.
                       1. The area from 0% to the percentage gets the Primary color.
                       2. The area from the percentage to 100% gets the Muted background color.
                    */
                       background: `linear-gradient(to right, 
                       var(--primary) 0%, 
                       var(--primary) ${percentage}%, 
                       transparent ${percentage}%, 
                       transparent 100%
                     )`
                  }}
                  {...fieldProps}
                  {...props}
                  ref={ref}
                  value={numericValue}
                  onChange={(e) => onChange(Number(e.target.value))}
                />
              </>
            );
          }}
        />

        {/* Footer Area: Min/Max indicators */}
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          <span>Min: {min}</span>
          <span>Max: {max}</span>
        </div>

        {/* Help Text / Description */}
        {description && (
          <p className="text-[12px] text-muted-foreground italic leading-tight">
            {description}
          </p>
        )}

        {/* Error Message */}
        {error?.message && (
          <span className="text-[11px] font-bold text-destructive uppercase tracking-tight italic mt-1" role="alert">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

RangeSlider.displayName = 'RangeSlider';