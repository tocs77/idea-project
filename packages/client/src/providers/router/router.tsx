import { createBrowserRouter } from 'react-router';

import { AllIdeasPage } from '@/pages/AllIdeasPage';
import { ViewIdeaPage } from '@/pages/ViewIdeaPage';
import { routes } from '@/shared/lib/routes';
import { Layout } from '@/shared/ui/Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: routes.getAllIdeasRoute(), element: <AllIdeasPage /> },
      {
        path: routes.getViewIdeaRoute({ ideaNick: ':ideaNick' }),
        element: <ViewIdeaPage />,
        index: true,
      },
    ],
  },
]);
