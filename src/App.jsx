// src/App.jsx
import React, { useEffect, useContext } from "react"; // Removido useState
import { Routes, Route, useLocation } from "react-router-dom"; // Removido useState

// Provedores de Contexto
// IMPORTANTE: Precisamos importar AuthContext também para usá-lo aqui.
import { AuthProvider, AuthContext } from "./contexts/AuthContext"; // Importa AuthContext para usar useContext

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

// IMPORTANTE: Remova a importação do AuthModal daqui
// import AuthModal from "./components/Auth/AuthModal"; 

function App() {
  // REMOVIDO: Estados e funções do AuthModal, agora gerenciados no AuthContext.
  // const [authModalOpen, setAuthModalOpen] = useState(false);
  // const [authModalType, setAuthModalType] = useState("login");
  // const openLoginModal = () => { setAuthModalType("login"); setAuthModalOpen(true); };
  // const openRegisterModal = () => { setAuthModalType("register"); setAuthModalOpen(true); };

  // Para a rota /login-register, precisamos acessar a função openLoginModal do contexto.
  // Opcional: Você pode remover essa linha se o AuthContext já lida com a rota /login-register.
  // Se quiser manter essa detecção no App.jsx, importe useLocation.
  const { openLoginModal } = useContext(AuthContext); // Acessa a função do contexto

  const location = useLocation(); // UseLocation ainda é necessário se o useEffect abaixo for mantido

  // Efeito para abrir o modal automaticamente se a rota for /login-register
  useEffect(() => {
    if (location.pathname === "/login-register") {
      openLoginModal(); // Chama a função do contexto
    }
  }, [location.pathname, openLoginModal]); // openLoginModal é uma dependência

  return (
    // AuthProvider agora engloba tudo e renderiza o AuthModal internamente.
    <AuthProvider> 
      <Routes>
        <Route
          path="/"
          element={
            // MainLayout não precisa de props openLoginModal/openRegisterModal;
            // componentes internos (Header, HomePage) acessarão via useContext(AuthContext).
            <MainLayout /> 
          }
        >
          {/* HomePage e outros componentes acessarão openLoginModal/openRegisterModal via useContext(AuthContext). */}
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
          
          {/* Rota /login-register: Renderiza null. O AuthContext já detectará esta rota e abrirá o modal. */}
          <Route path="login-register" element={null} />
        </Route>

        {/* Rotas Protegidas - MainLayout dentro de ProtectedRoute também não precisa de props */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="teste-perfil" element={<ProfileTestPage />} />
          <Route path="teste/resultado" element={<TestResultPage />} />
          <Route path="simulador-ia" element={<InterviewSimPage />} />
        </Route>

        <Route path="/certificado/:uniqueCode" element={<PublicCertificatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* REMOVIDO: AuthModal não é mais renderizado aqui, ele está dentro do AuthProvider */}
    </AuthProvider>
  );
}

export default App;