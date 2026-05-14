import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { Employee } from '@/types/api';
import type { QueryConfig } from '@/lib/react-query';
import { API_CONSTS } from '@/config/consts';

export const getEmployees = (
  params: { 
    page?: number; 
    departmentId?: number;
    search?: string; 
  } = {}
): Promise<Employee[]> => {
  return api.get(API_CONSTS.EMPLOYEE.BASE.ENDPOINT, {
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
    queryKey: [...API_CONSTS.EMPLOYEE.BASE.QUERY_KEYS, params],
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