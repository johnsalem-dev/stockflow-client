import { Form } from "@/components/form/form"
import { IssuanceFormSchema, type IssuanceFormValues } from "../models/new-issuance"
import { FileUp, PackageIcon } from "lucide-react"
import { AsyncCreatableField } from "@/components/form/async-creatable-select"
import { SegmentedControl } from "@/components/form/segmented-control"
import { Input } from "@/components/form/input"
import { LineItemArray } from "@/components/form/line-item-field-array"
import { IssuanceRow } from "../components/issuance-row"
import { Button } from "@/components/app-ui/button"
import { useQueryClient } from "@tanstack/react-query"
import debouncePromise from "debounce-promise"
import { getEmployeesQueryOptions } from "@/features/master-data/apis/employee/get-employees"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/form/textarea"
import { useCreateIssuance } from "../api/create-new-issuance"
import { useNavigate } from "react-router"
import paths from "@/config/paths"

export const NewIssuanceForm = () => {
    const queryClient = useQueryClient();
    const { mutate } = useCreateIssuance()
    const navigate = useNavigate();


    const returnToIssuance = () => {
      navigate(paths.issuance.path)
    }

    const handleSubmit = (data: IssuanceFormValues) => {
      mutate({data: data})
      returnToIssuance();
    }

    const loadEmployeeOptionsDeebounced = debouncePromise(async (inputValue: string) => {
        try {
            const data = await queryClient.fetchQuery(getEmployeesQueryOptions({search: inputValue}))
            return data.map((emp) => ({
                label: emp.fullName,
                value: emp.id
            }))
        } catch (error) {
            console.error(error);
            return [];
        }
    })

    return (
    <Form<IssuanceFormValues, typeof IssuanceFormSchema>
      schema={IssuanceFormSchema}
      onSubmit={handleSubmit}
      options={{
        defaultValues: {
          sourceType: "IGP_BOOK",
          items: [{} as any]
        }
      }}
    >
      {({ register, formState }) => {
        return(
        <div className="flex flex-col gap-12">
          
          {/* HEADER SECTION */}
          <div className="bg-muted/50 rounded-sm shadow-sm ">
          <div className="p-12 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                <PackageIcon size={20} className="text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-xl font-medium uppercase">Stock Issuance</h2>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AsyncCreatableField 
                label="Issuing To (Employee)"
                name="employee"
                placeholder="Search employee..."
                loadOptions={loadEmployeeOptionsDeebounced} // Your API call
                error={formState.errors.employee}
                className="bg-background"
              />

              <SegmentedControl
                name="sourceType"
                label="Source Type"
                options={[
                  { label: "Physical (IGP)", value: "IGP_BOOK" },
                  { label: "Digital (Maple)", value: "MAPLE" },
                ]}
              />

              <Input
                label="Reference No / Ticket ID"
                placeholder="e.g. TKT-9920"
                registration={register("referenceNo")}
                error={formState.errors.referenceNo}
                className="bg-background"
              />
            <div className="md:col-span-3">
            <Textarea
                label="Remarks (Optional)"
                placeholder="Reason for issuance..."
                registration={register('remarks')}
                error={formState.errors.remarks}
                rows={4}
                className="bg-background"
                
            />
            </div>
            </div>
            </div>
          </div>

          {/* LINE ITEMS SECTION */}
          <div className="bg-muted/50 rounded-sm shadow-sm ">
          <div className="p-12 flex flex-col gap-4">
            <LineItemArray 
              name="items" 
              title="Items to Issue"
              addButtonLabel="Add Item" 
              headerLabels={["Item Identification", "UOM", "Available", "Qty to Issue", "Action"]}
              gridTemplate="grid-cols-[1.5fr_0.5fr_0.5fr_0.5fr_auto]"
              renderRow={(index, remove, name) => (
                <IssuanceRow 
                  index={index} 
                  remove={remove} 
                  name={name} 
                />
              )} 
            />
          </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" size="lg" onClick={returnToIssuance}>Discard</Button>
            <Button size="lg" type="submit">
              <FileUp size={18} className="mr-2"/> Post Issuance
            </Button>
          </div>
        </div>
      )}}
    </Form>
    )
}