import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, PlayCircle, BookText, CheckSquare, Award, Info, Users, MessageCircle, Star, ArrowRight, YoutubeIcon } from 'lucide-react';
import { allPathsData } from '../data/mockPaths';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal'; // Para o player do YouTube

const YouTubeEmbed = ({ youtubeId, title, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} title={title}>
        <div className="aspect-video">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    </Modal>
  );
};

const PathDetailsPage = () => {
  const { pathId } = useParams();
  const [pathData, setPathData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null); // { youtubeId, title }
  const [lessonStatus, setLessonStatus] = useState({}); // { lessonId: true/false }

  useEffect(() => {
    const foundPath = allPathsData.find(p => p.id === pathId);
    if (foundPath && foundPath.details) {
      setPathData(foundPath);
      // Inicializar status das aulas (poderia vir do backend/localStorage)
      const initialStatus = {};
      foundPath.details.modulesData.forEach(module => {
        module.lessons.forEach(lesson => {
          initialStatus[lesson.id] = lesson.completed || false;
        });
      });
      setLessonStatus(initialStatus);
    }
  }, [pathId]);

  const toggleLessonComplete = (lessonId) => {
    setLessonStatus(prevStatus => ({
      ...prevStatus,
      [lessonId]: !prevStatus[lessonId]
    }));
    // TODO: Salvar progresso no backend/localStorage
  };

  if (!pathData) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">Carregando dados da trilha...</h2>
        {/* Poderia adicionar um spinner aqui */}
        <Link to="/trilhas" className="text-brand-blue hover:underline mt-4 inline-block">Voltar para Trilhas</Link>
      </div>
    );
  }

  const { title, description, icon, details } = pathData;
  const { longDescription, skills, careerOpportunities, modulesData } = details;

  const totalLessons = modulesData.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const completedLessonsCount = Object.values(lessonStatus).filter(status => status === true).length;
  const progress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  return (
    <div className="container mx-auto">
      <Link to="/trilhas" className="inline-flex items-center text-brand-blue hover:text-brand-green mb-6 group transition-colors">
        <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Voltar para Trilhas
      </Link>

      {currentVideo && (
        <YouTubeEmbed youtubeId={currentVideo.youtubeId} title={currentVideo.title} onClose={() => setCurrentVideo(null)} />
      )}

      {/* Cabeçalho da Trilha */}
      <header className="bg-brand-white p-6 sm:p-8 rounded-xl shadow-card mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
          <span className="text-5xl sm:text-6xl mr-4 sm:mr-6 bg-brand-blue text-white p-3 rounded-lg inline-block mb-3 sm:mb-0">{icon || '💡'}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-blue">{title}</h1>
            <p className="text-text-secondary mt-1 text-sm sm:text-base">{description}</p>
          </div>
        </div>
        {/* Barra de Progresso */}
        <div>
            <div className="flex justify-between mb-1 text-sm">
                <span className="text-brand-blue font-semibold">Seu Progresso na Trilha</span>
                <span className="text-brand-green font-bold">{progress}% Completo</span>
            </div>
            <div className="w-full bg-brand-gray-medium rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-brand-green h-4 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-text-secondary mt-1">{completedLessonsCount} de {totalLessons} aulas concluídas.</p>
        </div>
      </header>

      {/* Abas de Conteúdo (Visão Geral, Módulos, Discussão) - Exemplo simples */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal: Módulos e Aulas */}
        <div className="lg:col-span-2 space-y-8">
          <section id="modules" className="bg-brand-white p-6 rounded-xl shadow-card">
            <h2 className="text-2xl font-bold text-text-primary mb-6 border-b pb-3">Módulos da Trilha</h2>
            <div className="space-y-6">
              {modulesData.map(module => (
                <div key={module.id} className="border border-brand-gray-medium rounded-lg overflow-hidden">
                  <div className={`p-4 bg-brand-gray flex justify-between items-center cursor-pointer`}> {/* TODO: Accordion toggle */}
                    <h3 className="text-xl font-semibold text-brand-blue">{module.title}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      module.level === 'Básico' ? 'bg-green-100 text-green-700' :
                      module.level === 'Intermediário' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>{module.level}</span>
                  </div>
                  {module.lessons && module.lessons.length > 0 ? (
                    <ul className="divide-y divide-brand-gray-medium">
                      {module.lessons.map(lesson => (
                        <li key={lesson.id} className="p-4 flex items-center justify-between hover:bg-blue-50 transition-colors">
                          <div className="flex items-center">
                            {lesson.type === 'video' ?
                              <YoutubeIcon className="text-red-600 mr-3 flex-shrink-0" size={24}/> :
                              <BookText className="text-brand-blue mr-3 flex-shrink-0" size={24} />}
                            <div className="flex-grow">
                              <span className="font-medium text-text-primary block">{lesson.title}</span>
                              <span className="text-xs text-text-secondary">({lesson.duration})</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {lesson.type === 'video' && lesson.youtubeId && (
                                <Button size="sm" variant="outline" onClick={() => setCurrentVideo({ youtubeId: lesson.youtubeId, title: lesson.title })}>
                                    <PlayCircle size={16} className="mr-1"/> Assistir
                                </Button>
                            )}
                            {lesson.type === 'article' && lesson.link && (
                                <a href={lesson.link} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm" variant="outline">
                                        <ArrowRight size={16} className="mr-1"/> Ler Artigo
                                    </Button>
                                </a>
                            )}
                            <button
                                title={lessonStatus[lesson.id] ? "Marcar como não concluído" : "Marcar como concluído"}
                                onClick={() => toggleLessonComplete(lesson.id)}
                                className={`p-2 rounded-full transition-colors ${lessonStatus[lesson.id] ? 'bg-brand-green text-white hover:bg-green-700' : 'bg-brand-gray-medium text-text-secondary hover:bg-brand-gray-dark'}`}
                            >
                                <CheckSquare size={18} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-4 text-text-secondary text-sm">Conteúdo deste módulo em breve!</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Seção de Discussão (placeholder) */}
          <section id="discussion" className="bg-brand-white p-6 rounded-xl shadow-card">
            <h2 className="text-2xl font-bold text-text-primary mb-4 border-b pb-3 flex items-center"><MessageCircle size={24} className="mr-2 text-brand-blue" /> Discussão da Trilha</h2>
            <p className="text-text-secondary">Espaço para tirar dúvidas, compartilhar aprendizados e interagir com outros alunos desta trilha. (Em breve!)</p>
            {/* TODO: Implementar sistema de comentários/fórum */}
          </section>
        </div>

        {/* Coluna Lateral: Informações da Trilha */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="bg-brand-white p-6 rounded-xl shadow-card sticky top-24"> {/* top-24 para header + filtros */}
            <h3 className="text-xl font-bold text-text-primary mb-4 border-b pb-2 flex items-center"><Info size={20} className="mr-2 text-brand-blue"/> Sobre esta Trilha</h3>
            <p className="text-sm text-text-secondary mb-4">{longDescription}</p>

            <h4 className="text-md font-semibold text-text-primary mb-2 mt-4">Habilidades que você vai desenvolver:</h4>
            <ul className="flex flex-wrap gap-2 mb-4">
              {skills.map(skill => <span key={skill} className="bg-blue-100 text-brand-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">{skill}</span>)}
            </ul>

            <h4 className="text-md font-semibold text-text-primary mb-2 mt-4">Oportunidades de Carreira:</h4>
            <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                {careerOpportunities.map(op => <li key={op}>{op}</li>)}
            </ul>

            {progress === 100 && (
                <div className="mt-8 text-center">
                    <Button variant="secondary" size="lg" className="w-full">
                        <Award size={20} className="mr-2"/> Reivindicar Certificado!
                    </Button>
                </div>
            )}
             <div className="mt-6 border-t pt-4">
                <h4 className="text-md font-semibold text-text-primary mb-2">Gostou desta trilha?</h4>
                <Button variant="outline" size="md" className="w-full mb-2">
                    <Star size={16} className="mr-2"/> Avaliar Trilha
                </Button>
                <Button variant="ghost" size="md" className="w-full">
                    <Users size={16} className="mr-2"/> Convidar Amigos
                </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PathDetailsPage;