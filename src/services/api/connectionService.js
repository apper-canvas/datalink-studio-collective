const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ConnectionService {
  constructor() {
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "host" } },
          { field: { Name: "port" } },
          { field: { Name: "database" } },
          { field: { Name: "username" } },
          { field: { Name: "is_active" } },
          { field: { Name: "last_connected" } }
        ]
      };

      const response = await this.apperClient.fetchRecords('connection', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching connections:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "host" } },
          { field: { Name: "port" } },
          { field: { Name: "database" } },
          { field: { Name: "username" } },
          { field: { Name: "is_active" } },
          { field: { Name: "last_connected" } }
        ]
      };

      const response = await this.apperClient.getRecordById('connection', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching connection with ID ${id}:`, error);
      throw error;
    }
  }

  async create(connectionData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: connectionData.name || connectionData.Name,
          type: connectionData.type,
          host: connectionData.host,
          port: parseInt(connectionData.port),
          database: connectionData.database,
          username: connectionData.username,
          is_active: false,
          last_connected: null
        }]
      };

      const response = await this.apperClient.createRecord('connection', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating connection:", error);
      throw error;
    }
  }

  async update(id, updates) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.name && { Name: updates.name }),
          ...(updates.Name && { Name: updates.Name }),
          ...(updates.type && { type: updates.type }),
          ...(updates.host && { host: updates.host }),
          ...(updates.port && { port: parseInt(updates.port) }),
          ...(updates.database && { database: updates.database }),
          ...(updates.username && { username: updates.username }),
          ...(updates.is_active !== undefined && { is_active: updates.is_active }),
          ...(updates.isActive !== undefined && { is_active: updates.isActive }),
          ...(updates.last_connected && { last_connected: updates.last_connected }),
          ...(updates.lastConnected && { last_connected: updates.lastConnected })
        }]
      };

      const response = await this.apperClient.updateRecord('connection', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      console.error("Error updating connection:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('connection', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error deleting connection:", error);
      throw error;
    }
  }

  async connect(id) {
    await delay(800);
    
    try {
      // Update this connection to active
      await this.update(id, { 
        is_active: true, 
        last_connected: new Date().toISOString() 
      });

      // Get all connections to deactivate others
      const allConnections = await this.getAll();
      
      // Deactivate all other connections
      for (const conn of allConnections) {
        if (conn.Id !== parseInt(id) && conn.is_active) {
          await this.update(conn.Id, { is_active: false });
        }
      }

      const updatedConnection = await this.getById(id);
      return { ...updatedConnection, isActive: true };
    } catch (error) {
      console.error("Connection failed:", error);
      throw new Error('Connection failed');
    }
  }

  async testConnection(connectionData) {
    await delay(1000);
    // Simulate connection test - in real implementation, this would test actual database connectivity
    if (Math.random() > 0.2) { // 80% success rate
      return { success: true, message: 'Connection successful' };
    } else {
      throw new Error('Connection test failed');
    }
  }
}

export default new ConnectionService();