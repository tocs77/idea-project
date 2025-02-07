interface ErrorMessageProps {
  className?: string;
  title?: string;
  message: string;
}

import { classNames } from '@/shared/lib';
import classes from './ErrorMessage.module.scss';

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { className, title, message } = props;
  return (
    <div className={classNames(classes.ErrorMessage, {}, [className])}>
      {title && <h2 className={classes.title}>{title}</h2>}
      <p className={classes.message}>{message}</p>
    </div>
  );
};
