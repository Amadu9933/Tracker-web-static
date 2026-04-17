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
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const { onChange, onBlur, ref, name } = register(id);

  const isFloating = isFocused || hasValue;

  return (
    <div className="w-full">
      <div className="relative group">

        {/* Focus ring layer */}
        <div
          className={`
            absolute inset-0 rounded-lg transition-all duration-200 pointer-events-none
            ${isFocused && !error
              ? 'shadow-[0_0_0_3px_rgba(var(--color-primary-rgb),0.15)]'
              : ''
            }
            ${isFocused && error
              ? 'shadow-[0_0_0_3px_rgba(239,68,68,0.12)]'
              : ''
            }
          `}
        />

        {/* Input */}
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          disabled={disabled}
          autoComplete="off"
          placeholder={isFloating && placeholder ? placeholder : ''}
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
            peer w-full h-[56px] te-xt-[0.9375rem] rounded-lg border
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-300 dark:placeholder:text-gray-600
            outline-none transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            pt-5 pb-1
            ${rightIcon ? 'pl-4 pr-11' : 'pl-4 pr-4'}
            ${error
              ? 'border-red-400 dark:border-red-500 bg-red-50/30 dark:bg-red-950/10'
              : isFocused
                ? 'border-primary dark:border-primary'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        />

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`
            absolute left-4 pointer-events-none select-none
            transition-all duration-200 ease-out
            ${isFloating
              ? 'top-[8px] text-[10.5px] font-semibold tracking-wide uppercase'
              : 'top-1/2 -translate-y-1/2 text-[0.9375rem] font-normal tracking-normal'
            }
            ${error
              ? 'text-red-400'
              : isFloating && isFocused
                ? 'text-primary'
                : isFloating
                  ? 'text-gray-400 dark:text-gray-500'
                  : 'text-gray-400 dark:text-gray-500'
            }
          `}
        >
          {label}
        </label>

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500">
            {rightIcon}
          </div>
        )}
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

export default TextInput;