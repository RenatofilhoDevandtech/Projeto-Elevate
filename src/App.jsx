import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // <<< CORREÇÃO AQUI: useLocation voltou para ser importado aqui

// Provedores de Contexto
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

// Layouts e Componentes Comuns
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/Common/ProtectedRoute";

// Páginas
import HomePage from "./pages/HomePage";
import LearningPathsPage from "./pages/LearningPathsPage";
import PathDetailsPage from "./pages/PathDetailsPage";
import CommunityPage from "./pages/CommunityPage";
import ForumTopicDetailsPage from "./pages/ForumTopicDetailsPage";
import CertificatesPage from "./pages/CertificatesPage";
import UnderConstruction from "./components/Common/UnderConstruction";
import PublicCertificatePage from "./pages/PublicCertificatePage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ProfileTestPage from "./pages/ProfileTestPage";
import TestResultPage from "./pages/TestResultPage";
import InterviewSimPage from "./pages/InterviewSimPage";

// NOVO COMPONENTE: Wrapper para a rota /login-register
const LoginRegisterWrapper = () => {
  const { openLoginModal } = useContext(AuthContext);
  // Não precisamos mais desestruturar 'pathname' aqui se não for usado.
  // Apenas a chamada de useLocation é suficiente para o hook.
  useLocation(); // <<< CORREÇÃO AQUI: Chamada de useLocation() para garantir que o hook seja usado no escopo.

  useEffect(() => {
    // openLoginModal() será chamado quando este componente for montado.
    openLoginModal();
  }, [openLoginModal]);

  return null; // Este componente não renderiza nada visível.
};


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="trilhas" element={<LearningPathsPage />} />
          <Route path="trilha/:pathId" element={<PathDetailsPage />} />
          <Route path="comunidade" element={<CommunityPage />} />
          <Route path="comunidade/topico/:topicSlug" element={<ForumTopicDetailsPage />} />
          <Route path="certificados" element={<CertificatesPage />} />
          <Route path="publicar-conteudo" element={<UnderConstruction pageName="Criação de Conteúdo" expectedFeatures={["Ferramentas de upload", "Edição de módulos", "Integração com YouTube (admin)"]} />} />
          <Route path="sobre" element={<UnderConstruction pageName="Sobre Nós" expectedFeatures={["Nossa história", "Missão e Valores", "Equipe"]} />} />
          <Route path="contato" element={<UnderConstruction pageName="Contato" expectedFeatures={["Formulário de contato", "FAQ", "Canais de suporte"]} />} />
          <Route path="carreiras" element={<UnderConstruction pageName="Carreiras" expectedFeatures={["Oportunidades no Elevate", "Parcerias com empresas"]} />} />
          <Route path="termos" element={<UnderConstruction pageName="Termos de Serviço" expectedFeatures={["Condições de uso", "Direitos e deveres"]} />} />
          <Route path="privacidade" element={<UnderConstruction pageName="Política de Privacidade" expectedFeatures={["Como usamos seus dados", "Cookies", "Seus direitos"]} />} />

          {/* Rota /login-register: Renderiza o wrapper que abrirá o modal */}
          <Route path="login-register" element={<LoginRegisterWrapper />} />
        </Route>

        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="teste-perfil" element={<ProfileTestPage />} />
          <Route path="teste/resultado" element={<TestResultPage />} />
          <Route path="simulador-ia" element={<InterviewSimPage />} />
        </Route>

        <Route path="/certificado/:uniqueCode" element={<PublicCertificatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;