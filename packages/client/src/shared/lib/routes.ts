const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>;
};

const getAllIdeasRoute = () => '/';

export const viewIdeaRouteParams = getRouteParams({ ideaNick: true });
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams;

const getViewIdeaRoute = ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}`;
const getNewIdeaRoute = () => '/ideas/new';

const getSignupRoute = () => '/sign-up';

export const routes = {
  getAllIdeasRoute,
  getViewIdeaRoute,
  getNewIdeaRoute,
  getSignupRoute,
};
