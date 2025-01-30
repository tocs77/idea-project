import { authedProcedure } from '../../lib';

import { pick } from 'lodash';

export const getMe = authedProcedure.query(async ({ ctx }) => {
  return ctx.me && pick(ctx.me, ['id', 'nick']);
});
