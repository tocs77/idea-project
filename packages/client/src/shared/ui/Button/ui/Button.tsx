import { classNames } from '@/shared/lib';
import classes from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}
export const Button = (props: ButtonProps) => {
  const { loading = false, children, className, ...rest } = props;
  return (
    <button
      className={classNames(classes.Button, { [classes.loading]: loading }, [className])}
      {...rest}
      type='submit'
      disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  );
};
