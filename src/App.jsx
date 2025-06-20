import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LearningPathsPage from './pages/LearningPathsPage';
import PathDetailsPage from './pages/PathDetailsPage';
import ProfileTestPage from './pages/ProfileTestPage';
import InterviewSimPage from './pages/InterviewSimPage';
import CommunityPage from './pages/CommunityPage';
import CertificatesPage from './pages/CertificatesPage';
import NotFoundPage from './pages/NotFoundPage';
import Educadores from './pages/Educadores'; 

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/trilhas" element={<LearningPathsPage />} />
        <Route path="/trilha/:pathId" element={<PathDetailsPage />} />
        <Route path="/teste-perfil" element={<ProfileTestPage />} />
        <Route path="/simulador-entrevista" element={<InterviewSimPage />} />
        <Route path="/comunidade" element={<CommunityPage />} />
        <Route path="/certificados" element={<CertificatesPage />} />
        <Route path="/educadores" element={<Educadores />} /> {/* Sua nova rota */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;