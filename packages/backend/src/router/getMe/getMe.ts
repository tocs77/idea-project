import { authedProcedure } from '../../lib';

import { pick } from 'lodash';

export const getMe = authedProcedure.query(async ({ ctx }) => {
  return { me: ctx.me && pick(ctx.me, ['id', 'nick']) };
});
