import { CheckCircleIcon, XCircleIcon, AlertCircle, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

const Alert = ({
  type = 'info',
  message,
  dismissible = true,
  duration = 0,
  className = '',
  onDismiss
}) => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onDismiss) onDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  if (!show) return null;

  const config = {
    success: {
      icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-800'
    },
    error: {
      icon: <XCircleIcon className="h-5 w-5 text-red-400" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-800'
    },
    warning: {
      icon: <AlertCircle className="h-5 w-5 text-yellow-400" />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800'
    },
    info: {
      icon: <Info className="h-5 w-5 text-blue-400" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800'
    }
  };

  const { icon, bgColor, borderColor, textColor } = config[type];

  const handleDismiss = () => {
    setShow(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 rounded-md animate-fadeIn ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
        {dismissible && (
          <div className="pl-3">
            <button
              onClick={handleDismiss}
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Dismiss</span>
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;