import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MessageSquareText, Loader2, AlertTriangle, UserCircle,
  CalendarDays, MessageSquareQuote, Send, ArrowLeft, LogIn
} from 'lucide-react';
import api from '../services/api';
import Button from '../components/Common/Button';
import { AuthContext } from '../contexts/AuthContext';

const ForumTopicDetailsPage = () => {
  const { topicSlug } = useParams();
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [postingComment, setPostingComment] = useState(false);
  const [postError, setPostError] = useState('');

  // Função auxiliar para limpar classes Tailwind e garantir o formato correto
  const cleanTailwindClasses = (classString) => {
    return classString.replace(/\s+/g, ' ').trim();
  };

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/forum/topics/${topicSlug}`);
        setTopic(response.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do tópico:", err);
        setError(err.response?.data?.error || 'Não foi possível carregar o tópico. Verifique se a URL está correta ou tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (topicSlug && !authLoading) {
      fetchTopicDetails();
    }
  }, [topicSlug, authLoading]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setPostError('');
    setPostingComment(true);

    if (!newPostContent.trim()) {
      setPostError('O conteúdo do post não pode ser vazio.');
      setPostingComment(false);
      return;
    }

    try {
      const response = await api.post(`/forum/topics/${topic.id}/posts`, {
        content: newPostContent,
      });

      setTopic(prevTopic => ({
        ...prevTopic,
        posts: [...prevTopic.posts, response.data]
      }));

      setNewPostContent('');
      alert('Seu post foi adicionado!');
    } catch (err) {
      console.error("Erro ao criar post:", err);
      setPostError(err.response?.data?.error || 'Ocorreu um erro ao criar o post. Tente novamente.');
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) {
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue mb-4")} size={40} />
        <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary font-semibold")}>Carregando tópico...</p>
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

  if (!topic) { // Caso o tópico não seja encontrado (ex: 404)
    return (
      <div className={cleanTailwindClasses("text-center py-32 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium")}>
        <MessageSquareText size={52} className={cleanTailwindClasses("mx-auto text-brand-gray-dark mb-4")} />
        <h2 className={cleanTailwindClasses("text-2xl font-semibold text-text-primary mb-4")}>Tópico não encontrado.</h2>
        <p className={cleanTailwindClasses("text-text-secondary mb-6")}>O tópico que você está procurando pode ter sido removido ou a URL está incorreta.</p>
        <Link to="/comunidade">
          <Button variant="primary" size="lg" leftIcon={ArrowLeft}>Voltar à Comunidade</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={cleanTailwindClasses("container mx-auto px-6 py-8")}>
      <div className={cleanTailwindClasses("bg-brand-white rounded-xl shadow-custom-light p-6 mb-12 border border-brand-gray-medium")}>
        <Link to="/comunidade" className={cleanTailwindClasses("inline-flex items-center text-brand-blue hover:underline mb-4")}>
          <ArrowLeft size={16} className={cleanTailwindClasses("mr-2")} /> Voltar aos Tópicos
        </Link>
        <h1 className={cleanTailwindClasses("text-4xl font-bold text-text-primary mb-4")}>{topic.title}</h1>
        {topic.category && (
          <span className={cleanTailwindClasses("inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-green/10 text-brand-green-dark whitespace-nowrap mb-4")}>
            {topic.category}
          </span>
        )}
        <div className={cleanTailwindClasses("flex flex-wrap items-center text-sm text-text-secondary mt-4")}>
          {topic.users && topic.users.full_name && (
            <div className={cleanTailwindClasses("flex items-center mr-6")}>
              <UserCircle size={16} className={cleanTailwindClasses("mr-2 text-brand-gray-dark")} />
              <span>Criado por: <span className={cleanTailwindClasses("font-semibold text-text-primary")}>{topic.users.full_name}</span></span>
            </div>
          )}
          <div className={cleanTailwindClasses("flex items-center")}>
            <CalendarDays size={16} className={cleanTailwindClasses("mr-2 text-brand-gray-dark")} />
            <span>Em: {formatDate(topic.created_at)}</span>
          </div>
        </div>
      </div>

      <div className={cleanTailwindClasses("space-y-8")}>
        <h2 className={cleanTailwindClasses("text-3xl font-bold text-text-primary mb-4")}>Comentários ({topic.posts?.length || 0})</h2>

        {topic.posts?.length === 0 ? (
          <div className={cleanTailwindClasses("text-center py-6 bg-brand-gray rounded-xl border border-brand-gray-medium text-text-secondary")}>
            <p>Nenhum comentário ainda. Seja o primeiro a responder!</p>
          </div>
        ) : (
          topic.posts.map(post => (
            <div key={post.id} className={cleanTailwindClasses("bg-brand-white p-6 rounded-xl shadow-custom-light border border-brand-gray-medium")}>
              <div className={cleanTailwindClasses("flex items-center mb-4")}>
                <UserCircle size={24} className={cleanTailwindClasses("mr-4 text-brand-blue")} />
                <div>
                  <h3 className={cleanTailwindClasses("font-semibold text-text-primary")}>{post.users.full_name || 'Usuário Anônimo'}</h3>
                  <p className={cleanTailwindClasses("text-xs text-text-secondary")}>{formatDate(post.created_at)}</p>
                </div>
              </div>
              <p className={cleanTailwindClasses("text-text-primary leading-relaxed")}>{post.content}</p>
            </div>
          ))
        )}
      </div>

      {isAuthenticated ? (
        <div className={cleanTailwindClasses("mt-12 bg-brand-white rounded-xl shadow-custom-light p-6 border border-brand-gray-medium")}>
          <h2 className={cleanTailwindClasses("text-2xl font-bold text-text-primary mb-4")}>Adicionar um Comentário</h2>
          {postError && (
            <div className={cleanTailwindClasses("mb-4 flex items-start p-3 text-sm text-danger-red bg-danger-red/10 border border-danger-red/20 rounded-md")} role="alert">
              <AlertTriangle size={18} className={cleanTailwindClasses("mr-2 flex-shrink-0 text-danger-red")} />
              <span className={cleanTailwindClasses("font-medium")}>{postError}</span>
            </div>
          )}
          <form onSubmit={handleCreatePost} className={cleanTailwindClasses("space-y-4")}>
            <div>
              <label htmlFor="new-post-content" className={cleanTailwindClasses("sr-only")}>Seu Comentário</label>
              <textarea
                id="new-post-content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows="5"
                className={cleanTailwindClasses("w-full px-4 py-2.5 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")}
                placeholder="Escreva seu comentário aqui..."
                required
              ></textarea>
            </div>
            <div className={cleanTailwindClasses("flex justify-end")}>
              <Button type="submit" variant="primary" isLoading={postingComment} disabled={postingComment} leftIcon={Send}>
                {postingComment ? 'Enviando...' : 'Postar Comentário'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className={cleanTailwindClasses("mt-12 text-center p-6 bg-brand-gray rounded-xl border border-brand-gray-medium text-text-secondary")}>
          <p className={cleanTailwindClasses("text-lg mb-4")}>Faça login para adicionar um comentário!</p>
          <Link to="/login-register" className={cleanTailwindClasses("inline-block")}>
            <Button variant="primary" size="lg" leftIcon={LogIn}>
              Entrar ou Cadastrar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForumTopicDetailsPage;