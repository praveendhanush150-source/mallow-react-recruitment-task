// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store';
import Login from './pages/Login';
import Users from './pages/Users';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';
import NotFound from './pages/NotFound';
import 'antd/dist/reset.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
          },
        }}
      >
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Users />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ConfigProvider>
    </Provider>
  );
};

export default App;