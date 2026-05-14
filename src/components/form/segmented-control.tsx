import { cn } from "@/lib/utils";
import { Controller, useFormContext, type FieldError } from "react-hook-form";
import { Button } from "../app-ui/button";
import React from "react";

interface SegmentedControlOption {
    label: string;
    value: string;
}

interface SegmentedControlProps {
    name: string;
    label: string;
    options: SegmentedControlOption[]
    error?: FieldError;
    className?: string;
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(({ name, label, options, error, className, ...props }, ref) => {
    const { control } = useFormContext();

    return(<>
        <div className={cn("flex flex-col space-y-2 w-full ", className)}>
            <label className="text-sm font-medium leading-none text-foreground/90 tracking-wider transition-colors group-focus-within:text-primary">{label}</label>

            <Controller
                name={name}
                control={control}
                render={({field}) => {
                    return <div ref={ref} className="inline-flex p-1 bg-muted-foreground/10 border border-border/50 rounded-sm w-full">
                        {options.map((option) => {
                            const isActive = field.value === option.value;
                            return(
                            <Button
                                key={option.value}
                                type="button"
                                onClick={() => field.onChange(option.value)}
                                variant={isActive ? "segmentedActive" : "segmentedInactive"}
                                size="sm"
                                className="w-full rounded-sm text-sm"
                                {...props}
                            >

                                {option.label}
                            </Button>)
                        })} 
                    </div>
                }}
            />

        {error?.message && (<span className="text-[12px] font-medium text-destructive mt-1 italic" role="alert">
            {error.message}
        </span>)}
        </div>
    </>)
})

SegmentedControl.displayName = 'SegmentedControl';