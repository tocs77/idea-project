import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { AppContext } from './ctx';

import { decodeJWT, verifyJWT, toClientMe } from '../utils';
import { JwtPayload } from 'jsonwebtoken';

const t = initTRPC.context<AppContext>().create({ transformer: superjson });

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const token = ctx.req.cookies.token;
  if (!token) {
    ctx.me = undefined;
    ctx.res.status(401);
    throw new Error('Empty token');
  }
  if (!verifyJWT(token)) {
    ctx.me = undefined;
    ctx.res.status(401);
    throw new Error('Invalid token');
  }
  const id = decodeJWT(token) as JwtPayload;
  let user;
  try {
    user = await ctx.prisma.user.findUnique({
      where: {
        id: id.id,
      },
    });
  } catch (error) {
    console.log('error', error);
  }

  if (!user) return next();
  ctx.me = toClientMe(user);
  return next();
});
export const publicProcedure = t.procedure;
export const authedProcedure = publicProcedure.use(authMiddleware);
export const trpc = t;
