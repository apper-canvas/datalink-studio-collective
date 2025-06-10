import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import LinkButton from '@/components/atoms/LinkButton';

const EmptyState = ({
  iconName,
  title,
  message,
  buttonText,
  onButtonClick,
  buttonIcon,
  className = '',
  animated = false,
  iconAnimateProps = { animate: { y: [0, -10, 0] }, transition: { repeat: Infinity, duration: 3 } },
  ...rest
}) => {
  const Content = () => (
    <div className={`text-center py-12 ${className}`} {...rest}>
      {animated ? (
        <motion.div {...iconAnimateProps}>
          <ApperIcon name={iconName} className="w-16 h-16 text-surface-300 mx-auto" />
        </motion.div>
      ) : (
        <ApperIcon name={iconName} className="w-12 h-12 text-surface-300 mx-auto mb-4" />
      )}
      <Heading level={3} className="mt-4 text-lg font-medium text-surface-900">{title}</Heading>
      <Paragraph className="mt-2 text-surface-500">{message}</Paragraph>
      {buttonText && onButtonClick && (
        <LinkButton onClick={onButtonClick} className="mt-4" icon={buttonIcon ? <ApperIcon name={buttonIcon} size={18} className="mr-2" /> : null}>
          {buttonText}
        </LinkButton>
      )}
    </div>
  );

  return animated ? (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <Content />
    </motion.div>
  ) : (
    <Content />
  );
};

export default EmptyState;