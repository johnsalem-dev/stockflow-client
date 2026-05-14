import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';
import type { UomMinimal } from '@/types/api';
import { API_CONSTS, STALE_TIME } from '@/config/consts';


export const getUoms = (q?: string): Promise<UomMinimal[]> => {
  return api.get(API_CONSTS.UOM.SEARCH.ENDPOINT, {
    params: { q },
  });
};

export const getUomsQueryOptions = (q?: string) => {
  return queryOptions({
    queryKey: [...API_CONSTS.UOM.SEARCH.QUERY_KEYS, q],
    queryFn: () => getUoms(q),
    staleTime: STALE_TIME.Q4 // 5 minutes
  });
};

type UseUomsOptions = {
  q?: string;
  queryConfig?: QueryConfig<typeof getUomsQueryOptions>;
};

export const useUoms = ({ q, queryConfig }: UseUomsOptions = {}) => {
  return useQuery({
    ...getUomsQueryOptions(q),
    ...queryConfig,
    enabled: q !== undefined, 
  });
};