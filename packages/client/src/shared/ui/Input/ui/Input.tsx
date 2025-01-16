import { FormikProps } from 'formik';

interface InputProps<T extends Record<keyof T, string>>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'value'> {
  name: keyof T;
  formik: FormikProps<T>;
  label: string;
}

export const Input = <T extends Record<keyof T, string>>(props: InputProps<T>) => {
  const { name, formik, label, ...rest } = props;
  const value = formik.values[name];
  const error = formik.errors[name] as string;
  const touched = formik.touched[name];
  const stringName = String(name);
  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor={stringName}>{label}</label>
      <br />
      <input
        onBlur={() => formik.setFieldTouched(stringName)}
        disabled={formik.isSubmitting}
        type='text'
        id={stringName}
        name={stringName}
        value={value}
        onChange={(e) => formik.setFieldValue(stringName, e.target.value)}
        {...rest}
      />
      {touched && error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
