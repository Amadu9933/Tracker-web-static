import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';

type TextInputProps = {
  id: string;
  label: string;
  type?: string;
  register: any;
  error?: FieldError;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  error,
  rightIcon,
  disabled,
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const { onChange, onBlur, ref, name } = register(id);

  const isFloating = isFocused || hasValue;

  return (
    <div className="w-full">
      <div className="relative">

        {/* Input */}
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          disabled={disabled}
          autoComplete="off"
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
            peer w-full -pl-3 h-12 text-sm rounded-md border
            bg-white dark:bg-[#111827]
            text-gray-900 dark:text-gray-100
            outline-none transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${rightIcon ? 'pr-10' : ''}
            ${error
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-primary focus:border-primary'
            }
          `}
        />

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`
            absolute left-3 px-0.5
            bg-white dark:bg-[#111827]
            pointer-events-none select-none
            transition-all duration-200 ease-in-out
            ${isFloating
              ? '-top-2 text-[11px] font-medium'   // floated up — stays here permanently once value exists
              : 'top-3.5 text-sm'                   // resting inside input
            }
            ${error
              ? 'text-red-500'
              : isFloating && isFocused
                ? 'text-primary dark:text-orange-400'   // active colour while focused
                : 'text-gray-400 dark:text-gray-500'    // neutral when filled but not focused
            }
          `}
        >
          {label}
        </label>

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default TextInput;