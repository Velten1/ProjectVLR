/**
 * Componente Input reutilizável com label flutuante
 */
export const Input = ({ 
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = ' ',
  className = '',
  disabled = false,
  error = false,
  onKeyPress,
  ...props 
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          peer w-full bg-white/10 text-white font-bold py-2 px-4 rounded 
          focus:outline-none focus:ring-2 transition-all duration-500 
          ${error ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className={`
            font-bold absolute left-4 transform -translate-y-1/2 scale-100 
            text-gray-400 transition-all duration-100 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] 
            peer-placeholder-shown:scale-100 
            peer-focus:top-1 peer-focus:scale-75 peer-focus:text-red-500 
            peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:scale-75
            ${error ? 'text-red-500' : ''}
          `}
        >
          {label}
        </label>
      )}
    </div>
  );
};









