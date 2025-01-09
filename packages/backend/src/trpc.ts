import { initTRPC } from '@trpc/server';
import { times, pick } from 'lodash';
import { z } from 'zod';

const ideas = times(100, (i) => ({
  nick: `cool-idea${i}`,
  name: `Super idea${i}`,
  description: `Very interesting idea ${i}`,
  text: times(Math.floor(Math.random() * 100), (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}));

const trpc = initTRPC.create();
export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return ideas.map((idea) => pick(idea, ['nick', 'name', 'description']));
  }),
  getIdea: trpc.procedure.input(z.object({ ideaNick: z.string() })).query(({ input }) => {
    const idea = ideas.find((idea) => idea.nick === input.ideaNick);

    return idea || null;
  }),
});

export type TrpcRouter = typeof trpcRouter;
