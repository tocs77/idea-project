import { createHash } from 'crypto';

import { signJWT } from '../../utils';
import { signUpSchema } from '../../types';
import { publicProcedure, env } from '../../lib';

export const signUpTrpcRoute = publicProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (user) {
    throw new Error('User with this nick already exists');
  }

  const emailUser = await ctx.prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });
  if (emailUser) {
    throw new Error('User with this email already exists');
  }

  const newUser = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: createHash('sha256').update(`${env.PASSWORD_SALT}${input.password}`).digest('hex'),
      email: input.email,
    },
  });
  const token = signJWT(newUser.id);
  ctx.res.cookie('token', token, { httpOnly: true });
  return true;
});
