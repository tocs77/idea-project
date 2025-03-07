import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { AppContext } from './ctx';

import { decodeJWT, verifyJWT, toClientMe } from '../utils';
import { JwtPayload } from 'jsonwebtoken';
import { logger } from './logger';

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

const loggerMiddleware = t.middleware(async ({ path, type, next, ctx, rawInput }) => {
  const start = Date.now();
  const result = await next();
  const duration = Date.now() - start;
  const meta = {
    path,
    type,
    userId: ctx.me?.id,
    duration,
    rawInput: rawInput || null,
  };
  if (result.ok) {
    logger.info(`trpc:${type}: success`, 'Successfully request', { ...meta, output: result.data });
  } else {
    logger.error(`trpc:${type}: error`, result.error, meta);
  }
  return result;
});

export const publicProcedure = t.procedure.use(loggerMiddleware);
export const authedProcedure = publicProcedure.use(authMiddleware);
export const trpc = t;
