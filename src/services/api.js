// Exemplo de como você poderia configurar suas chamadas de API
// Você pode usar axios ou fetch nativo.

// npm install axios (se for usar axios)
// import axios from 'axios';

const API_BASE_URL = 'URL_DA_SUA_API_BACKEND'; // Substitua pela URL real

// Exemplo com fetch:
const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Exemplo de token JWT
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      // Tratar erros da API (ex: response.status === 401)
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `Erro ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error);
    throw error; // Re-throw para que o chamador possa tratar
  }
};

// Serviços específicos
export const authService = {
  login: (credentials) => apiRequest('/auth/login', 'POST', credentials),
  register: (userData) => apiRequest('/auth/register', 'POST', userData),
  // ... outros endpoints de autenticação
};

export const pathService = {
  getAllPaths: () => apiRequest('/paths'),
  getPathById: (id) => apiRequest(`/paths/${id}`),
  updateProgress: (pathId, lessonId, completed) => apiRequest(`/paths/${pathId}/progress`, 'POST', { lessonId, completed }),
  // ... outros endpoints de trilhas
};

export const aiService = {
  getInterviewQuestion: (params) => apiRequest('/ai/interview', 'POST', params),
  getProfileTestRecommendation: (answers) => apiRequest('/ai/profile-test', 'POST', { answers }),
  // ... outros endpoints de IA
};

// Exemplo de uso em um componente:
// import { pathService } from './services/api';
// useEffect(() => {
//   pathService.getAllPaths()
//     .then(data => setPaths(data))
//     .catch(error => console.error("Falha ao buscar trilhas:", error));
// }, []);