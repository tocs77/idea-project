import { AllIdeasPage } from '@/pages/AllIdeasPage';
import { ViewIdeaPage } from '@/pages/ViewIdeaPage';
import { routes } from '@/shared/lib/routes';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: routes.getAllIdeasRoute(), element: <AllIdeasPage /> },
  {
    path: routes.getViewIdeaRoute(':ideaNick'),
    element: <ViewIdeaPage />,
    index: true,
  },
]);
