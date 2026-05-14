import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';
import type { Department } from '@/types/api';
import { API_CONSTS } from '@/config/consts';

export const getDepartments = (
  page = 1,
): Promise<Department[]> => {
  return api.get(API_CONSTS.DEPARTMENT.BASE.ENDPOINT, {
    params: {
      page,
    },
  });
};

export const getDepartmentsQueryOptions = ({
  page,
}: { page?: number } = {}) => {
  return queryOptions({
    queryKey: [...API_CONSTS.DEPARTMENT.BASE.QUERY_KEYS, { page }],
    queryFn: () => getDepartments(page),
  });
};

type UseDepartmentsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getDepartmentsQueryOptions>;
};


export const useDepartments = ({
  queryConfig,
  page,
}: UseDepartmentsOptions = {}) => {
  return useQuery({
    ...getDepartmentsQueryOptions({ page }),
    ...queryConfig,
  });
};