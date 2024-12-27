import express from 'express';

import * as trpcExpress from '@trpc/server/adapters/express';
import { trpcRouter } from './trpc';

const app = express();

app.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter }));

app.listen(5000, () => {
  console.log('Server started on port 5000');
});

