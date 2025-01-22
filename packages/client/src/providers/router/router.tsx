import { createBrowserRouter } from 'react-router';

import { AllIdeasPage } from '@/pages/AllIdeasPage';
import { ViewIdeaPage } from '@/pages/ViewIdeaPage';
import { routes } from '@/shared/lib/routes';
import { Layout } from '@/shared/ui/Layout';
import { NewIdeaPage } from '@/pages/NewIdeaPage';
import { SignupPage } from '@/pages/SignupPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: routes.getAllIdeasRoute(), element: <AllIdeasPage /> },
      { path: routes.getNewIdeaRoute(), element: <NewIdeaPage /> },
      {
        path: routes.getViewIdeaRoute({ ideaNick: ':ideaNick' }),
        element: <ViewIdeaPage />,
        index: true,
      },
      { path: routes.getSignupRoute(), element: <SignupPage /> },
    ],
  },
]);
