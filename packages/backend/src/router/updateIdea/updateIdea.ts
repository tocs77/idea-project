import { updateIdeaSchema } from '../../types';
import { authedProcedure } from '../../lib';

export const uodateIdeaTrpcRoute = authedProcedure.input(updateIdeaSchema).mutation(async ({ ctx, input }) => {
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: input.ideaId,
    },
  });
  if (!idea) {
    throw new Error('Idea not found');
  }
  if (!ctx.me) {
    throw new Error('You are not logged in');
  }

  if (idea.authorId !== ctx.me.id) {
    throw new Error('You are not the author of this idea');
  }

  if (idea.nick !== input.nick) {
    const existingIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });
    if (existingIdea) {
      throw new Error('Idea with this nick already exists');
    }
  }

  const updatedIdea = await ctx.prisma.idea.update({
    where: {
      id: input.ideaId,
    },
    data: {
      name: input.name,
      nick: input.nick,
      description: input.description,
      text: input.text,
    },
  });

  return updatedIdea;
});
