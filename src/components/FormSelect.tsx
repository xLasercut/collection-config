import {Controller, FieldValues, UseFormRegister, UseFormReturn} from 'react-hook-form';
import {Select} from 'nhsuk-react-components';
import {getFormErrorMessage} from './form-helper.ts';

interface TFormSelectProps<T extends FieldValues> {
  label?: string;
  hint?: string;
  formField: Parameters<UseFormRegister<T>>['0'];
  formHandler: UseFormReturn<T>;
  id?: string;
  disabled?: boolean;
  items: {value: string; text: string}[];
}

function FormSelect<T extends FieldValues>({
  formField,
  formHandler,
  items,
  ...rest
}: TFormSelectProps<T>) {
  return (
    <Controller
      name={formField}
      control={formHandler.control}
      render={({field: {name, onChange, value}}) => {
        return (
          <Select
            {...rest}
            name={name}
            value={value}
            onChange={onChange}
            error={getFormErrorMessage<T>(formField, formHandler.formState.errors)}
          >
            {items.map(item => {
              return <Select.Option value={item.value}>{item.text}</Select.Option>;
            })}
          </Select>
        );
      }}
    />
  );
}

export {FormSelect};
