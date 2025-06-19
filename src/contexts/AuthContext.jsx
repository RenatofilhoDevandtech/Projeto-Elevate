// src/contexts/AuthContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import api from "../services/api"; // Nosso cliente de API
import { supabase } from "../lib/supabase-frontend"; // Nosso cliente Supabase do frontend
import AuthModal from "../components/Auth/AuthModal"; // <<<< IMPORTAÇÃO CORRETA DO AUTHMODAL
import { useLocation } from "react-router-dom"; // Importe useLocation para a rota /login-register

// Cria o contexto de autenticação
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authActionLoading, setAuthActionLoading] = useState(false);

  // --- Estados e Funções para o AuthModal ---
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState("login");

  // Função unificada para abrir o modal com um tipo específico
  const openAuthModal = useCallback((type = "login") => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  }, []);

  // Funções para abrir o modal de login/registro diretamente
  const openLoginModal = useCallback(() => {
    openAuthModal("login");
  }, [openAuthModal]);

  const openRegisterModal = useCallback(() => {
    openAuthModal("register");
  }, [openAuthModal]);

  const location = useLocation();

  // Efeito para abrir o modal automaticamente se a rota for /login-register
  useEffect(() => {
    if (location.pathname === "/login-register") {
      openAuthModal("login");
    }
  }, [location.pathname, openAuthModal]);

  // --- Lógica de Autenticação com Supabase ---
  const handleLoginSuccess = useCallback((userData, accessToken) => {
    localStorage.setItem("elevateToken", accessToken);
    setUser(userData);
    setAuthActionLoading(false);
  }, []);

  const synchronizeAuthState = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "Erro ao obter sessão do Supabase:",
          sessionError.message
        );
        throw sessionError;
      }

      if (session?.user) {
        setUser(session.user);
        localStorage.setItem("elevateToken", session.access_token);
      } else {
        setUser(null);
        localStorage.removeItem("elevateToken");
      }
    } catch (error) {
      console.error("Erro na sincronização de estado:", error);
      setUser(null);
      localStorage.removeItem("elevateToken");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    synchronizeAuthState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Supabase Auth Event: ${event}`, session);
      if (event === "SIGNED_IN") {
        if (session) {
          localStorage.setItem("elevateToken", session.access_token);
          setUser(session.user);
        }
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("elevateToken");
        setUser(null);
      } else if (
        event === "USER_UPDATED" ||
        event === "PASSWORD_RECOVERY" ||
        event === "MFA_CHALLENGE_VERIFIED"
      ) {
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem("elevateToken", session.access_token);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [synchronizeAuthState]);

  const login = useCallback(
    async (email, password) => {
      setAuthActionLoading(true);
      try {
        const response = await api.post("/auth/login", { email, password });
        handleLoginSuccess(response.data.user, response.data.token);
        return response.data;
      } catch (error) {
        setAuthActionLoading(false);
        throw (
          error.response?.data || {
            error: "Erro de rede ou servidor indisponível.",
          }
        );
      }
    },
    [handleLoginSuccess]
  );

  const register = useCallback(async (fullName, email, password) => {
    setAuthActionLoading(true);
    try {
      const response = await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
      });
      setAuthActionLoading(false);
      return response.data;
    } catch (error) {
      setAuthActionLoading(false);
      throw (
        error.response?.data || {
          error: "Erro de rede ou servidor indisponível.",
        }
      );
    }
  }, []);

  const loginWithGitHub = useCallback(async () => {
    setAuthActionLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.error("Erro no login com GitHub:", error.message);
      setAuthActionLoading(false);
      throw { error: error.message };
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setAuthActionLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Erro no login com Google:", error.message);
      setAuthActionLoading(false);
      throw { error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthActionLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erro ao fazer logout no Supabase:", error.message);
        throw error;
      }
      localStorage.removeItem("elevateToken");
      setUser(null);
    } catch (error) {
      console.error("Erro inesperado no logout:", error.message);
      throw { error: error.message || "Erro ao fazer logout." };
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      authActionLoading,
      login,
      logout,
      register,
      loginWithGitHub,
      loginWithGoogle,
      openAuthModal,
      openLoginModal,
      openRegisterModal,
    }),
    [
      user,
      loading,
      authActionLoading,
      login,
      logout,
      register,
      loginWithGitHub,
      loginWithGoogle,
      openAuthModal,
      openLoginModal,
      openRegisterModal,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {/* <<<< AQUI: AuthModal é renderizado DENTRO do AuthProvider */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialView={authModalType}
      />
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };