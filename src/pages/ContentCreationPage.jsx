import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlusCircle, Link as LinkIcon, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import api from '../services/api';
import Button from '../components/Common/Button';
import { AuthContext } from '../contexts/AuthContext';

const ContentCreationPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('article');
  const [contentBody, setContentBody] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Função auxiliar para limpar classes Tailwind:
  // Remove todos os tipos de espaços em branco (inclusive irregulares)
  // e os substitui por um único espaço regular, depois remove espaços nas pontas.
  const cleanTailwindClasses = (classString) => {
    return classString.replace(/\s+/g, ' ').trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!title.trim() || !contentBody.trim()) {
      setMessage({ text: 'Preencha todos os campos obrigatórios.', type: 'error' });
      setIsLoading(false);
      return;
    }

    if (contentType === 'video' && !contentBody.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/)) {
      setMessage({ text: 'Por favor, insira um link de vídeo válido do YouTube ou Vimeo.', type: 'error' });
      setIsLoading(false);
      return;
    }

    const newContent = {
      title,
      contentType,
      content: contentBody,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      author_id: user?.id,
    };

    try {
      const response = await api.post('/content', newContent);

      setMessage({ text: 'Conteúdo publicado com sucesso!', type: 'success' });
      navigate(`/conteudo/${response.data.id}`); 
      setTitle('');
      setContentBody('');
      setTags('');
    } catch (error) {
      console.error('Erro ao publicar conteúdo:', error);
      setMessage({ text: error.response?.data?.error || 'Erro ao publicar o conteúdo. Tente novamente.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={cleanTailwindClasses("container mx-auto px-6 py-32 text-center")}>
        <h1 className={cleanTailwindClasses("text-3xl font-bold text-text-primary mb-6")}>Criação de Conteúdo</h1>
        <p className={cleanTailwindClasses("text-text-secondary mb-6")}>Você precisa estar logado para criar conteúdo.</p>
        <Button variant="primary" size="lg" as={Link} to="/login-register">
          Fazer Login ou Registrar
        </Button>
      </div>
    );
  }

  return (
    <div className={cleanTailwindClasses("container mx-auto px-6 py-8")}>
      <h1 className={cleanTailwindClasses("text-4xl font-bold text-text-primary mb-6")}>Crie seu Conteúdo</h1>
      <form onSubmit={handleSubmit} className={cleanTailwindClasses("bg-brand-white rounded-xl shadow-custom-light p-8 space-y-6")}>
        {message && (
          <div className={cleanTailwindClasses(`p-4 rounded-md ${message.type === 'success' ? 'bg-brand-green/10 text-brand-green' : 'bg-danger-red/10 text-danger-red'} flex items-center`)}>
            {message.type === 'success' ? <CheckCircle className={cleanTailwindClasses("mr-2 flex-shrink-0")} size={20} /> : <AlertTriangle className={cleanTailwindClasses("mr-2 flex-shrink-0")} size={20} />}
            {message.text}
          </div>
        )}

        <div>
          <label htmlFor="title" className={cleanTailwindClasses("block text-sm font-medium text-text-primary mb-1")}>Título do Conteúdo:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ex: Guia Completo de React Hooks"
            className={cleanTailwindClasses("w-full px-3 py-2 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")}
          />
        </div>

        <div>
          <label htmlFor="contentType" className={cleanTailwindClasses("block text-sm font-medium text-text-primary mb-1")}>Tipo de Conteúdo:</label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => {
              setContentType(e.target.value);
              setContentBody('');
            }}
            className={cleanTailwindClasses("w-full px-3 py-2 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary transition-all duration-200 ease-in-out")}
          >
            <option value="article">Artigo (Texto)</option>
            <option value="video">Vídeo (Link Externo)</option>
          </select>
        </div>

        <div>
          <label htmlFor="contentBody" className={cleanTailwindClasses("block text-sm font-medium text-text-primary mb-1")}>
            {contentType === 'article' ? 'Conteúdo do Artigo:' : 'Link do Vídeo (YouTube/Vimeo):'}
          </label>
          {contentType === 'article' ? (
            <textarea
              id="contentBody"
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              rows="10"
              required
              placeholder="Escreva seu artigo aqui..."
              className={cleanTailwindClasses("w-full px-3 py-2 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")}
            />
          ) : (
            <div className={cleanTailwindClasses("relative")}>
                <LinkIcon className={cleanTailwindClasses("absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-dark")} size={20} />
              <input
                type="url"
                id="contentBody"
                value={contentBody}
                onChange={(e) => setContentBody(e.target.value)}
                required
                placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className={cleanTailwindClasses("w-full px-3 py-2 pl-10 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")}
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="tags" className={cleanTailwindClasses("block text-sm font-medium text-text-primary mb-1")}>Tags (separadas por vírgula):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ex: react, javascript, frontend, hooks"
            className={cleanTailwindClasses("w-full px-3 py-2 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")}
          />
        </div>

        <Button type="submit" variant="primary" size="lg" leftIcon={PlusCircle} isLoading={isLoading} disabled={isLoading} className={cleanTailwindClasses("w-full")}>
          {isLoading ? 'Publicando...' : 'Publicar Conteúdo'}
        </Button>
      </form>
    </div>
  );
};

export default ContentCreationPage;