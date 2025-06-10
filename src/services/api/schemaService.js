import schemaData from '../mockData/schema.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SchemaService {
  async getSchema(connectionId) {
    await delay(800);
    
    // Simulate schema loading based on connection
    return { ...schemaData };
  }

  async getTableSchema(connectionId, tableName) {
    await delay(400);
    
    const schema = { ...schemaData };
    const table = schema.tables?.find(t => t.name === tableName);
    
    if (!table) {
      throw new Error('Table not found');
    }
    
    return { ...table };
  }

  async refreshSchema(connectionId) {
    await delay(1000);
    
    // Simulate schema refresh
    return { ...schemaData };
  }
}

export default new SchemaService();