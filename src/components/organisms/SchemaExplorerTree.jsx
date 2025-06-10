import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Spinner from '@/components/atoms/Spinner';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import LinkButton from '@/components/atoms/LinkButton';
import Card from '@/components/molecules/Card';
import EmptyState from '@/components/molecules/EmptyState';
import connectionService from '@/services/api/connectionService';
import schemaService from '@/services/api/schemaService';
import { toast } from 'react-toastify';

const SchemaExplorerTree = () => {
  const [activeConnection, setActiveConnection] = useState(null);
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedTables, setExpandedTables] = useState(new Set());

  useEffect(() => {
    loadActiveConnection();
  }, []);

  const loadActiveConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const connections = await connectionService.getAll();
      const active = connections.find(conn => conn.isActive);
      if (active) {
        setActiveConnection(active);
        await loadSchema(active.id);
      } else {
        setError('No active connection found');
      }
    } catch (err) {
      setError(err.message || 'Failed to load connection');
      toast.error('Failed to load active connection');
    } finally {
      setLoading(false);
    }
  };

  const loadSchema = async (connectionId) => {
    try {
      const schemaData = await schemaService.getSchema(connectionId);
      setSchema(schemaData);
    } catch (err) {
      toast.error('Failed to load schema');
    }
  };

  const toggleTable = (tableName) => {
    setExpandedTables(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(tableName)) {
        newExpanded.delete(tableName);
      } else {
        newExpanded.add(tableName);
      }
      return newExpanded;
    });
  };

  const getTypeIcon = (dataType) => {
    if (dataType.includes('int') || dataType.includes('number')) return 'Hash';
    if (dataType.includes('varchar') || dataType.includes('text') || dataType.includes('string')) return 'Type';
    if (dataType.includes('date') || dataType.includes('time')) return 'Calendar';
    if (dataType.includes('bool')) return 'ToggleLeft';
    return 'Circle';
  };

  const getTypeColor = (dataType) => {
    if (dataType.includes('int') || dataType.includes('number')) return 'text-blue-600';
    if (dataType.includes('varchar') || dataType.includes('text') || dataType.includes('string')) return 'text-green-600';
    if (dataType.includes('date') || dataType.includes('time')) return 'text-purple-600';
    if (dataType.includes('bool')) return 'text-orange-600';
    return 'text-surface-600';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card
              key={i}
              animated
              transition={{ delay: i * 0.1 }}
              className="p-4 shadow-sm animate-pulse"
            >
              <div className="space-y-3">
                <div className="h-4 bg-surface-200 rounded w-1/4"></div>
                <div className="space-y-2 ml-4">
                  <div className="h-3 bg-surface-200 rounded w-3/4"></div>
                  <div className="h-3 bg-surface-200 rounded w-1/2"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <EmptyState
          iconName="AlertCircle"
          title="Failed to load schema"
          message={error}
          buttonText="Try Again"
          onButtonClick={loadActiveConnection}
          buttonIcon="RefreshCw"
        />
      </div>
    );
  }

  if (!activeConnection) {
    return (
      <div className="p-6">
        <EmptyState
          iconName="Database"
          title="No Active Connection"
          message="Please connect to a database to explore its schema"
          buttonText="Manage Connections"
          onButtonClick={() => window.location.href = '/connections'}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-surface-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <Heading level={2} className="text-2xl font-semibold text-surface-900 mb-2">Schema Explorer</Heading>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-surface-600">{activeConnection.name} ({activeConnection.database})</span>
            </div>
          </div>
          <LinkButton
            onClick={() => loadSchema(activeConnection.id)}
            className="flex items-center space-x-2 px-4 py-2 border border-surface-300 rounded-lg hover:bg-surface-50 transition-colors"
            icon={<ApperIcon name="RefreshCw" size={16} />}
            variant="outline"
            animated
          >
            Refresh
          </LinkButton>
        </div>
      </div>

      {/* Schema Tree */}
      <div className="flex-1 overflow-y-auto p-6">
        {schema ? (
          <div className="space-y-6">
            {/* Tables */}
            {schema.tables && schema.tables.length > 0 && (
              <div>
                <Heading level={3} className="text-lg font-medium text-surface-900 mb-4 flex items-center">
                  <ApperIcon name="Table" className="w-5 h-5 mr-2" />
                  Tables ({schema.tables.length})
                </Heading>
                <div className="space-y-2">
                  {schema.tables.map((table, index) => (
                    <Card
                      key={table.name}
                      animated
                      transition={{ delay: index * 0.05 }}
                      className="rounded-lg overflow-hidden border border-surface-200"
                    >
                      <motion.div
                        whileHover={{ backgroundColor: '#f8fafc' }}
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleTable(table.name)}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={{ rotate: expandedTables.has(table.name) ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ApperIcon name="ChevronRight" size={16} className="text-surface-400" />
                          </motion.div>
                          <ApperIcon name="Table" size={18} className="text-primary" />
                          <span className="font-medium text-surface-900">{table.name}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-surface-500">
                          <span>{table.columns?.length || 0} columns</span>
                          <span>{table.rowCount || '—'} rows</span>
                        </div>
                      </motion.div>

                      <AnimatePresence>
                        {expandedTables.has(table.name) && table.columns && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-surface-200 overflow-hidden"
                          >
                            <div className="p-4 bg-surface-50">
                              <div className="space-y-2">
                                {table.columns.map((column, colIndex) => (
                                  <motion.div
                                    key={column.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: colIndex * 0.02 }}
                                    className="flex items-center justify-between py-2 px-3 bg-white rounded border border-surface-200"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <ApperIcon 
                                        name={getTypeIcon(column.type)} 
                                        size={14} 
                                        className={getTypeColor(column.type)}
                                      />
                                      <span className="font-mono text-sm text-surface-900">{column.name}</span>
                                      {column.isPrimaryKey && (
                                        <span className="px-2 py-1 text-xs bg-warning/20 text-warning rounded">PK</span>
                                      )}
                                      {column.isNullable === false && (
                                        <span className="px-2 py-1 text-xs bg-error/20 text-error rounded">NOT NULL</span>
                                      )}
                                    </div>
                                    <div className="text-sm text-surface-500 font-mono">
                                      {column.type}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Views */}
            {schema.views && schema.views.length > 0 && (
              <div>
                <Heading level={3} className="text-lg font-medium text-surface-900 mb-4 flex items-center">
                  <ApperIcon name="Eye" className="w-5 h-5 mr-2" />
                  Views ({schema.views.length})
                </Heading>
                <div className="space-y-2">
                  {schema.views.map((view, index) => (
                    <Card
                      key={view.name}
                      animated
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border border-surface-200"
                    >
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="Eye" size={18} className="text-accent" />
                        <span className="font-medium text-surface-900">{view.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Procedures */}
            {schema.procedures && schema.procedures.length > 0 && (
              <div>
                <Heading level={3} className="text-lg font-medium text-surface-900 mb-4 flex items-center">
                  <ApperIcon name="Zap" className="w-5 h-5 mr-2" />
                  Procedures ({schema.procedures.length})
                </Heading>
                <div className="space-y-2">
                  {schema.procedures.map((procedure, index) => (
                    <Card
                      key={procedure.name}
                      animated
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border border-surface-200"
                    >
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="Zap" size={18} className="text-warning" />
                        <span className="font-medium text-surface-900">{procedure.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {(!schema.tables || schema.tables.length === 0) && 
             (!schema.views || schema.views.length === 0) && 
             (!schema.procedures || schema.procedures.length === 0) && (
              <EmptyState
                iconName="Database"
                title="No Schema Found"
                message="The database appears to be empty or the schema could not be loaded"
              />
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Spinner className="w-8 h-8 text-primary mx-auto mb-4" />
            <Paragraph className="text-surface-600">Loading schema...</Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaExplorerTree;