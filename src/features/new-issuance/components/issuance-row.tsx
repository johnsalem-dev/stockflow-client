import { useFormContext } from "react-hook-form";
import { Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/app-ui/button";
import { AsyncCreatableField } from "@/components/form/async-creatable-select";
import { Badge } from "@/components/ui/badge";
import debouncePromise from "debounce-promise";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { getItemsQueryOptions } from "@/features/item-catalog/apis/get-items";
import { DEBOUNCE_WAIT } from "@/config/consts";
import { Input } from "@/components/form/input";

interface IssuanceRowProps {
    index: number;
    remove: (i: number) => void;
    name: string;
}


export const IssuanceRow = ({ index, remove, name }: IssuanceRowProps) => {
  const { register, setValue, watch, formState } = useFormContext();
  const fieldPath = `${name}.${index}`;
  const queryClient = useQueryClient();
  const itemValue = watch(fieldPath);
  const qty = watch(`${fieldPath}.quantity`) || 0;
  const balance = itemValue?.currentBalance || 0;
  const isOverStock = qty > balance;

  const rowErrors = (formState.errors as any)?.[name]?.[index];

  const loadItemOptionsDebounced = debouncePromise(async (inputValue: string) => {

    try{
        const data = await queryClient.fetchQuery(getItemsQueryOptions({ search: inputValue }))
        return data.data.map((item) => ({
            label: item.item_name,
            value: item.item_id,
            uom: item.uom, 
            currentBalance: item.current_balance,
            sku: item.item_sku

        }))

    } catch(error) {
        console.error(error);
        return []
    }
}, DEBOUNCE_WAIT)

  return (
    <>
      {/* 1. Item Selection */}
      <div className="flex flex-col">
        <AsyncCreatableField
          name={`${fieldPath}._ui_item`}
          label=""
          placeholder="Search inventory..."
          loadOptions={loadItemOptionsDebounced}
          onValueChange={(opt: any) => {
            if (opt) {
              setValue(`${fieldPath}.itemId`, opt.value);
              setValue(`${fieldPath}.uom`, opt.uom);
              setValue(`${fieldPath}.currentBalance`, opt.currentBalance);
            }
          }}
          error={rowErrors?.itemId}
        />
      </div>

      {/* 2. UOM */}
      <div className="flex items-center justify-center">
        <Badge variant="secondary" className="uppercase">{itemValue?.uom || '---'}</Badge>
      </div>

      {/* 3. Available Stock */}
      <div className="flex flex-col items-center justify-center">
        <span className={cn(
          "text-sm font-bold",
          balance <= 0 ? "text-destructive" : "text-slate-600"
        )}>
          {balance}
        </span>
        <span className="text-[10px] text-slate-400 uppercase font-black">Available</span>
      </div>

      {/* 4. Quantity Input */}
      <div className="flex flex-col gap-1">
        <div className="relative">
        <Input
                                label=""
                                type="number"
                                placeholder="e.g. 10"
                                registration={register(`${fieldPath}.quantity`, { valueAsNumber: true })}
                                className="bg-background"
                            /> 
        {rowErrors?.quantity?.message && (
             <span className="text-[10px] font-bold text-destructive uppercase italic">
                {rowErrors.quantity.message}
            </span>
        )}
          {isOverStock && (
            <AlertCircle className="absolute right-3 top-5 h-5 w-5 text-destructive" />
          )}
        </div>
        {isOverStock && (
          <span className="text-[10px] text-destructive font-bold uppercase italic">
            Insufficient Stock
          </span>
        )}
      </div>

      {/* 5. Action */}
      <div className="flex justify-end">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => remove(index)}
          className="hover:text-red-500 text-slate-300"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </>
  );
};