// src/components/Navigation/Header.jsx
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Briefcase, Users, Award, MessageSquareText, Home, Lightbulb,
  LogIn, LogOut, UserCircle, Menu as MenuIcon, X as XIcon, UserPlus // Ícone para "Criar Conta"
} from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../Common/Button';
import AuthModal from '../Auth/AuthModal'; // << NOVO COMPONENTE QUE CRIaremos

const Header = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState('login'); // 'login' ou 'register'
  const headerRef = useRef(null);

  const navItems = [ /* ... seu array navItems ... */
    { to: '/', text: 'Início', icon: Home },
    { to: '/trilhas', text: 'Trilhas', icon: Briefcase },
    { to: '/teste-perfil', text: 'Perfil', icon: Lightbulb },
    { to: '/simulador-entrevista', text: 'Entrevista', icon: MessageSquareText },
    { to: '/comunidade', text: 'Comunidade', icon: Users },
    { to: '/certificados', text: 'Certificados', icon: Award },
    { to: '/educadores', text: 'Educadores', icon: UserCircle } // Novo item para Educadores
  ];
  const navLinkClasses = ({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out whitespace-nowrap ${isActive ? 'bg-brand-blue text-white shadow-sm' : 'text-text-secondary hover:bg-brand-gray-medium hover:text-brand-blue'}`;
  const mobileNavLinkClasses = ({ isActive }) => `flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-150 ease-in-out ${isActive ? 'bg-brand-blue text-white' : 'text-text-primary hover:bg-brand-gray-medium hover:text-brand-blue'}`;

  useEffect(() => { /* ... seus useEffects para resize e click outside ... */
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => { if (headerRef.current && !headerRef.current.contains(event.target)) setIsMobileMenuOpen(false); };
    if (isMobileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);


  const openLoginModal = () => {
    setAuthModalType('login');
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false); // Fecha menu mobile se estiver aberto
  };

  const openRegisterModal = () => {
    setAuthModalType('register');
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false); // Fecha menu mobile se estiver aberto
  };

  return (
    <>
      <header ref={headerRef} className="bg-brand-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl sm:text-3xl font-bold text-brand-blue hover:text-brand-green transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2" onClick={() => setIsMobileMenuOpen(false)}>
                Elevate 
              </Link>
            </div>

            {/* Navegação Desktop */}
            <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <NavLink key={item.text} to={item.to} className={navLinkClasses}>
                  <item.icon size={18} className="mr-1.5" aria-hidden="true" />
                  {item.text}
                </NavLink>
              ))}
            </div>

            {/* Botões de Autenticação Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {authLoading ? (
                <div className="h-8 w-32 bg-brand-gray-medium rounded animate-pulse"></div>
              ) : user ? (
                <>
                  <span className="text-text-secondary text-sm hidden lg:inline">Olá, {user.name}!</span>
                  <Button onClick={logout} variant="outline" size="sm" leftIcon={LogOut}>Sair</Button>
                </>
              ) : (
                <>
                  <Button onClick={openLoginModal} variant="primary" size="sm" leftIcon={LogIn}>Entrar</Button>
                  <Button onClick={openRegisterModal} variant="outline" size="sm" leftIcon={UserPlus}>Criar Conta</Button>
                </>
              )}
            </div>

            {/* Botão do Menu Mobile */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-brand-blue hover:bg-brand-gray-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                <span className="sr-only">Abrir menu principal</span>
                {isMobileMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Painel do Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full inset-x-0 bg-brand-white shadow-lg z-40 border-t border-brand-gray-medium" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink key={item.text} to={item.to} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
                  <item.icon size={20} className="mr-3" /> {item.text}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-brand-gray-medium">
              {authLoading ? ( /* ... placeholder de loading ... */
                <div className="px-5">
                    <div className="h-10 w-full bg-brand-gray-medium rounded animate-pulse mb-2"></div>
                </div>
              ) : user ? ( /* ... info do usuário e botão de sair ... */
                <>
                  <div className="flex items-center px-5 mb-3">
                    <UserCircle size={32} className="text-brand-blue" />
                    <div className="ml-3 min-w-0">
                      <div className="text-base font-medium text-text-primary truncate">{user.name}</div>
                      <div className="text-sm font-medium text-text-secondary truncate">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2"><Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} variant="outline" size="sm" fullWidth leftIcon={LogOut}>Sair</Button></div>
                </>
              ) : ( /* Opções de Entrar e Criar Conta no mobile */
                <div className="px-2 space-y-2">
                  <Button onClick={openLoginModal} variant="primary" size="sm" fullWidth leftIcon={LogIn}>Entrar</Button>
                  <Button onClick={openRegisterModal} variant="outline" size="sm" fullWidth leftIcon={UserPlus}>Criar Conta</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Renderiza o Modal de Autenticação */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialView={authModalType} // Passa 'login' ou 'register'
      />
    </>
  );
};

export default Header;