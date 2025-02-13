import { updateProfileSchema } from '../../types';
import { authedProcedure } from '../../lib';
import { toClientMe } from '../../utils';

export const updateProfileTrpcRoute = authedProcedure.input(updateProfileSchema).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('You are not logged in');
  }

  if (ctx.me.nick !== input.nick) {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (exUser) {
      throw new Error('User with this nick already exists');
    }
  }

  const updatedMe = await ctx.prisma.user.update({
    where: {
      id: ctx.me.id,
    },
    data: {
      nick: input.nick,
      name: input.name,
    },
  });

  return toClientMe(updatedMe);
});
