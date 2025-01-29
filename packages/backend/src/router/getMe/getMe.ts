import { trpc } from '../../lib';

import { pick } from 'lodash';

export const getMe = trpc.procedure.query(async ({ ctx }) => {
  return { me: ctx.me && pick(ctx.me, ['id', 'nick']) };
});
