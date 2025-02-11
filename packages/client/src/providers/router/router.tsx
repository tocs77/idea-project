import { createBrowserRouter } from 'react-router';

import { AllIdeasPage } from '@/pages/AllIdeasPage';
import { ViewIdeaPage } from '@/pages/ViewIdeaPage';
import { routes } from '@/shared/lib/routes';
import { Layout } from '@/shared/ui/Layout';
import { NewIdeaPage } from '@/pages/NewIdeaPage';
import { SignupPage } from '@/pages/SignupPage';
import { SigninPage } from '@/pages/SigninPage';
import { SignOutPage } from '@/pages/SignOutPage';
import { EditIdeaPage } from '@/pages/EditIdeaPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { EditProfilePage } from '@/pages/EditPrifilePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: routes.getAllIdeasRoute(), element: <AllIdeasPage /> },
      { path: routes.getNewIdeaRoute(), element: <NewIdeaPage /> },
      {
        path: routes.getViewIdeaRoute({ ideaNick: ':ideaNick' }),

        children: [
          { index: true, element: <ViewIdeaPage /> },
          { path: 'edit', element: <EditIdeaPage /> },
        ],
      },

      { path: routes.getSignupRoute(), element: <SignupPage /> },
      { path: routes.getSigninRoute(), element: <SigninPage /> },
      { path: routes.getSignOutRoute(), element: <SignOutPage /> },
      { path: routes.getEditProfileRoute(), element: <EditProfilePage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
