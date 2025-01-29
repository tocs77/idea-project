import { z } from 'zod';

import { authedProcedure } from '../../lib';

export const getIdeaTrpcRoute = authedProcedure.input(z.object({ ideaNick: z.string() })).query(async ({ ctx, input }) => {
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.ideaNick,
    },
  });
  return idea || null;
});
