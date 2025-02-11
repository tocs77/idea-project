import { authedProcedure } from '../../lib';

export const getMe = authedProcedure.query(async ({ ctx }) => {
  return ctx.me;
});
