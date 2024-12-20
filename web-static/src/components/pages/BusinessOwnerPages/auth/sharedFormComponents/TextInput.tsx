import React from 'react';
import { FieldError } from 'react-hook-form';

type TextInputProps = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    register: any;
    error?: FieldError;
};

const TextInput: React.FC<TextInputProps> = ({ id, label, type = 'text', placeholder, register, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            id={id}
            type={type}
            {...register(id)}
            placeholder={placeholder}
            className={`mt-1 p-2 border rounded-md w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
);

export default TextInput;
