// src/components/Common/Button.jsx
import React from "react";
import PropTypes from "prop-types";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
// Esta função garante que as strings de classe sejam formatadas corretamente.
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon: LeftIcon, // Componente de ícone para a esquerda
  rightIcon: RightIcon, // Componente de ícone para a direita
  className = "", // Classes adicionais passadas de fora
  onClick,
  type = "button",
  disabled = false,
  ...restanteDasProps // Captura quaisquer outras props
}) => {
  // Estilos base aplicados a todos os botões
  // Inclui foco, transições, sombras customizadas e comportamento de texto.
  const baseStyles = cleanTailwindClasses(`font-semibold rounded-lg focus:outline-none 
    focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-white 
    transition-all duration-300 ease-in-out 
    inline-flex items-center justify-center select-none 
    shadow-custom-light hover:shadow-custom-medium active:scale-[0.98]
    whitespace-nowrap`);

  // Estilos específicos para cada variante (cor e estado de hover/disabled)
  const variantStyles = {
    primary: cleanTailwindClasses(`bg-brand-blue text-brand-white hover:bg-brand-blue-dark focus:ring-brand-blue 
      disabled:bg-brand-gray-medium disabled:text-brand-gray-dark disabled:cursor-not-allowed disabled:shadow-none`),
    secondary: cleanTailwindClasses(`bg-brand-green text-brand-white hover:bg-brand-green-dark focus:ring-brand-green 
      disabled:bg-brand-gray-medium disabled:text-brand-gray-dark disabled:cursor-not-allowed disabled:shadow-none`),
    outline: cleanTailwindClasses(`bg-transparent border border-brand-blue text-brand-blue 
      hover:bg-brand-blue hover:text-brand-white focus:ring-brand-blue 
      disabled:border-brand-gray-medium disabled:text-brand-gray-dark disabled:cursor-not-allowed disabled:shadow-none disabled:bg-transparent`),
    danger: cleanTailwindClasses(`bg-danger-red text-brand-white hover:bg-danger-red/80 focus:ring-danger-red 
      disabled:bg-brand-gray-medium disabled:text-brand-gray-dark disabled:cursor-not-allowed disabled:shadow-none`),
    ghost: cleanTailwindClasses(`bg-transparent text-brand-blue hover:bg-brand-blue/10 focus:ring-brand-blue 
      disabled:text-brand-gray-dark disabled:cursor-not-allowed disabled:shadow-none disabled:bg-transparent`),
    light: cleanTailwindClasses(`bg-brand-gray-medium text-text-primary hover:bg-brand-gray-dark hover:text-text-primary focus:ring-brand-gray-dark 
      disabled:bg-brand-gray disabled:text-brand-gray-dark disabled:cursor-not-allowed disabled:shadow-none`),
  };

  // Estilos para cada tamanho de botão (padding, font-size, min-height)
  const sizeStyles = {
    sm: cleanTailwindClasses("px-3 py-1.5 text-xs min-h-[32px]"),
    md: cleanTailwindClasses("px-5 py-2.5 text-sm min-h-[40px]"),
    lg: cleanTailwindClasses("px-7 py-3 text-base min-h-[48px]"),
  };

  // Tamanhos de ícone correspondentes aos tamanhos dos botões
  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  // Combina todas as classes para o estilo final do botão
  const finalClassName = cleanTailwindClasses(`
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${isLoading ? "cursor-wait" : ""}
    ${className}
  `);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading} // Desabilita se 'disabled' for true ou se estiver carregando
      className={finalClassName} // Já está limpo pela `cleanTailwindClasses`
      aria-busy={isLoading} // Para leitores de tela: indica que o elemento está ocupado
      aria-live="polite" // Para leitores de tela: anuncia mudanças de status
      {...restanteDasProps} // Passa quaisquer outras props para o elemento button nativo
    >
      {isLoading ? (
        // Ícone de carregamento (spinner SVG)
        <svg
          className={cleanTailwindClasses("animate-spin h-5 w-5 text-current")} // 'text-current' herda a cor do texto do botão
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="status" // Para acessibilidade
        >
          <circle
            className={cleanTailwindClasses("opacity-25")}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className={cleanTailwindClasses("opacity-75")}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {LeftIcon && ( // Renderiza o ícone esquerdo se fornecido
            <LeftIcon
              size={iconSize[size]}
              className={cleanTailwindClasses(`mr-2 ${children ? "" : "mr-0"}`)} // Adiciona margem apenas se houver texto
              aria-hidden="true" // Esconde o ícone de leitores de tela se for apenas decorativo
            />
          )}
          {children} {/* Conteúdo do botão (texto, geralmente) */}
          {RightIcon && ( // Renderiza o ícone direito se fornecido
            <RightIcon
              size={iconSize[size]}
              className={cleanTailwindClasses(`ml-2 ${children ? "" : "ml-0"}`)} // Adiciona margem apenas se houver texto
              aria-hidden="true"
            />
          )}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node, // Pode ser texto, outros elementos, etc.
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "danger",
    "ghost",
    "light",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]), // Tamanho do botão (controla padding e font-size)
  className: PropTypes.string, // Permite passar classes Tailwind adicionais de fora
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.elementType, // Para componentes de ícone (ex: LucideReact)
  rightIcon: PropTypes.elementType,
};

export default Button; // Exportação padrão do componente