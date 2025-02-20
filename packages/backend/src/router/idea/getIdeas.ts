import { omit } from 'lodash';

import { getIdeasSchema } from '../../types/zodScheas/getIdeasSchema';
import { authedProcedure } from '../../lib';

export const getIdeasTrpcRoute = authedProcedure.input(getIdeasSchema).query(async ({ ctx, input }) => {
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined;
  const rawIdeas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      serialNumber: true,
      _count: {
        select: {
          ideasLikes: true,
        },
      },
    },
    where: {
      blockedAt: null,
      ...(!normalizedSearch
        ? {}
        : {
            OR: [
              {
                name: {
                  search: normalizedSearch,
                },
              },
              {
                description: {
                  search: normalizedSearch,
                },
              },
              {
                text: {
                  search: normalizedSearch,
                },
              },
            ],
          }),
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
  const nextIdea = rawIdeas.at(input.limit);
  const nextCursor = nextIdea?.serialNumber;
  const rawIdeasWithoutNext = rawIdeas.slice(0, input.limit);
  const ideasWithoutNext = rawIdeasWithoutNext.map((idea) => ({ ...omit(idea, ['_count']), likesCount: idea._count.ideasLikes }));
  return {
    ideas: ideasWithoutNext,
    nextCursor,
  };
});
