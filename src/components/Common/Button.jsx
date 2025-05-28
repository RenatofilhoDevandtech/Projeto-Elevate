import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  disabled = false,
  isLoading = false,
  ...props
}) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out inline-flex items-center justify-center";

  const variantStyles = {
    primary: `bg-brand-blue text-white hover:bg-brand-blue-dark focus:ring-brand-blue ${disabled ? 'bg-brand-gray-dark cursor-not-allowed' : ''}`,
    secondary: `bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green ${disabled ? 'bg-brand-gray-dark cursor-not-allowed' : ''}`,
    outline: `bg-transparent border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue ${disabled ? 'border-brand-gray-dark text-brand-gray-dark cursor-not-allowed' : ''}`,
    danger: `bg-danger text-white hover:bg-red-700 focus:ring-danger ${disabled ? 'bg-red-300 cursor-not-allowed' : ''}`,
    ghost: `bg-transparent text-brand-blue hover:bg-blue-100 focus:ring-brand-blue ${disabled ? 'text-brand-gray-dark cursor-not-allowed' : ''}`,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </button>
  );
};

export default Button;