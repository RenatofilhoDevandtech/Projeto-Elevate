import React, { useState } from 'react';
import './ContentCreationPage.css';

function ContentCreationPage() {
    // Armazenar os dados do formulário
    const [title, setTitle] = useState('');
    const [contentType, setContentType] = useState('article') // 'artigo' ou 'vídeo'
    const [contentBody, setContentBody] = useState(''); // Texto do artigo ou URL do vídeo
    const [tags, setTags] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        setIsLoading(true);
        setMessage('');

        // Validação básica
        if (!title.trim() || !contentBody.trim()) {
            setMessage('Preencha todos os campos obrigatórios.');
            setIsLoading(false);
            return;
        }

        const newContent = {
            title,
            contentType,
            contentBody, // Para artigo: texto para vídeo: URL
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''), // Transforma string de tags em array
            authorId: 'USUARIO_ATUAL_ID', // Substituir pelo ID do usuário logado
        };

        console.log('Dados do novo conteúdo:', newContent);

        try {
            // Simulação de sucesso
            await new Promise(resolve => setTimeout(resolve, 1500));
            setMessage('Conteúdo publicado com sucesso! (Simulado)');
            setTitle('');
            setContentType('article');
            setContentBody('');
            setTags('');
        } catch (error) {
            console.error('Erro ao publicar conteúdo:', error);
            setMessage(`Erro ao publicar o conteúdo: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="content-creation-container">
            <h1>Crie o seu próprio conteúdo e publique na nossa plataforma.</h1>
            <form onSubmit={handleSubmit} className="content-creation-form">{message && (
                <p className={message.includes('sucesso') ? 'sucess-message' : 'error-message'}>
                    {message}
                </p>
    )}

    <div className="form-group">
        <label htmlFor="title">Título do conteúdo:</label>
        <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Ex: Guia Completo de Reack Hooks" />
        </div>

        <div className="form-group">
            <label htmlFor="contentType">Tipo de conteúdo:</label>
            <select
            id="contentType"
            value={contentType}
            onChange={(e) => {
                setContentType(e.target.value);
                setContentBody(''); // Limpa o campo ao mudar o tipo
            }}
            >
                <option value="article">Artigo (Texto)</option>
                <option value="video">Vídeo (Link Externo)</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="contentBody">
                {contentType === 'article' ? 'Conteúdo do artigo:' : 'Link do Vídeo (Youtube/Vimeo):'}
            </label>
            {contentType === 'article' ? (
                <textarea
                id="contentBody"
                value={contentBody}
                onChange={(e) => setContentBody(e.target.value)}
                rows="10"
                required
                placeholder="Escreva seu artigo aqui..."></textarea>
            ) : (
                <input
                type="url"
                id="contentBody"
                value={contentBody}
                onChange={(e) => setContentBody(e.target.value)}
                required
                placeholder="Ex: https://www.youtube.com/watch?v=abcdefg123"
                />
            )}
            </div>

            <div className="form-group">
                <label htmlFor="tags">Tags (separadas por vírgula):</label>
                <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Ex: react, javascript, frontend, hooks"
                />
            </div>

            <button type="submit" disabled={isLoading}>{isLoading ? 'Publicando...' : 'Publicar Conteúdo'}
            </button>
            </form>
            </div>
    );
}

export default ContentCreationPage;