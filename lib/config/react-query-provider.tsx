import { QueryCache, QueryClient } from "@tanstack/react-query";
const ONE_HOUR = 1000 * 60 * 60;
const ONE_DAY = ONE_HOUR * 24;
export const queryCache = new QueryCache();
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Sets the garbage collection time to 2 days. This means that unused or inactive query data will be removed from the cache after 2 days.
      gcTime: ONE_DAY * 2,
      // Sets the time a query's data is considered fresh to 4 hours. After 4 hours, the data will be marked
      //                as stale, meaning it can be refetched if needed.
      staleTime: ONE_HOUR * 4,
      // Defines a delay function for retrying failed queries. The delay increases exponentially with each
      // retry attempt but is capped at 30 seconds.
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Specifies the number of retry attempts for failed queries, which is set to 1.
      retry: 1,
    },
  },
  queryCache,
});
