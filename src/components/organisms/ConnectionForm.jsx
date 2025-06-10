import React, { useState, useEffect } from 'react';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const ConnectionForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'postgresql',
    host: '',
    port: 5432,
    database: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        name: '',
        type: 'postgresql',
        host: '',
        port: 5432,
        database: '',
        username: '',
        password: ''
      });
    }
  }, [initialData]);

  const getPortForType = (type) => {
    const ports = {
      postgresql: 5432,
      mysql: 3306,
      sqlite: null
    };
    return ports[type];
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData(prev => ({
      ...prev,
      type: newType,
      port: getPortForType(newType) || prev.port
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Connection Name"
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <FormField
        label="Database Type"
        id="type"
        name="type"
        type="select"
        value={formData.type}
        onChange={handleTypeChange}
        options={[
          { value: 'postgresql', label: 'PostgreSQL' },
          { value: 'mysql', label: 'MySQL' },
          { value: 'sqlite', label: 'SQLite' }
        ]}
      />

      {formData.type !== 'sqlite' && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Host"
              id="host"
              name="host"
              type="text"
              value={formData.host}
              onChange={handleChange}
              required
              className="col-span-2"
            />
            <FormField
              label="Port"
              id="port"
              name="port"
              type="number"
              value={formData.port}
              onChange={handleChange}
              required
            />
          </div>

          <FormField
            label="Username"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <FormField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </>
      )}

      <FormField
        label="Database Name"
        id="database"
        name="database"
        type="text"
        value={formData.database}
        onChange={handleChange}
        required
      />

      <div className="flex space-x-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          animated
          motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          animated
          motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
          className="flex-1"
        >
          {initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default ConnectionForm;