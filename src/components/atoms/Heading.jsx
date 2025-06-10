import React from 'react';

const Heading = ({ level, children, className = '', ...rest }) => {
  const baseClasses = 'font-semibold text-surface-900';
  const tagClasses = {
    1: 'text-3xl md:text-4xl mb-4',
    2: 'text-2xl md:text-3xl mb-3',
    3: 'text-xl md:text-2xl mb-2',
    4: 'text-lg md:text-xl mb-1'
  };

  const Tag = `h${level}`;

  return (
    <Tag className={`${baseClasses} ${tagClasses[level]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Heading;