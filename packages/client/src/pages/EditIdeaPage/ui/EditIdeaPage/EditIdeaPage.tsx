import { trpc } from '@/shared/lib';
import { ViewIdeaRouteParams } from '@/shared/lib/routes';
import { useParams } from 'react-router';
import { EditIdeaComponent } from '../EditIdeaComponent/EditIdeaComponent';
import { withPageWrapper } from '@/features/PageWrapper';

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({ ideaNick });
  },
  checkExists: ({ queryResult }) => !!queryResult.data,
  checkAccessMessage: 'Idea not found',
  checkAccess: ({ queryResult, ctx }) => !!ctx.me && queryResult.data?.authorId === ctx.me.id,
  checkExistsMessage: 'An idea can be edited only by the author of the idea',

  setProps: ({ queryResult, ctx, checkAccess, checkExists }) => {
    const idea = checkExists(queryResult.data, 'Idea not found');
    checkAccess(idea.authorId === ctx?.me?.id, 'An idea can be edited only by the author of the idea');
    return { idea };
  },
  title: ({ idea }) => `Edit idea: ${idea.nick}`,
  isTitleExact: true,
})(({ idea }) => <EditIdeaComponent idea={idea} />);
