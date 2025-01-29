import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { AppContext } from './ctx';

import { decodeJWT, verifyJWT } from '../utils/index';

const t = initTRPC.context<AppContext>().create({ transformer: superjson });

t.middleware(async ({ ctx, next }) => {
  const token = ctx.req.cookies.token;
  console.log('token', token);
  if (!token) return next();
  if (!verifyJWT(token)) return next();
  const id = decodeJWT(token) as string;

  const user = await ctx.prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) return next();
  ctx.me = { id: user.id, nick: user.nick };
  return next();
});

export const trpc = t;
