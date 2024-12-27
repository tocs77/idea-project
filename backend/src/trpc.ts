import { initTRPC } from '@trpc/server';

const ideas = [
  { nick: 'idea1', name: 'Super idea', description: 'Very interesting idea 1' },
  { nick: 'idea2', name: 'Super idea2', description: 'Very interesting idea 2' },
  { nick: 'idea3', name: 'Super idea3', description: 'Very interesting idea 3' },
  { nick: 'idea4', name: 'Super idea4', description: 'Very interesting idea 4' },
  { nick: 'idea5', name: 'Super idea5', description: 'Very interesting idea 5' },
  { nick: 'idea6', name: 'Super idea6', description: 'Very interesting idea 6' },
];

const trpc = initTRPC.create();
export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return ideas;
  }),
});

export type TrpcRouter = typeof trpcRouter;
