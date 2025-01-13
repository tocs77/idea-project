import React, { PropsWithChildren } from 'react';
import classes from './Segment.module.scss';

interface SegmentProps {
  title: React.ReactNode;
  size?: 1 | 2;
  description?: string;
}

export const Segment = (props: PropsWithChildren<SegmentProps>) => {
  const { title, description, children, size = 1 } = props;
  return (
    <div className={classes.Segment}>
      {size === 1 ? <h1 className={classes.title}>{title}</h1> : <h2 className={classes.title}>{title}</h2>}
      {description && <p className={classes.description}>{description}</p>}
      {children && <div className={classes.content}>{children}</div>}
    </div>
  );
};
