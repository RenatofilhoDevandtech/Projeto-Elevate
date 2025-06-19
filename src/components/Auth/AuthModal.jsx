// src/components/Auth/AuthModal.jsx
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import Modal from "../Common/Modal"; // Importado corretamente
import Button from "../Common/Button";
import {
  LogIn,
  UserPlus,
  Github,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const AuthModal = ({ isOpen, onClose, initialView = "login" }) => {
  const {
    login,
    register,
    loginWithGitHub,
    loginWithGoogle,
    authActionLoading,
  } = useContext(AuthContext); // AuthContext é importado e usado corretamente

  const [view, setView] = useState(initialView);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setError("");
      setSuccessMessage("");
      setEmail("");
      setPassword("");
      setName("");
      setShowPassword(false);
    }
  }, [isOpen, initialView]);

  const handleForgotPassword = () => {
    alert(
      "A funcionalidade de recuperação de senha está em desenvolvimento para garantir sua segurança. Por favor, entre em contato com o suporte ou aguarde futuras atualizações para redefinir sua senha."
    );
  };

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (view === "register" && !name.trim()) {
      return setError("Por favor, informe seu nome completo.");
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return setError("Por favor, informe um e-mail válido.");
    }
    if (!password) {
      return setError("Por favor, informe sua senha.");
    }
    if (view === "register" && password.length < 6) {
      return setError("Sua senha deve ter pelo menos 6 caracteres.");
    }

    try {
      if (view === "login") {
        await login(email, password);
        onClose();
      } else {
        const data = await register(name, email, password);
        setSuccessMessage(
          data.message ||
            "Cadastro realizado com sucesso! Um e-mail de confirmação pode ter sido enviado. Por favor, verifique sua caixa de entrada e faça o login."
        );
        setView("login");
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch (err) {
      setError(err.error || "Ocorreu um erro inesperado. Tente novamente.");
      setPassword("");
    }
  };

  const handleSocialLogin = async (provider) => {
    setError("");
    setSuccessMessage("");
    try {
      if (provider === "github") await loginWithGitHub();
      else if (provider === "google") await loginWithGoogle();
      onClose();
    } catch (err) {
      setError(err.message || `Ocorreu um erro ao tentar login com ${provider}. Por favor, tente novamente.`);
    }
  };

  const labelClasses = cleanTailwindClasses("block text-xs font-medium text-text-secondary mb-1.5 leading-tight");
  const inputContainerClasses = cleanTailwindClasses("relative");
  const inputIconClasses = cleanTailwindClasses("absolute left-3 top-1/2 transform -translate-y-1/2 h-4.5 w-4.5 text-text-secondary");
  const inputClasses = cleanTailwindClasses(`w-full px-3 py-2.5 pl-10 border border-brand-gray-medium rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-all duration-200 ease-in-out text-sm text-text-primary bg-brand-white placeholder:text-brand-gray-dark`);
  const passwordToggleClasses = cleanTailwindClasses("absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-brand-blue cursor-pointer transition-colors duration-200");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        view === "login" ? "Bem-vindo(a) de volta!" : "Crie sua conta Elevate"
      }
    >
      {error && (
        <div className={cleanTailwindClasses("mb-4 flex items-start p-3 text-sm text-danger-red bg-danger-red/10 border border-danger-red/20 rounded-md")} role="alert">
          <AlertTriangle size={18} className={cleanTailwindClasses("mr-2 flex-shrink-0 text-danger-red")} />
          <span className={cleanTailwindClasses("font-medium")}>{error}</span>
        </div>
      )}
      {successMessage && (
        <div className={cleanTailwindClasses("mb-4 flex items-start p-3 text-sm text-brand-green bg-brand-green/10 border border-brand-green/20 rounded-md")} role="alert">
          <CheckCircle size={18} className={cleanTailwindClasses("mr-2 flex-shrink-0 text-brand-green")} />
          <span className={cleanTailwindClasses("font-medium")}>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleEmailPasswordSubmit} className={cleanTailwindClasses("space-y-5")}>
        {view === "register" && (
          <div>
            <label htmlFor="auth-name" className={labelClasses}>
              Nome Completo
            </label>
            <div className={inputContainerClasses}>
              <User className={inputIconClasses} />
              <input
                type="text"
                id="auth-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClasses}
                placeholder="Seu nome"
                autoComplete="name"
              />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="auth-email" className={labelClasses}>
            E-mail
          </label>
          <div className={inputContainerClasses}>
            <Mail className={inputIconClasses} />
            <input
              type="email"
              id="auth-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClasses}
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
            />
          </div>
        </div>
        <div>
          <div className={cleanTailwindClasses("flex justify-between items-baseline")}>
            <label htmlFor="auth-password" className={labelClasses}>
              Senha
            </label>
            {view === "login" && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className={cleanTailwindClasses("text-xs text-brand-blue hover:underline focus:outline-none transition-colors duration-200")}
              >
                Esqueceu a senha?
              </button>
            )}
          </div>
          <div className={inputContainerClasses}>
            <Lock className={inputIconClasses} />
            <input
              type={showPassword ? "text" : "password"}
              id="auth-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cleanTailwindClasses(`${inputClasses} pr-10`)}
              placeholder="Pelo menos 6 caracteres"
              autoComplete={
                view === "register" ? "new-password" : "current-password"
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={passwordToggleClasses}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={authActionLoading}
          className={cleanTailwindClasses("py-3 text-base font-semibold")}
        >
          {view === "login" ? "Entrar" : "Criar minha conta"}
        </Button>
      </form>

      <div className={cleanTailwindClasses("relative flex py-5 items-center")}>
        <div className={cleanTailwindClasses("flex-grow border-t border-brand-gray-medium")}></div>
        <span className={cleanTailwindClasses("flex-shrink mx-4 text-xs text-text-secondary uppercase")}>
          Ou continue com
        </span>
        <div className={cleanTailwindClasses("flex-grow border-t border-brand-gray-medium")}></div>
      </div>
      <div className={cleanTailwindClasses("space-y-3")}>
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin("github")}
          isLoading={authActionLoading}
          leftIcon={Github}
          className={cleanTailwindClasses("py-3 px-4")}
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin("google")}
          isLoading={authActionLoading}
          leftIcon={Mail}
          className={cleanTailwindClasses("py-3 px-4")}
        >
          Google
        </Button>
      </div>

      <div className={cleanTailwindClasses("mt-8 text-center text-sm")}>
        {view === "login" ? (
          <p className={cleanTailwindClasses("text-text-secondary")}>
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={() => {
                setView("register");
                setError("");
                setSuccessMessage("");
              }}
              className={cleanTailwindClasses("font-semibold text-brand-blue hover:underline transition-colors duration-200 focus:outline-none")}
            >
              Crie uma agora
            </button>
          </p>
        ) : (
          <p className={cleanTailwindClasses("text-text-secondary")}>
            Já possui uma conta?{" "}
            <button
              type="button"
              onClick={() => {
                setView("login");
                setError("");
                setSuccessMessage("");
              }}
              className={cleanTailwindClasses("font-semibold text-brand-blue hover:underline transition-colors duration-200 focus:outline-none")}
            >
              Faça o login
            </button>
          </p>
        )}
      </div>
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialView: PropTypes.oneOf(["login", "register"]),
};

export default AuthModal;