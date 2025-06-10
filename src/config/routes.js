import HomePage from '@/components/pages/HomePage';
import ConnectionsPage from '@/components/pages/ConnectionsPage';
import QueryEditorPage from '@/components/pages/QueryEditorPage';
import SchemaExplorerPage from '@/components/pages/SchemaExplorerPage';
import SettingsPage from '@/components/pages/SettingsPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Dashboard',
    path: '/',
    icon: 'LayoutDashboard',
component: HomePage
  },
  connections: {
    id: 'connections',
    label: 'Connections',
    path: '/connections',
    icon: 'Database',
component: ConnectionsPage
  },
  queryEditor: {
    id: 'queryEditor',
    label: 'Query Editor',
    path: '/query-editor',
    icon: 'Code2',
component: QueryEditorPage
  },
  schemaExplorer: {
    id: 'schemaExplorer',
    label: 'Schema Explorer',
    path: '/schema-explorer',
    icon: 'FolderTree',
component: SchemaExplorerPage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
component: SettingsPage
  }
};

export const routeArray = Object.values(routes);