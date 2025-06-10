import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import { toast } from 'react-toastify';

function Settings() {
  const [settings, setSettings] = useState({
    editor: {
      fontSize: 14,
      theme: 'light',
      autoComplete: true,
      lineNumbers: true,
      wordWrap: true
    },
    connection: {
      timeout: 30,
      maxRetries: 3,
      autoReconnect: true
    },
    results: {
      maxRows: 1000,
      pageSize: 50,
      exportFormat: 'csv'
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('datalink-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('datalink-settings', JSON.stringify(settings));
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      editor: {
        fontSize: 14,
        theme: 'light',
        autoComplete: true,
        lineNumbers: true,
        wordWrap: true
      },
      connection: {
        timeout: 30,
        maxRetries: 3,
        autoReconnect: true
      },
      results: {
        maxRows: 1000,
        pageSize: 50,
        exportFormat: 'csv'
      }
    };
    setSettings(defaultSettings);
    toast.success('Settings reset to defaults');
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto max-w-full overflow-hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-surface-900 mb-2">Settings</h1>
        <p className="text-surface-600">Configure your DataLink Studio preferences</p>
      </div>

      <div className="space-y-8">
        {/* Editor Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Code2" className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-medium text-surface-900">Editor</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Font Size
              </label>
              <select
                value={settings.editor.fontSize}
                onChange={(e) => updateSetting('editor', 'fontSize', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={12}>12px</option>
                <option value={14}>14px</option>
                <option value={16}>16px</option>
                <option value={18}>18px</option>
                <option value={20}>20px</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Theme
              </label>
              <select
                value={settings.editor.theme}
                onChange={(e) => updateSetting('editor', 'theme', e.target.value)}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="monokai">Monokai</option>
                <option value="github">GitHub</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="text-sm font-medium text-surface-700">
                Auto Complete
              </label>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSetting('editor', 'autoComplete', !settings.editor.autoComplete)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.editor.autoComplete ? 'bg-primary' : 'bg-surface-300'
                }`}
              >
                <motion.div
                  animate={{ x: settings.editor.autoComplete ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="text-sm font-medium text-surface-700">
                Line Numbers
              </label>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSetting('editor', 'lineNumbers', !settings.editor.lineNumbers)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.editor.lineNumbers ? 'bg-primary' : 'bg-surface-300'
                }`}
              >
                <motion.div
                  animate={{ x: settings.editor.lineNumbers ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                />
              </motion.button>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="text-sm font-medium text-surface-700">
                Word Wrap
              </label>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSetting('editor', 'wordWrap', !settings.editor.wordWrap)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.editor.wordWrap ? 'bg-primary' : 'bg-surface-300'
                }`}
              >
                <motion.div
                  animate={{ x: settings.editor.wordWrap ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Connection Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Database" className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-medium text-surface-900">Connection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Timeout (seconds)
              </label>
              <input
                type="number"
                value={settings.connection.timeout}
                onChange={(e) => updateSetting('connection', 'timeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="5"
                max="300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Max Retries
              </label>
              <input
                type="number"
                value={settings.connection.maxRetries}
                onChange={(e) => updateSetting('connection', 'maxRetries', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                max="10"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="text-sm font-medium text-surface-700">
                Auto Reconnect
              </label>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSetting('connection', 'autoReconnect', !settings.connection.autoReconnect)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.connection.autoReconnect ? 'bg-primary' : 'bg-surface-300'
                }`}
              >
                <motion.div
                  animate={{ x: settings.connection.autoReconnect ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Results Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-surface-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Table" className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-medium text-surface-900">Results</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Max Rows
              </label>
              <select
                value={settings.results.maxRows}
                onChange={(e) => updateSetting('results', 'maxRows', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={100}>100</option>
                <option value={500}>500</option>
                <option value={1000}>1,000</option>
                <option value={5000}>5,000</option>
                <option value={10000}>10,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Page Size
              </label>
              <select
                value={settings.results.pageSize}
                onChange={(e) => updateSetting('results', 'pageSize', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Export Format
              </label>
              <select
                value={settings.results.exportFormat}
                onChange={(e) => updateSetting('results', 'exportFormat', e.target.value)}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="xlsx">Excel</option>
                <option value="sql">SQL</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSettings}
            className="px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors"
          >
            Reset to Defaults
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveSettings}
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Settings;