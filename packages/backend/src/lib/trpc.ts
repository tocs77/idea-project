import { initTRPC } from '@trpc/server';
import { AppContext } from './ctx';

export const trpc = initTRPC.context<AppContext>().create();
