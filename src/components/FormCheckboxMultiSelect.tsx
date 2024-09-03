import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormReturn,
} from 'react-hook-form';
import {Checkboxes} from 'nhsuk-react-components';
import {getFormErrorMessage} from './form-helper.ts';

interface TFormCheckboxMultiSelectProps<T extends FieldValues> {
  label?: string;
  hint?: string;
  formField: Parameters<UseFormRegister<T>>['0'];
  formHandler: UseFormReturn<T>;
  id?: string;
  disabled?: boolean;
  items: {value: string; text: string}[];
}

function FormCheckboxMultiSelect<T extends FieldValues>({
  formField,
  formHandler,
  items,
  ...rest
}: TFormCheckboxMultiSelectProps<T>) {
  const formFieldValue = formHandler.watch(formField);

  function updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      const value = [...formFieldValue, e.target.value] as PathValue<T, Path<T>>;
      formHandler.setValue(formField, value);
    } else {
      const value = formFieldValue.filter((item: string) => item !== e.target.value);
      formHandler.setValue(formField, value);
    }
  }

  return (
    <Controller
      name={formField}
      control={formHandler.control}
      render={({field: {name, value}}) => {
        return (
          <Checkboxes
            {...rest}
            name={name}
            error={getFormErrorMessage<T>(formField, formHandler.formState.errors)}
          >
            {items.map(item => {
              return (
                <Checkboxes.Box
                  value={item.value}
                  checked={value.includes(item.value)}
                  onChange={updateValue}
                >
                  {item.text}
                </Checkboxes.Box>
              );
            })}
          </Checkboxes>
        );
      }}
    />
  );
}

export {FormCheckboxMultiSelect};
