import { QueryClient } from '@tanstack/react-query';

// Instantiate the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed requests twice
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      refetchOnWindowFocus: false, // Disable refetching when window regains focus
    },
  },
});

export default queryClient;
