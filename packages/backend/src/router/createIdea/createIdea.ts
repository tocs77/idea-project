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

  const newIdea = await ctx.prisma.idea.create({
    data: {
      name: input.name,
      nick: input.nick,
      description: input.description,
      text: input.text,
    },
  });

  return newIdea;
});
