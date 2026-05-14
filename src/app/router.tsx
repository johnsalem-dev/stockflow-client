import { createBrowserRouter, RouterProvider } from 'react-router';
import paths from '@/config/paths';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import type { RouteModule } from './models';
import { useMemo } from 'react';
import DashboardLayout from '@/components/layouts/dashboard-layout.tsx';


const convert = (queryClient: QueryClient) => (m: RouteModule) => {
    const { clientLoader, clientAction, default: Component, ...rest } = m;
    return {
        ...rest,
        loader: clientLoader?.(queryClient),
        action: clientAction?.(queryClient),
        Component,
    }
}

export const createAppRouter = (queryClient: QueryClient) => createBrowserRouter([
    // Home route
    {
        path: paths.home.path,
        lazy: () => import('./routes/home/index.tsx').then(convert(queryClient))
    },
    {
        element: <DashboardLayout />,
        children: [
            {
                path: paths.dashboard.path,
                lazy: () => import('./routes/dashboard/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.masterData.path,
                lazy: () => import('./routes/master-data/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.itemCatalog.path,
                lazy: () => import('./routes/item-catalog/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.itemCatalog.path,
                lazy: () => import('./routes/item-catalog/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.addItemCatalog.path,
                lazy: () => import('./routes/item-catalog/add/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.procurement.path,
                lazy: () => import('./routes/procurement/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.newStockInward.path,
                lazy: () => import('./routes/procurement/stock-inward/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.stockOutward.path,
                lazy: () => import('./routes/issuance//new-issaunce/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.issuance.path,
                lazy: () => import('./routes/issuance/index.tsx').then(convert(queryClient))
            },
            {
                path: paths.reports.path,
                lazy: () => import('./routes/reports/index.tsx').then(convert(queryClient))
            }
        ]
    },
]);

export const AppRouter = () => {
    const queryClient = useQueryClient();
    const router = useMemo(() => createAppRouter(queryClient), [queryClient])

    return <RouterProvider router={router} />;
}