import { trpc } from '../lib';
import { getIdeasTrpcRoute } from './getIdeas/getIdeas';
import { getIdeaTrpcRoute } from './getIdea/getIdea';
import { createIdeaTrpcRoute } from './createIdea/createIdea';
import { signUpTrpcRoute } from './signUp/signUp';
import { signInTrpcRoute } from './signin/signin';
import { getMe } from './getMe/getMe';
import { signOutTrpcRoute } from './signOut/signOut';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  signOut: signOutTrpcRoute,
  getMe: getMe,
});

export type TrpcRouter = typeof trpcRouter;
