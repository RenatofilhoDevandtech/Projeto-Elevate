// src/components/Forum/CreateTopicModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlusCircle, AlertTriangle } from 'lucide-react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import api from '../../services/api';

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const CreateTopicModal = ({ isOpen, onClose, onCreateSuccess }) => {
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('');
  const [creatingTopic, setCreatingTopic] = useState(false);
  const [createTopicError, setCreateTopicError] = useState('');

  // Limpa o formulário e mensagens quando o modal é aberto
  React.useEffect(() => {
    if (isOpen) {
      setNewTopicTitle('');
      setNewTopicCategory('');
      setCreateTopicError('');
      setCreatingTopic(false);
    }
  }, [isOpen]);

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    setCreateTopicError('');
    setCreatingTopic(true);

    if (!newTopicTitle.trim()) {
      setCreateTopicError('O título do tópico é obrigatório.');
      setCreatingTopic(false);
      return;
    }

    try {
      const response = await api.post('/forum/topics', {
        title: newTopicTitle,
        category: newTopicCategory.trim() || null,
      });

      onCreateSuccess(response.data);

      onClose();
      // Em um ambiente de produção, considere usar um sistema de notificação (toast) em vez de alert.
      alert('Tópico criado com sucesso!'); 
    } catch (err) {
      console.error("Erro ao criar tópico:", err);
      setCreateTopicError(err.response?.data?.error || 'Ocorreu um erro ao criar o tópico. Tente novamente.');
    } finally {
      setCreatingTopic(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Criar Novo Tópico" size="md">
      {createTopicError && (
        <div 
          className={cleanTailwindClasses("mb-4 flex items-start p-3 text-sm text-danger-red bg-danger-red/10 border border-danger-red/20 rounded-md")} 
          role="alert"
        >
          <AlertTriangle size={18} className={cleanTailwindClasses("mr-2 flex-shrink-0 text-danger-red")} />
          <span className={cleanTailwindClasses("font-medium")}>{createTopicError}</span>
        </div>
      )}
      <form onSubmit={handleCreateTopic} className={cleanTailwindClasses("space-y-4")}>
        <div>
          <label htmlFor="topic-title" className={cleanTailwindClasses("block text-sm font-medium text-text-primary mb-2")}>
            Título do Tópico:
          </label>
          <input
            type="text"
            id="topic-title"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            required
            className={cleanTailwindClasses("w-full px-4 py-2.5 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")} 
            placeholder="Ex: Como iniciar em React?"
          />
        </div>
        <div>
          <label htmlFor="topic-category" className={cleanTailwindClasses("block text-sm font-medium text-text-primary mb-2")}>
            Categoria (Opcional):
          </label>
          <input
            type="text"
            id="topic-category"
            value={newTopicCategory}
            onChange={(e) => setNewTopicCategory(e.target.value)}
            className={cleanTailwindClasses("w-full px-4 py-2.5 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")} 
            placeholder="Ex: Front-End, Back-End, Dúvidas Gerais"
          />
        </div>
        <div className={cleanTailwindClasses("flex justify-end gap-3 mt-4")}>
          <Button variant="ghost" onClick={onClose} disabled={creatingTopic}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={creatingTopic} disabled={creatingTopic} leftIcon={PlusCircle}>
            Criar Tópico
          </Button>
        </div>
      </form>
    </Modal>
  );
};

CreateTopicModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateSuccess: PropTypes.func.isRequired,
};

export default CreateTopicModal; // Exportação padrão do componente