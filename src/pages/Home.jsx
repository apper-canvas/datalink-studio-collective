import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';
import connectionService from '../services/api/connectionService';
import queryService from '../services/api/queryService';
import { toast } from 'react-toastify';

function Home() {
  const [connections, setConnections] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [connectionsData, queriesData] = await Promise.all([
        connectionService.getAll(),
        queryService.getAll()
      ]);
      
      setConnections(connectionsData);
      setRecentQueries(queriesData.slice(0, 5)); // Latest 5 queries
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const connectToDatabase = async (connectionId) => {
    try {
      await connectionService.connect(connectionId);
      toast.success('Connected successfully');
      navigate('/query-editor');
    } catch (error) {
      toast.error('Connection failed');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-surface-200"
            >
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                <div className="h-4 bg-surface-200 rounded w-1/2"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-surface-900 mb-2">Dashboard</h1>
        <p className="text-surface-600">Manage your database connections and queries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-surface-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-surface-900">Quick Connect</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/connections')}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ApperIcon name="Plus" size={20} />
            </motion.button>
          </div>

          {connections.length > 0 ? (
            <div className="space-y-3">
              {connections.slice(0, 4).map((connection) => (
                <motion.div
                  key={connection.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors cursor-pointer"
                  onClick={() => connectToDatabase(connection.id)}
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
            <div className="text-center py-8">
              <ApperIcon name="Database" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500 mb-4">No connections configured</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/connections')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-110 transition-all"
              >
                Add Connection
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Recent Queries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-surface-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-surface-900">Recent Queries</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/query-editor')}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ApperIcon name="Code2" size={20} />
            </motion.button>
          </div>

          {recentQueries.length > 0 ? (
            <div className="space-y-3">
              {recentQueries.map((query) => (
                <motion.div
                  key={query.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 border border-surface-200 rounded-lg hover:bg-surface-50 transition-colors cursor-pointer"
                  onClick={() => navigate('/query-editor')}
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
            <div className="text-center py-8">
              <ApperIcon name="History" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500 mb-4">No recent queries</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/query-editor')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-110 transition-all"
              >
                Start Querying
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ApperIcon name="Database" className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-surface-900">{connections.length}</p>
              <p className="text-sm text-surface-600">Total Connections</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-success/10 rounded-lg">
              <div className="w-6 h-6 bg-success rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-semibold text-surface-900">
                {connections.filter(c => c.isActive).length}
              </p>
              <p className="text-sm text-surface-600">Active Connections</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <ApperIcon name="Code2" className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-surface-900">{recentQueries.length}</p>
              <p className="text-sm text-surface-600">Recent Queries</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;