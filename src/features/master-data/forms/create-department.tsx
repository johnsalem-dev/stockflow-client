import { Form } from "@/components/form/form";
import { departmentSchema, type DepartmentFormValues } from "../models/add-department";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Textarea } from "@/components/form/textarea";
import { Button } from "@/components/app-ui/button";
import { useCreateDepartment } from "../apis/departments/create-department";


export const CreateDepartmentForm = ({ onClose }: { onClose: () => void}) => {
  const { mutate, isPending} = useCreateDepartment({ mutationConfig: { onSuccess: () => onClose()} });
  const handleSubmit = (data: DepartmentFormValues) => {
    const payload = {...data, headId: data.headId === "" ? null : data.headId}
    mutate({data: payload})
  };

  return (
    <Form<DepartmentFormValues, typeof departmentSchema>
      onSubmit={handleSubmit}
      schema={departmentSchema}
    >
      {({ register, formState }) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="DEPARTMENT NAME"
              placeholder="e.g. Information Technology"
              registration={register('name')}
              error={formState.errors.name}
              className="uppercase text-xs font-bold text-slate-500"
            />
            <Input
              label="DEPARTMENT CODE"
              placeholder="e.g. IT-001"
              registration={register('code')}
              error={formState.errors.code}
              className="uppercase text-xs font-bold text-slate-500"
            />
          </div>


          <Select
            label="HEAD OF DEPARTMENT"
            registration={register('headId')}
            error={formState.errors.headId}
            options={[
              { label: 'Select Head of Department', value: '' },
              { label: 'None', value: '' },
              { label: 'John Doe', value: 1 },
              { label: 'Jane Smith', value: 2 },
            ]}
          />


          <Textarea
            label="DESCRIPTION"
            placeholder="Briefly describe the department's core responsibilities and scope..."
            registration={register('description')}
            error={formState.errors.description}
            rows={4}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant={"primary"}
              disabled={isPending}
              isLoading={isPending}
            >
              Create Department
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};