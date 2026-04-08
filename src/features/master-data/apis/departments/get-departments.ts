import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';
import type { Department } from '@/types/api';

// Assuming your API returns paginated data. 
// If it just returns an array, change the return type to Promise<Department[]>


export const getDepartments = (
  page = 1,
): Promise<Department[]> => {
  return api.get(`/departments`, {
    params: {
      page,
    },
  });
};

export const getDepartmentsQueryOptions = ({
  page,
}: { page?: number } = {}) => {
  return queryOptions({
    queryKey: ['departments', { page }],
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