import { Button } from "@/components/app-ui/button";
import { AsyncCreatableField } from "@/components/form/async-creatable-select";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import debouncePromise from "debounce-promise";
import { useQueryClient } from "@tanstack/react-query";
import { getItemsQueryOptions } from "@/features/item-catalog/apis/get-items";
import { DEBOUNCE_WAIT } from "@/config/consts";
import { Input } from "@/components/form/input";

interface InwardRowProps {
    index: number;
    remove: (i: number) => void;
    name: string;
}

export const InwardRow = ({ index, remove, name }: InwardRowProps) => {
    const { register, setValue, formState, watch } = useFormContext();
    const queryClient = useQueryClient();
    const fieldPath = `${name}.${index}`
    const currentBalance = watch(`${fieldPath}.currentBalance`);
    const uom = watch(`${fieldPath}.uom`);
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
    return(<>
        <AsyncCreatableField
            name={`${fieldPath}._ui_item`}
            label=""
            placeholder="Search items.."
            loadOptions={loadItemOptionsDebounced}
            onValueChange={(selectedOption: any) => {
            if (selectedOption) {
            //   setValue(`${fieldPath}.label`, selectedOption.label)
            //   setValue(`${fieldPath}.value`, selectedOption.value)
              setValue(`${fieldPath}.itemId`, selectedOption.value);
              setValue(`${fieldPath}.uom`, selectedOption.uom);
              setValue(`${fieldPath}.currentBalance`, selectedOption.currentBalance);
            }
            }}
            error={rowErrors?.itemId}
        />
        <div className="flex flex-col">
            <p className="text-sm font-medium text-slate-700">
            {uom ? <Badge variant={"default"}>{uom}</Badge> : "---"}
            </p>
        </div>
        <span className="text-[10px] text-slate-400 font-mono px-2">{currentBalance}</span>

        <div className="flex flex-col">
        <Input
         label=""
         placeholder="e.g. 10"
          name={`${fieldPath}.quantity`}
          type="number"
          registration={register(`${fieldPath}.quantity`, { valueAsNumber: true })}
        />
        {rowErrors?.quantity?.message && (
             <span className="text-[10px] font-bold text-destructive uppercase italic">
                {rowErrors.quantity.message}
            </span>
        )}
      </div>
        <div className="flex flex-col">
        <Input
         label=""
         placeholder="e.g. 10"
          name={`${fieldPath}.rate`}
          type="number"
          registration={register(`${fieldPath}.rate`, { valueAsNumber: true })}
        />
        {rowErrors?.rate?.message && (
             <span className="text-[10px] font-bold text-destructive uppercase italic">
                {rowErrors.rate.message}
            </span>
        )}
      </div>

        <div className="flex justify-end">
            <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => remove(index)}
                className="text-slate-400 hover:text-red-500"
                >
                <Trash2 size={18} />
            </Button>
        </div>


    </>)
}