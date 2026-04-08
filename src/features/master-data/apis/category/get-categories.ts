import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { Category } from '@/types/api';
import type { QueryConfig } from '@/lib/react-query';


export const getCategories = (
  params: { page?: number; departmentId?: number } = {}
): Promise<Category[]> => {
  return api.get(`/categories`, {
    params,
  });
};

export const getCategoriesQueryOptions = (
  params: { page?: number; departmentId?: number } = {}
) => {
  return queryOptions({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
  });
};

type UseCategoriesOptions = {
  params?: { page?: number; departmentId?: number };
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};


export const useCategories = ({
  queryConfig,
  params,
}: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(params),
    ...queryConfig,
  });
};