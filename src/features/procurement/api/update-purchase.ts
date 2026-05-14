import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { api } from '@/lib/api-client';

import { getPurchasesQueryOptions } from './get-purchases';
import type { Purchase } from '@/types/api';
import type { MutationConfig } from '@/lib/react-query';
import { getItemsQueryOptions } from '@/features/item-catalog/apis/get-items';



export const TransactionStatusEnum = z.enum(['PENDING', 'VERIFIED', 'CANCELLED']);
export type TransactionStatus = z.infer<typeof TransactionStatusEnum>;

export const updatePurchaseStatusInputSchema = z.object({
  status: TransactionStatusEnum
});

export type UpdatePurchaseStatusInput = z.infer<typeof updatePurchaseStatusInputSchema>;

// 2. Fetcher Function
export const updatePurchaseStatus = ({
  id,
  data,
}: {
  id: number;
  data: UpdatePurchaseStatusInput;
}): Promise<Purchase> => {
  return api.patch(`/purchases/${id}/status`, data);
};

// 3. React Query Hook
type UseUpdatePurchaseStatusOptions = {
  mutationConfig?: MutationConfig<typeof updatePurchaseStatus>;
};

export const useUpdatePurchaseStatus = ({
  mutationConfig,
}: UseUpdatePurchaseStatusOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getPurchasesQueryOptions().queryKey,
      });


      queryClient.invalidateQueries({
        queryKey: getItemsQueryOptions().queryKey,
      });

      toast.success(`Purchase marked as ${data.status.toLowerCase()}`);
      
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updatePurchaseStatus,
  });
};