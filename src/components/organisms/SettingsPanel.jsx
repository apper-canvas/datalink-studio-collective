import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // Keep framer-motion here for specific animations
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/molecules/Card';
import FormField from '@/components/molecules/FormField';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';

const SettingsPanel = () => {
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
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
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
        <Heading level={2} className="text-2xl font-semibold text-surface-900 mb-2">Settings</Heading>
        <Paragraph className="text-surface-600">Configure your DataLink Studio preferences</Paragraph>
      </div>

      <div className="space-y-8">
        {/* Editor Settings */}
        <Card animated className="bg-white rounded-lg border border-surface-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Code2" className="w-6 h-6 text-primary" />
            <Heading level={3} className="text-lg font-medium text-surface-900">Editor</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Font Size"
              id="fontSize"
              type="select"
              value={settings.editor.fontSize}
              onChange={(e) => updateSetting('editor', 'fontSize', parseInt(e.target.value))}
              options={[
                { value: 12, label: '12px' },
                { value: 14, label: '14px' },
                { value: 16, label: '16px' },
                { value: 18, label: '18px' },
                { value: 20, label: '20px' }
              ]}
            />

            <FormField
              label="Theme"
              id="theme"
              type="select"
              value={settings.editor.theme}
              onChange={(e) => updateSetting('editor', 'theme', e.target.value)}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'monokai', label: 'Monokai' },
                { value: 'github', label: 'GitHub' }
              ]}
            />

            <ToggleSwitch
              label="Auto Complete"
              checked={settings.editor.autoComplete}
              onChange={() => updateSetting('editor', 'autoComplete', !settings.editor.autoComplete)}
            />

            <ToggleSwitch
              label="Line Numbers"
              checked={settings.editor.lineNumbers}
              onChange={() => updateSetting('editor', 'lineNumbers', !settings.editor.lineNumbers)}
            />

            <ToggleSwitch
              label="Word Wrap"
              checked={settings.editor.wordWrap}
              onChange={() => updateSetting('editor', 'wordWrap', !settings.editor.wordWrap)}
            />
          </div>
        </Card>

        {/* Connection Settings */}
        <Card animated transition={{ delay: 0.1 }} className="bg-white rounded-lg border border-surface-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Database" className="w-6 h-6 text-primary" />
            <Heading level={3} className="text-lg font-medium text-surface-900">Connection</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Timeout (seconds)"
              id="timeout"
              type="number"
              value={settings.connection.timeout}
              onChange={(e) => updateSetting('connection', 'timeout', parseInt(e.target.value))}
              min="5"
              max="300"
            />

            <FormField
              label="Max Retries"
              id="maxRetries"
              type="number"
              value={settings.connection.maxRetries}
              onChange={(e) => updateSetting('connection', 'maxRetries', parseInt(e.target.value))}
              min="0"
              max="10"
            />

            <ToggleSwitch
              label="Auto Reconnect"
              checked={settings.connection.autoReconnect}
              onChange={() => updateSetting('connection', 'autoReconnect', !settings.connection.autoReconnect)}
            />
          </div>
        </Card>

        {/* Results Settings */}
        <Card animated transition={{ delay: 0.2 }} className="bg-white rounded-lg border border-surface-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <ApperIcon name="Table" className="w-6 h-6 text-primary" />
            <Heading level={3} className="text-lg font-medium text-surface-900">Results</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Max Rows"
              id="maxRows"
              type="select"
              value={settings.results.maxRows}
              onChange={(e) => updateSetting('results', 'maxRows', parseInt(e.target.value))}
              options={[
                { value: 100, label: '100' },
                { value: 500, label: '500' },
                { value: 1000, label: '1,000' },
                { value: 5000, label: '5,000' },
                { value: 10000, label: '10,000' }
              ]}
            />

            <FormField
              label="Page Size"
              id="pageSize"
              type="select"
              value={settings.results.pageSize}
              onChange={(e) => updateSetting('results', 'pageSize', parseInt(e.target.value))}
              options={[
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
                { value: 200, label: '200' }
              ]}
            />

            <FormField
              label="Export Format"
              id="exportFormat"
              type="select"
              value={settings.results.exportFormat}
              onChange={(e) => updateSetting('results', 'exportFormat', e.target.value)}
              options={[
                { value: 'csv', label: 'CSV' },
                { value: 'json', label: 'JSON' },
                { value: 'xlsx', label: 'Excel' },
                { value: 'sql', label: 'SQL' }
              ]}
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            onClick={resetSettings}
            variant="outline"
            motionProps={{ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }}
            animated
          >
            Reset to Defaults
          </Button>

          <Button
            onClick={saveSettings}
            disabled={loading}
            variant="primary"
            motionProps={{ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }}
            animated
          >
            {loading ? (
              <>
                <Spinner size={16} className="mr-2" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;