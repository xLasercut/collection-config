import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';

function getFormErrorMessage<T extends FieldValues>(
  formField: Parameters<UseFormRegister<T>>['0'],
  errors: FieldErrors<T>
): string {
  const error = errors[formField];

  if (!error) {
    return '';
  }

  if (typeof error === 'string') {
    return error;
  }

  return error.message ?? '';
}

class FormError<T extends FieldValues> extends Error {
  public field: Parameters<UseFormRegister<T>>['0'];

  constructor(field: Parameters<UseFormRegister<T>>['0'], message: string) {
    super(message);
    this.field = field;
  }
}

export {getFormErrorMessage, FormError};
