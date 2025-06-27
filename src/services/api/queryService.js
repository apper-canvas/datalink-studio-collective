const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class QueryService {
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
          { field: { Name: "sql" } },
          { field: { Name: "executed_at" } },
          { field: { Name: "execution_time" } },
          { field: { Name: "row_count" } },
          { 
            field: { name: "connection_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          { fieldName: "executed_at", sorttype: "DESC" }
        ]
      };

      const response = await this.apperClient.fetchRecords('query', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Transform response to match UI expectations
      const queries = (response.data || []).map(query => ({
        id: query.Id.toString(),
        connectionId: query.connection_id?.Id?.toString() || "1",
        sql: query.sql,
        executedAt: query.executed_at,
        executionTime: query.execution_time,
        rowCount: query.row_count
      }));

      return queries;
    } catch (error) {
      console.error("Error fetching queries:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sql" } },
          { field: { Name: "executed_at" } },
          { field: { Name: "execution_time" } },
          { field: { Name: "row_count" } },
          { 
            field: { name: "connection_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await this.apperClient.getRecordById('query', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Transform response to match UI expectations
      const query = {
        id: response.data.Id.toString(),
        connectionId: response.data.connection_id?.Id?.toString() || "1",
        sql: response.data.sql,
        executedAt: response.data.executed_at,
        executionTime: response.data.execution_time,
        rowCount: response.data.row_count
      };

      return query;
    } catch (error) {
      console.error(`Error fetching query with ID ${id}:`, error);
      throw error;
    }
  }

  async execute(queryData) {
    await delay(500 + Math.random() * 1000); // Simulate variable execution time
    
    // Simulate query results based on SQL type for UI display
    let results = { data: [], rowCount: 0 };
    
    const sql = queryData.sql.toLowerCase().trim();
    
    if (sql.includes('select')) {
      // Generate mock result data for display
      const sampleData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2024-01-15', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2024-01-16', status: 'inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', created_at: '2024-01-17', status: 'active' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', created_at: '2024-01-18', status: 'pending' },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', created_at: '2024-01-19', status: 'active' }
      ];
      
      results.data = sampleData;
      results.rowCount = sampleData.length;
    } else if (sql.includes('insert') || sql.includes('update') || sql.includes('delete')) {
      results.rowCount = Math.floor(Math.random() * 10) + 1;
      results.message = `${results.rowCount} row(s) affected`;
    }

    const executionTime = Math.floor(Math.random() * 500) + 50; // 50-550ms
    
    // Save query execution to database
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: `Query ${Date.now()}`,
          sql: queryData.sql,
          executed_at: new Date().toISOString(),
          execution_time: executionTime,
          row_count: results.rowCount,
          connection_id: parseInt(queryData.connectionId)
        }]
      };

      const response = await this.apperClient.createRecord('query', params);
      
      if (response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          const savedQuery = successfulRecords[0].data;
          
          return {
            id: savedQuery.Id.toString(),
            connectionId: queryData.connectionId,
            sql: queryData.sql,
            executedAt: savedQuery.executed_at,
            executionTime: executionTime,
            rowCount: results.rowCount,
            ...results
          };
        }
      }
    } catch (error) {
      console.error("Error saving query execution:", error);
    }

    // Return results even if save failed
    return {
      id: Date.now().toString(),
      connectionId: queryData.connectionId,
      sql: queryData.sql,
      executedAt: new Date().toISOString(),
      executionTime: executionTime,
      rowCount: results.rowCount,
      ...results
    };
  }

  async save(queryData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: queryData.name || `Saved Query ${Date.now()}`,
          sql: queryData.sql,
          executed_at: new Date().toISOString(),
          execution_time: 0,
          row_count: 0,
          connection_id: parseInt(queryData.connectionId)
        }]
      };

      const response = await this.apperClient.createRecord('query', params);
      
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
      console.error("Error saving query:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('query', params);
      
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
      console.error("Error deleting query:", error);
      throw error;
    }
  }
}

export default new QueryService();

export default new QueryService();