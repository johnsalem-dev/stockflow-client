import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient, type MutationFunctionContext } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod";
import { getDepartmentsQueryOptions } from "./get-departments";
import type { Department } from "@/types/api";

export const createDepartmentInputSchema = z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, 'Name must be 50 characters or less'),
    code: z
      .string()
      .min(1, 'Code is required')
      .max(10, 'Code must be 10 characters or less'),
    description: z.string().optional(),
    headId: z.union([
        z.coerce.number().int(),
        z.string(),
        z.null(),
        z.undefined()
      ]).optional(),
  });


  export type CreateDepartmentInputSchema = z.infer<typeof createDepartmentInputSchema>;

  export const createDepartment = ({ data }: { data: CreateDepartmentInputSchema }): Promise<Department> => {
        return api.post(`/departments`, data);
  };

  type UseCreateDepartmentOptions = {
    mutationConfig? : MutationConfig<typeof createDepartment>;
  } 

  export const useCreateDepartment = ({
    mutationConfig,
  }: UseCreateDepartmentOptions = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig} = mutationConfig || {};

    return useMutation({
        onMutate: () =>{
          const toastId = toast.loading('Creating a new department...');
          return { toastId }
        },
        onSuccess: (data, variables, onMutateResult , context) => {
            queryClient.invalidateQueries({
                queryKey: getDepartmentsQueryOptions().queryKey,
              })
            toast.success('Department created successfully!', 
              {
                id: (onMutateResult as { toastId: string })?.toastId,
              }
            );
            
            onSuccess?.(data, variables, onMutateResult, context);
        },

        ...restConfig,
        mutationFn: createDepartment

    })
 }