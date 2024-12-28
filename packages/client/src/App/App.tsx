import { RouterProvider } from 'react-router';
import { router } from '../providers/router/router';
import { TrpcProvider } from '@/shared/lib';

export const App = () => {
  return (
    <TrpcProvider>
      <RouterProvider router={router} />
    </TrpcProvider>
  );
};
