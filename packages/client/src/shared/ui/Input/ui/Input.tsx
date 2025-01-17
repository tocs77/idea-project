import { FormikProps } from 'formik';

import classes from './Input.module.scss';
import { classNames } from '@/shared/lib';

interface InputProps<T extends Record<keyof T, string>>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'value'> {
  name: keyof T;
  formik: FormikProps<T>;
  label: string;
  maxWidth?: number;
}

export const Input = <T extends Record<keyof T, string>>(props: InputProps<T>) => {
  const { name, formik, label, maxWidth, ...rest } = props;
  const value = formik.values[name];
  const error = formik.errors[name] as string;
  const touched = formik.touched[name];
  const stringName = String(name);

  const invalid = !!(error && touched);
  return (
    <div className={classNames(classes.Input, { [classes.disabled]: formik.isSubmitting })}>
      <label htmlFor={stringName} className={classes.label}>
        {label}
      </label>
      <input
        style={{ maxWidth }}
        className={classNames(classes.input, { [classes.invalid]: invalid })}
        onBlur={() => formik.setFieldTouched(stringName)}
        disabled={formik.isSubmitting}
        type='text'
        id={stringName}
        name={stringName}
        value={value}
        onChange={(e) => formik.setFieldValue(stringName, e.target.value)}
        {...rest}
      />
      {invalid && <div className={classes.error}>{error}</div>}
    </div>
  );
};
