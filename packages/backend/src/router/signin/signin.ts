import { createHash } from 'crypto';
import { signUpSchema } from '../../types';
import { publicProcedure } from '../../lib';
import { signJWT } from '../../utils/';

export const signInTrpcRoute = publicProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
      password: createHash('sha256').update(input.password).digest('hex'),
    },
  });
  if (!user) {
    throw new Error('Nick or password is incorrect');
  }

  const token = signJWT(user.id);
  ctx.res.cookie('token', token, { httpOnly: true });
  return token;
});
