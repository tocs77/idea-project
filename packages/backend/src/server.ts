import express from 'express';
import cookieParser from 'cookie-parser';
import * as trpcExpress from '@trpc/server/adapters/express';

import { trpcRouter } from '@/router';
import { createAppContext, AppContext } from './lib/ctx';
import { env } from './lib/env';

const init = async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext() as AppContext;
    if (ctx === null) {
      throw new Error('Failed to create app context');
    }
    const app = express();
    app.use(cookieParser());

    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: trpcRouter,
        createContext: ({ req, res }) => ({ req, res, ...ctx }) as AppContext,
      }),
    );

    app.listen(env.PORT, () => {
      console.log(`Server started on port ${env.PORT}`);
    });
  } catch (error) {
    await ctx?.stop();
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

init();
