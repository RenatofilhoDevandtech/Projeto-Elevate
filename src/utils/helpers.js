/**
 * Formata uma data para uma string legível.
 * Ex: formatDate(new Date()) -> "27 de maio de 2025"
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  return new Date(date).toLocaleDateString('pt-BR', defaultOptions);
};

/**
 * Limita um texto a um número máximo de caracteres, adicionando "..." no final.
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Gera um ID único simples (para mock data, não para produção segura)
 */
export const generateSimpleId = () => {
  return Math.random().toString(36).substring(2, 9);
};