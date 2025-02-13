import { getIdeasSchema } from '../../types/zodScheas/getIdeasSchema';
import { authedProcedure } from '../../lib';

export const getIdeasTrpcRoute = authedProcedure.input(getIdeasSchema).query(async ({ ctx, input }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      serialNumber: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  });
  const nextIdea = ideas.at(input.limit);
  const nextCursor = nextIdea?.serialNumber;
  const ideasWithoutNext = ideas.slice(0, input.limit);
  return {
    ideas: ideasWithoutNext,
    nextCursor,
  };
});
