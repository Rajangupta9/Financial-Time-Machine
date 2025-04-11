import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCircleIcon, 
  KeyIcon, 
  MailIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  ClockIcon,
  LineChartIcon,
  CircleDollarSignIcon,
  TrendingUpIcon,
  ChevronRightIcon,
  XCircleIcon
} from 'lucide-react';

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    name: '',
  });

  useEffect(() => {
    // Apply fade-in effect
    const authContainer = document.querySelector('.auth-container');
    if (authContainer) {
      authContainer.classList.add('opacity-100');
    }
    
    // Generate background elements
    generateBackgroundElements();
    
    return () => {
      // Clean up elements on unmount
      const elements = document.querySelectorAll('.bg-element');
      elements.forEach(element => element.remove());
    };
  }, []);

  // Generate background elements
  const generateBackgroundElements = () => {
    const container = document.querySelector('.background-container');
    if (!container) return;
    
    const symbols = ['$', '€', '¥', '£', '₿', '📈', '📉'];
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      element.className = 'bg-element absolute text-blue-800 opacity-10 select-none';
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.fontSize = `${Math.random() * 20 + 15}px`;
      element.style.animation = `float ${Math.random() * 15 + 15}s linear infinite`;
      element.style.animationDelay = `${Math.random() * 5}s`;
      element.innerText = symbol;
      container.appendChild(element);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error for this field when typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const toggleMode = () => {
    // Add transition effect
    const formElement = document.querySelector('.auth-form');
    if (formElement) {
      formElement.classList.add(isLogin ? 'slide-left' : 'slide-right');
    
      setTimeout(() => {
        setIsLogin(!isLogin);
        setError('');
        // Reset errors when switching modes
        setFormErrors({
          email: '',
          password: '',
          name: '',
        });
      
        // Remove animation classes after transition
        setTimeout(() => {
          formElement.classList.remove('slide-left', 'slide-right');
        }, 300);
      }, 200);
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '', name: '' };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    // Name validation (only if registering)
    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate authentication process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isLogin) {
        // Simulate login
        navigate('/dashboard');
      } else {
        // Simulate successful registration
        setError('');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center auth-container opacity-0 transition-opacity duration-1000 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Background elements */}
      <div className="fixed inset-0 background-container">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-300/20 to-indigo-400/20 rounded-bl-full transform -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-300/20 to-indigo-400/20 rounded-tr-full transform translate-y-1/4 -translate-x-1/4"></div>
        
        {/* Floating icons */}
        <div className="absolute top-1/4 left-1/5 text-blue-800/10 animate-float-slow">
          <TrendingUpIcon className="w-24 h-24" />
        </div>
        <div className="absolute bottom-1/3 right-1/5 text-indigo-800/10 animate-float-medium">
          <CircleDollarSignIcon className="w-32 h-32" />
        </div>
        <div className="absolute top-2/3 left-1/3 text-blue-800/10 animate-float-medium">
          <ClockIcon className="w-16 h-16" />
        </div>
      </div>
      
      {/* Main card */}
      <div className="max-w-md w-full mx-4 bg-white rounded-2xl shadow-xl overflow-hidden z-10 relative border border-indigo-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            <LineChartIcon className="w-7 h-7 text-blue-100" />
            <div>
              <h1 className="text-xl font-bold">Financial Time Machine</h1>
              <p className="text-blue-100 text-xs">Visualize your financial future</p>
            </div>
          </div>
        </div>
        
        {/* Form content */}
        <div className="p-8 auth-form">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? 'Sign In to Your Account' : 'Create New Account'}
          </h2>
          
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 rounded-md border ${formErrors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-colors`}
                    placeholder="John Doe"
                  />
                </div>
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>
            )}
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-md border ${formErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-colors`}
                  placeholder="example@email.com"
                />
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-md border ${formErrors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-colors`}
                  placeholder="••••••••"
                />
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="flex items-center">
                  {isLogin ? 'Sign in' : 'Create account'}
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </span>
              )}
            </button>
            
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-2 text-xs text-gray-500 bg-white">OR</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            
            <button
              type="button"
              className="w-full flex justify-center items-center py-2 px-4 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              onClick={toggleMode}
            >
              {isLogin ? (
                <span className="flex items-center">
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                  Create a new account
                </span>
              ) : (
                <span className="flex items-center">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back to login
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 text-center text-indigo-800/60 text-sm z-10 font-medium">
        Financial Time Machine — Plan smarter. Live better.
      </div>
    </div>
  );
};

// Add necessary CSS for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  .animate-float-slow {
    animation: float 15s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float 10s ease-in-out infinite;
  }
  
  .bg-grid {
    background-image: 
      linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  .slide-left {
    animation: slideLeft 0.3s forwards;
  }
  
  .slide-right {
    animation: slideRight 0.3s forwards;
  }
  
  @keyframes slideLeft {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(-20px); opacity: 0; }
  }
  
  @keyframes slideRight {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(20px); opacity: 0; }
  }
`;

document.head.appendChild(styleSheet);

export default AuthView;