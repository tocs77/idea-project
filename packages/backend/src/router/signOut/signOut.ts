import { authedProcedure } from '../../lib';

export const signOutTrpcRoute = authedProcedure.mutation(async ({ ctx }) => {
  ctx.res.cookie('token', '', { httpOnly: true });
  return true;
});
