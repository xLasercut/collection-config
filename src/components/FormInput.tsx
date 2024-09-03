import {Controller, FieldValues, UseFormRegister, UseFormReturn} from 'react-hook-form';
import {Input} from 'nhsuk-react-components';
import {getFormErrorMessage} from './form-helper.ts';

interface TFormInputProps<T extends FieldValues> {
  label?: string;
  hint?: string;
  formField: Parameters<UseFormRegister<T>>['0'];
  formHandler: UseFormReturn<T>;
  id?: string;
  disabled?: boolean;
}

function FormInput<T extends FieldValues>({formField, formHandler, ...rest}: TFormInputProps<T>) {
  return (
    <Controller
      name={formField}
      control={formHandler.control}
      render={({field: {name, onChange, value}}) => {
        return (
          <Input
            {...rest}
            name={name}
            value={value}
            onChange={onChange}
            error={getFormErrorMessage<T>(formField, formHandler.formState.errors)}
          />
        );
      }}
    />
  );
}

export {FormInput};
