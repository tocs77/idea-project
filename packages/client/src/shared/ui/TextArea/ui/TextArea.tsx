import { FormikProps } from 'formik';

import { classNames } from '@/shared/lib';

import classes from './Textarea.module.scss';

interface TextareaProps<T extends Record<keyof T, string>>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'value'> {
  name: keyof T;
  formik: FormikProps<T>;
  label: string;
}

export const Textarea = <T extends Record<keyof T, string>>(props: TextareaProps<T>) => {
  const { name, formik, label, ...rest } = props;
  const value = formik.values[name];
  const error = formik.errors[name] as string;
  const stringName = String(name);
  const touched = formik.touched[name];
  const invalid = !!(error && touched);
  return (
    <div className={classNames(classes.Textarea, { [classes.disabled]: formik.isSubmitting })}>
      <label htmlFor={stringName} className={classes.label}>
        {label}
      </label>
      <textarea
        className={classNames(classes.input, { [classes.invalid]: invalid })}
        disabled={formik.isSubmitting}
        onBlur={() => formik.setFieldTouched(stringName)}
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
