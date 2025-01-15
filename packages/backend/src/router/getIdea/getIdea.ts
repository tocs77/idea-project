import { z } from 'zod';

import { ideas, trpc } from '../../lib';

export const getIdeaTrpcRoute = trpc.procedure.input(z.object({ ideaNick: z.string() })).query(({ input }) => {
  const idea = ideas.find((idea) => idea.nick === input.ideaNick);

  return idea || null;
});
