import { ideaSchema } from '../../types';
import { authedProcedure } from '../../lib';

export const createIdeaTrpcRoute = authedProcedure.input(ideaSchema).mutation(async ({ ctx, input }) => {
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (idea) {
    throw new Error('Idea with this nick already exists');
  }
  if (!ctx.me) {
    throw new Error('You are not logged in');
  }

  const newIdea = await ctx.prisma.idea.create({
    data: {
      name: input.name,
      nick: input.nick,
      description: input.description,
      text: input.text,
      authorId: ctx.me.id,
    },
  });

  return newIdea;
});
