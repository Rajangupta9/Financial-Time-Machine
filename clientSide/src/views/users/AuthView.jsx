// src/views/auth/AuthView.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthController from '../../controllers/AuthController';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Alert from '../../components/common/Alert';

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authController = new AuthController();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        await authController.login(formData.email, formData.password);
        navigate('/dashboard');
      } else {
        await authController.register(formData.name, formData.email, formData.password);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create new account'}
          </h2>
        </div>
        
        {error && <Alert type="error" message={error} />}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <InputField
                id="name"
                name="name"
                type="text"
                required
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            )}

            <InputField
              id="email"
              name="email"
              type="email"
              required
              label="Email address"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              id="password"
              name="password"
              type="password"
              required
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {isLogin && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            loading={loading}
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={toggleMode}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AuthView;