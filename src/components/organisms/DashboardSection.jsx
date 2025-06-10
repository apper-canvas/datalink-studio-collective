import React from 'react';
import Card from '@/components/molecules/Card';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const DashboardSection = ({ title, onActionClick, actionIcon, children, animated = true, transition = {} }) => {
  return (
    <Card animated={animated} transition={transition}>
      <div className="flex items-center justify-between mb-4">
        <Heading level={2} className="text-lg font-medium text-surface-900 mb-0">{title}</Heading>
        {onActionClick && actionIcon && (
          <Button
            onClick={onActionClick}
            variant="ghost"
            className="text-primary hover:text-primary/80"
            motionProps={{ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }}
            animated
          >
            <ApperIcon name={actionIcon} size={20} />
          </Button>
        )}
      </div>
      {children}
    </Card>
  );
};

export default DashboardSection;