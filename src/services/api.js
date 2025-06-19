import axios from "axios";

// Cria uma instância do Axios com a URL base da nossa API
const api = axios.create({
  // Usa import.meta.env.VITE_API_URL para acessar a variável de ambiente do Vite.
  // O fallback para 'http://localhost:3001/api' é para desenvolvimento local.
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  timeout: 10000, // Tempo limite da requisição (10 segundos)
  headers: {
    "Content-Type": "application/json", // Define o tipo de conteúdo padrão como JSON
  },
});

// Interceptor de Requisição: Adiciona o token de autenticação (JWT) a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("elevateToken"); // Pega o token do localStorage
    if (token) {
      // Se o token existe, adiciona-o ao cabeçalho de Autorização
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Retorna a configuração modificada
  },
  (error) => {
    // Trata erros que ocorrem antes da requisição ser enviada
    return Promise.reject(error);
  }
);

// Interceptor de Resposta (MELHORIA OPCIONAL): Lida com erros de resposta HTTP globalmente
api.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida, apenas a retorna
    return response;
  },
  async (error) => {
    // Trata erros de resposta (ex: 401 Unauthorized, 403 Forbidden, 404 Not Found)
    if (error.response) {
      const originalRequest = error.config;

      // Exemplo: Se o token for inválido/expirado (status 401)
      // E se não for uma requisição para o login/registro (para evitar loop infinito)
      if (
        error.response.status === 401 &&
        originalRequest.url !== "/auth/login" &&
        originalRequest.url !== "/auth/register"
      ) {
        console.warn(
          "Erro 401: Token inválido ou expirado. Redirecionando para login..."
        );
        // Você pode disparar um evento global para o AuthContext fazer o logout
        // Ou redirecionar diretamente, mas um evento é mais limpo.
        // Ex: window.dispatchEvent(new CustomEvent('unauthorized-api-call'));
        // ou se você tiver um 'AuthContext' em escopo, chamar logout().
        // Para um MVP, um redirecionamento simples pode ser o suficiente.
        localStorage.removeItem("elevateToken");
        // window.location.href = '/login-register'; // Redireciona para a página de login/registro
      }

      // Para outros erros de resposta (400, 403, 404, 500 etc.), propaga o erro com a mensagem do backend
      // `error.response.data` geralmente contém a mensagem de erro formatada pelo seu backend
      return Promise.reject(
        error.response.data || { error: "Ocorreu um erro no servidor." }
      );
    } else if (error.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida (ex: servidor offline)
      console.error(
        "Erro de rede: Nenhuma resposta do servidor.",
        error.request
      );
      return Promise.reject({
        error:
          "Erro de rede. Verifique sua conexão ou tente novamente mais tarde.",
      });
    } else {
      // Algo mais aconteceu ao configurar a requisição
      console.error("Erro de configuração da requisição:", error.message);
      return Promise.reject({ error: "Erro inesperado na requisição." });
    }
  }
);

export default api;
