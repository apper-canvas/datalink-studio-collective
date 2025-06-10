import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/molecules/Card';
import { motion } from 'framer-motion'; // For the animated property on Card

const StatsCard = ({ iconName, iconColorClass, title, value, index }) => {
  return (
    <Card
      animated
      transition={{ delay: 0.2 + index * 0.1 }}
      className="bg-white rounded-lg border border-surface-200 p-6"
    >
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-lg ${iconColorClass}/10`}>
          {iconName === 'ActiveDot' ? ( // Special case for a simple dot icon
            <div className={`w-6 h-6 ${iconColorClass} rounded-full`}></div>
          ) : (
            <ApperIcon name={iconName} className={`w-6 h-6 ${iconColorClass}`} />
          )}
        </div>
        <div>
          <p className="text-2xl font-semibold text-surface-900">{value}</p>
          <p className="text-sm text-surface-600">{title}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;