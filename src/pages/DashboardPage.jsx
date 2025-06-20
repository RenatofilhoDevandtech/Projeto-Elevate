import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import { Award, BookOpen, Activity, Loader2, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const DashboardPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [stats, setStats] = useState({ 
    completedLessons: 0, 
    certificates: 0 
  });
  const [nextLearningSuggestion, setNextLearningSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Estado de erro para falhas críticas
  const [hasProfileTestSubmission, setHasProfileTestSubmission] = useState(false); 

  const motivationalQuotes = useMemo(() => ([
    "Pequenos passos levam a grandes conquistas. Mantenha o ritmo!",
    "A consistência é a chave do sucesso. Você está indo muito bem!",
    "Cada aula é um investimento no seu futuro. Não desista!",
    "O aprendizado é uma jornada. Celebre cada passo!",
    "Sua dedicação hoje molda o seu amanhã. Avance para o próximo desafio!"
  ]), []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || authLoading) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(''); 
      setHasProfileTestSubmission(false); 

      let currentFatalError = ''; 

      try {
        const [progressRes, certificatesRes, pathsRes, profileSubmissionRes] = await Promise.allSettled([
          api.get('/progress/status'),
          api.get('/certificates'),
          api.get('/paths'),
          api.get('/profile-test/my-submission')
        ]);
        
        // --- Processamento de cada promessa ---

        // 1. Processar progresso (essencial)
        if (progressRes.status === 'fulfilled') {
          const completedContentCount = Object.values(progressRes.value.data.userProgress || {}).filter(
            status => status === 'completed'
          ).length;
          setStats(prev => ({ ...prev, completedLessons: completedContentCount }));
        } else {
          console.error("Erro ao buscar progresso (fatal):", progressRes.reason);
          currentFatalError = progressRes.reason?.response?.data?.error || "Erro ao carregar seu progresso.";
        }

        // 2. Processar certificados (opcional)
        if (certificatesRes.status === 'fulfilled') {
          setStats(prev => ({ ...prev, certificates: certificatesRes.value.data.length }));
        } else {
          console.warn("Aviso: Erro ao buscar certificados (não fatal):", certificatesRes.reason);
        }

        // 3. Processar trilhas (essencial)
        let allPaths = [];
        if (pathsRes.status === 'fulfilled') {
          allPaths = pathsRes.value.data.data || [];
        } else {
          console.error("Erro ao buscar trilhas:", pathsRes.reason);
          currentFatalError = pathsRes.reason?.response?.data?.error || "Erro ao carregar as trilhas disponíveis.";
        }

        // 4. Processar submissão do teste de perfil (opcional, com 404 tratado)
        let userProfileSubmission = null;
        let profileTestSpecificError = ''; 

        if (profileSubmissionRes.status === 'fulfilled') {
          userProfileSubmission = profileSubmissionRes.value.data;
          setHasProfileTestSubmission(true);
        } else if (profileSubmissionRes.status === 'rejected' && profileSubmissionRes.reason && profileSubmissionRes.reason.response && profileSubmissionRes.reason.response.status === 404) {
          // Cenário de 404 esperado para my-submission: NÃO é um erro fatal.
          console.log("Usuário ainda não submeteu o teste de perfil (404 esperado).");
          setHasProfileTestSubmission(false); 
        } else if (profileSubmissionRes.status === 'rejected') {
          // Outros erros REJEITADOS para profile-test/my-submission (ex: 500, 401)
          console.error("Erro inesperado ao buscar submissão do teste de perfil (não 404):", profileSubmissionRes.reason);
          profileTestSpecificError = profileSubmissionRes.reason?.response?.data?.error || "Não foi possível carregar dados do seu teste de perfil.";
        }

        // --- Ativar erro global se houver falha crítica em dados essenciais ---
        if (currentFatalError) {
            setError(currentFatalError);
        } else { // Se não houve erro fatal nos dados essenciais, prossegue com a lógica de sugestão
            let suggestion = null;

            const inProgressPaths = allPaths.filter(p => 
              p.userProgress && p.userProgress.percentage > 0 && p.userProgress.percentage < 100
            ).sort((a, b) => b.userProgress.percentage - a.userProgress.percentage);

            if (inProgressPaths.length > 0) {
              const currentPath = inProgressPaths[0];
              suggestion = {
                type: 'path',
                title: `Continue em: ${currentPath.title}`,
                link: `/trilha/${currentPath.id}`,
                icon: <TrendingUp size={20} className={cleanTailwindClasses("text-brand-green")} />,
                message: `Você já completou ${currentPath.userProgress.percentage}% desta trilha. Está quase lá!`
              };
            } 
            else if (userProfileSubmission && userProfileSubmission.recommended_path_ids && userProfileSubmission.recommended_path_ids.length > 0) {
              const recommendedPathId = userProfileSubmission.recommended_path_ids[0];
              const recommendedPath = allPaths.find(p => p.id === recommendedPathId);

              if (recommendedPath && (!recommendedPath.userProgress || recommendedPath.userProgress.percentage === 0)) {
                suggestion = {
                  type: 'path',
                  title: `Comece sua jornada: ${recommendedPath.title}`,
                  link: `/trilha/${recommendedPath.id}`,
                  icon: <Lightbulb size={20} className={cleanTailwindClasses("text-brand-blue")} />,
                  message: "Seu teste de perfil indicou esta trilha como um excelente ponto de partida para você!"
                };
              }
            }

            if (!suggestion) {
                if (!hasProfileTestSubmission && !profileTestSpecificError) { 
                    suggestion = {
                        type: 'profile-test',
                        title: "Descubra seu perfil tech!",
                        link: '/teste-perfil',
                        icon: <Lightbulb size={20} className={cleanTailwindClasses("text-brand-blue")} />,
                        message: "Faça nosso teste vocacional para recomendações personalizadas de trilhas."
                    };
                } else if (profileTestSpecificError) { 
                    suggestion = {
                        type: 'recommendation-error', 
                        title: "Recomendação indisponível",
                        link: '/trilhas', 
                        icon: <AlertTriangle size={20} className={cleanTailwindClasses("text-danger-red")} />,
                        message: profileTestSpecificError 
                    };
                } else { 
                    suggestion = {
                        type: 'explore',
                        title: "Onde começar?",
                        link: '/trilhas',
                        icon: <BookOpen size={20} className={cleanTailwindClasses("text-text-secondary")} />,
                        message: motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
                    };
                }
            }
            setNextLearningSuggestion(suggestion);
        }

      } catch (err) { 
        console.error("Erro fatal e inesperado (fora do Promise.allSettled ou catch final):", err);
        setError("Ocorreu um erro inesperado ao carregar o dashboard. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, authLoading, motivationalQuotes, hasProfileTestSubmission]);

  if (loading || authLoading) {
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue mb-4")} size={40} />
        <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary font-semibold")}>Carregando seu dashboard...</p>
      </div>
    );
  }

  if (!user && !authLoading) {
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <AlertTriangle className={cleanTailwindClasses("text-danger-red mb-4")} size={40} />
        <h2 className={cleanTailwindClasses("text-2xl font-semibold text-text-primary mb-4")}>Acesso Negado</h2>
        <p className={cleanTailwindClasses("text-text-secondary mb-6")}>Por favor, faça login para acessar seu dashboard.</p>
        <Link to="/login-register">
          <Button variant="primary" size="lg">Fazer Login</Button>
        </Link>
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

  return (
    <div className={cleanTailwindClasses("container mx-auto px-6 py-8")}>
      <h1 className={cleanTailwindClasses("text-4xl font-bold text-text-primary mb-2")}>Bem-vindo(a) de volta, {user?.user_metadata?.full_name || 'Usuário'}!</h1>
      <p className={cleanTailwindClasses("text-lg text-text-secondary mb-12")}>Aqui está um resumo da sua jornada na Elevate.</p>

      <div className={cleanTailwindClasses("grid grid-cols-1 md:grid-cols-3 gap-8")}>
        <div className={cleanTailwindClasses("p-6 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium flex items-center gap-4")}>
          <BookOpen className={cleanTailwindClasses("text-brand-blue")} size={40} />
          <div>
            <p className={cleanTailwindClasses("text-3xl font-bold text-text-primary")}>{stats.completedLessons}</p>
            <p className={cleanTailwindClasses("text-text-secondary text-sm")}>Aulas Concluídas</p>
          </div>
        </div>
        <div className={cleanTailwindClasses("p-6 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium flex items-center gap-4")}>
          <Award className={cleanTailwindClasses("text-brand-green")} size={40} />
          <div>
            <p className={cleanTailwindClasses("text-3xl font-bold text-text-primary")}>{stats.certificates}</p>
            <p className={cleanTailwindClasses("text-text-secondary text-sm")}>Certificados Conquistados</p>
          </div>
        </div>
        <div className={cleanTailwindClasses("p-6 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium flex flex-col justify-between")}>
            {nextLearningSuggestion && (
                <>
                    <div className={cleanTailwindClasses("flex items-start gap-2 mb-4")}>
                        {nextLearningSuggestion.icon}
                        <div>
                            <h3 className={cleanTailwindClasses("text-lg font-semibold text-text-primary")}>{nextLearningSuggestion.title}</h3>
                            <p className={cleanTailwindClasses("text-sm text-text-secondary mt-1")}>{nextLearningSuggestion.message}</p>
                        </div>
                    </div>
                    <Link to={nextLearningSuggestion.link} className={cleanTailwindClasses("mt-auto")}>
                        <Button variant="primary" size="sm" fullWidth>
                            {/* Ajustado texto do botão com base no tipo de sugestão */}
                            {nextLearningSuggestion.type === 'explore' ? 'Começar a Explorar' : 
                             nextLearningSuggestion.type === 'profile-test' ? 'Fazer Teste Agora' : 
                             nextLearningSuggestion.type === 'recommendation-error' ? 'Tentar Novamente' : 
                             'Continuar Aprendendo'}
                        </Button>
                    </Link>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;