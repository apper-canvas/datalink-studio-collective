import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  className = '',
  variant = 'default', // 'default', 'primary', 'secondary', 'danger', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  animated = false, // If true, uses framer-motion animations
  motionProps = {}, // Props specific to framer-motion, like whileHover, whileTap, etc.
  ...rest
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    default: 'bg-surface-100 text-surface-800 hover:bg-surface-200 border border-surface-200',
    primary: 'bg-primary text-white hover:brightness-110',
    secondary: 'bg-accent text-white hover:brightness-110',
    danger: 'bg-error text-white hover:brightness-110',
    outline: 'border border-surface-300 text-surface-700 hover:bg-surface-50',
    ghost: 'text-surface-700 hover:bg-surface-100'
  }[variant];

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }[size];

  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (animated) {
    return (
      <motion.button
        onClick={onClick}
        className={combinedClasses}
        disabled={disabled}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;