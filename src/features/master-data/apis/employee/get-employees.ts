import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { Employee } from '@/types/api';
import type { QueryConfig } from '@/lib/react-query';

export const getEmployees = (
  params: { 
    page?: number; 
    departmentId?: number;
    search?: string; 
  } = {}
): Promise<Employee[]> => {
  return api.get(`/employees`, {
    params,
  });
};

export const getEmployeesQueryOptions = (
  params: { 
    page?: number; 
    departmentId?: number;
    search?: string;
  } = {}
) => {
  return queryOptions({
    queryKey: ['employees', params],
    queryFn: () => getEmployees(params),
  });
};


type UseEmployeesOptions = {
  params?: { 
    page?: number; 
    departmentId?: number;
    search?: string;
  };
  queryConfig?: QueryConfig<typeof getEmployeesQueryOptions>;
};

export const useEmployees = ({
  queryConfig,
  params,
}: UseEmployeesOptions = {}) => {
  return useQuery({
    ...getEmployeesQueryOptions(params),
    ...queryConfig,
  });
};