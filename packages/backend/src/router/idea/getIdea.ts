import { z } from 'zod';
import { omit } from 'lodash';
import { sendWelcomeEmail } from '../../lib/emails';

import { authedProcedure } from '../../lib';

export const getIdeaTrpcRoute = authedProcedure.input(z.object({ ideaNick: z.string() })).query(async ({ ctx, input }) => {
  const rawIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.ideaNick,
    },
    include: {
      author: {
        select: {
          id: true,
          nick: true,
          name: true,
        },
      },
      ideasLikes: {
        select: {
          userId: true,
        },
        where: {
          userId: ctx.me?.id,
        },
      },
      _count: {
        select: {
          ideasLikes: true,
        },
      },
    },
  });
  if (rawIdea?.blockedAt) {
    throw new Error('Idea is blocked');
  }
  const isLikedByMe = !!rawIdea?.ideasLikes?.length;
  const likesCount = rawIdea?._count?.ideasLikes || 0;

  const idea = rawIdea && {
    ...omit(rawIdea, ['ideasLikes', '_count']),
    isLikedByMe,
    likesCount,
  };
  if (ctx.me) sendWelcomeEmail(ctx.me);
  return idea || null;
});
