import { API_CONSTS, STALE_TIME } from "@/config/consts"
import { api } from "@/lib/api-client"
import { type QueryConfig } from "@/lib/react-query"
import type { SupplierMinimal } from "@/types/api"
import { queryOptions, useQuery } from "@tanstack/react-query"

const getSuppliers = (q?: string): Promise<SupplierMinimal[]> => {
    return api.get(API_CONSTS.SUPPLIERS.SEARCH.ENDPOINT, {
        params: { q },
    })
}

export const getSuppliersQueryOptions = (q?: string) => {
    return queryOptions({
        queryKey: [...API_CONSTS.SUPPLIERS.SEARCH.QUERY_KEYS, q],
        queryFn: () => getSuppliers(q),
        staleTime: STALE_TIME.Q4
    })
};

type UseSuppliersOptions = {
    q?: string;
    queryConfig?: QueryConfig<typeof getSuppliersQueryOptions>;
};

export const useSearchSuppliers = ({ q, queryConfig }: UseSuppliersOptions = {}) => {
  return useQuery({
    ...getSuppliersQueryOptions(q),
    ...queryConfig,
    enabled: q !== undefined,
  })
}