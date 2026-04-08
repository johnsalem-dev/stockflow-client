import { Form } from "@/components/form/form";
import { employeeSchema, type EmployeeFormValues } from "../models/add-employee";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Button } from "@/components/app-ui/button";
import { useDepartments } from "../apis/departments/get-departments";
import { useMemo } from "react";
import { useCreateEmployee } from "../apis/employee/create-employee";

export const CreateEmployeeForm = ({ onClose }: { onClose?: () => void }) => {
  const { data: departments, isLoading} = useDepartments();
  const { mutate } = useCreateEmployee({mutationConfig: { onSuccess: onClose}})
  const handleSubmit = (data: EmployeeFormValues) => {
    const payload = {
      ...data,
      departmentId: Number(data.departmentId)
    }
    mutate({data: payload})
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
    <Form<EmployeeFormValues, typeof employeeSchema>
      onSubmit={handleSubmit}
      schema={employeeSchema}
      options={{
        defaultValues: {
          fullName: '',
          employeeId: '',
          departmentId: '',
          designation: '',
          email: '',
        }
      }}
    >
      {({ register, formState }) => (
        <div className="space-y-5">

          <Input
            label="FULL NAME"
            placeholder="e.g. Eleanor Vance"
            registration={register('fullName')}
            error={formState.errors.fullName}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="CORPORATE EMPLOYEE ID"
              placeholder="EMP-1234"
              registration={register('employeeId')}
              error={formState.errors.employeeId}
            />
            <Select
              label="DEPARTMENT"
              registration={register('departmentId')}
              error={formState.errors.departmentId}
              isLoading={isLoading}
              options={departmentOptions}
            />
          </div>

          <Input
            label="DESIGNATION"
            placeholder="e.g. Senior Systems Architect"
            registration={register('designation')}
            error={formState.errors.designation}
          />

          <Input
            label="CORPORATE EMAIL"
            type="email"
            placeholder="name@devsinc.com"
            registration={register('email')}
            error={formState.errors.email}
          />

          {/* Information Banner */}
          {/* <div className="flex items-start gap-3 p-4 mt-2 bg-[#F0F5FF] border border-blue-100 rounded-md">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[13px] leading-relaxed text-blue-700 font-medium">
              Registration will trigger an automated onboarding sequence. An
              activation link will be sent to the corporate email provided above.
            </p>
          </div> */}

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
            >
              Register Employee
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};