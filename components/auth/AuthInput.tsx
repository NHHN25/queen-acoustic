import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface AuthInputProps<TFormValues extends FieldValues> {
  id: Path<TFormValues>;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<TFormValues>;
  error?: string;
}

const AuthInput = <TFormValues extends FieldValues>({
  id,
  label,
  type,
  placeholder,
  register,
  error
}: AuthInputProps<TFormValues>) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id as string}
        type={type}
        className={`
          w-full px-3 py-2 border rounded-md text-gray-900
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:outline-none focus:ring-1 focus:border-gold-500 focus:ring-gold-500
          placeholder:text-gray-400
        `}
        placeholder={placeholder}
        {...register(id)}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default AuthInput;
