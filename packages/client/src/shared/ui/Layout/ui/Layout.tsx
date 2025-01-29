import { NavLink, Outlet } from 'react-router';
import { classNames, routes } from '@/shared/lib';

import classes from './Layout.module.scss';
export const Layout = () => {
  return (
    <div className={classes.Layout}>
      <div className={classes.navigation}>
        <div className={classes.logo}>Idea NIck</div>
        <ul className={classes.menu}>
          <li className={classes.item}>
            <NavLink
              to={routes.getAllIdeasRoute()}
              className={({ isActive }) => {
                console.log(isActive);
                return classNames(classes.link, { [classes.active]: isActive });
              }}>
              All Ideas
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to={routes.getNewIdeaRoute()}
              className={({ isActive }) => classNames(classes.link, { [classes.active]: isActive })}>
              Add Idea
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to={routes.getSignupRoute()}
              className={({ isActive }) => classNames(classes.link, { [classes.active]: isActive })}>
              Sign Up
            </NavLink>
          </li>
          <li className={classes.item}>
            <NavLink
              to={routes.getSigninRoute()}
              className={({ isActive }) => classNames(classes.link, { [classes.active]: isActive })}>
              Sign In
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};
