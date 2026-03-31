import { queryConfig } from "@/lib/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Loader2 } from "lucide-react";
import { Suspense, useState, type ReactNode } from "react";

type AppProviderProps = {
    children: ReactNode;
  };

export const AppProvider = ({ children }: AppProviderProps) => { 
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: queryConfig
    }));

    return (
        <Suspense fallback={<AppFallbackLoader />}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Suspense>
    );
}

const AppFallbackLoader = () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-900">
        <div className="flex flex-col items-center gap-4">

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <Box className="h-8 w-8 text-blue-600 animate-pulse" />
            

            <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-blue-100 animate-spin" />
          </div>
          

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            Loading StockFlow...
          </div>
        </div>
      </div>
    )};