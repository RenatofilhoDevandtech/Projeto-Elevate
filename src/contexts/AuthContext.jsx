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

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authActionLoading, setAuthActionLoading] = useState(false);

  // Função para validar a sessão ao carregar a página
  const validateSession = useCallback(async () => {
    const token = localStorage.getItem("elevateToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/auth/me"); // Chama nossa rota protegida
      setUser(response.data);
    } catch (error) {
      console.error("Sessão inválida ou expirada:", error);
      localStorage.removeItem("elevateToken"); // Limpa token inválido
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    validateSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        localStorage.setItem("elevateToken", session.access_token);
        setUser(session.user);
      }
      if (event === "SIGNED_OUT") {
        localStorage.removeItem("elevateToken");
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, [validateSession]);

  const handleLoginSuccess = (data) => {
    const { user, token } = data;
    localStorage.setItem("elevateToken", token);
    setUser(user);
    setAuthActionLoading(false);
  };

  const login = useCallback(async (email, password) => {
    setAuthActionLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      handleLoginSuccess(data);
      return data;
    } catch (error) {
      setAuthActionLoading(false);
      throw (
        error.response?.data ||
        new Error("Erro de rede ou servidor indisponível.")
      );
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setAuthActionLoading(true);
    try {
      const { data } = await api.post("/auth/register", {
        full_name: name,
        email,
        password,
      });
      setAuthActionLoading(false);
      alert(data.message); // Alerta o usuário para checar o e-mail
      return data;
    } catch (error) {
      setAuthActionLoading(false);
      throw (
        error.response?.data ||
        new Error("Erro de rede ou servidor indisponível.")
      );
    }
  }, []);

  const loginWithGitHub = useCallback(async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
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
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
