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
      <div className="relative">

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
            auth-text-input
            border transition-shadow duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${rightIcon ? '!pr-12' : '!pr-4'}
            ${error
              ? 'border-red-500 dark:border-red-500 shadow-[0_0_0_3.5px_rgba(239,68,68,0.13)]'
              : isFocused
                ? 'border-primary shadow-[0_0_0_3.5px_rgba(var(--color-primary-rgb),0.13)]'
                : 'border-gray-200 dark:border-gray-700/80'
            }
          `}
        />

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`
            absolute left-4 pointer-events-none select-none
            transition-all duration-[180ms] ease-out
            ${isFloating
              ? 'top-[8px] text-[10px] font-bold tracking-[0.1em] uppercase'
              : 'top-1/2 -translate-y-1/2 text-[0.9375rem] font-normal tracking-normal'
            }
            ${error
              ? 'text-red-500'
              : isFocused
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
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 dark:text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="flex items-center gap-1.5 text-red-500 text-[0.8rem] mt-1.5 ml-1 font-medium">
          <svg className="w-3.5 h-3.5 flex-shrink-0 mt-px" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 4a.75.75 0 0 1 1.5 0v3.25a.75.75 0 0 1-1.5 0V5zm.75 6.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
