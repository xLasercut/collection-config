import {Controller, FieldValues, UseFormRegister, UseFormReturn} from 'react-hook-form';
import {Checkboxes} from 'nhsuk-react-components';

interface TFormCheckboxProps<T extends FieldValues> {
  formField: Parameters<UseFormRegister<T>>['0'];
  formHandler: UseFormReturn<T>;
  children: React.ReactNode;
}

function FormCheckbox<T extends FieldValues>({
  formField,
  formHandler,
  children,
}: TFormCheckboxProps<T>) {
  return (
    <Controller
      control={formHandler.control}
      name={formField}
      render={({field: {value, onChange}}) => {
        return (
          <Checkboxes.Box checked={value} onChange={onChange}>
            {children}
          </Checkboxes.Box>
        );
      }}
    />
  );
}

export {FormCheckbox};
