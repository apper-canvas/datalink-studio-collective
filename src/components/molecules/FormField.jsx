import React from 'react';
import Input from '@/components/atoms/Input';

const FormField = ({ label, id, type, value, onChange, options, min, max, placeholder, required, className }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-surface-700 mb-1">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        options={options}
        min={min}
        max={max}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormField;