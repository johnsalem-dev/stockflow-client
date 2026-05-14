import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';
import type { Item } from '@/types/api';
import type { CreateItemFormValues } from '../models/add-item';
import { getItemsQueryOptions } from '@/features/item-catalog/apis/get-items';
import { API_CONSTS } from '@/config/consts';


export const createItem = ({
  data,
}: {
  data: CreateItemFormValues;
}): Promise<Item> => {
  const { uom, ...rest } = data;
  const payload = {
    ...rest,
    uomId: uom.value,
  };

  return api.post(API_CONSTS.ITEMS.BASE.ENDPOINT, payload);
};


type UseCreateItemOptions = {
  mutationConfig?: MutationConfig<typeof createItem>;
};

export const useCreateItem = ({
  mutationConfig,
}: UseCreateItemOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getItemsQueryOptions().queryKey,
      });

      toast.success('Inventory item created successfully!');
      
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createItem,
  });
};