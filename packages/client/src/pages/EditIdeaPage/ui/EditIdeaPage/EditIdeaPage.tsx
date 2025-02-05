import { trpc } from '@/shared/lib';
import { ViewIdeaRouteParams } from '@/shared/lib/routes';
import { useParams } from 'react-router';
import { EditIdeaComponent } from '../EditIdeaComponent/EditIdeaComponent';
import { useMe } from '@/providers';

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const { data: idea, isLoading: ideaLoading, error: ideaError } = trpc.getIdea.useQuery({ ideaNick });
  const me = useMe();

  if (ideaLoading) return <div>Loading...</div>;

  if (ideaError) return <div>{ideaError.message}</div>;

  if (!idea) return <div>Not found</div>;

  if (!me) return <div>You are not logged in</div>;

  if (idea.authorId !== me.id) {
    return <div>You are not the author of this idea</div>;
  }

  return <EditIdeaComponent idea={idea} />;
};
