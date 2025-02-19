import { PropsWithChildren } from 'react';

import { classNames } from '@/shared/lib';
import classes from './Alert.module.scss';

interface AlertProps {
  className?: string;
  color: 'red' | 'green' | 'brown';
}

export const Alert = (props: PropsWithChildren<AlertProps>) => {
  const { color, children, className } = props;
  return <div className={classNames(classes.Alert, {}, [className, classes[color]])}>{children}</div>;
};
