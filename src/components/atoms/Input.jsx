import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  className = '',
  options = [], // For type 'select'
  min, // For type 'number'
  max, // For type 'number'
  placeholder,
  required = false,
  disabled = false,
  ...rest
}) => {
  const baseClasses = "w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
  const combinedClasses = `${baseClasses} ${className}`;

  if (type === 'select') {
    return (
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={combinedClasses}
        required={required}
        disabled={disabled}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={combinedClasses}
      min={min}
      max={max}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      {...rest}
    />
  );
};

export default Input;