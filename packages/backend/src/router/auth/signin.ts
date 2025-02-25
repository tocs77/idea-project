import { createHash } from 'crypto';
import { signinSchema } from '../../types';
import { publicProcedure, env } from '../../lib';
import { signJWT } from '../../utils/';

export const signInTrpcRoute = publicProcedure.input(signinSchema).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
      password: createHash('sha256').update(`${env.PASSWORD_SALT}${input.password}`).digest('hex'),
    },
  });
  if (!user) {
    throw new Error('Nick or password is incorrect');
  }

  const token = signJWT(user.id);
  ctx.res.cookie('token', token, { httpOnly: true });
  return true;
});
