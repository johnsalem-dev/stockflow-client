import { forwardRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "../app-ui/button";
import { ListCheck, Plus } from "lucide-react";
import { Separator } from "../ui/separator";

interface LineItemFieldArrayProps {
    name: string;
    title: string;
    addButtonLabel?: string
    renderRow: (index: number, remove: (index: number) => void, name: string) => React.ReactNode;
    headerLabels: string[];
    gridTemplate: string;
}



export const LineItemArray = forwardRef<HTMLDivElement, LineItemFieldArrayProps>(({ name, title, renderRow, addButtonLabel, headerLabels, gridTemplate }, ref) => {
    const { control } = useFormContext();
    const { fields, remove, append } = useFieldArray({ control, name})

    return (
        <>
        <div ref={ref} className="w-full space-y-4 group/list">
            <div className="flex justify-between items-center">
            <div className="flex gap-2">
                 <div className={"flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 shrink-0"}>
                    <ListCheck   className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                 </div>
            <h3 className="text-xl font-medium uppercase">{title}</h3>
            </div>
            <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => append({})}
                className="text-primary font-bold uppercase tracking-wider"
            >
                <Plus size={14} className="mr-1" /> {addButtonLabel}
            </Button>
            </div>
            <Separator />
            <div className={`grid ${gridTemplate} px-4 gap-4 mb-2`}>
                {
                    headerLabels.map((headerLabel) => {
                        return(
                            <span key={headerLabel} className="text-[11px] font-black text-muted-foreground/90 uppercase tracking-widest">
                            {headerLabel}
                            </span>
                        )
                    })
                }
            </div>
            <div className="flex flex-col gap-4">
                {fields.map((field, index) => {
                    return (
                        <div key={field.id} className={`grid ${gridTemplate} items-center gap-4 p-4 bg-card text-card-foreground border border-border rounded-xl shadow-sm`}>
                            {renderRow(index, remove, name)}
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
})

LineItemArray.displayName = "LineItemArray";