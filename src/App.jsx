import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts e Componentes de Rota
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Páginas
import HomePage from './pages/HomePage';
import LearningPathsPage from './pages/LearningPathsPage';
import PathDetailsPage from './pages/PathDetailsPage';
import ProfileTestPage from './pages/ProfileTestPage';
import TestResultPage from './pages/TestResultPage';
import InterviewSimPage from './pages/InterviewSimPage';
import DashboardPage from './pages/DashboardPage';
import CertificatesPage from './pages/CertificatesPage';
import ContentCreationPage from './pages/ContentCreationPage';
import CommunityPage from './pages/CommunityPage';
import PublicCertificatePage from './pages/PublicCertificatePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="trilhas" element={<LearningPathsPage />} />
        <Route path="trilha/:pathId" element={<PathDetailsPage />} />
        <Route path="comunidade" element={<CommunityPage />} />
        <Route path="certificados" element={<CertificatesPage />} />
        <Route path="publicar-conteudo" element={<ContentCreationPage />} />
      </Route>

      {/* Rota pública especial sem o layout principal */}
      <Route path="/certificado/:uniqueCode" element={<PublicCertificatePage />} />

      {/* Rotas Privadas (protegidas pelo componente ProtectedRoute) */}
      <Route path="/perfil" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/teste-perfil" element={<ProtectedRoute><ProfileTestPage /></ProtectedRoute>} />
      <Route path="/teste/resultado" element={<ProtectedRoute><TestResultPage /></ProtectedRoute>} />
      <Route path="/simulador" element={<ProtectedRoute><InterviewSimPage /></ProtectedRoute>} />

      {/* Rota 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;