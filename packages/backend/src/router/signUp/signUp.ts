import { createHash } from 'crypto';

import { signJWT } from '../../utils';
import { signUpSchema } from '../../types';
import { publicProcedure } from '../../lib';

export const signUpTrpcRoute = publicProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (user) {
    throw new Error('User with this nick already exists');
  }

  const newUser = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: createHash('sha256').update(input.password).digest('hex'),
    },
  });
  const token = signJWT(newUser.id);
  return token;
});
