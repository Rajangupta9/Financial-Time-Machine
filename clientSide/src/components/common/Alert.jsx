const Alert = ({ type, message }) => {
    const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
    const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
    
    return (
      <div className={`${bgColor} ${textColor} p-3 rounded-md`}>
        {message}
      </div>
    );
  };
  
  export default Alert;