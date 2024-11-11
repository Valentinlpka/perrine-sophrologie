// components/TextField.tsx
import React from 'react';

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    required?: boolean;
    multiline?: boolean;
    rows?: number;
    placeholder?: string;
    className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
    label,
    value,
    onChange,
    type = 'text',
    required = false,
    multiline = false,
    rows = 3,
    placeholder = '',
    className = ''
}) => {
    return (
        <div className={`relative ${className}`}>
            <label className="absolute -top-2 left-2 inline-block px-1 bg-white text-sm font-medium text-gray-600">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    placeholder={placeholder}
                    required={required}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 
                    focus:outline-none focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50
                    placeholder:text-gray-400 transition-colors duration-200"
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 
                    focus:outline-none focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50
                    placeholder:text-gray-400 transition-colors duration-200"
                />
            )}
        </div>
    );
};

export default TextField;