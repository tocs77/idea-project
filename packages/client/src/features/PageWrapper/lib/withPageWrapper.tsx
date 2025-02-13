import { AppContext, useAppContext } from '@/providers/ctx/ctx';
import { routes } from '@/shared/lib';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { UseTRPCQueryResult, UseTRPCQuerySuccessResult } from '@trpc/react-query/dist/shared';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

type Props = Record<string, any>;
type QueryResult = UseTRPCQueryResult<any, any>;

class CheckExistsError extends Error {}
const checkExistsFn = <T,>(value: T, message?: string): NonNullable<T> => {
  if (!value) {
    throw new CheckExistsError(message);
  }
  return value;
};

class CheckAccessError extends Error {}
const checkAccessFn = <T,>(value: T, message?: string): void => {
  if (!value) {
    throw new CheckAccessError(message);
  }
};

class GetAuthorizedError extends Error {}

type SetPropsProps<TQueryResult extends QueryResult | undefined> = HelperProps<TQueryResult> & {
  checkExists: typeof checkExistsFn;
  checkAccess: typeof checkAccessFn;
  getAuthorized: (message?: string) => NonNullable<AppContext['me']>;
};

type QuerySuccessResult<TQueryResult extends QueryResult> = UseTRPCQuerySuccessResult<NonNullable<TQueryResult>['data'], null>;
type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext;
  queryResult: TQueryResult extends QueryResult ? QuerySuccessResult<TQueryResult> : undefined;
};

type PageWrapperProps<TProps extends Props, TQueryResult extends QueryResult | undefined> = {
  redirectAuthorized?: boolean;
  authorizedOnly?: boolean;
  authorizedOnlyTitle?: string;
  authorizedOnlyMessage?: string;

  checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkAccessTitle?: string;
  checkAccessMessage?: string;

  checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkExistsTitle?: string;
  checkExistsMessage?: string;

  useQuery?: () => TQueryResult;
  setProps?: (helperProps: SetPropsProps<TQueryResult>) => TProps;
  Page: React.FC<TProps>;
};

const PageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>({
  authorizedOnly,
  authorizedOnlyTitle = 'Please authorize',
  authorizedOnlyMessage = 'This page available only for authorized users',
  redirectAuthorized,
  checkAccess,
  checkAccessTitle = 'Access denied',
  checkAccessMessage = 'You have no access to this page',
  checkExists,
  checkExistsTitle = 'Page not found',
  checkExistsMessage = 'This page does not exist',
  useQuery,
  setProps,
  Page,
}: PageWrapperProps<TProps, TQueryResult>) => {
  const navigate = useNavigate();
  const ctx = useAppContext();
  const queryResult = useQuery?.();
  const redirectNeeded = redirectAuthorized && ctx.me;

  useEffect(() => {
    if (redirectNeeded) {
      navigate(routes.getAllIdeasRoute(), { replace: true });
    }
  }, [redirectNeeded, navigate]);

  if (queryResult?.isLoading || queryResult?.isFetching || redirectNeeded) {
    return <p>Loading...</p>;
  }

  if (queryResult?.isError) {
    return <ErrorMessage title={checkExistsTitle} message={queryResult.error.message} />;
  }

  if (authorizedOnly && !ctx.me) {
    return <ErrorMessage title={authorizedOnlyTitle} message={authorizedOnlyMessage} />;
  }
  const helperProp = { ctx, queryResult: queryResult as never };
  if (checkAccess) {
    const accessDenied = !checkAccess(helperProp);
    if (accessDenied) {
      return <ErrorMessage title={checkAccessTitle} message={checkAccessMessage} />;
    }
  }
  if (checkExists) {
    const notExists = !checkExists(helperProp);
    if (notExists) {
      return <ErrorMessage title={checkExistsTitle} message={checkExistsMessage} />;
    }
  }
  const getAuthorized = (message?: string) => {
    if (!ctx.me) {
      throw new GetAuthorizedError(message);
    }
    return ctx.me;
  };
  try {
    const props = setProps?.({ ...helperProp, checkExists: checkExistsFn, checkAccess: checkAccessFn, getAuthorized }) as TProps;
    return <Page {...props} />;
  } catch (error) {
    if (error instanceof CheckExistsError) {
      return <ErrorMessage title={checkExistsTitle} message={error.message || checkExistsMessage} />;
    }
    if (error instanceof CheckAccessError) {
      return <ErrorMessage title={checkAccessTitle} message={error.message || checkAccessMessage} />;
    }
    if (error instanceof GetAuthorizedError) {
      return <ErrorMessage title={authorizedOnlyTitle} message={error.message || authorizedOnlyMessage} />;
    }
    throw error;
  }
};

export const withPageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>(
  pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>,
) => {
  return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => {
    return () => <PageWrapper {...pageWrapperProps} Page={Page} />;
  };
};
