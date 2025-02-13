import { updatePasswordSchema } from '../../types';
import { authedProcedure, env } from '../../lib';
import { createHash } from 'crypto';

export const updatePasswordTrpcRoute = authedProcedure.input(updatePasswordSchema).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('You are not logged in');
  }
  const user = await ctx.prisma.user.findUnique({
    where: {
      id: ctx.me.id,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }
  if (user.password !== createHash('sha256').update(`${env.PASSWORD_SALT}${input.oldPassword}`).digest('hex')) {
    throw new Error('Old password is incorrect');
  }

  await ctx.prisma.user.update({
    where: {
      id: ctx.me.id,
    },
    data: {
      password: createHash('sha256').update(`${env.PASSWORD_SALT}${input.newPassword}`).digest('hex'),
    },
  });
  return true;
});
