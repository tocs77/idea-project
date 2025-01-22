import { PropsWithChildren } from 'react';
import superjson from 'superjson';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TrpcRouter } from '@idea/backend/src/router';

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
  transformer: superjson,
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
