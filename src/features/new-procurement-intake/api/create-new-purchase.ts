import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';
import type { PurchaseFormValues } from '../models/new-procurement';
import { getItemsQueryOptions } from '@/features/item-catalog/apis/get-items';
import { getPurchasesQueryOptions } from '@/features/procurement/api/get-purchases';

export const createPurchase = ({ data }: { data: PurchaseFormValues }) => {
 
  const payload = {
    supplierId: data.supplier.value,
    sourceType: data.sourceType,
    referenceNo: data.referenceNo,
    purchaseDate: data.purchaseDate,
    items: data.items, 
  };

  return api.post(`/purchases`, payload); 
};

type UseCreatePurchaseOptions = {
    mutationConfig?: MutationConfig<typeof createPurchase> 
};


export const useCreatePurchase = ({ mutationConfig }: UseCreatePurchaseOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getPurchasesQueryOptions().queryKey});
      queryClient.invalidateQueries({ queryKey: getItemsQueryOptions().queryKey });
    
      toast.success('Purchases recorded successfully!');
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createPurchase,
  });
};