import { Routes, Route, Navigate } from 'react-router-dom';
import AuthView from './views/users/AuthView';
import DashboardView from './views/dashboard/DashboardView';
import AuthController from './controllers/AuthController';

const authController = new AuthController();

// Protected route component
const ProtectedRoute = ({ children }) => {
  if (!authController.isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthView />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardView />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;