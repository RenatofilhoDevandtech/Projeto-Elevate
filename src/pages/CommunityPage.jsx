// src/pages/CommunityPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquareText,
  PlusCircle,
  Loader2,
  AlertTriangle,
  UserCircle,
  CalendarDays,
  MessageSquareQuote,
} from "lucide-react";
import api from "../services/api";
import Button from "../components/Common/Button";
import { AuthContext } from "../contexts/AuthContext";
import CreateTopicModal from "../components/Forum/CreateTopicModal";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const CommunityPage = () => {
  const {
    isAuthenticated,
    user,
    loading: authLoading, // Estado de carregamento do contexto de autenticação
  } = useContext(AuthContext);
  const [topics, setTopics] = useState([]); // Lista de tópicos do fórum
  const [loading, setLoading] = useState(true); // Estado de carregamento dos tópicos
  const [error, setError] = useState(""); // Estado de erro para a busca de tópicos
  const [isCreateTopicModalOpen, setIsCreateTopicModalOpen] = useState(false); // Estado para abrir/fechar o modal de criação de tópico

  useEffect(() => {
    const fetchTopics = async () => {
      // Se a autenticação ainda está carregando, mantém o loading e sai.
      // A requisição para tópicos só deve ser feita após o AuthContext resolver o estado.
      if (authLoading) {
        setLoading(true); 
        return; 
      }

      setLoading(true); // Inicia o loading para a requisição de tópicos
      setError(""); // Limpa erros anteriores ao iniciar nova busca
      try {
        const response = await api.get("/forum/topics"); // Busca os tópicos do backend
        setTopics(response.data);
      } catch (err) {
        console.error("Erro ao buscar tópicos do fórum:", err);
        // Mensagem de erro mais específica e amigável para o usuário
        setError(
          err.response?.data?.error ||
            "Não foi possível carregar os tópicos do fórum. Por favor, verifique sua conexão com a internet ou tente novamente mais tarde."
        );
      } finally {
        setLoading(false); // Finaliza o loading, independente de sucesso ou erro
      }
    };

    fetchTopics(); // Chama a função de busca
  }, [authLoading]); // A requisição é re-disparada se o estado de carregamento da autenticação mudar

  // Função para formatar a data de última atividade do tópico
  const formatLastActivity = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Função chamada após o sucesso na criação de um tópico (via CreateTopicModal)
  const handleTopicCreated = (newTopic) => {
    setTopics((prevTopics) => [newTopic, ...prevTopics]); // Adiciona o novo tópico ao topo da lista
    setIsCreateTopicModalOpen(false); // Fecha o modal após a criação
  };

  // --- Renderização Condicional Baseada nos Estados (UX) ---
  // Exibe tela de carregamento enquanto os tópicos estão sendo buscados ou a autenticação está carregando
  if (loading || authLoading) { 
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue mb-4")} size={40} />
        <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary font-semibold")}>
          Carregando tópicos da comunidade...
        </p>
      </div>
    );
  }

  // Se houver um erro na busca de tópicos, exibe a mensagem de erro
  if (error) { 
    return (
      <div className={cleanTailwindClasses("flex flex-col sm:flex-row items-center justify-center py-32 bg-danger-red/10 border border-danger-red/20 text-danger-red rounded-xl shadow-custom-light min-h-[50vh] px-6 text-center sm:text-left")}>
        <AlertTriangle size={32} className={cleanTailwindClasses("mr-0 sm:mr-4 mb-4 sm:mb-0 flex-shrink-0")} />
        <p className={cleanTailwindClasses("text-lg font-semibold")}>{error}</p>
      </div>
    );
  }

  return (
    <div className={cleanTailwindClasses("container mx-auto px-6 py-8")}>
      <div className={cleanTailwindClasses("flex justify-between items-center mb-12")}>
        <h1 className={cleanTailwindClasses("text-4xl md:text-5xl font-bold text-text-primary")}>
          Fórum da Comunidade
        </h1>
        {isAuthenticated && ( // Botão "Novo Tópico" visível apenas para usuários autenticados
          <Button
            variant="primary"
            size="lg"
            leftIcon={PlusCircle}
            onClick={() => setIsCreateTopicModalOpen(true)} // Abre o modal de criação de tópico
            className={cleanTailwindClasses("py-3 px-6")}
          >
            Novo Tópico
          </Button>
        )}
      </div>

      {topics.length === 0 ? ( // Exibe mensagem se não houver tópicos
        <div className={cleanTailwindClasses("text-center py-32 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium")}>
          <MessageSquareText
            size={52}
            className={cleanTailwindClasses("mx-auto text-brand-gray-dark mb-4")}
          />
          <h2 className={cleanTailwindClasses("text-2xl font-semibold text-text-primary")}>
            Nenhum tópico ainda.
          </h2>
          <p className={cleanTailwindClasses("text-text-secondary mt-2 mb-6 max-w-xl mx-auto px-4 leading-relaxed")}>
            {isAuthenticated ? (
              <span>
                Olá, {user?.user_metadata?.full_name || "futuro(a) dev"}! Seja o
                primeiro a iniciar uma discussão e compartilhar seu conhecimento!
              </span>
            ) : (
              <span>
                Faça login para ser o primeiro a iniciar uma discussão e se
                conectar com outros devs!
              </span>
            )}
          </p>
          {isAuthenticated && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsCreateTopicModalOpen(true)}
              className={cleanTailwindClasses("py-3 px-8")}
            >
              Criar meu primeiro Tópico
            </Button>
          )}
        </div>
      ) : ( // Se há tópicos, exibe a lista
        <div className={cleanTailwindClasses("space-y-6")}>
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={cleanTailwindClasses(`/comunidade/topico/${topic.slug}`)}
              className={cleanTailwindClasses(`block bg-brand-white p-6 rounded-xl shadow-custom-light border border-brand-gray-medium transition-shadow hover:shadow-custom-medium hover:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-white`)}
            >
              <div className={cleanTailwindClasses("flex flex-col sm:flex-row justify-between items-start sm:items-center")}>
                <div className={cleanTailwindClasses("flex-grow")}>
                  <h2 className={cleanTailwindClasses("text-xl font-bold text-brand-blue mb-2 sm:mb-0 pr-4")}>
                    {topic.title}
                  </h2>
                  {topic.category && (
                    <span className={cleanTailwindClasses("inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-green/10 text-brand-green-dark whitespace-nowrap")}>
                      {topic.category}
                    </span>
                  )}
                </div>
                <div className={cleanTailwindClasses("flex flex-col sm:flex-row items-center sm:items-end text-sm text-text-secondary mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 sm:space-x-4")}>
                  {topic.users && topic.users.full_name && (
                    <div className={cleanTailwindClasses("flex items-center mb-1 sm:mb-0")}>
                      <UserCircle size={16} className={cleanTailwindClasses("mr-1 text-brand-gray-dark")} />
                      <span className={cleanTailwindClasses("font-semibold text-text-primary truncate max-w-[120px] sm:max-w-none")}>
                        {topic.users.full_name}
                      </span>
                    </div>
                  )}
                  <div className={cleanTailwindClasses("flex items-center sm:mt-0")}>
                    <CalendarDays size={16} className={cleanTailwindClasses("mr-1 text-text-secondary")} />
                    <span>{formatLastActivity(topic.last_activity_at)}</span>
                  </div>
                  {topic.post_count !== undefined && (
                    <div className={cleanTailwindClasses("flex items-center sm:mt-0")}>
                      <MessageSquareQuote
                        size={16}
                        className={cleanTailwindClasses("mr-1 text-text-secondary")}
                      />
                      <span>{topic.post_count} posts</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Modal de Criação de Tópico */}
      <CreateTopicModal
        isOpen={isCreateTopicModalOpen}
        onClose={() => setIsCreateTopicModalOpen(false)}
        onCreateSuccess={handleTopicCreated}
      />
    </div>
  );
};

export default CommunityPage;