import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib';
import { getIdeasTrpcRoute } from './idea/getIdeas';
import { getIdeaTrpcRoute } from './idea/getIdea';
import { createIdeaTrpcRoute } from './idea/createIdea';
import { setIdeaLikeRoute } from './idea/setIdeaLike';
import { signUpTrpcRoute } from './auth/signUp';
import { signInTrpcRoute } from './auth/signin';
import { getMe } from './auth/getMe';
import { signOutTrpcRoute } from './auth/signOut';
import { uodateIdeaTrpcRoute } from './idea/updateIdea';
import { updateProfileTrpcRoute } from './auth/updateProfile';
import { updatePasswordTrpcRoute } from './auth/updatePassword';
import { blockIdeaTrpcRoute } from './idea/blockIdea';

export const trpcRouter = trpc.router({
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  signOut: signOutTrpcRoute,
  getMe: getMe,
  updateIdea: uodateIdeaTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  setIdeaLike: setIdeaLikeRoute,
  blockIdea: blockIdeaTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
