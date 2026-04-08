import { Form } from "@/components/form/form";
import { categorySchema, type CategoryFormValues } from "../models/add-category";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { Button } from "@/components/app-ui/button";
import { Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EmojiPicker, { EmojiStyle, Theme, type EmojiClickData } from 'emoji-picker-react';
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/theme-provider";
import { useDepartments } from "../apis/departments/get-departments";
import { useMemo } from "react";
import { useCreateCategory } from "../apis/category/create-category";

export const CreateCategoryForm = ({ onClose }: { onClose?: () => void }) => {
  const { theme } = useTheme();
  const { data: departments, isLoading} = useDepartments();
  const { mutate } = useCreateCategory({ mutationConfig: { onSuccess: () => close()} });

  const pickerTheme = theme === "dark" ? Theme.DARK : Theme.LIGHT;
  const handleSubmit = (data: CategoryFormValues) => {
    mutate({data})
    onClose?.();
  };

  const departmentOptions = useMemo(() => {
    if (!departments) return [{ label: 'Select Department', value: '' }];

    return [
      { label: 'Select Department', value: '' },
      ...departments.map((dept) => ({
        label: dept.name,   
        value: dept.id, 
      })),
    ];
  }, [departments]);

  return (
    <Form<CategoryFormValues, typeof categorySchema>
      onSubmit={handleSubmit}
      schema={categorySchema}
      options={{
        defaultValues: {
          emoji: '📦', // Default emoji to match screenshot aesthetic
          name: '',
          code: '',
          departmentId: '',
          description: '',
        }
      }}
    >
      {({ register, formState, control }) => (
        <div className="space-y-4">
          {/* Row 1: Emoji (1 col) and Name (3 cols) */}
          <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 group">
            {/* LABEL: Using our 'Industrial' theme-aware style */}
            <label className="block text-[11px] font-black text-muted-foreground/80 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-primary">
              Emoji
            </label>
            
            <Controller
              control={control}
              name="emoji"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        /* BASE: Swapped #F1F3F6 for bg-muted/50 and added a subtle border */
                        "flex h-11 w-full items-center justify-center rounded-md border border-input bg-muted/50 text-2xl transition-all",
                        /* HOVER & FOCUS: Using semantic accent and ring variables */
                        "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        /* ERROR: Using our semantic destructive variable */
                        formState.errors.emoji && "ring-2 ring-destructive border-destructive"
                      )}
                    >
                      {field.value || "📦"}
                    </button>
                  </PopoverTrigger>
                  
                  {/* POPOVER: Added border-border and bg-popover for dark mode visibility */}
                  <PopoverContent 
                    className="w-full p-0 border border-border bg-popover shadow-xl" 
                    side="bottom" 
                    align="start"
                  >
                    <EmojiPicker
                      onEmojiClick={(emojiData: EmojiClickData) => {
                        field.onChange(emojiData.emoji);
                      }}
                      theme={pickerTheme}
                      autoFocusSearch={true}
                      emojiStyle={EmojiStyle.APPLE}
                      width="300px"
                      height="400px"
                      lazyLoadEmojis={true}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            
            {/* ERROR MESSAGE: Consistent with our other form primitives */}
            {formState.errors.emoji && (
              <span className="text-[11px] font-bold text-destructive uppercase tracking-tight italic mt-1 block" role="alert">
                {formState.errors.emoji.message}
              </span>
            )}
          </div>
            <div className="col-span-3">
              <Input
                label="CATEGORY NAME"
                placeholder="e.g., Furniture"
                registration={register('name')}
                error={formState.errors.name}
              />
            </div>
          </div>

          {/* Row 2: Code and Parent Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="CATEGORY CODE"
              placeholder="e.g., CAT-FUR"
              registration={register('code')}
              error={formState.errors.code}
            />
            <Select
              label="DEPARTMENT"
              registration={register('departmentId')}
              error={formState.errors.departmentId}
              isLoading={isLoading}
              options={departmentOptions}
            />
          </div>

          {/* Row 3: Description */}
          <Textarea
            label="DESCRIPTION"
            placeholder="Enter high-level description of this category and its scope..."
            registration={register('description')}
            error={formState.errors.description}
            rows={3}
          />

          {/* Footer Area */}
          <div className="flex justify-end items-center gap-4 pt-4 mt-6 border-t border-border bg-muted/30 -mx-6 -mb-6 px-6 pb-6">
            <Button
              type="submit"
              variant="primary"
            >
              Save Category
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};