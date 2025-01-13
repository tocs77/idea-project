import { Link, Outlet } from 'react-router';
import { routes } from '@/shared/lib';

import classes from './Layout.module.scss';
export const Layout = () => {
  return (
    <div className={classes.Layout}>
      <div className={classes.navigation}>
        <div className={classes.logo}>Idea NIck</div>
        <ul className={classes.menu}>
          <li className={classes.item}>
            <Link to={routes.getAllIdeasRoute()} className={classes.link}>
              All Ideas
            </Link>
          </li>
          <li className={classes.item}>
            <Link to={routes.getNewIdeaRoute()} className={classes.link}>
              Add Idea
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
