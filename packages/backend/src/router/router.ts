import { trpc } from '../lib';
import { getIdeasTrpcRoute } from './getIdeas/getIdeas';
import { getIdeaTrpcRoute } from './getIdea/getIdea';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
