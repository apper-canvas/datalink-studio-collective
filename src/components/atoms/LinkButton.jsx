import React from 'react';
import { motion } from 'framer-motion';

const LinkButton = ({ children, onClick, className = '', icon: Icon, ...rest }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 bg-primary text-white rounded-lg hover:brightness-110 transition-all ${className}`}
      {...rest}
    >
      {Icon && React.isValidElement(Icon) ? Icon : (Icon && typeof Icon === 'function' ? <Icon className="mr-2" /> : null)}
      {children}
    </motion.button>
  );
};

export default LinkButton;