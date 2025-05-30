import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  // Props que são para a lógica/estilo do componente React e não diretamente para o DOM <button>
  // (a menos que também sejam atributos HTML válidos como 'type', 'disabled', 'onClick')
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon: LeftIcon,    // 'leftIcon' é desestruturada aqui e aliased para LeftIcon
  rightIcon: RightIcon,  // 'rightIcon' é desestruturada aqui e aliased para RightIcon
  className = '',         // 'className' será combinada e aplicada
  
  // Props que SÃO atributos HTML válidos para <button> ou manipuladores de evento
  onClick,
  type = 'button',
  disabled = false,       // 'disabled' é calculado abaixo baseado em isLoading também

  // ...restanteDasProps captura quaisquer outras props passadas (ex: aria-*, data-*, title)
  // que DEVEM ser aplicadas ao <button> do DOM.
  ...restanteDasProps 
}) => {
  const baseStyles = `font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--brand-gray)]
                      transition-all duration-200 ease-in-out inline-flex items-center justify-center
                      select-none shadow-interactive hover:shadow-interactive-hover active:scale-[0.98]`;

  const variantStyles = {
    primary: `bg-[var(--brand-blue)] text-[var(--brand-white)] hover:bg-[var(--brand-blue-dark)] focus:ring-[var(--brand-blue)]
              disabled:bg-[var(--brand-gray-medium)] disabled:text-[var(--brand-gray-dark)] disabled:cursor-not-allowed disabled:shadow-none`,
    secondary: `bg-[var(--brand-green)] text-[var(--brand-white)] hover:bg-[var(--brand-green-dark)] focus:ring-[var(--brand-green)]
                disabled:bg-[var(--brand-gray-medium)] disabled:text-[var(--brand-gray-dark)] disabled:cursor-not-allowed disabled:shadow-none`,
    outline: `bg-transparent border border-[var(--brand-blue)] text-[var(--brand-blue)]
              hover:bg-[var(--brand-blue)] hover:text-[var(--brand-white)] focus:ring-[var(--brand-blue)]
              disabled:border-[var(--brand-gray-medium)] disabled:text-[var(--brand-gray-dark)] disabled:cursor-not-allowed disabled:shadow-none disabled:bg-transparent`,
    danger: `bg-red-600 text-[var(--brand-white)] hover:bg-red-700 focus:ring-red-500
             disabled:bg-red-300 disabled:text-red-100 disabled:cursor-not-allowed disabled:shadow-none`,
    ghost: `bg-transparent text-[var(--brand-blue)] hover:bg-[var(--brand-blue)]/10 focus:ring-[var(--brand-blue)]
            disabled:text-[var(--brand-gray-dark)] disabled:cursor-not-allowed disabled:shadow-none disabled:bg-transparent`,
    light: `bg-[var(--brand-gray-medium)] text-[var(--text-primary)] hover:bg-[var(--brand-gray-dark)] hover:text-[var(--brand-white)] focus:ring-[var(--brand-gray-dark)]
            disabled:bg-[var(--brand-gray)] disabled:text-[var(--brand-gray-dark)] disabled:cursor-not-allowed disabled:shadow-none`,
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs min-h-[32px]",
    md: "px-5 py-2.5 text-sm min-h-[40px]",
    lg: "px-7 py-3 text-base min-h-[48px]",
  };

  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  // Calcula o className final
  const finalClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${isLoading ? 'cursor-wait' : ''}
    ${className} 
  `; // Adiciona o className passado como prop por último para permitir overrides se necessário

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading} // O 'disabled' do DOM é calculado
      className={finalClassName.trim().replace(/\s+/g, ' ')} // Limpa espaços extras
      {...restanteDasProps} // Apenas as props restantes (que devem ser válidas para o DOM) são espalhadas
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {LeftIcon && <LeftIcon size={iconSize[size]} className={`mr-2 ${children ? '' : 'mr-0'}`} aria-hidden="true" />}
          {children}
          {RightIcon && <RightIcon size={iconSize[size]} className={`ml-2 ${children ? '' : 'ml-0'}`} aria-hidden="true" />}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'ghost', 'light']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.elementType,
  rightIcon: PropTypes.elementType,
};

export default Button;