// src/services/api.js (NO SEU PROJETO FRONTEND)
import axios from "axios";

const api = axios.create({
  // URL BASE DO SEU BACKEND DEPLOYADO NO RENDER:
  // Em produção (Vercel), 'import.meta.env.VITE_API_URL' será a URL definida no Vercel.
  // Em desenvolvimento local, ele usará o fallback para 'http://localhost:3001/api'.
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  timeout: 10000, // Tempo limite da requisição (10 segundos)
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Requisição: Adiciona o token de autenticação (JWT) a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("elevateToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: Lida com erros de resposta HTTP (401, 404, 500) globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const responseStatus = error.response ? error.response.status : null;
    const responseData = error.response ? error.response.data : null;

    if (
      responseStatus === 401 &&
      originalRequest.url !== "/auth/login" &&
      originalRequest.url !== "/auth/register"
    ) {
      console.warn(
        "Erro 401: Token inválido ou expirado. Deslogando e redirecionando para login..."
      );
      localStorage.removeItem("elevateToken");
      window.location.href = "/login-register"; 
      return Promise.reject(responseData || { error: "Não autorizado." });
    }

    if (error.request) {
      console.error("Erro de rede: Nenhuma resposta do servidor.", error.request);
      return Promise.reject({
        error: "Erro de rede. Verifique sua conexão ou tente novamente mais tarde.",
      });
    } else if (error.response) {
      console.error("Erro de resposta do servidor:", responseStatus, responseData);
      return Promise.reject(
        responseData || { error: `Ocorreu um erro (${responseStatus}) no servidor.` }
      );
    } else {
      console.error("Erro de configuração/inesperado da requisição:", error.message);
      return Promise.reject({ error: "Erro inesperado na requisição." });
    }
  }
);

export default api;