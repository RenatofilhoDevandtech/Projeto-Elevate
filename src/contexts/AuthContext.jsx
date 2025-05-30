// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading geral do contexto
  const [authActionLoading, setAuthActionLoading] = useState(false); // Loading para ações específicas de login/registro

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedUser = localStorage.getItem("elevateUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("AuthProvider: Erro ao parsear usuário do localStorage:", error);
        localStorage.removeItem("elevateUser");
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const performSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem("elevateUser", JSON.stringify(userData));
    setAuthActionLoading(false);
  };

  const login = useCallback(async (email, password) => {
    setAuthActionLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "teste@elevate.com" && password === "senha123") {
          const mockUser = { id: 1, name: "Usuário de Teste", email, provider: "email" };
          performSetUser(mockUser);
          console.log("AuthProvider: Login com email bem-sucedido.", mockUser);
          resolve(mockUser);
        } else {
          setAuthActionLoading(false);
          reject(new Error("Credenciais inválidas. Tente 'teste@elevate.com' e 'senha123'."));
        }
      }, 1000);
    });
  }, []);

  const register = useCallback(async (name, email, password) => {
    setAuthActionLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "existente@elevate.com") {
          setAuthActionLoading(false);
          reject(new Error("Este e-mail já está cadastrado."));
          return;
        }
        const newUser = { id: Date.now(), name, email, provider: "email" };
        performSetUser(newUser);
        console.log("AuthProvider: Cadastro com email realizado:", newUser, "Senha (mock):", password);
        resolve(newUser);
      }, 1500);
    });
  }, []);

  const loginWithGitHub = useCallback(async () => {
    setAuthActionLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { id: `gh-${Date.now()}`, name: "Usuário GitHub", email: "github_user@example.com", provider: "github" };
        performSetUser(mockUser);
        console.log("AuthProvider: Login com GitHub simulado.", mockUser);
        resolve(mockUser);
      }, 1000);
    });
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setAuthActionLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { id: `gg-${Date.now()}`, name: "Usuário Google", email: "google_user@example.com", provider: "google" };
        performSetUser(mockUser);
        console.log("AuthProvider: Login com Google simulado.", mockUser);
        resolve(mockUser);
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("elevateUser");
    console.log("AuthProvider: Logout realizado.");
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading, // Loading inicial do contexto
      authActionLoading, // Loading para ações de login/registro
      login,
      logout,
      register,
      loginWithGitHub,
      loginWithGoogle,
    }),
    [user, loading, authActionLoading, login, logout, register, loginWithGitHub, loginWithGoogle]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };