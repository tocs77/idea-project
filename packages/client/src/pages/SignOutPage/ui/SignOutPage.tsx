import { useNavigate } from 'react-router';
import { routes, trpc } from '@/shared/lib';
import { useEffect } from 'react';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const signOut = trpc.signOut.useMutation();
  const trpcUtils = trpc.useUtils();

  const signOutHandler = async () => {
    await signOut.mutateAsync();
    await trpcUtils.getMe.invalidate();

    navigate(routes.getSigninRoute());
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    signOutHandler();
  }, []);
  return <div>Signing out</div>;
};
