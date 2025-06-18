import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import Modal from "../Common/Modal";
import Button from "../Common/Button";
import {
  LogIn,
  UserPlus,
  Github,
  Globe,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const AuthModal = ({ isOpen, onClose, initialView = "login" }) => {
  const {
    login,
    register,
    loginWithGitHub,
    loginWithGoogle,
    authActionLoading,
  } = useContext(AuthContext);
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
      setName("");
      setShowPassword(false);
    }
  }, [isOpen, initialView]);

  // MELHORIA: Placeholder para a funcionalidade de reset de senha.
  const handleForgotPassword = () => {
    alert(
      "A funcionalidade de recuperação de senha está em desenvolvimento. Por favor, entre em contato com o suporte se precisar de ajuda urgente."
    );
    // Futuramente, isso abriria outro modal ou levaria para uma página de reset.
  };

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (view === "register" && !name.trim())
      return setError("Por favor, informe seu nome.");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      return setError("Por favor, informe um e-mail válido.");
    if (!password) return setError("Por favor, informe sua senha.");
    if (view === "register" && password.length < 6)
      return setError("Sua senha deve ter pelo menos 6 caracteres.");

    try {
      if (view === "login") {
        await login(email, password);
        onClose(); // No login, o sucesso fecha o modal e o AuthContext atualiza o app.
      } else {
        // 'register'
        const data = await register(name, email, password);
        // MELHORIA: Feedback claro e transição suave para o login.
        setSuccessMessage(
          data.message ||
            "Cadastro realizado! Por favor, confirme seu e-mail e faça o login."
        );
        setView("login"); // Muda para a tela de login automaticamente.
      }
    } catch (err) {
      // O erro já vem tratado do AuthContext, que pega a mensagem da API.
      setError(err.error || "Ocorreu um erro. Tente novamente.");
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
      setError(err.message || `Erro ao tentar login com ${provider}.`);
    }
  };

  const labelClasses =
    "block text-xs font-medium text-[var(--text-secondary)] mb-1.5";
  const inputContainerClasses = "relative";
  const inputIconClasses =
    "absolute left-3 top-1/2 transform -translate-y-1/2 h-[18px] w-[18px] text-[var(--brand-gray-dark)]";
  const inputClasses = `w-full px-3 py-2.5 pl-10 border border-[var(--brand-gray-medium)] rounded-lg focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/30 outline-none transition-all duration-200 ease-in-out text-sm text-[var(--text-primary)] bg-[var(--brand-white)] placeholder:text-[var(--brand-gray-dark)]`;
  const passwordToggleClasses =
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--brand-gray-dark)] hover:text-[var(--brand-blue)] cursor-pointer";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        view === "login" ? "Bem-vindo(a) de volta!" : "Crie sua conta Elevate"
      }
    >
      {error && (
        <div
          className="mb-4 flex items-start p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-md"
          role="alert"
        >
          <AlertTriangle
            size={16}
            className="mr-2 flex-shrink-0 text-red-500"
          />
          <span>{error}</span>
        </div>
      )}
      {successMessage && (
        <div
          className="mb-4 flex items-start p-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded-md"
          role="alert"
        >
          <CheckCircle
            size={16}
            className="mr-2 flex-shrink-0 text-green-500"
          />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleEmailPasswordSubmit} className="space-y-5">
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
          <div className="flex justify-between items-baseline">
            <label htmlFor="auth-password" className={labelClasses}>
              Senha
            </label>
            {view === "login" && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-[var(--brand-blue)] hover:underline focus:outline-none"
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
              className={`${inputClasses} pr-10`}
              placeholder="Pelo menos 6 caracteres"
              // MELHORIA: Atributos autocomplete para ajudar gerenciadores de senha.
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
          size="md"
          className="py-3 text-base"
        >
          {view === "login" ? "Entrar" : "Criar minha conta"}
        </Button>
      </form>

      {/* Divisor e Botões Sociais (sem alterações) */}
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-[var(--brand-gray-medium)]"></div>
        <span className="flex-shrink mx-4 text-xs text-[var(--text-secondary)] uppercase">
          Ou continue com
        </span>
        <div className="flex-grow border-t border-[var(--brand-gray-medium)]"></div>
      </div>
      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin("github")}
          isLoading={authActionLoading}
          leftIcon={Github}
          size="md"
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin("google")}
          isLoading={authActionLoading}
          leftIcon={Globe}
          size="md"
        >
          Google
        </Button>
      </div>

      {/* Alternar entre Login e Registro (sem alterações) */}
      <div className="mt-8 text-center text-sm">
        {view === "login" ? (
          <p className="text-[var(--text-secondary)]">
            Não tem uma conta?{" "}
            <button
              onClick={() => {
                setView("register");
                setError("");
                setSuccessMessage("");
              }}
              className="font-semibold text-[var(--brand-blue)] hover:underline"
            >
              Crie uma agora
            </button>
          </p>
        ) : (
          <p className="text-[var(--text-secondary)]">
            Já possui uma conta?{" "}
            <button
              onClick={() => {
                setView("login");
                setError("");
                setSuccessMessage("");
              }}
              className="font-semibold text-[var(--brand-blue)] hover:underline"
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
