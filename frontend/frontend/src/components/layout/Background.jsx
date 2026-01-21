/**
 * Componente Background reutilizável para imagens de fundo
 */
export const Background = ({ 
  image, 
  brightness = 40, 
  contrast = 105,
  className = '' 
}) => {
  return (
    <div
      className={`absolute inset-0 bg-cover bg-center z-0 ${className}`}
      style={{ 
        backgroundImage: `url(${image})`,
        filter: `brightness(${brightness}%) contrast(${contrast}%)`
      }}
    />
  );
};









