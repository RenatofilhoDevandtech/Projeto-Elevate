// src/components/Common/Modal.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
// Esta função garante que as strings de classe sejam formatadas corretamente.
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
  size = "md",
}) => {
  const [isShowing, setIsShowing] = useState(false); // Controla a animação de entrada/saída
  const modalRef = useRef(null); // Ref para o container do modal para gerenciar o foco

  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      // Pequeno delay para permitir que a transição de opacidade/escala funcione
      timeoutId = setTimeout(() => setIsShowing(true), 50); 
      document.body.style.overflow = "hidden"; // Desabilita o scroll do corpo
      
      // Lida com o fechamento do modal pela tecla ESC
      const handleEsc = (event) => {
        if (event.key === "Escape") {
          onClose(); 
        }
      };
      window.addEventListener("keydown", handleEsc);

      // Garante que o foco vá para o modal quando ele abre (acessibilidade)
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100); 

      // Função de limpeza para quando o modal for fechado ou o componente for desmontado
      return () => {
        clearTimeout(timeoutId);
        document.body.style.overflow = "unset"; // Restaura o scroll do corpo
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      setIsShowing(false); // Inicia a animação de saída
      document.body.style.overflow = "unset"; // Libera o scroll imediatamente ao fechar
    }
  }, [isOpen, onClose]); // Dependências do useEffect

  // Não renderiza o modal no DOM se estiver fechado e a animação de saída já terminou
  if (!isOpen && !isShowing) return null;

  // Mapeamento de classes de tamanho para controlar a largura máxima do modal
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    fit: "max-w-fit",
  };

  return (
    // Overlay do modal (fundo escuro e efeito de desfoque)
    <div
      className={cleanTailwindClasses(`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out ${isShowing ? "opacity-100" : "opacity-0"}`)}
      onClick={onClose} // Fecha o modal se clicar fora do conteúdo
      role="dialog" // Papel para acessibilidade
      aria-modal="true" // Indica que o conteúdo por trás não é interativo
      aria-labelledby="modal-title-label" // Liga o modal ao seu título para acessibilidade
      tabIndex={-1} // Permite que o elemento seja focado programaticamente
      ref={modalRef} // Anexa a ref para gerenciar o foco
    >
      {/* Container do conteúdo principal do modal */}
      <div
        className={cleanTailwindClasses(`bg-brand-white text-text-primary relative w-full ${sizeClasses[size]} rounded-xl shadow-lg flex flex-col max-h-[90vh] cursor-default transform transition-all duration-300 ease-in-out ${isShowing ? "opacity-100 scale-100" : "opacity-0 scale-95"}`)}
        onClick={(e) => e.stopPropagation()} // Impede que cliques dentro do modal o fechem
      >
        {/* Cabeçalho do Modal */}
        <div className={cleanTailwindClasses("flex justify-between items-center p-6 border-b border-brand-gray-medium")}>
          <h2 id="modal-title-label" className={cleanTailwindClasses("text-lg sm:text-xl font-semibold text-text-primary")}>
            {title || " "} {/* Exibe o título ou um espaço para manter o layout */}
          </h2>
          <button
            onClick={onClose} // Botão para fechar o modal
            className={cleanTailwindClasses("p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-brand-gray-medium focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-white transition-colors duration-200")}
            aria-label="Fechar modal" // Acessibilidade para o botão de fechar
          >
            <X size={22} />
          </button>
        </div>

        {/* Conteúdo Principal do Modal (com rolagem se exceder a altura máxima) */}
        <div className={cleanTailwindClasses("p-6 flex-grow overflow-y-auto")}>{children}</div>

        {/* Rodapé do Modal (Opcional) */}
        {footerContent && (
          <div className={cleanTailwindClasses("bg-brand-gray p-6 border-t border-brand-gray-medium flex flex-wrap justify-end gap-3 rounded-b-xl")}>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footerContent: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "fit"]),
};

export default Modal; 