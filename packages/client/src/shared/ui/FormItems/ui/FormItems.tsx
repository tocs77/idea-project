import { PropsWithChildren } from 'react';
import classes from './FormItems.module.scss';
export const FormItems = (props: PropsWithChildren) => {
  return <div className={classes.FormItems}>{props.children}</div>;
};
