import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';
import type { UomMinimal } from '@/types/api';

import { getUomsQueryOptions } from './get-search-uom';
import type { CreateUomInput } from '../models/add-uom';
import { API_CONSTS } from '@/config/consts';



export const createUom = ({
  data,
}: {
  data: CreateUomInput;
}): Promise<UomMinimal> => {
  return api.post(API_CONSTS.UOM.BASE.ENDPOINT, data);
};

type UseCreateUomOptions = {
  mutationConfig?: MutationConfig<typeof createUom>;
};

export const useCreateUom = ({
  mutationConfig,
}: UseCreateUomOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {

      queryClient.invalidateQueries({
        queryKey: getUomsQueryOptions().queryKey,
      });

      toast.success('Unit created successfully!');
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createUom,
  });
};