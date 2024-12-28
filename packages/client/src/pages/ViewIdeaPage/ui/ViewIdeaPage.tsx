import { useParams } from 'react-router';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams();
  return (
    <div>
      <h1>View Idea Page {ideaNick}</h1>
    </div>
  );
};
