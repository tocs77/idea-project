import { trpc } from '../lib';
import { getIdeasTrpcRoute } from './getIdeas/getIdeas';
import { getIdeaTrpcRoute } from './getIdea/getIdea';
import { createIdeaTrpcRoute } from './createIdea/createIdea';
import { signUpTrpcRoute } from './signUp/signUp';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
