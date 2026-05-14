import { Form } from "@/components/form/form"
import { PurchaseFormSchema, type PurchaseFormValues } from "../models/new-procurement"
import { IdCardIcon, SaveIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { AsyncCreatableField } from "@/components/form/async-creatable-select"
import { getSuppliersQueryOptions } from "@/features/add-item-catalog/api/get-search-suppliers"
import debouncePromise from "debounce-promise"
import { useQueryClient } from "@tanstack/react-query"
import { DEBOUNCE_WAIT } from "@/config/consts"
import { useCreateSupplier } from "@/features/add-item-catalog/api/create-supplier"
import { Input } from "@/components/form/input"
import { SegmentedControl } from "@/components/form/segmented-control"
import { LineItemArray } from "@/components/form/line-item-field-array"
import { InwardRow } from "../components/inward-row"
import { Button } from "@/components/app-ui/button"
import { useCreatePurchase } from "../api/create-new-purchase"
import { useNavigate } from "react-router"
import paths from "@/config/paths"

const NewProcurementForm = () => {
    const { mutateAsync: mutateAsyncSupplier } = useCreateSupplier();
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: mutatePurchase } = useCreatePurchase() 
    const returnToProcurement = () => {
        navigate(paths.procurement.path)
    }

    const loadSuppliersOptionsDebounced = debouncePromise(async (inputValue: string) => {
        try {
            const data = await queryClient.fetchQuery(getSuppliersQueryOptions(inputValue))
            return data.map((supp) => ({
                label: supp.name,
                value: supp.id
            }))
        } catch (error) {
            console.error(error);
            return [];
        }
        }, DEBOUNCE_WAIT)

        const handleSubmit = (payload: PurchaseFormValues) => {
            mutatePurchase({data: payload});
            returnToProcurement()
        }
        const handleCancel = () => {
            returnToProcurement();
        }
    
    return (
        <>
        <Form<PurchaseFormValues, typeof PurchaseFormSchema>
            schema={PurchaseFormSchema}
            onSubmit={handleSubmit}
            options={{
                defaultValues: {
                  sourceType: "IGP_BOOK",
                  items: [{}], // Start with one empty row
                  purchaseDate: new Date(),
                }
              }}
            >

            {({ register, formState, setValue }) => {

                const handleCreateSupplier = async (inputValue: string) => {
                    try{
                        const payload = { data: { name: inputValue } };
                        const newSupplier = await mutateAsyncSupplier(payload);
                        const newOption = { label: newSupplier.name, value: newSupplier.id }
                        setValue('supplier', newOption)
                    } catch(error) {
                        console.error(error)
                    }
                }
                return (
                    <div className="flex flex-col gap-12">
                        <div className="bg-muted/50 rounded-sm shadow-sm">
                            <div className="p-12 flex flex-col gap-4">
                            <div className="flex gap-2">
                                <div className={"flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 shrink-0"}>
                                    <IdCardIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-medium uppercase">Item Details</h2>
                            </div>
                            <Separator />
                            <div className="flex flex-col sm:flex-row gap-10">
                            <div className="w-full">
                                <AsyncCreatableField 
                                    label="Supplier"
                                    placeholder="e.g. Bikiya Industries Pvt Ltd"
                                    name={"supplier"}
                                    loadOptions={loadSuppliersOptionsDebounced}
                                    handleCreate={handleCreateSupplier}
                                    error={formState.errors.supplier}
                                    className="bg-background"
                                    />
                                <p className="text-xs italic text-muted-foreground">'XXX' will be generated on the backend</p>
                            </div>
                            <SegmentedControl
                                name="sourceType"
                                label="Source Type"
                                error={formState.errors.sourceType}
                                options={[
                                { label: "Physical (IGP)", value: "IGP_BOOK" },
                                { label: "Digital (Maple)", value: "MAPLE" },
                                ]}
                            />
                            <Input
                                label="Reference ID"
                                placeholder="Enter IGP or Maple ID"
                                registration={register("referenceNo")}
                                error={formState.errors.referenceNo}
                                className="bg-background"
                            /> 
                            </div>
                            </div>
                        </div>
                        <div className="bg-muted/50 rounded-sm shadow-sm">
                        <div className="p-12 flex flex-col gap-4">
                            <LineItemArray 
                                name="items" 
                                title="Items Reconciliation"
                                addButtonLabel="Add New Item" 
                                headerLabels={["Item Identification", "UOM","Current Balance", "Quantity","Rate",  "Action"]}
                                gridTemplate="grid-cols-[1.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr]"
                                renderRow={ (index, remove, name) => 
                                    <InwardRow index={index} remove={remove} name={name}
                                    />} 
                                />
                        </div>
                        </div>
                        <div className="flex gap-4 justify-end items-center">
                            <Button variant={"outline"} size={"lg"} onClick={handleCancel}>Cancel</Button>
                            <Button size={"lg"} type="submit"><SaveIcon size={20} className="mr-2"/> Save Item </Button>
                        </div>
                    </div>
                )
            }}

        </Form>
        </>
    )
}

export default NewProcurementForm;