const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false, 
  loading = false,
  disabled = false,
  onClick,
  className = ''
}) => {
  const baseStyle = "relative py-2.5 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    outline: "bg-white border border-indigo-500 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = (disabled || loading) ? "opacity-70 cursor-not-allowed" : "";
  
  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <span className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      <span className={loading ? "opacity-0" : ""}>{children}</span>
    </button>
  );
};

export default Button;