import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';
import type { Employee } from '@/types/api';
import { getEmployeesQueryOptions } from './get-employees';
import { API_CONSTS } from '@/config/consts';

export const createEmployeeInputSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  employeeId: z.string().min(1, 'Corporate ID is required'),
  departmentId: z.number().int().positive('Please select a department'),
  designation: z.string().min(1, 'Designation is required'),
  email: z.email({ message: "Invalid email format" }).endsWith('@devsinc.com', "Email must be a valid @devsinc.com address"),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeInputSchema>;


export const createEmployee = ({
  data,
}: {
  data: CreateEmployeeInput;
}): Promise<Employee> => {
  return api.post(API_CONSTS.EMPLOYEE.BASE.ENDPOINT, data);
};

type UseCreateEmployeeOptions = {
  mutationConfig?: MutationConfig<typeof createEmployee>;
};

export const useCreateEmployee = ({
  mutationConfig,
}: UseCreateEmployeeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onMutate: () =>{
        const toastId = toast.loading('Creating a new department...');
        return { toastId }
      },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmployeesQueryOptions().queryKey,
      });
      
      toast.success('Department created successfully!', 
        {
          id: (args[2] as { toastId: string })?.toastId,
        }
      );
      
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEmployee,
  });
};