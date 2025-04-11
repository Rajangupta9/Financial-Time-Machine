const Card = ({ 
  children, 
  className = '', 
  elevation = 'md',
  onClick
}) => {
  const elevationClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const shadowClass = elevationClasses[elevation] || elevationClasses.md;
  
  return (
    <div 
      className={`bg-white rounded-xl ${shadowClass} transition-shadow duration-300 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;