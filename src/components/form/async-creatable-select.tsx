import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { cn } from '@/lib/utils';
import type { Option } from '@/types/form';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';

interface AsyncCreatableProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  loadOptions: (inputValue: string) => Promise<Option[]>;
  handleCreate?: (inputValue: string) => void;
  placeholder?: string;
  isMulti?: boolean;
  isLoading?: boolean;
  error?: { message?: string };
  className?: string;
  onValueChange?: (option: Option | null) => void;
}

export const AsyncCreatableField = <T extends FieldValues>({
  label,
  name,
  loadOptions,
  handleCreate,
  placeholder = "Select or create...",
  isMulti = false,
  isLoading,
  error,
  className,
  onValueChange
}: AsyncCreatableProps<T>) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col space-y-2 w-full mb-4 group">
      <label className="text-sm font-medium leading-none text-foreground/90">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange ,value, ref } }) => (
          <AsyncCreatableSelect
            ref={ref}
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            isMulti={isMulti}
            isLoading={isLoading}
            placeholder={placeholder}
            // Mapping value to ensure it matches react-select's expected object format
            value={isMulti 
                ? (value as Option[]) 
                : (value ? { label: value.label, value: value.value } : null)
            }
            onChange={(val) => {
                // If multi, send array of objects; if single, send just the value or object
                const newValue = isMulti 
                    ? (val as Option[]) 
                    : (val as Option);
                    onChange(newValue);
                    if (onValueChange) onValueChange(newValue as Option);
            }}
            onCreateOption={handleCreate}
            /* Styling to match your original component */
            unstyled
            classNames={{
              control: ({ isFocused }) => cn(
                "flex min-h-11 w-full rounded-md border border-input bg-muted/50 px-2 py-3 text-sm transition-all",
                isFocused && "ring-1 ring-ring ring-offset-1 bg-background border-input",
                error && "ring-2 ring-destructive border-destructive",
                className
              ),
              placeholder: () => "text-muted-foreground ml-2",
              input: () => "text-foreground ml-2",
              valueContainer: () => "gap-1",
              singleValue: () => "text-foreground ml-2",
              multiValue: () => "bg-accent rounded items-center py-0.5 pl-2 pr-1 gap-1.5",
              multiValueLabel: () => "text-xs font-medium",
              multiValueRemove: () => "hover:bg-destructive/20 hover:text-destructive rounded",
              menu: () => "mt-2 border border-input bg-popover text-popover-foreground rounded-md shadow-md overflow-hidden",
              option: ({ isFocused, isSelected }) => cn(
                "px-3 py-2 text-sm cursor-pointer",
                isFocused && "bg-accent text-accent-foreground",
                isSelected && "bg-primary text-primary-foreground"
              ),
              noOptionsMessage: () => "p-4 text-sm text-muted-foreground",
              loadingMessage: () => "p-4 text-sm text-muted-foreground",
            }}
          />
        )}
      />

      {error?.message && (
        <span className="text-[11px] font-bold text-destructive uppercase tracking-tight italic" role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
};