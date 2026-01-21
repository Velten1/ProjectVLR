/**
 * Componente Loading reutilizável
 */
export const Loading = ({ 
  size = 'md', 
  text = 'Carregando...',
  className = '' 
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-white ${sizes[size]} mb-4`}></div>
      {text && <p className="text-white font-bold">{text}</p>}
    </div>
  );
};









