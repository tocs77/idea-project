import { classNames } from '@/shared/lib';
import classes from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color?: 'red' | 'green' | 'brown';
}
export const Button = (props: ButtonProps) => {
  const { loading = false, children, className, color = 'green', ...rest } = props;
  return (
    <button
      className={classNames(classes.Button, { [classes.loading]: loading, [classes[color]]: color }, [className])}
      {...rest}
      type='submit'
      disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  );
};
