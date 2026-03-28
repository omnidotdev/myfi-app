import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import DefaultCatchBoundary from "@/components/DefaultCatchBoundary";
import NotFound from "@/components/NotFound";
import { routeTree } from "./routeTree.gen";

/**
 * Create the application router with TanStack Query integration
 */
const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    context: {
      queryClient,
      session: null,
      theme: "dark",
    },
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export { getRouter };
