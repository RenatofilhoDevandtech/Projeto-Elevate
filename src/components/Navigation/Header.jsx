import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Briefcase, Users, Award, MessageSquareText, Home, Lightbulb, Rocket,
  LogIn, LogOut, UserCircle, Menu as MenuIcon, X as XIcon, UserPlus, LayoutDashboard
} from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../Common/Button';
import AuthModal from '../Auth/AuthModal';

const Header = () => {
  const { user, isAuthenticated, logout, authLoading } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState('login');
  const headerRef = useRef(null);

  // A lista COMPLETA de navegação, com a propriedade 'private'
  const navItems = [
    { to: '/', text: 'Início', icon: Home, private: false },
    { to: '/trilhas', text: 'Trilhas', icon: Briefcase, private: false },
    { to: '/perfil', text: 'Dashboard', icon: LayoutDashboard, private: true },
    { to: '/teste-perfil', text: 'Teste de Perfil', icon: Lightbulb, private: true },
    { to: '/simulador', text: 'Simulador', icon: MessageSquareText, private: true },
    { to: '/comunidade', text: 'Comunidade', icon: Users, private: true },
    { to: '/certificados', text: 'Certificados', icon: Award, private: true },
  ];
  
  // A MÁGICA: Filtramos os links que serão exibidos com base no status de autenticação
  const visibleNavItems = navItems.filter(item => !item.private || isAuthenticated);

  const navLinkClasses = ({ isActive }) => `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-brand-blue text-white shadow-sm' : 'text-text-secondary hover:bg-brand-gray-medium hover:text-brand-blue'}`;
  const mobileNavLinkClasses = ({ isActive }) => `flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-brand-blue text-white' : 'text-text-primary hover:bg-brand-gray-medium'}`;

  // Efeitos para fechar o menu mobile
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => { if (headerRef.current && !headerRef.current.contains(event.target)) setIsMobileMenuOpen(false); };
    if (isMobileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const openLoginModal = () => { setAuthModalType('login'); setAuthModalOpen(true); setIsMobileMenuOpen(false); };
  const openRegisterModal = () => { setAuthModalType('register'); setAuthModalOpen(true); setIsMobileMenuOpen(false); };

  return (
    <>
      <header ref={headerRef} className="bg-brand-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo com Ícone de Foguete */}
            <Link to="/" className="text-3xl font-bold text-brand-blue hover:text-brand-green transition-colors duration-300 group flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <span>Elevate</span><Rocket size={28} className="ml-1.5 transform transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110"/>
            </Link>

            {/* Navegação Desktop Inteligente */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {visibleNavItems.map((item) => <NavLink key={item.text} to={item.to} className={navLinkClasses}><item.icon size={18} className="mr-1.5" />{item.text}</NavLink>)}
            </div>

            {/* Botões de Autenticação Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {authLoading ? <div className="h-10 w-40 bg-brand-gray-medium rounded animate-pulse"></div>
               : isAuthenticated ? (
                <>
                  <Link to="/perfil" className="flex items-center group"><span className="text-text-secondary text-sm hidden lg:inline mr-2 group-hover:text-brand-blue">Olá, {user.user_metadata?.full_name || 'Usuário'}!</span><UserCircle size={32} className="text-brand-blue group-hover:opacity-80" /></Link>
                  <Button onClick={logout} variant="outline" size="sm" leftIcon={LogOut}>Sair</Button>
                </>
              ) : (
                <>
                  <Button onClick={openLoginModal} variant="ghost" size="sm">Entrar</Button>
                  <Button onClick={openRegisterModal} variant="primary" size="sm" leftIcon={UserPlus}>Criar Conta</Button>
                </>
              )}
            </div>

            {/* Botão do Menu Mobile */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-brand-blue hover:bg-brand-gray-medium focus:outline-none" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                <span className="sr-only">Abrir menu</span>{isMobileMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Painel do Menu Mobile Inteligente */}
        <div id="mobile-menu" className={`md:hidden absolute top-full inset-x-0 bg-brand-white shadow-lg z-40 border-t border-brand-gray-medium transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          {isMobileMenuOpen && ( <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {visibleNavItems.map((item) => <NavLink key={item.text} to={item.to} className={mobileNavLinkClasses} onClick={() => setIsMobileMenuOpen(false)}><item.icon size={20} className="mr-3" />{item.text}</NavLink>)}
              <div className="pt-4 pb-3 border-t border-brand-gray-medium">
                {isAuthenticated ? (
                  <><Link to="/perfil" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 mb-3"><UserCircle size={40} className="text-brand-blue" /><div className="ml-3 min-w-0"><div className="text-base font-medium text-text-primary truncate">{user.user_metadata?.full_name || 'Usuário'}</div><div className="text-sm font-medium text-text-secondary truncate">{user.email}</div></div></Link><div className="mt-3 px-2"><Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} variant="outline" size="sm" fullWidth leftIcon={LogOut}>Sair</Button></div></>
                ) : (
                  <div className="px-2 space-y-2"><Button onClick={openLoginModal} variant="primary" size="sm" fullWidth leftIcon={LogIn}>Entrar</Button><Button onClick={openRegisterModal} variant="outline" size="sm" fullWidth leftIcon={UserPlus}>Criar Conta</Button></div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialView={authModalType} />
    </>
  );
};

export default Header;