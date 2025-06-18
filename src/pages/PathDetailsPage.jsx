import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChevronLeft, PlayCircle, Lock, CheckSquare, Award, Loader2, AlertTriangle } from 'lucide-react';
import { AuthContext } from '@/contexts/AuthContext';
import api from '@/services/api';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';

// Componente do Player do YouTube (sem alterações)
const YouTubeEmbed = ({ videoUrl, title, onClose }) => (
  <Modal isOpen={true} onClose={onClose} title={title} size="3xl">
    <div className="aspect-video">
      <iframe width="100%" height="100%" src={`${videoUrl}?autoplay=1&rel=0`} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  </Modal>
);
YouTubeEmbed.propTypes = { videoUrl: PropTypes.string.isRequired, title: PropTypes.string.isRequired, onClose: PropTypes.func.isRequired };


const PathDetailsPage = () => {
  const { pathId } = useParams();
  const { isAuthenticated, openAuthModal } = useContext(AuthContext);

  const [pathData, setPathData] = useState(null);
  const [lessonStatus, setLessonStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!pathId) return;
      setLoading(true);
      setError('');
      try {
        // 1. Busca os detalhes da trilha (agora é uma rota pública)
        const pathResponse = await api.get(`/paths/${pathId}`);
        setPathData(pathResponse.data);

        // 2. Se o usuário estiver autenticado, busca o progresso dele
        if (isAuthenticated) {
          const progressResponse = await api.get('/progress/status');
          const progressMap = progressResponse.data.completedContentIds.reduce((acc, id) => {
            acc[id] = true;
            return acc;
          }, {});
          setLessonStatus(progressMap);
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes da trilha:", err);
        setError('Não foi possível carregar esta trilha.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pathId, isAuthenticated]);

  // Função genérica que abre o modal de login se o usuário não estiver logado
  const handleProtectedAction = (action) => {
    if (!isAuthenticated) {
      openAuthModal('login'); 
    } else {
      action();
    }
  };

  const handleToggleComplete = async (lessonId) => {
    const currentStatus = !!lessonStatus[lessonId];
    setLessonStatus(prev => ({ ...prev, [lessonId]: !currentStatus }));
    try {
      if (!currentStatus) await api.post('/progress/mark-complete', { content_id: lessonId });
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
      setLessonStatus(prev => ({ ...prev, [lessonId]: currentStatus })); // Reverte
      alert("Não foi possível salvar seu progresso.");
    }
  };

  // ... (função handleClaimCertificate) ...

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-blue" size={40}/></div>;
  if (error) return <div className="text-center py-20 text-danger-red bg-red-50 p-6 rounded-lg">{error}</div>;
  if (!pathData) return null;

  const { title, modules } = pathData;
  const allLessons = modules?.flatMap(module => module.contents) || [];
  const totalLessons = allLessons.length;
  const completedLessonsCount = allLessons.filter(lesson => lessonStatus[lesson.id]).length;
  const progress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  return (
    <div className="container mx-auto">
      {currentVideo && <YouTubeEmbed videoUrl={currentVideo.url} title={currentVideo.title} onClose={() => setCurrentVideo(null)} />}
      <Link to="/trilhas" className="inline-flex items-center text-brand-blue hover:text-brand-green mb-6 group"><ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1" /> Voltar</Link>
      
      <header className="bg-brand-white p-8 rounded-xl shadow-lg mb-10 border">
        <h1 className="text-4xl font-bold text-brand-blue">{title}</h1>
        {isAuthenticated && ( /* A barra de progresso só aparece para usuários logados */
          <div className="mt-6">
            <div className="flex justify-between mb-1 text-sm"><span className="font-semibold">Seu Progresso</span><span className="font-bold text-brand-green">{progress}%</span></div>
            <div className="w-full bg-brand-gray-medium rounded-full h-4"><div className="bg-gradient-to-r from-green-400 to-brand-green h-4 rounded-full" style={{ width: `${progress}%` }}></div></div>
            <p className="text-xs text-text-secondary mt-1">{completedLessonsCount} de {totalLessons} aulas concluídas.</p>
          </div>
        )}
      </header>

      <div className="space-y-6">
        {modules?.map(module => (
          <div key={module.id} className="bg-white rounded-xl shadow-lg border">
            <div className="p-5 bg-brand-gray border-b"><h3 className="text-xl font-semibold">{module.title}</h3></div>
            <ul className="divide-y divide-brand-gray-medium">
              {module.contents?.map(lesson => (
                <li key={lesson.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center flex-grow min-w-0"><PlayCircle className="text-brand-blue mr-3 flex-shrink-0" size={24} /><span className="font-medium truncate">{lesson.title}</span></div>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => handleProtectedAction(() => setCurrentVideo({ url: lesson.url, title: lesson.title }))}>Assistir</Button>
                    <button title="Marcar como concluído" onClick={() => handleProtectedAction(() => handleToggleComplete(lesson.id))} className={`p-2 rounded-full transition-colors ${lessonStatus[lesson.id] ? 'bg-brand-green text-white' : 'bg-brand-gray-medium text-text-secondary'}`} disabled={!isAuthenticated}>
                      {isAuthenticated ? <CheckSquare size={18} /> : <Lock size={18} />}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Botão de certificado só aparece se logado e com 100% */}
      {isAuthenticated && progress === 100 && ( <div className="mt-12 text-center ...">{/* ... */}</div> )}
    </div>
  );
};

export default PathDetailsPage;