import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Lembre-se: npm install prop-types
import { X } from 'lucide-react';
// Para o Button, vamos assumir que ele usa suas classes customizadas como .bg-brand-blue etc.
// ou que usamos classes padrão do Tailwind para ele dentro do modal.
// Por simplicidade aqui, o botão de fechar será estilizado diretamente.

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent, // Conteúdo opcional para o rodapé do modal (ex: botões de ação)
  size = 'md',    // Tamanhos: 'sm', 'md', 'lg', 'xl', '2xl', 'fit' (para conteúdo)
}) => {
  // Efeito para fechar com a tecla ESC e travar/liberar o scroll do body
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Trava o scroll do body
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset'; // Libera o scroll
    }

    // Limpeza ao desmontar o componente ou quando isOpen/onClose mudam
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Classes de tamanho para o painel do modal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    fit: 'max-w-fit', // Para modais que se ajustam ao conteúdo
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8 cursor-pointer"
      onClick={onClose} // Permite fechar clicando no overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title-label" // Conectado ao h2 do título
    >
      <div
        // Use suas classes personalizadas para cores de fundo e texto aqui
        // Ex: className="bg-brand-white text-text-primary ..."
        className={`
          bg-brand-white text-text-primary relative w-full ${sizeClasses[size]}
          rounded-xl shadow-2xl flex flex-col max-h-[90vh] cursor-default
          transform transition-all duration-300 ease-out
          opacity-0 scale-95 animate-modalEnter
        `}
        onClick={(e) => e.stopPropagation()} // Impede que o clique DENTRO do modal o feche
      >
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-brand-gray-medium"> {/* Use .border-brand-gray-medium */}
          <h2 id="modal-title-label" className="text-lg sm:text-xl font-semibold text-text-primary"> {/* Use .text-text-primary */}
            {title || ' '} {/* Garante que o h2 exista mesmo sem título para aria-labelledby */}
          </h2>
          <button
            onClick={onClose}
            // Use .text-text-secondary e .hover:text-text-primary (ou suas classes customizadas)
            className="text-text-secondary hover:text-text-primary p-1 rounded-full hover:bg-brand-gray-medium focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-white transition-colors"
            aria-label="Fechar modal"
          >
            <X size={22} /> {/* Tamanho do ícone ajustado */}
          </button>
        </div>

        {/* Conteúdo Principal do Modal */}
        <div className="p-4 sm:p-6 flex-grow overflow-y-auto">
          {children}
        </div>

        {/* Rodapé do Modal (Opcional) */}
        {footerContent && (
          // Use .bg-brand-gray e .border-brand-gray-medium
          <div className="bg-brand-gray p-4 sm:p-5 border-t border-brand-gray-medium flex flex-wrap justify-end gap-3 rounded-b-xl">
            {footerContent}
          </div>
        )}
      </div>
      {/* Animação de entrada simples (Pode ser colocada no seu index.css globalmente) */}
      <style jsx global>{`
        @keyframes modalEnter {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalEnter {
          animation: modalEnter 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footerContent: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'fit']),
};

export default Modal;