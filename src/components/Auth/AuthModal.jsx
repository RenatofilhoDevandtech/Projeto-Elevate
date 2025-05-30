import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContext'; // Ajuste o caminho
import Modal from '../Common/Modal'; // Seu componente Modal base
import Button from '../Common/Button'; // Seu componente Button estilizado
import { LogIn, UserPlus, Github, Globe, Eye, EyeOff, Mail, Lock, User, AlertTriangle, CheckCircle } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const { login, register, loginWithGitHub, loginWithGoogle, authActionLoading } = useContext(AuthContext);
  const [view, setView] = useState(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setError('');
      setSuccessMessage('');
      // Não resetar email/senha pode ser útil se o usuário errar a senha e quiser tentar de novo
      // setEmail('');
      // setPassword('');
      setName('');
      setShowPassword(false);
    }
  }, [isOpen, initialView]);

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validação simples de cliente (pode ser expandida)
    if (view === 'register' && !name.trim()) {
      setError("Por favor, informe seu nome.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, informe um e-mail válido.");
      return;
    }
    if (!password) {
      setError("Por favor, informe sua senha.");
      return;
    }
    if (view === 'register' && password.length < 6) {
      setError("Sua senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      if (view === 'login') {
        await login(email, password);
        // Mensagem de sucesso e fechamento são gerenciados internamente pelo login/contexto agora
        onClose();
      } else {
        await register(name, email, password);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setSuccessMessage('');
    try {
      if (provider === 'github') {
        await loginWithGitHub();
      } else if (provider === 'google') {
        await loginWithGoogle();
      }
      onClose();
    } catch (err) {
      setError(err.message || `Erro ao tentar login com ${provider}.`);
    }
  };

  // Estilos para os inputs e labels
  const labelClasses = "block text-xs font-medium text-[var(--text-secondary)] mb-1.5";
  const inputContainerClasses = "relative";
  const inputIconClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 h-[18px] w-[18px] text-[var(--brand-gray-dark)]";
  const inputClasses = `w-full px-3 py-2.5 pl-10 border border-[var(--brand-gray-medium)] rounded-lg 
                       focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[var(--brand-blue)]/30 
                       outline-none transition-all duration-200 ease-in-out text-sm text-[var(--text-primary)] 
                       bg-[var(--brand-white)] placeholder:text-[var(--brand-gray-dark)]`;
  const passwordToggleClasses = "absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--brand-gray-dark)] hover:text-[var(--brand-blue)] cursor-pointer";


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={view === 'login' ? 'Bem-vindo(a) de volta!' : 'Crie sua conta Elevate'}
      size="sm" // Um pouco mais estreito para formulários de autenticação
    >
      {/* Fundo do modal: bg-[var(--brand-white)] já é aplicado pelo componente Modal base */}
      {/* Texto principal: color: var(--text-primary) já é aplicado pelo Modal base */}

      {/* Mensagens de Erro/Sucesso Estilizadas */}
      {error && (
        <div className="mb-4 flex items-start p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-md" role="alert">
          <AlertTriangle size={16} className="mr-2 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}
      {successMessage && ( // Embora o modal feche no sucesso, pode ser útil para outras mensagens
        <div className="mb-4 flex items-start p-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded-md" role="alert">
          <CheckCircle size={16} className="mr-2 flex-shrink-0 text-green-500" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleEmailPasswordSubmit} className="space-y-5">
        {view === 'register' && (
          <div>
            <label htmlFor="auth-name" className={labelClasses}>Nome Completo</label>
            <div className={inputContainerClasses}>
              <User className={inputIconClasses} />
              <input type="text" id="auth-name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClasses} placeholder="Seu nome" />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="auth-email" className={labelClasses}>E-mail</label>
          <div className={inputContainerClasses}>
            <Mail className={inputIconClasses} />
            <input type="email" id="auth-email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClasses} placeholder="seuemail@exemplo.com" />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-baseline">
            <label htmlFor="auth-password" className={labelClasses}>Senha</label>
            {view === 'login' && (
              <button type="button" className="text-xs text-[var(--brand-blue)] hover:underline focus:outline-none">
                Esqueceu a senha?
              </button>
            )}
          </div>
          <div className={inputContainerClasses}>
            <Lock className={inputIconClasses} />
            <input type={showPassword ? 'text' : 'password'} id="auth-password" value={password} onChange={(e) => setPassword(e.target.value)} required className={`${inputClasses} pr-10`} placeholder="Pelo menos 6 caracteres" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={passwordToggleClasses} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={authActionLoading} size="md" className="py-3 text-base"> {/* Botão principal maior */}
          {view === 'login' ? 'Entrar' : 'Criar minha conta'}
        </Button>
      </form>

      {/* Divisor "OU" mais elegante */}
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-[var(--brand-gray-medium)]"></div>
        <span className="flex-shrink mx-4 text-xs text-[var(--text-secondary)] uppercase">Ou continue com</span>
        <div className="flex-grow border-t border-[var(--brand-gray-medium)]"></div>
      </div>

      {/* Botões de Login Social */}
      <div className="space-y-3">
        <Button variant="outline" fullWidth onClick={() => handleSocialLogin('github')} isLoading={authActionLoading} leftIcon={Github} size="md" className="border-[var(--brand-gray-dark)] text-[var(--text-primary)] hover:bg-[var(--brand-gray-medium)] hover:border-[var(--brand-gray-dark)]">
          GitHub
        </Button>
        <Button variant="outline" fullWidth onClick={() => handleSocialLogin('google')} isLoading={authActionLoading} leftIcon={Globe} size="md" className="border-[var(--brand-gray-dark)] text-[var(--text-primary)] hover:bg-[var(--brand-gray-medium)] hover:border-[var(--brand-gray-dark)]">
          Google
        </Button>
      </div>

      {/* Alternar entre Login e Registro */}
      <div className="mt-8 text-center text-sm">
        {view === 'login' ? (
          <p className="text-[var(--text-secondary)]">
            Não tem uma conta Elevate?{' '}
            <button onClick={() => setView('register')} className="font-semibold text-[var(--brand-blue)] hover:underline focus:outline-none">
              Crie uma agora
            </button>
          </p>
        ) : (
          <p className="text-[var(--text-secondary)]">
            Já possui uma conta?{' '}
            <button onClick={() => setView('login')} className="font-semibold text-[var(--brand-blue)] hover:underline focus:outline-none">
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
  initialView: PropTypes.oneOf(['login', 'register']),
};

export default AuthModal;