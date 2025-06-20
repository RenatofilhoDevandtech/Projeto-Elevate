/**
 * Formata uma data para uma string legível.
 * Ex: formatDate(new Date()) -> "27 de maio de 2025"
 *
 * @param {Date|string} date - A data a ser formatada. Pode ser um objeto Date ou uma string de data válida.
 * @param {Object} [options={}] - Opções de formatação para toLocaleDateString.
 * @returns {string} A data formatada.
 */
export const formatDate = (date, options = {}) => {
  // Retorna string vazia ou um erro se a data for inválida
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    // Verifica se a data é válida
    console.warn("formatDate: Data inválida fornecida", date);
    return "Data inválida";
  }
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // Adicione outras opções comuns aqui se quiser padronizar, ex:
    // weekday: 'long', // Para incluir o dia da semana
    // hour: '2-digit', minute: '2-digit', // Para incluir hora e minuto
    ...options, // Permite sobrescrever as opções padrão
  };
  // 'pt-BR' para localização brasileira
  return d.toLocaleDateString("pt-BR", defaultOptions);
};

/**
 * Limita um texto a um número máximo de caracteres, adicionando "..." no final.
 * Útil para descrições longas em cards.
 *
 * @param {string} text - O texto a ser truncado.
 * @param {number} [maxLength=100] - O comprimento máximo desejado para o texto.
 * @returns {string} O texto truncado ou o texto original se for menor ou igual ao maxLength.
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== "string") return ""; // Garante que é uma string
  if (text.length <= maxLength) {
    return text;
  }
  // Trim para evitar cortar uma palavra no meio e adicionar "..."
  return text.substring(0, maxLength).trim() + "...";
};

/**
 * Gera um ID único simples (para uso em mock data ou chaves temporárias de React).
 * NÃO deve ser usado para IDs de produção em banco de dados onde a segurança é crítica.
 *
 * @returns {string} Um ID alfanumérico simples.
 */
export const generateSimpleId = () => {
  // Math.random().toString(36) gera uma string alfanumérica
  // .substring(2, 9) pega uma parte dela para torná-la mais curta
  return Math.random().toString(36).substring(2, 9);
};
