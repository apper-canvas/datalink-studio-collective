import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import EmptyState from '@/components/molecules/EmptyState';

const RecentQueriesList = ({ queries, onQueryClick, onStartQuerying }) => {
  return (
    <>
      {queries.length > 0 ? (
        <div className="space-y-3">
          {queries.map((query) => (
            <motion.div
              key={query.id}
              whileHover={{ scale: 1.02 }}
              className="p-3 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors cursor-pointer"
              onClick={() => onQueryClick(query.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm text-surface-900 truncate">
                    {query.sql}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-surface-500">
                    <span>{query.rowCount} rows</span>
                    <span>{query.executionTime}ms</span>
                    <span>{new Date(query.executedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <ApperIcon name="Clock" size={14} className="text-surface-400 flex-shrink-0 ml-2" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          iconName="History"
          title="No recent queries"
          message="Start querying your databases"
          buttonText="Start Querying"
          onButtonClick={onStartQuerying}
        />
      )}
    </>
  );
};

export default RecentQueriesList;