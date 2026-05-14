import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { api } from '@/lib/api-client';
import type { IssuanceFormValues } from '../models/new-issuance';
import type { Issuance } from '@/types/api';
import type { MutationConfig } from '@/lib/react-query';
import { getIssuancesQueryOptions } from '@/features/issuance/api/get-issuances';
import { getItemsQueryOptions } from '@/features/item-catalog/apis/get-items';

export const createIssuance = ({
  data,
}: {
  data: IssuanceFormValues;
}): Promise<Issuance> => {
  const payload = {
    employeeId: data.employee.value,
    sourceType: data.sourceType,
    referenceNo: data.referenceNo,
    remarks: data.remarks,
    items: data.items.map(({ itemId, quantity }) => ({
      itemId,
      quantity,
    })),
  };

  return api.post(`/issuances`, payload);
};

type UseCreateIssuanceOptions = {
  mutationConfig?: MutationConfig<typeof createIssuance>;
};

export const useCreateIssuance = ({
  mutationConfig,
}: UseCreateIssuanceOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getIssuancesQueryOptions().queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getItemsQueryOptions().queryKey,
      });

      toast.success('Items issued successfully!');
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createIssuance,
  });
};