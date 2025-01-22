import { createHash } from 'crypto';
import { signUpSchema } from '../../types';
import { trpc } from '../../lib';

export const signUpTrpcRoute = trpc.procedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.idea.findUnique({
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

  return newUser;
});
