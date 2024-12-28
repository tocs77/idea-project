import { ViewIdeaRouteParams } from '@/shared/lib/routes';
import { useParams } from 'react-router';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;
  return (
    <div>
      <h1>View Idea Page {ideaNick}</h1>
    </div>
  );
};
