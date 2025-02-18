import { setLikeSchema } from '../../types';
import { authedProcedure } from '../../lib';

export const setIdeaLikeRoute = authedProcedure.input(setLikeSchema).mutation(async ({ ctx, input }) => {
  const { ideaId, isLikedByMe } = input;
  if (!ctx.me) {
    throw new Error('You are not logged in');
  }
  const idea = await ctx.prisma.idea.findUnique({
    where: { id: ideaId },
  });
  if (!idea) {
    throw new Error('Idea not found');
  }
  if (isLikedByMe) {
    await ctx.prisma.ideaLike.upsert({
      where: {
        userId_ideaId: {
          ideaId,
          userId: ctx.me.id,
        },
      },
      create: {
        ideaId,
        userId: ctx.me.id,
      },
      update: {},
    });
  } else {
    await ctx.prisma.ideaLike.delete({
      where: {
        userId_ideaId: {
          ideaId,
          userId: ctx.me.id,
        },
      },
    });
  }
  const likesCount = await ctx.prisma.ideaLike.count({
    where: {
      id: ideaId,
    },
  });

  return {
    id: ideaId,
    likesCount,
    isLikedByMe,
  };
});
