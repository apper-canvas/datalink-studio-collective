import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ label, checked, onChange, className = '', ...rest }) => {
  return (
    <div className={`flex items-center justify-between py-2 ${className}`} {...rest}>
      <label className="text-sm font-medium text-surface-700">
        {label}
      </label>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onChange}
        className={`w-12 h-6 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-surface-300'}`}
        {...rest}
      >
        <motion.div
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-6 h-6 bg-white rounded-full shadow-sm"
        />
      </motion.button>
    </div>
  );
};

export default ToggleSwitch;