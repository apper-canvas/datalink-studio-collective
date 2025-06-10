import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import EmptyState from '@/components/molecules/EmptyState';
import ConnectionItem from '@/components/organisms/ConnectionItem';
import ConnectionForm from '@/components/organisms/ConnectionForm';
import Modal from '@/components/molecules/Modal';
import connectionService from '@/services/api/connectionService';

const ConnectionList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingConnection, setEditingConnection] = useState(null);

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await connectionService.getAll();
      setConnections(data);
    } catch (err) {
      setError(err.message || 'Failed to load connections');
      toast.error('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingConnection) {
        const updated = await connectionService.update(editingConnection.id, formData);
        setConnections(connections.map(conn => 
          conn.id === editingConnection.id ? updated : conn
        ));
        toast.success('Connection updated successfully');
      } else {
        const newConnection = await connectionService.create(formData);
        setConnections([...connections, newConnection]);
        toast.success('Connection created successfully');
      }
      closeModal();
    } catch (error) {
      toast.error('Failed to save connection');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this connection?')) return;
    
    try {
      await connectionService.delete(id);
      setConnections(connections.filter(conn => conn.id !== id));
      toast.success('Connection deleted successfully');
    } catch (error) {
      toast.error('Failed to delete connection');
    }
  };

  const handleConnect = async (id) => {
    try {
      await connectionService.connect(id);
      setConnections(connections.map(conn => ({
        ...conn,
        isActive: conn.id === id
      })));
      toast.success('Connected successfully');
    } catch (error) {
      toast.error('Connection failed');
    }
  };

  const openModal = (connection = null) => {
    setEditingConnection(connection);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingConnection(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm border border-surface-200 animate-pulse"
            >
              <div className="space-y-3">
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                <div className="h-4 bg-surface-200 rounded w-1/2"></div>
              </div>
            </div>
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
          title="Failed to load connections"
          message={error}
          buttonText="Try Again"
          onButtonClick={loadConnections}
          buttonIcon="RefreshCw"
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading level={2} className="text-2xl font-semibold text-surface-900 mb-2">Database Connections</Heading>
          <Paragraph className="text-surface-600">Manage your database connections</Paragraph>
        </div>
        <Button
          onClick={() => openModal()}
          variant="primary"
          animated
          motionProps={{ whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={18} />
          <span>Add Connection</span>
        </Button>
      </div>

      {connections.length === 0 ? (
        <EmptyState
          iconName="Database"
          title="No connections yet"
          message="Get started by adding your first database connection"
          buttonText="Add Connection"
          onButtonClick={() => openModal()}
          animated
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection, index) => (
            <ConnectionItem
              key={connection.id}
              connection={connection}
              onEdit={openModal}
              onDelete={handleDelete}
              onConnect={handleConnect}
              index={index}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingConnection ? 'Edit Connection' : 'Add Connection'}
      >
        <ConnectionForm
          initialData={editingConnection}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default ConnectionList;