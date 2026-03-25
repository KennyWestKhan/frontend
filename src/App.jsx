import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContextObj';
import Layout from './components/Layout';

import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SessionExplorer from './pages/SessionExplorer';
import Profile from './pages/Profile';
import CollaborationRoom from './pages/CollaborationRoom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes inside Layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sessions" element={<SessionExplorer />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Collab room usually has a different layout or is fullscreen */}
      <Route path="/room/:id" element={
        <ProtectedRoute>
          <CollaborationRoom />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
