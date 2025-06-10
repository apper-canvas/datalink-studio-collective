import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  animated = false,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = {},
  ...rest
}) => {
  const baseClasses = "bg-white rounded-lg border border-surface-200 p-6";
  const combinedClasses = `${baseClasses} ${className}`;

  if (animated) {
    return (
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        className={combinedClasses}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;