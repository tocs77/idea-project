import { Link, Outlet } from 'react-router';
import { getAllIdeasRoute } from '@/shared/lib/routes';

import classes from './Layout.module.scss';
export const Layout = () => {
  return (
    <div className={classes.Layout}>
      <div className={classes.navigation}>
        <div className={classes.logo}>Idea NIck</div>
        <ul className={classes.menu}>
          <li className={classes.item}>
            <Link to={getAllIdeasRoute()} className={classes.link}>
              All Ideas
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};
