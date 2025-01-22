import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { AppContext } from './ctx';

export const trpc = initTRPC.context<AppContext>().create({ transformer: superjson });
