import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';

import { trpcRouter } from '@/router';
import { createAppContext, AppContext } from './lib/ctx';

const init = async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    if (ctx === null) {
      throw new Error('Failed to create app context');
    }
    const app = express();

    app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext: () => ctx as AppContext }));

    app.listen(5000, () => {
      console.log('Server started on port 5000');
    });
  } catch (error) {
    await ctx?.stop();
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

init();
