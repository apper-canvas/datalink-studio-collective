import queriesData from '../mockData/queries.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class QueryService {
  constructor() {
    this.queries = [...queriesData];
  }

  async getAll() {
    await delay(200);
    return [...this.queries].sort((a, b) => new Date(b.executedAt) - new Date(a.executedAt));
  }

  async getById(id) {
    await delay(200);
    const query = this.queries.find(q => q.id === id);
    if (!query) {
      throw new Error('Query not found');
    }
    return { ...query };
  }

  async execute(queryData) {
    await delay(500 + Math.random() * 1000); // Simulate variable execution time
    
    const newQuery = {
      id: Date.now().toString(),
      ...queryData,
      executedAt: new Date().toISOString()
    };

    // Simulate query results based on SQL type
    let results = { data: [], rowCount: 0 };
    
    const sql = queryData.sql.toLowerCase().trim();
    
    if (sql.includes('select')) {
      // Generate mock result data
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

    newQuery.rowCount = results.rowCount;
    newQuery.executionTime = Math.floor(Math.random() * 500) + 50; // 50-550ms
    
    this.queries.unshift(newQuery);
    
    return {
      ...newQuery,
      ...results
    };
  }

  async save(queryData) {
    await delay(300);
    const savedQuery = {
      id: Date.now().toString(),
      ...queryData,
      savedAt: new Date().toISOString()
    };
    this.queries.push(savedQuery);
    return { ...savedQuery };
  }

  async delete(id) {
    await delay(200);
    const index = this.queries.findIndex(q => q.id === id);
    if (index === -1) {
      throw new Error('Query not found');
    }
    
    this.queries.splice(index, 1);
    return true;
  }
}

export default new QueryService();