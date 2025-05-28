import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simula a verificação de usuário ao carregar a aplicação
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem("elevateUser");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao parsear usuário do localStorage:", error);
          localStorage.removeItem("elevateUser");
        }
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "teste@elevate.com" && password === "senha123") {
          const mockUser = { id: 1, name: "Usuário de Teste", email };
          setUser(mockUser);
          localStorage.setItem("elevateUser", JSON.stringify(mockUser));
          setLoading(false);
          resolve(mockUser);
        } else {
          setLoading(false);
          reject(new Error("Credenciais inválidas"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("elevateUser");
    console.log("Logout realizado.");
  };

  const register = async (name, email, password) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: Date.now(), name, email };
        setUser(newUser);
        localStorage.setItem("elevateUser", JSON.stringify(newUser));
        setLoading(false);
        console.log("Cadastro realizado:", name, email, password);
        resolve(newUser);
      }, 1500);
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
