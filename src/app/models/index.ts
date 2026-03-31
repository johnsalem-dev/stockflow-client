import type { QueryClient } from "@tanstack/react-query";
import type { RouteObject } from "react-router";

export type RouteModule = {
    clientLoader?: (queryClient: QueryClient) => RouteObject['loader'];
    clientAction?: (queryClient: QueryClient) => RouteObject['action'];
    default: React.ComponentType;
  };