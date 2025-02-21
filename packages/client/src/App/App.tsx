import { RouterProvider } from 'react-router';
import { router, AppContextProvider } from '@/providers';
import { TrpcProvider } from '@/shared/lib';
import './styles/global.scss';
import { HelmetProvider } from 'react-helmet-async';

export const App = () => {
  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  );
};
