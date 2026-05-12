import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';

type SelectOption = {
  value: string;
  label: string;
};

type SelectInputProps = {
  id: string;
  label: string;
  register: any;
  error?: FieldError;
  options: SelectOption[];
  disabled?: boolean;
};

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  register,
  error,
  options,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const { onChange, onBlur, ref, name } = register(id);

  const isFloating = isFocused || hasValue;

  const borderClass = error
    ? 'border-red-400 dark:border-red-500'
    : isFocused
      ? 'border-primary dark:border-primary'
      : 'border-gray-300 dark:border-gray-600';

  return (
    <div className="w-full">
      <div className="relative">

        {/* Focus ring */}
        {isFocused && (
          <div
            className={`absolute inset-0 rounded-lg pointer-events-none transition-shadow duration-200 z-10 ${
              error
                ? 'shadow-[0_0_0_3px_rgba(239,68,68,0.12)]'
                : 'shadow-[0_0_0_3px_rgba(var(--color-primary-rgb),0.15)]'
            }`}
          />
        )}

        {/* Select */}
        <select
          id={id}
          name={name}
          ref={ref}
          disabled={disabled}
          defaultValue=""
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            onChange(e);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur(e);
          }}
          className={`
            w-full h-14 text-[0.9375rem] rounded-lg border
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            outline-none transition-colors duration-200 appearance-none cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed
            pl-4 pr-10 pt-5 pb-1
            ${borderClass}
          `}
        >
          <option value="" disabled hidden />
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="dark:bg-gray-900 dark:text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`
            absolute left-4 pointer-events-none select-none
            transition-all duration-200 ease-out
            ${isFloating
              ? 'top-2 text-[10.5px] font-semibold tracking-wide uppercase'
              : 'top-1/2 -translate-y-1/2 text-[0.9375rem] font-normal'
            }
            ${error
              ? 'text-red-400'
              : isFocused
                ? 'text-primary'
                : 'text-gray-400 dark:text-gray-500'
            }
          `}
        >
          {label}
        </label>

        {/* Chevron icon */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isFocused ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-[0.8125rem] mt-1.5 ml-0.5 font-medium">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0 mt-[1px]"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 4a.75.75 0 0 1 1.5 0v3.25a.75.75 0 0 1-1.5 0V5zm.75 6.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
