import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { api } from '@/lib/api-client';
import { type MutationConfig } from '@/lib/react-query';
import type { Category } from '@/types/api';
import { getCategoriesQueryOptions } from './get-categories';
import { API_CONSTS } from '@/config/consts';

export const createCategoryInputSchema = z.object({
  emoji: z.string().optional(),
  name: z.string().min(1, 'Category name is required').max(100, 'Name is too long'),
  code: z.string().min(1, 'Category code is required').max(20, 'Code is too long'),
  departmentId: z.string().min(1,'Please select a department'),
  description: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;

export const createCategory = ({
  data,
}: {
  data: CreateCategoryInput;
}): Promise<Category> => {
  const payload = {
    ...data,
    departmentId: Number(data.departmentId)
  }
  return api.post(API_CONSTS.CATEGORY.BASE.ENDPOINT, payload);
};

type UseCreateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof createCategory>;
};

export const useCreateCategory = ({
  mutationConfig,
}: UseCreateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onMutate: () => {
      const toastId = toast.loading('Creating a new category...');
      return { toastId }
    },
    onSuccess: (...args) => {

      queryClient.invalidateQueries({
        queryKey: getCategoriesQueryOptions().queryKey,
      });
      
      toast.success('Department created successfully!', 
        {
          id: (args[2] as { toastId: string })?.toastId,
        }
      );
      
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCategory,
  });
};