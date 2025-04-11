import { useNavigate } from 'react-router-dom';
import AuthController from '../../controllers/AuthController';
import Button from '../../components/common/Button';

const DashboardView = () => {
  const navigate = useNavigate();
  const authController = new AuthController();
  const user = authController.getCurrentUser();

  const handleLogout = () => {
    authController.logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h2 className="text-lg font-medium mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-gray-600">This is a protected dashboard page that's only accessible after login.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;