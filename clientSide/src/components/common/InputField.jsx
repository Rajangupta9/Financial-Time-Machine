import React, { useState } from 'react';

const InputField = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  error,
  className = '',
  required = false,
  containerClassName = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Determine if the label should float (when focused or has value)
  const shouldFloat = isFocused || value;
  
  return (
    <div className={`relative w-full ${containerClassName}`}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          block w-full px-4 py-3 text-gray-900 border rounded-md appearance-none
          border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 
          focus:ring-indigo-500/30 transition-all
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}
          ${className}
        `}
        placeholder=" " // Always empty placeholder to ensure label visibility
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      
      <label
        htmlFor={id}
        className={`
          absolute text-sm duration-200 transform pointer-events-none transition-all
          ${shouldFloat 
            ? 'text-xs -translate-y-7 left-0 opacity-100 text-indigo-600' 
            : 'top-3 left-4 text-gray-500'}
          ${error && shouldFloat ? 'text-red-500' : ''}
        `}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;