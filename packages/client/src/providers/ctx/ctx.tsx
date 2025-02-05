import { trpc } from '@/shared/lib';
import { TrpcRouterOutput } from '@idea/backend/src/router/router';
import { createContext, useContext } from 'react';

export type AppContext = {
  me: TrpcRouterOutput['getMe'];
};

const AppReactContext = createContext<AppContext>({ me: undefined });

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <AppReactContext.Provider value={{ me: data }}>
      {isLoading || isFetching ? <p>Loading</p> : isError ? <p>{error.message}</p> : children}
    </AppReactContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppReactContext);
};

export const useMe = () => {
  const { me } = useAppContext();
  return me;
};
