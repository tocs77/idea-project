import { Link, Outlet } from 'react-router';
import { getAllIdeasRoute } from '@/shared/lib/routes';
export const Layout = () => {
  return (
    <div>
      <p>
        <b>Idea NIck</b>
      </p>
      <ul>
        <li>
          <Link to={getAllIdeasRoute()}>All Ideas</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
