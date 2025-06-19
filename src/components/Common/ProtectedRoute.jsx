import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

// Se você tiver um componente Spinner dedicado, importe-o aqui:
// import Spinner from '../Common/Spinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  // Se ainda estivermos verificando a autenticação, exibimos um feedback visual claro.
  if (loading) {
    return (
      <div className={cleanTailwindClasses("flex flex-col items-center justify-center min-h-screen bg-brand-gray text-text-secondary py-32")}>
        {/* Usando o SVG de spinner padrão do Tailwind, alinhado com o tema */}
        <svg
          className={cleanTailwindClasses("animate-spin h-10 w-10 text-brand-blue mb-4")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          role="status"
          aria-label="Carregando"
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
        <p className={cleanTailwindClasses("text-xl font-semibold text-text-primary")}>Verificando sua autorização...</p>
        <p className={cleanTailwindClasses("text-base mt-2 text-text-secondary max-w-md text-center px-4")}>
          Aguarde um momento enquanto carregamos o conteúdo necessário para você acessar esta página.
        </p>
      </div>
    );
  }

  // Se o usuário NÃO estiver autenticado, redirecionamos para a página inicial.
  if (!isAuthenticated) {
    // Usamos 'state' para que, após o login, possamos redirecionar o usuário
    // para a página que ele tentou acessar originalmente.
    // O 'replace' evita que a página protegida fique no histórico de navegação.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Se estiver tudo certo, renderizamos a página protegida.
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // O conteúdo que será protegido (componentes filhos)
};

export default ProtectedRoute;