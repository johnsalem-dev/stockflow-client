import type { SupplierMinimal } from "@/types/api"
import type { CreateSupplierInput } from "../models/add-supplier"
import { api } from "@/lib/api-client"
import { API_CONSTS } from "@/config/consts"
import type { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getUomsQueryOptions } from "./get-search-uom"
import toast from "react-hot-toast"

const createSupplier = ({ data, }: { data: CreateSupplierInput }): Promise<SupplierMinimal> => {
    return api.post(API_CONSTS.SUPPLIERS.BASE.ENDPOINT, data);
}

type UseCreateSupplierOptions = {
    mutationConfig?: MutationConfig<typeof createSupplier>;
}

export const useCreateSupplier = ({ mutationConfig }: UseCreateSupplierOptions = {}) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getUomsQueryOptions().queryKey,
            });

            toast.success('Supplier created successfully!');
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: createSupplier
    })
}