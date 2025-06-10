import connectionsData from '../mockData/connections.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ConnectionService {
  constructor() {
    this.connections = [...connectionsData];
  }

  async getAll() {
    await delay(300);
    return [...this.connections];
  }

  async getById(id) {
    await delay(200);
    const connection = this.connections.find(conn => conn.id === id);
    if (!connection) {
      throw new Error('Connection not found');
    }
    return { ...connection };
  }

  async create(connectionData) {
    await delay(500);
    const newConnection = {
      id: Date.now().toString(),
      ...connectionData,
      isActive: false,
      lastConnected: null
    };
    this.connections.push(newConnection);
    return { ...newConnection };
  }

  async update(id, updates) {
    await delay(400);
    const index = this.connections.findIndex(conn => conn.id === id);
    if (index === -1) {
      throw new Error('Connection not found');
    }
    
    this.connections[index] = { ...this.connections[index], ...updates };
    return { ...this.connections[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.connections.findIndex(conn => conn.id === id);
    if (index === -1) {
      throw new Error('Connection not found');
    }
    
    this.connections.splice(index, 1);
    return true;
  }

  async connect(id) {
    await delay(800);
    const connection = this.connections.find(conn => conn.id === id);
    if (!connection) {
      throw new Error('Connection not found');
    }

    // Simulate connection test
    if (Math.random() > 0.1) { // 90% success rate
      // Deactivate all other connections
      this.connections.forEach(conn => {
        conn.isActive = conn.id === id;
        if (conn.id === id) {
          conn.lastConnected = new Date().toISOString();
        }
      });
      return { ...connection, isActive: true };
    } else {
      throw new Error('Connection failed');
    }
  }

  async testConnection(connectionData) {
    await delay(1000);
    // Simulate connection test
    if (Math.random() > 0.2) { // 80% success rate
      return { success: true, message: 'Connection successful' };
    } else {
      throw new Error('Connection test failed');
    }
  }
}

export default new ConnectionService();