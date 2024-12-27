import { TrpcProvider } from '@/shared/lib';
import { AllIdeasPage } from '@/pages/AllIdeasPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  );
};
