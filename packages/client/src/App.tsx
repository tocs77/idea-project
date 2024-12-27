import { TrpcProvider } from './lib/trpc';

export const App = () => {
  return (
    <TrpcProvider>
      <div>App</div>
    </TrpcProvider>
  );
};
