import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import HomePage from '@/components/pages/HomePage';
import ConnectionsPage from '@/components/pages/ConnectionsPage';
import QueryEditorPage from '@/components/pages/QueryEditorPage';
import SchemaExplorerPage from '@/components/pages/SchemaExplorerPage';
import SettingsPage from '@/components/pages/SettingsPage';
import NotFoundPage from '@/components/pages/NotFoundPage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
<Route index element={<HomePage />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/query-editor" element={<QueryEditorPage />} />
          <Route path="/schema-explorer" element={<SchemaExplorerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="z-[9999]"
      />
    </BrowserRouter>
  );
}

export default App;