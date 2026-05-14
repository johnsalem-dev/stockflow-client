import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { ItemFilters, ItemSummary, Meta } from '@/types/api';
import type { QueryConfig } from '@/lib/react-query';
import { API_CONSTS } from '@/config/consts';

export const getItems = (
  params: ItemFilters = {}
): Promise<{
  data: ItemSummary[];
  meta: Meta;
}> => {
  return api.get(API_CONSTS.ITEMS.BASE.ENDPOINT, {
    params,
  });
};

export const getItemsQueryOptions = (params: ItemFilters = {}) => {
  return queryOptions({
    queryKey: [...API_CONSTS.ITEMS.BASE.QUERY_KEYS, params],
    queryFn: () => getItems(params),
  });
};

type UseItemsOptions = {
  params?: ItemFilters;
  queryConfig?: QueryConfig<typeof getItemsQueryOptions>;
};


export const useItems = ({
  queryConfig,
  params,
}: UseItemsOptions = {}) => {
  return useQuery({
    ...getItemsQueryOptions(params),
    ...queryConfig,
  });
};