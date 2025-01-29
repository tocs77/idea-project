import { authedProcedure } from '../../lib';

export const getIdeasTrpcRoute = authedProcedure.query(async ({ ctx }) => {
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
  const token = ctx.req.cookies.token;
  console.log('token', token);
  return ideas;
});
