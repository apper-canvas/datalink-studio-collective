import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Spinner from '@/components/atoms/Spinner';
import DashboardSection from '@/components/organisms/DashboardSection';
import QuickConnectList from '@/components/organisms/QuickConnectList';
import RecentQueriesList from '@/components/organisms/RecentQueriesList';
import StatsCard from '@/components/organisms/StatsCard';
import connectionService from '@/services/api/connectionService';
import queryService from '@/services/api/queryService';

function HomePage() {
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

  const handleConnectToDatabase = async (connectionId) => {
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

  return (
    <div className="p-6 max-w-full overflow-hidden">
      <div className="mb-8">
        <Heading level={2} className="text-2xl font-semibold text-surface-900 mb-2">Dashboard</Heading>
        <Paragraph className="text-surface-600">Manage your database connections and queries</Paragraph>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Connect */}
        <DashboardSection
          title="Quick Connect"
          onActionClick={() => navigate('/connections')}
          actionIcon="Plus"
          transition={{ delay: 0 }}
        >
          <QuickConnectList
            connections={connections}
            onConnect={handleConnectToDatabase}
            onAddConnection={() => navigate('/connections')}
          />
        </DashboardSection>

        {/* Recent Queries */}
        <DashboardSection
          title="Recent Queries"
          onActionClick={() => navigate('/query-editor')}
          actionIcon="Code2"
          transition={{ delay: 0.1 }}
        >
          <RecentQueriesList
            queries={recentQueries}
            onQueryClick={() => navigate('/query-editor')} // For simplicity, all lead to query editor
            onStartQuerying={() => navigate('/query-editor')}
          />
        </DashboardSection>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatsCard
          index={0}
          iconName="Database"
          iconColorClass="text-primary"
          title="Total Connections"
          value={connections.length}
        />
        <StatsCard
          index={1}
          iconName="ActiveDot" // Custom indicator for active dot
          iconColorClass="bg-success"
          title="Active Connections"
          value={connections.filter(c => c.isActive).length}
        />
        <StatsCard
          index={2}
          iconName="Code2"
          iconColorClass="text-accent"
          title="Recent Queries"
          value={recentQueries.length}
        />
      </div>
    </div>
  );
}

export default HomePage;