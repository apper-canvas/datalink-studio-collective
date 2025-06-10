import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/molecules/Card';

const ConnectionItem = ({ connection, onEdit, onDelete, onConnect, index }) => {
  return (
    <Card
      animated
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg border border-surface-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            connection.isActive ? 'bg-success' : 'bg-surface-300'
          }`}></div>
          <h3 className="font-medium text-surface-900">{connection.name}</h3>
        </div>
        <div className="flex space-x-1">
          <Button
            onClick={() => onEdit(connection)}
            variant="ghost"
            size="sm"
            className="p-1 text-surface-400 hover:text-surface-600"
            motionProps={{ whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } }}
            animated
          >
            <ApperIcon name="Edit2" size={16} />
          </Button>
          <Button
            onClick={() => onDelete(connection.id)}
            variant="ghost"
            size="sm"
            className="p-1 text-surface-400 hover:text-error"
            motionProps={{ whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 } }}
            animated
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-surface-600 mb-4">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Server" size={14} />
          <span>{connection.type.toUpperCase()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Globe" size={14} />
          <span>{connection.host}:{connection.port}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Database" size={14} />
          <span>{connection.database}</span>
        </div>
        {connection.lastConnected && (
          <div className="flex items-center space-x-2">
            <ApperIcon name="Clock" size={14} />
            <span>Last: {new Date(connection.lastConnected).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <Button
        onClick={() => onConnect(connection.id)}
        disabled={connection.isActive}
        className={`w-full py-2 rounded-lg text-sm font-medium ${
          connection.isActive
            ? 'bg-success text-white cursor-not-allowed'
            : 'bg-primary text-white hover:brightness-110'
        }`}
        motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
        animated
      >
        {connection.isActive ? 'Connected' : 'Connect'}
      </Button>
    </Card>
  );
};

export default ConnectionItem;