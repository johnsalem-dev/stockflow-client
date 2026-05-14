import { Form } from "@/components/form/form"
import { createItemSchema, type CreateItemFormValues } from "../models/add-item"
import { Input } from "@/components/form/input"
import { Archive, BellRing, ClipboardCheck, FileText, Lock, SaveIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Select } from "@/components/form/select"
import { useCategories } from "@/features/master-data/apis/category/get-categories"
import { useEffect, useMemo } from "react"
import { RangeSlider } from "@/components/form/range-slider"
import { Textarea } from "@/components/form/textarea"
import { Button } from "@/components/app-ui/button"
import debouncePromise from 'debounce-promise';
import { AsyncCreatableField } from "@/components/form/async-creatable-select"
import {getUomsQueryOptions } from "../api/get-search-uom"
import { useCreateUom } from "../api/create-uom"
import { useCreateItem } from "../api/create-item"
import { useNavigate } from "react-router"
import paths from "@/config/paths"
import { useQueryClient } from "@tanstack/react-query"
import { DEBOUNCE_WAIT } from "@/config/consts"



const AddItemForm = () => {
    const { data: categories, isLoading } = useCategories()
    const { mutateAsync: mutateAsyncUom } = useCreateUom();
    const { mutate } = useCreateItem();
    const queryClient = useQueryClient()
    const nagivate = useNavigate();
    const nagivateBackToItemCatalog = () => {
        nagivate(paths.itemCatalog.path)
    }


    const loadUomsOptionsDebounced = debouncePromise(async (inputValue: string) => {

            try {
                const data = await queryClient.fetchQuery(getUomsQueryOptions(inputValue))
                return data.map((uom) => ({
                label: uom.name,
                value: uom.id,
                }));
            } catch (error) {
                console.error(error);
                return [];
            }
            }, DEBOUNCE_WAIT);


    const handleSubmit = (payload: CreateItemFormValues) => {
        mutate({ data: payload })
        nagivateBackToItemCatalog()
    }
    
    const handleCancel = () => {
        nagivateBackToItemCatalog()
    }

    const categoriesOptions = useMemo(() => {
        if (!categories) return [{ label: 'Select Category', value: '' }]

        return [
            { label: 'Select Category', value: '' },
            ...categories.map(cat => ({
                label: cat.name,
                value: cat.id,
                code: cat.code
            }))
        ]
    }, [categories])

    return (
        <>
            <Form<CreateItemFormValues, typeof createItemSchema>
                onSubmit={handleSubmit}
                schema={createItemSchema}
                options={{
                    defaultValues: {
                        name: '',
                        sku: '',
                        description: '',
                        // uom: { label: 'Unit of measure', value: ''},
                        minThreshold: 10,
                        categoryId: ''
                    }
                }}
            >
                {({ register, formState, watch, setValue }) => {
                    const selectedCategoryId = watch('categoryId');

                    const handleCreateUom = async (inputValue: string) => {
                        try{
                           const payload = { data: { name: inputValue } };
                           const newUom = await mutateAsyncUom(payload)
                           const newOption = { label: newUom.name, value: newUom.id}
                           setValue('uom', newOption)
                        } catch(error) {
                                console.error(error)
                        }
                    };


                    useEffect(() => {
                        if (selectedCategoryId && categories) {
                            const selectedCat = categories.find(cat => String(cat.id) === String(selectedCategoryId));
                            
                            if (selectedCat) {
                                const year = new Date().getFullYear();
                                const generatedSku = `${selectedCat.code}-${year}-XXX`;
                                
                                setValue('sku', generatedSku, {
                                    shouldValidate: true,
                                    shouldDirty: true
                                });
                            }
                        } else {
                            setValue('sku', '');
                        }
                    }, [selectedCategoryId, categories, setValue]);
                    
                    return(
                    <div className="flex flex-col gap-12">
                        {/* 1 - Item Details Section */}
                        <div className="bg-muted/50 rounded-sm">
                            <div className="p-12 flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <div className={"flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 shrink-0"}>
                                        <Archive className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-medium uppercase">Item Details</h2>
                                </div>
                                <Separator />
                                <Input
                                    label="FULL ITEM NAME"
                                    placeholder="e.g. Coffee Cups"
                                    registration={register('name')}
                                    error={formState.errors.name}
                                    className="bg-background"
                                />
                                <div className="flex flex-col sm:flex-row gap-10">
                                    <div className="w-full">
                                    <Input
                                        label="SKU / ITEM CODE"
                                        placeholder="e.g. OPS-2026-001"
                                        registration={register('sku')}
                                        error={formState.errors.sku}
                                        className="bg-background"
                                        icon={<Lock size={18}/>}
                                        disabled
                                        iconPosition="right"
                                        />
                                    <p className="text-xs italic text-muted-foreground">'XXX' will be generated on the backend</p>
                                    </div>
                                    <Select
                                        label="Categories"
                                        registration={register('categoryId')}
                                        isLoading={isLoading}
                                        error={formState.errors.categoryId}
                                        options={categoriesOptions}
                                        className="bg-background"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* 2 - STOCK RULES SECTION */}
                        <div className="bg-muted/50 rounded-sm"> 
                            <div className="p-12 flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <div className={"flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/40 shrink-0"}>
                                        <ClipboardCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-xl font-medium uppercase">Stock Configuration</h2>
                                </div>
                                <Separator />
                            <div className="flex flex-col sm:flex-row gap-10">
                                <AsyncCreatableField 
                                  label="UNIT OF MEASURE (UOM)"
                                  placeholder="e.g. Carton(24pcs)"
                                  name={"uom"}
                                  loadOptions={loadUomsOptionsDebounced}
                                  handleCreate={handleCreateUom}
                                  error={formState.errors.uom}
                                  className="bg-background"
                                  />
                            </div>
                            <RangeSlider
                                name="minThreshold"
                                label="MINIMUM STOCK THRESHOLD"
                                description="Triggers an automated replenishment alert when stock dips below this point."
                                icon={<BellRing size={16} />}
                                className="bg-background!"
                            />
                            </div>
                        </div>
                        <div className="bg-muted/50 rounded-sm"> 
                            <div className="p-12 flex flex-col gap-4">
                                <div className="flex gap-2">
                                    <div className={"flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/40 shrink-0"}>
                                        <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h2 className="text-xl font-medium uppercase">Technical Specifications</h2>
                                </div>
                                <Separator />
                                <Textarea
                                    label="ITEM DESCRIPTION"
                                    placeholder="Enter detailed specifications, manufacturer notes, or storage requirements..."
                                    registration={register('description')}
                                    error={formState.errors.description}
                                    rows={4}
                                    className="bg-background"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 justify-end items-center">
                            <Button variant={"outline"} size={"lg"} onClick={handleCancel}>Cancel</Button>
                            <Button size={"lg"} type="submit"><SaveIcon size={20} className="mr-2"/> Save Item </Button>
                        </div>
                    </div>
                )}}

            </Form>
        </>
    )
}

export default AddItemForm