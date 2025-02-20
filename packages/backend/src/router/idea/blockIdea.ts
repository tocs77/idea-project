import { blockIdeaSchema } from '../../types';
import { authedProcedure } from '../../lib';
import { canBlockIdeas } from '../../utils';

export const blockIdeaTrpcRoute = authedProcedure.input(blockIdeaSchema).mutation(async ({ ctx, input }) => {
  if (!canBlockIdeas(ctx.me)) {
    throw new Error('You are not premitted to block ideas');
  }
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: input.ideaId,
    },
  });
  if (!idea) {
    throw new Error('Idea not found');
  }

  const updatedIdea = await ctx.prisma.idea.update({
    where: {
      id: input.ideaId,
    },
    data: {
      blockedAt: new Date(),
    },
  });

  return updatedIdea;
});
