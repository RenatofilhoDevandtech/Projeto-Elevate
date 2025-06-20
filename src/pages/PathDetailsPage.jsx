// src/pages/PathDetailsPage.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  ChevronLeft, PlayCircle, Lock, CheckSquare, Award, Loader2, AlertTriangle, Lightbulb, BookOpen, Clock, Youtube,
} from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import Button from "../components/Common/Button";
import Modal from "../components/Common/Modal";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

// Componente do Player do YouTube
const YouTubeEmbed = ({ videoUrl, title, onClose }) => (
  <Modal isOpen={true} onClose={onClose} title={title} size="3xl">
    <div className={cleanTailwindClasses("aspect-video w-full")}>
      <iframe
        width="100%"
        height="100%"
        src={videoUrl} // Este é o 'videoUrl' que vem da PathDetailsPage
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={cleanTailwindClasses("rounded-lg")}
      ></iframe>
    </div>
  </Modal>
);
YouTubeEmbed.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const PathDetailsPage = () => {
  const { pathId } = useParams();
  const { isAuthenticated, loading: authLoading, openAuthModal } = useContext(AuthContext);

  const [pathData, setPathData] = useState(null);
  const [lessonStatus, setLessonStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null); // Estado que controla a visibilidade do modal de vídeo
  const [claimingCertificate, setClaimingCertificate] = useState(false);

  const fetchData = useCallback(async () => {
    if (!pathId) return;
    setLoading(true);
    setError("");
    try {
      const pathResponse = await api.get(`/paths/${pathId}`);
      setPathData(pathResponse.data);
      if (isAuthenticated) {
        const progressResponse = await api.get("/progress/status");
        const progressMap = Object.keys(progressResponse.data.userProgress || {}).filter((contentId) => progressResponse.data.userProgress[contentId] === "completed").reduce((acc, id) => { acc[id] = true; return acc; }, {});
        setLessonStatus(progressMap);
      }
    } catch (err) {
      console.error("Erro ao buscar detalhes da trilha:", err);
      setError(err.response?.data?.error || "Não foi possível carregar esta trilha. Verifique sua conexão ou tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [pathId, isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      fetchData();
    }
  }, [fetchData, authLoading]);

  // Função para gerenciar ações protegidas (ex: marcar como completo, assistir)
  const handleProtectedAction = useCallback(
    (action, requiresVideo = false, lesson = null) => {
      console.log("handleProtectedAction chamado!");
      console.log("isAuthenticated:", isAuthenticated);
      console.log("requiresVideo:", requiresVideo);
      console.log("lesson object received:", lesson); // NOVO LOG: Objeto 'lesson' completo
      console.log("lesson.content_type:", lesson?.content_type); // NOVO LOG: Tipo de conteúdo
      console.log("lesson.url:", lesson?.url); // NOVO LOG: URL recebida

      if (!isAuthenticated) {
        console.log("Usuário não autenticado. Abrindo modal de login.");
        alert("Você precisa fazer login para realizar esta ação!");
        if (openAuthModal) {
          openAuthModal("login");
        }
      } else {
        console.log("Usuário autenticado.");
        if (requiresVideo && lesson && lesson.content_type === "video") {
          console.log("Condição para vídeo atendida! Definindo currentVideo.");
          console.log("URL do vídeo a ser definida:", lesson.url); // NOVO LOG: URL que será usada
          setCurrentVideo({ url: lesson.url, title: lesson.title });
        } else if (action) {
          console.log("Executando ação não-vídeo (marcar como concluído).");
          action();
        } else {
            console.log("Nenhuma ação específica para vídeo ou ação para executar (usuário autenticado).");
        }
      }
    },
    [isAuthenticated, openAuthModal]
  );

  const handleToggleComplete = useCallback(async (lessonId) => {
    const currentStatusIsCompleted = !!lessonStatus[lessonId];
    setLessonStatus((prev) => ({ ...prev, [lessonId]: !currentStatusIsCompleted }));
    try {
      await api.post("/progress/mark-complete", { content_id: lessonId, status: !currentStatusIsCompleted ? "completed" : "in_progress", });
    } catch (error) {
      console.error("Erro ao salvar progresso:", error);
      setLessonStatus((prev) => ({ ...prev, [lessonId]: currentStatusIsCompleted, }));
      alert("Não foi possível salvar seu progresso.");
    }
  }, [lessonStatus]);

  const handleClaimCertificate = useCallback(async () => {
    if (!isAuthenticated) {
      if (openAuthModal) {
        openAuthModal("login");
      }
      return;
    }
    setClaimingCertificate(true);
    try {
      const response = await api.post("/certificates/generate", { path_id: pathId, });
      alert(response.data.message || "Certificado gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar certificado:", error);
      alert(error.response?.data?.error || "Não foi possível gerar o certificado. Verifique seu progresso.");
    } finally {
      setClaimingCertificate(false);
    }
  }, [isAuthenticated, pathId, openAuthModal]);

  if (loading || authLoading) {
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue mb-4")} size={40} />
        <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary font-semibold")}>Carregando detalhes da trilha...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cleanTailwindClasses("flex items-center justify-center py-32 bg-danger-red/10 border border-danger-red/20 text-danger-red rounded-xl shadow-custom-light min-h-[50vh] px-6")}>
        <AlertTriangle size={32} className={cleanTailwindClasses("mr-4 flex-shrink-0")} />
        <p className={cleanTailwindClasses("text-lg font-semibold")}>{error}</p>
      </div>
    );
  }

  if (!pathData) {
    return (
      <div className={cleanTailwindClasses("text-center py-32 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium")}>
        <h2 className={cleanTailwindClasses("text-2xl font-semibold text-text-primary mb-4")}>Trilha não encontrada.</h2>
        <p className={cleanTailwindClasses("text-text-secondary mb-6")}>A trilha que você está procurando pode não existir ou a URL está incorreta.</p>
        <Link to="/trilhas">
          <Button variant="primary" size="lg" leftIcon={ChevronLeft}>Voltar às Trilhas</Button>
        </Link>
      </div>
    );
  }

  // Desestruturar dados da trilha
  const {
    title, description, category, difficulty_level, cover_image_url, long_description, skills_array, career_opportunities_array, modules,
  } = pathData;
  const allLessons = modules?.flatMap((module) => module.contents) || [];
  const totalLessons = allLessons.length;
  const completedLessonsCount = allLessons.filter(
    (lesson) => lessonStatus[lesson.id]
  ).length;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  return (
    <div className={cleanTailwindClasses("container mx-auto px-6 py-8")}>
      {/* O componente YouTubeEmbed é renderizado se currentVideo NÃO FOR null */}
      {currentVideo && (
        <YouTubeEmbed
          videoUrl={currentVideo.url} // A URL virá daqui
          title={currentVideo.title}
          onClose={() => setCurrentVideo(null)} // Fecha o modal e reseta currentVideo
        />
      )}

      <Link
        to="/trilhas"
        className={cleanTailwindClasses("inline-flex items-center text-brand-blue hover:text-brand-blue-dark transition-colors duration-300 mb-4 group")}
      >
        <ChevronLeft
          size={20}
          className={cleanTailwindClasses("mr-2 transform transition-transform duration-300 group-hover:-translate-x-1")}
        />{" "}
        Voltar para as Trilhas
      </Link>

      <header className={cleanTailwindClasses("bg-brand-white p-6 rounded-xl shadow-custom-medium mb-12 border border-brand-gray-medium")}>
        <div className={cleanTailwindClasses("flex flex-col md:flex-row items-center md:items-start gap-8 mb-4")}>
          {cover_image_url && (
            <img
              src={cover_image_url}
              alt={`Capa da trilha ${title}`}
              className={cleanTailwindClasses("w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover flex-shrink-0 shadow-sm")}
            />
          )}
          <div>
            <h1 className={cleanTailwindClasses("text-4xl font-bold text-text-primary mb-2")}>{title}</h1>
            <p className={cleanTailwindClasses("text-text-secondary text-lg leading-relaxed")}>
              {description}
            </p>
            <div className={cleanTailwindClasses("flex flex-wrap items-center gap-4 mt-2")}>
              <span className={cleanTailwindClasses("inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-green/10 text-brand-green whitespace-nowrap")}>
                {category}
              </span>
              <span className={cleanTailwindClasses("inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-green/10 text-brand-green-dark whitespace-nowrap")}>
                <Lightbulb size={12} className={cleanTailwindClasses("mr-1")} /> {difficulty_level}
              </span>
            </div>
          </div>
        </div>

        {long_description && (
          <p className={cleanTailwindClasses("text-text-secondary text-base leading-relaxed mt-6 border-t border-brand-gray-medium pt-6")}>
            {long_description}
          </p>
        )}

        {skills_array && skills_array.length > 0 && (
          <div className={cleanTailwindClasses("mt-6")}>
            <h3 className={cleanTailwindClasses("text-lg font-semibold text-text-primary mb-2")}>
              Habilidades que você vai adquirir:
            </h3>
            <div className={cleanTailwindClasses("flex flex-wrap gap-2")}>
              {skills_array.map((skill, index) => (
                <span
                  key={index}
                  className={cleanTailwindClasses("px-4 py-2 rounded-full bg-brand-gray-medium text-text-secondary text-sm whitespace-nowrap")}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {career_opportunities_array &&
          career_opportunities_array.length > 0 && (
            <div className={cleanTailwindClasses("mt-6")}>
              <h3 className={cleanTailwindClasses("text-lg font-semibold text-text-primary mb-2")}>
                Oportunidades de Carreira:
              </h3>
              <div className={cleanTailwindClasses("flex flex-wrap gap-2")}>
                {career_opportunities_array.map((opportunity, index) => (
                  <span
                    key={index}
                    className={cleanTailwindClasses("px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm whitespace-nowrap")}
                  >
                    {opportunity}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Barra de progresso para usuários logados (mantida como está) */}
        {isAuthenticated && (
          <div className={cleanTailwindClasses("mt-12 pt-6 border-t border-brand-gray-medium")}>
            <div className={cleanTailwindClasses("flex justify-between mb-2 text-sm")}>
              <span className={cleanTailwindClasses("font-semibold text-brand-blue")}>
                Seu Progresso na Trilha
              </span>
              <span className={cleanTailwindClasses("font-bold text-brand-green")}>
                {progressPercentage}%
              </span>
            </div>
            <div className={cleanTailwindClasses("w-full bg-brand-gray-medium rounded-full h-4 overflow-hidden")}>
              <div
                className={cleanTailwindClasses("bg-gradient-to-r from-brand-green/70 to-brand-green h-4 rounded-full transition-all duration-500 ease-in-out")}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className={cleanTailwindClasses("text-xs text-text-secondary mt-1")}>
              {completedLessonsCount} de {totalLessons} aulas concluídas.
            </p>
          </div>
        )}
      </header>

      {/* Lista de Módulos e Aulas */}
      <div className={cleanTailwindClasses("space-y-8")}>
        {modules?.map((module) => (
          <div
            key={module.id}
            className={cleanTailwindClasses("bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium overflow-hidden")}
          >
            <div className={cleanTailwindClasses("p-6 bg-brand-gray border-b border-brand-gray-medium")}>
              <h3 className={cleanTailwindClasses("text-xl font-semibold text-text-primary")}>
                {module.title}
              </h3>
            </div>
            <ul className={cleanTailwindClasses("divide-y divide-brand-gray-medium")}>
              {module.contents?.map((lesson) => (
                <li
                  key={lesson.id}
                  className={cleanTailwindClasses("p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:bg-brand-gray")}
                >
                  <div className={cleanTailwindClasses("flex items-center flex-grow min-w-0")}>
                    {lesson.content_type === "video" ? (
                      <PlayCircle
                        className={cleanTailwindClasses("text-brand-blue mr-4 flex-shrink-0")}
                        size={24}
                      />
                    ) : (
                      <BookOpen
                        className={cleanTailwindClasses("text-brand-blue mr-4 flex-shrink-0")}
                        size={24}
                      />
                    )}
                    <span className={cleanTailwindClasses("font-medium text-text-primary truncate")}>
                      {lesson.title}
                    </span>
                  </div>
                  <div className={cleanTailwindClasses("flex items-center space-x-2 flex-shrink-0 text-text-secondary text-sm")}>
                    {lesson.estimated_duration_minutes && (
                      <span className={cleanTailwindClasses("flex items-center")}>
                        <Clock size={16} className={cleanTailwindClasses("mr-1 text-brand-gray-dark")} />{" "}
                        {lesson.estimated_duration_minutes}min
                      </span>
                    )}
                    {lesson.channel_name && lesson.content_type === "video" && (
                      <span className={cleanTailwindClasses("flex items-center")}>
                        <Youtube size={16} className={cleanTailwindClasses("mr-1 text-brand-gray-dark")} />{" "}
                        {lesson.channel_name}
                      </span>
                    )}

                    {/* Botões de Ação */}
                    <Button
                      size="sm"
                      variant="outline"
                      // AQUI: onClick chama handleProtectedAction
                      onClick={() => {
                        console.log("Botão Assistir clicado para lição:", lesson); // Log para verificar clique
                        handleProtectedAction(null, true, lesson);
                      }}
                      className={cleanTailwindClasses("py-2 px-4")}
                    >
                      Assistir
                    </Button>
                    <button
                      title={
                        isAuthenticated
                          ? lessonStatus[lesson.id]
                            ? "Concluído"
                            : "Marcar como concluído"
                          : "Faça login para marcar progresso"
                      }
                      onClick={() => {
                        console.log("Botão Marcar como Concluído clicado para lição:", lesson); // Log para verificar clique
                        handleProtectedAction(() =>
                          handleToggleComplete(lesson.id)
                        );
                      }}
                      className={cleanTailwindClasses(`p-2 rounded-full transition-colors ${
                        lessonStatus[lesson.id]
                          ? "bg-brand-green text-brand-white"
                          : "bg-brand-gray-medium text-text-secondary hover:bg-brand-gray-dark"
                      }`)}
                      disabled={!isAuthenticated || claimingCertificate}
                    >
                      {isAuthenticated ? (
                        <CheckSquare size={18} />
                      ) : (
                        <Lock size={18} />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Botão de certificado só aparece se logado e com 100% */}
      {isAuthenticated && progressPercentage === 100 && (
        <div className={cleanTailwindClasses("mt-12 text-center p-6 bg-brand-green/10 border border-brand-green/20 rounded-xl shadow-custom-light")}>
          <Award size={48} className={cleanTailwindClasses("text-brand-green mx-auto mb-4")} />
          <h2 className={cleanTailwindClasses("text-2xl font-semibold text-text-primary mb-2")}>
            Parabéns! Você concluiu a trilha!
          </h2>
          <p className={cleanTailwindClasses("text-text-secondary mb-6")}>
            Agora, reivindique seu certificado e celebre sua conquista.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={handleClaimCertificate}
            isLoading={claimingCertificate}
            disabled={claimingCertificate}
            leftIcon={Award}
            className={cleanTailwindClasses("py-3 px-6")}
          >
            {claimingCertificate
              ? "Gerando Certificado..."
              : "Reivindicar Certificado"}
          </Button>
        </div>
      )}
    </div>
  );
};

PathDetailsPage.propTypes = {
  // Não recebe props diretamente, usa useParams()
};

export default PathDetailsPage;