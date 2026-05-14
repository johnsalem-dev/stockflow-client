import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { Issuance, IssuanceFilters, Meta } from '@/types/api';
import type { QueryConfig } from '@/lib/react-query';

export const getIssuances = (
  params: IssuanceFilters = {}
): Promise<{
  data: Issuance[];
  meta: Meta;
}> => {
  return api.get(`/issuances`, {
    params,
  });
};

export const getIssuancesQueryOptions = (params: IssuanceFilters = {}) => {
  return queryOptions({
    queryKey: ['issuances', params],
    queryFn: () => getIssuances(params),
  });
};

type UseIssuancesOptions = {
  params?: IssuanceFilters;
  queryConfig?: QueryConfig<typeof getIssuancesQueryOptions>;
};

export const useIssuances = ({
  queryConfig,
  params,
}: UseIssuancesOptions = {}) => {
  return useQuery({
    ...getIssuancesQueryOptions(params),
    ...queryConfig,
  });
};