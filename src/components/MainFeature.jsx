import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';
import connectionService from '../services/api/connectionService';
import queryService from '../services/api/queryService';
import { toast } from 'react-toastify';

function MainFeature() {
  const [activeConnection, setActiveConnection] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    loadActiveConnection();
  }, []);

  const loadActiveConnection = async () => {
    setLoading(true);
    try {
      const connections = await connectionService.getAll();
      const active = connections.find(conn => conn.isActive);
      setActiveConnection(active);
    } catch (error) {
      toast.error('Failed to load active connection');
    } finally {
      setLoading(false);
    }
  };

  const executeQuery = async () => {
    if (!query.trim()) {
      toast.warning('Please enter a SQL query');
      return;
    }
    
    if (!activeConnection) {
      toast.error('No active connection selected');
      return;
    }

    setExecuting(true);
    try {
      const startTime = Date.now();
      const result = await queryService.execute({
        connectionId: activeConnection.id,
        sql: query,
        executedAt: new Date().toISOString(),
        executionTime: 0,
        rowCount: 0
      });
      
      const executionTime = Date.now() - startTime;
      result.executionTime = executionTime;
      
      setResults(result);
      toast.success(`Query executed in ${executionTime}ms`);
    } catch (error) {
      toast.error('Query execution failed');
    } finally {
      setExecuting(false);
    }
  };

  const formatSQL = () => {
    // Basic SQL formatting
    const formatted = query
      .replace(/\bSELECT\b/gi, 'SELECT')
      .replace(/\bFROM\b/gi, '\nFROM')
      .replace(/\bWHERE\b/gi, '\nWHERE')
      .replace(/\bORDER BY\b/gi, '\nORDER BY')
      .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
      .replace(/\bHAVING\b/gi, '\nHAVING');
    
    setQuery(formatted);
    toast.success('Query formatted');
  };

  const applySyntaxHighlighting = (text) => {
    return text
      .replace(/\b(SELECT|FROM|WHERE|ORDER BY|GROUP BY|HAVING|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/gi, 
               '<span class="sql-keyword">$1</span>')
      .replace(/'([^']*)'/g, '<span class="sql-string">\'$1\'</span>')
      .replace(/\b(\d+)\b/g, '<span class="sql-number">$1</span>')
      .replace(/--([^\n]*)/g, '<span class="sql-comment">--$1</span>');
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="Loader2" className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-surface-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      {/* Query Editor Header */}
      <div className="flex-shrink-0 border-b border-surface-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-surface-900">Query Editor</h2>
            {activeConnection && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-surface text-sm rounded-lg">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-surface-700">{activeConnection.name}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={formatSQL}
              className="px-3 py-2 text-sm border border-surface-300 rounded-lg hover:bg-surface-50 transition-colors"
            >
              <ApperIcon name="Code" size={16} className="mr-2" />
              Format
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={executeQuery}
              disabled={executing || !activeConnection}
              className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {executing ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <ApperIcon name="Play" size={16} className="mr-2" />
                  Execute
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Editor and Results */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* SQL Editor */}
        <div className="flex-1 min-h-0">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your SQL query here..."
            className="w-full h-full p-4 font-mono text-sm border-0 outline-none resize-none bg-white"
            style={{ minHeight: '300px' }}
          />
        </div>

        {/* Results Section */}
        {results && (
          <div className="flex-1 min-h-0 border-t border-surface-200">
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 p-4 bg-surface border-b border-surface-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-surface-900">Results</h3>
                  <div className="flex items-center space-x-4 text-sm text-surface-600">
                    <span>{results.rowCount} rows</span>
                    <span>{results.executionTime}ms</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-4">
                {results.data && results.data.length > 0 ? (
                  <div className="border border-surface-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-surface">
                        <tr>
                          {Object.keys(results.data[0]).map((column) => (
                            <th
                              key={column}
                              className="px-4 py-3 text-left text-sm font-medium text-surface-700 border-b border-surface-200"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.data.map((row, index) => (
                          <tr
                            key={index}
                            className="hover:bg-surface-50 transition-colors"
                          >
                            {Object.values(row).map((value, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-4 py-3 text-sm text-surface-900 border-b border-surface-100 font-mono"
                              >
                                {value !== null ? String(value) : (
                                  <span className="text-surface-400 italic">NULL</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ApperIcon name="Table" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                    <p className="text-surface-500">No results to display</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainFeature;