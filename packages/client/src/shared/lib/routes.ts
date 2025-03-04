import { pgr } from './pumpGetRoute';

const getAllIdeasRoute = pgr(() => '/');

const getViewIdeaRoute = pgr({ ideaNick: true }, ({ ideaNick }) => `/ideas/${ideaNick}`);
const getNewIdeaRoute = pgr(() => '/ideas/new');

const getSignupRoute = pgr(() => '/sign-up');
const getSigninRoute = pgr(() => '/sign-in');
const getSignOutRoute = pgr(() => '/sign-out');
const getEditIdeaRoute = pgr({ ideaNick: true }, ({ ideaNick }) => `/ideas/${ideaNick}/edit`);
const getEditProfileRoute = pgr(() => '/edit-profile');

export const routes = {
  getAllIdeasRoute,
  getViewIdeaRoute,
  getNewIdeaRoute,
  getSignupRoute,
  getSigninRoute,
  getSignOutRoute,
  getEditIdeaRoute,
  getEditProfileRoute,
};
