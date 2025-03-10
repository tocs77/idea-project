import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import * as trpcExpress from '@trpc/server/adapters/express';

import { trpcRouter } from '@/router';
import { createAppContext, AppContext } from './lib/ctx';
import { env } from './lib/env';
import { presetDb } from './scripts/presetDb';
import { applyCron } from './lib/cron';
import { logger } from './lib/logger';

const init = async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext() as AppContext;
    if (ctx === null) {
      throw new Error('Failed to create app context');
    }
    presetDb(ctx);
    applyCron(ctx);
    const app = express();
    app.use(cookieParser());

    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: trpcRouter,
        createContext: ({ req, res }) => ({ req, res, ...ctx }) as AppContext,
      }),
    );

    app.use((err: any, _: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(err);
      }
      logger.error('express', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    app.listen(env.PORT, () => {
      logger.info('Server', `Server started on port ${env.PORT}`);
    });
  } catch (error) {
    await ctx?.stop();
    logger.error('Server', error);
    process.exit(1);
  }
};

init();
