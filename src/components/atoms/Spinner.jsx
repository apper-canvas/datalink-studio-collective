import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Spinner = ({ size = 16, className = 'text-primary' }) => {
  return (
    <ApperIcon name="Loader2" size={size} className={`${className} animate-spin`} />
  );
};

export default Spinner;