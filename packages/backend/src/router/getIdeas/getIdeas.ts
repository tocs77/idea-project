import { trpc } from '../../lib';

export const getIdeasTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  // return ideas.map((idea) => pick(idea, ['nick', 'name', 'description']));
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return ideas;
});
