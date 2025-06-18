import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Ajuste o caminho se necessário

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  // Se ainda estivermos verificando a autenticação, exibimos uma mensagem de carregamento.
  if (loading) {
    return <div className="text-center py-20">Verificando autorização...</div>;
  }

  // Se o usuário NÃO estiver autenticado, redirecionamos para a página inicial.
  if (!isAuthenticated) {
    // Usamos 'state' para que, após o login, possamos redirecionar o usuário
    // para a página que ele tentou acessar originalmente.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Se estiver tudo certo, renderizamos a página protegida.
  return children;
};

export default ProtectedRoute;