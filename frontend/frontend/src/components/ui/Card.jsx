/**
 * Componente Card reutilizável com glassmorphism
 */
export const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-white/10 backdrop-blur-md',
    elevated: 'bg-white/20 backdrop-blur-lg shadow-custom',
    solid: 'bg-gray-900/90',
  };
  
  return (
    <div
      className={`rounded-xl p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};









