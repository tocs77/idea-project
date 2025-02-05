import { RouterProvider } from 'react-router';
import { router, AppContextProvider } from '@/providers';
import { TrpcProvider } from '@/shared/lib';
import './styles/global.scss';

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </TrpcProvider>
  );
};
