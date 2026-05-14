import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FilterTrigger } from "@/components/app-ui/filter-trigger";
import type { Category } from "@/types/api";

interface CategoryDropdownProps {
  categories: Category[];
  currentCategory?: string | null;
  onSelect: (category: number | string) => void;
}

export function CategoryDropdown({
  categories,
  currentCategory,
  onSelect,
}: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: number | string) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* asChild works here because FilterTrigger returns a Shadcn Button, 
          which already handles forwardRef under the hood. */}
      <PopoverTrigger asChild>
        <FilterTrigger
          label="CATEGORY"
          value={currentCategory}
          isActive={!!currentCategory}
        />
      </PopoverTrigger>
      
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {/* "Clear" or "All" option */}
              <CommandItem onSelect={() => handleSelect("")}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    !currentCategory ? "opacity-100" : "opacity-0"
                  )}
                />
                All Categories
              </CommandItem>
              
              {/* Dynamic Categories */}
              {categories.map((cat) => (
                <CommandItem
                  key={cat.id}
                  onSelect={() => handleSelect(cat.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentCategory === cat.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {cat.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}