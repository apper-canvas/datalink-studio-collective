import Home from '../pages/Home';
import Connections from '../pages/Connections';
import QueryEditor from '../pages/QueryEditor';
import SchemaExplorer from '../pages/SchemaExplorer';
import Settings from '../pages/Settings';

export const routes = {
  home: {
    id: 'home',
    label: 'Dashboard',
    path: '/',
    icon: 'LayoutDashboard',
    component: Home
  },
  connections: {
    id: 'connections',
    label: 'Connections',
    path: '/connections',
    icon: 'Database',
    component: Connections
  },
  queryEditor: {
    id: 'queryEditor',
    label: 'Query Editor',
    path: '/query-editor',
    icon: 'Code2',
    component: QueryEditor
  },
  schemaExplorer: {
    id: 'schemaExplorer',
    label: 'Schema Explorer',
    path: '/schema-explorer',
    icon: 'FolderTree',
    component: SchemaExplorer
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: Settings
  }
};

export const routeArray = Object.values(routes);