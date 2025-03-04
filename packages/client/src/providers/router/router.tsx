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
      { path: routes.getAllIdeasRoute.definition, element: <AllIdeasPage /> },
      { path: routes.getNewIdeaRoute.definition, element: <NewIdeaPage /> },
      {
        path: routes.getViewIdeaRoute.definition,

        children: [
          { index: true, element: <ViewIdeaPage /> },
          { path: 'edit', element: <EditIdeaPage /> },
        ],
      },

      { path: routes.getSignupRoute.definition, element: <SignupPage /> },
      { path: routes.getSigninRoute.definition, element: <SigninPage /> },
      { path: routes.getSignOutRoute.definition, element: <SignOutPage /> },
      { path: routes.getEditProfileRoute.definition, element: <EditProfilePage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
