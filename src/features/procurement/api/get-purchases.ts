import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { Meta, Purchase, PurchaseFilters } from '@/types/api';
import type { QueryConfig } from '@/lib/react-query';
import { API_CONSTS } from '@/config/consts';

export const getPurchases = (
  params: PurchaseFilters = {}
): Promise<{
    data: Purchase[],
    meta: Meta
}> => {
  return api.get(API_CONSTS.PURCHASE.BASE.ENDPOINT, {
    params,
  });
};

export const getPurchasesQueryOptions = (params: PurchaseFilters = {}) => {
  return queryOptions({
    queryKey: [...API_CONSTS.PURCHASE.BASE.QUERY_KEY, params],
    queryFn: () => getPurchases(params),
  });
};

type UsePurchasesOptions = {
  params?: PurchaseFilters;
  queryConfig?: QueryConfig<typeof getPurchasesQueryOptions>;
};

export const usePurchases = ({
  queryConfig,
  params,
}: UsePurchasesOptions = {}) => {
  return useQuery({
    ...getPurchasesQueryOptions(params),
    ...queryConfig,
  });
};