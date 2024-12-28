export const getAllIdeasRoute = () => '/';
export const getViewIdeaRoute = (ideaNick: string) => `/ideas/${ideaNick}`;

export const routes = {
  getAllIdeasRoute,
  getViewIdeaRoute,
};
