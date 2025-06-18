import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
  size = "md",
}) => {
  // MELHORIA: Estado para controlar a animação de entrada/saída
  const [isShowing, setIsShowing] = useState(false);

  // Efeito para fechar com a tecla ESC e travar/liberar o scroll do body
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
      // Ativa a animação de entrada
      const timer = setTimeout(() => setIsShowing(true), 10); // Pequeno delay para a transição funcionar
      return () => clearTimeout(timer);
    } else {
      // Ativa a animação de saída
      setIsShowing(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-out
                  ${isShowing ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title-label"
    >
      <div
        className={`bg-[var(--brand-white)] text-[var(--text-primary)] relative w-full ${
          sizeClasses[size]
        }
                    rounded-xl shadow-2xl flex flex-col max-h-[90vh] cursor-default
                    transform transition-all duration-300 ease-out
                    ${
                      isShowing ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-[var(--brand-gray-medium)]">
          <h2
            id="modal-title-label"
            className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]"
          >
            {title || " "}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded-full hover:bg-[var(--brand-gray-medium)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:ring-offset-2 focus:ring-offset-[var(--brand-white)] transition-colors"
            aria-label="Fechar modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Conteúdo Principal do Modal */}
        <div className="p-4 sm:p-6 flex-grow overflow-y-auto">{children}</div>

        {/* Rodapé do Modal (Opcional) */}
        {footerContent && (
          <div className="bg-[var(--brand-gray)] p-4 sm:p-5 border-t border-[var(--brand-gray-medium)] flex flex-wrap justify-end gap-3 rounded-b-xl">
            {footerContent}
          </div>
        )}
      </div>
      {/* CORREÇÃO: Bloco <style jsx global> removido daqui */}
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
