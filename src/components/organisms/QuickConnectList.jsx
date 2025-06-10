import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import EmptyState from '@/components/molecules/EmptyState';

const QuickConnectList = ({ connections, onConnect, onAddConnection }) => {
  return (
    <>
      {connections.length > 0 ? (
        <div className="space-y-3">
          {connections.slice(0, 4).map((connection) => (
            <motion.div
              key={connection.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors cursor-pointer"
              onClick={() => onConnect(connection.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  connection.isActive ? 'bg-success' : 'bg-surface-300'
                }`}></div>
                <div>
                  <p className="font-medium text-surface-900">{connection.name}</p>
                  <p className="text-sm text-surface-600">{connection.type} • {connection.host}</p>
                </div>
              </div>
              <ApperIcon name="ChevronRight" size={16} className="text-surface-400" />
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          iconName="Database"
          title="No connections configured"
          message="Start by adding a new database connection"
          buttonText="Add Connection"
          onButtonClick={onAddConnection}
        />
      )}
    </>
  );
};

export default QuickConnectList;