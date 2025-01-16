import { ideaSchema } from '../../types';
import { ideas, trpc } from '../../lib';

export const createIdeaTrpcRoute = trpc.procedure.input(ideaSchema).mutation(({ input }) => {
  const idea = ideas.find((idea) => idea.nick === input.nick);

  if (idea) {
    throw new Error('Idea already exists');
  }
  ideas.unshift(input);

  return input;
});
