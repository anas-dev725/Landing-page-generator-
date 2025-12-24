import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicLayout, AppLayout } from './components/Layout';
import { MarketingHome } from './pages/MarketingHome';
import { Generator } from './pages/Generator';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PublicLayout>
              <MarketingHome />
            </PublicLayout>
          } 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />
        
        {/* App Routes */}
        <Route 
          path="/app" 
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } 
        />
        <Route 
          path="/app/create" 
          element={
            <AppLayout>
              <Generator />
            </AppLayout>
          } 
        />
         <Route 
          path="/app/project/:id" 
          element={
            <AppLayout>
              <Generator />
            </AppLayout>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
