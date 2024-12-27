import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { TrpcRouter } from '@idea/backend/src/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const trpc = createTRPCReact<TrpcRouter>();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});

export const TrpcProvider = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}> {children}</QueryClientProvider>
    </trpc.Provider>
  );
};
