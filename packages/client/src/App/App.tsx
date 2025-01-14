import { RouterProvider } from 'react-router';
import { router } from '../providers/router/router';
import { TrpcProvider } from '@/shared/lib';
import './styles/global.scss';

export const App = () => {
  return (
    <TrpcProvider>
      <RouterProvider router={router} />
    </TrpcProvider>
  );
};
