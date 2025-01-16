import { trpc } from '../lib';
import { getIdeasTrpcRoute } from './getIdeas/getIdeas';
import { getIdeaTrpcRoute } from './getIdea/getIdea';
import { createIdeaTrpcRoute } from './createIdea/createIdea';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
