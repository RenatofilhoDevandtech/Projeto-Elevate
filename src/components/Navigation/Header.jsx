import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Briefcase,
  Users,
  Award,
  MessageSquareText,
  Home,
  Lightbulb,
  Rocket,
  LogIn,
  LogOut,
  UserCircle,
  Menu as MenuIcon,
  X as XIcon,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

import Button from "../Common/Button";
import AuthModal from "../Auth/AuthModal";

const Header = () => {
  const { user, isAuthenticated, logout, authLoading } =
    useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState("login");
  const headerRef = useRef(null);

  const navItems = [
    { to: "/", text: "Início", icon: Home, private: false },
    { to: "/trilhas", text: "Trilhas", icon: Briefcase, private: false },
    {
      to: "/dashboard",
      text: "Dashboard",
      icon: LayoutDashboard,
      private: true,
    },
    {
      to: "/teste-perfil",
      text: "Teste de Perfil",
      icon: Lightbulb,
      private: true,
    },
    {
      to: "/simulador-ia",
      text: "Simulador",
      icon: MessageSquareText,
      private: true,
    },
    { to: "/comunidade", text: "Comunidade", icon: Users, private: true },
    { to: "/certificados", text: "Certificados", icon: Award, private: true },
  ];

  const visibleNavItems = navItems.filter(
    (item) => !item.private || isAuthenticated
  );

  // Tradução das classes do NavLink para Tailwind
  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
     ${
       isActive
         ? "bg-brand-blue text-brand-white shadow-sm"
         : "text-text-secondary hover:bg-brand-gray-medium hover:text-brand-blue"
     }`;

  // Tradução das classes do NavLink Mobile para Tailwind
  const mobileNavLinkClasses = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors duration-300
     ${
       isActive
         ? "bg-brand-blue text-brand-white"
         : "text-text-primary hover:bg-brand-gray-medium"
     }`;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const openLoginModal = () => {
    setAuthModalType("login");
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };
  const openRegisterModal = () => {
    setAuthModalType("register");
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="bg-brand-white shadow-md sticky top-0 z-50 font-sans"
      >
        <nav className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo com Ícone de Foguete */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-brand-blue hover:text-brand-blue-dark transition-colors duration-300 group flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Ir para a página inicial Elevate"
            >
              <span>Elevate</span>
              <Rocket
                size={28}
                className="ml-2 transform transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110"
                aria-hidden="true"
              />
            </Link>

            {/* Navegação Desktop Inteligente */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {visibleNavItems.map((item) => (
                <NavLink
                  key={item.text}
                  to={item.to}
                  className={navLinkClasses}
                >
                  <item.icon size={18} className="mr-1.5" aria-hidden="true" />
                  {item.text}
                </NavLink>
              ))}
            </div>

            {/* Botões de Autenticação Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {authLoading ? (
                <div className="h-10 w-40 bg-brand-gray-medium rounded-md animate-pulse"></div>
              ) : isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="flex items-center group">
                    <span className="text-text-secondary text-sm hidden lg:inline mr-2 group-hover:text-brand-blue transition-colors duration-300">
                      Olá, {user?.user_metadata?.full_name || "Usuário"}!{" "}
                    </span>
                    <UserCircle
                      size={32}
                      className="text-brand-blue group-hover:opacity-80 transition-opacity duration-300"
                    />
                  </Link>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    leftIcon={LogOut}
                    className="py-2 px-4"
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={openLoginModal}
                    variant="ghost"
                    size="sm"
                    className="py-2 px-4"
                  >
                    Entrar
                  </Button>
                  <Button
                    onClick={openRegisterModal}
                    variant="primary"
                    size="sm"
                    leftIcon={UserPlus}
                    className="py-2 px-4"
                  >
                    Criar Conta
                  </Button>
                </>
              )}
            </div>

            {/* Botão do Menu Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-brand-blue hover:bg-brand-gray-medium focus:outline-none focus:ring-2 focus:ring-brand-blue"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label={
                  isMobileMenuOpen ? "Fechar menu mobile" : "Abrir menu mobile"
                }
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                </span>
                {isMobileMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Painel do Menu Mobile Inteligente */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute top-full inset-x-0 bg-brand-white shadow-lg z-40 border-t border-brand-gray-medium
                       transform transition-transform duration-300 ease-in-out overflow-hidden
                       ${
                         isMobileMenuOpen
                           ? "translate-y-0"
                           : "-translate-y-full"
                       }`}
        >
          {isMobileMenuOpen && ( // Renderiza o conteúdo do menu apenas se estiver aberto para otimização
            <div className="px-4 pt-2 pb-4 space-y-2">
              {visibleNavItems.map((item) => (
                <NavLink
                  key={item.text}
                  to={item.to}
                  className={mobileNavLinkClasses}
                  onClick={() => setIsMobileMenuOpen(false)} // Fecha o menu ao clicar em um item
                >
                  <item.icon size={20} className="mr-3" aria-hidden="true" />
                  {item.text}
                </NavLink>
              ))}

              <div className="pt-4 pb-2 border-t border-brand-gray-medium">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-2 mb-4 group"
                    >
                      <UserCircle size={40} className="text-brand-blue" />
                      <div className="ml-3 min-w-0">
                        <div className="text-base font-medium text-text-primary truncate group-hover:text-brand-blue transition-colors duration-300">
                          {user?.user_metadata?.full_name || "Usuário"}{" "}
                        </div>
                        <div className="text-sm font-medium text-text-secondary truncate group-hover:text-brand-blue transition-colors duration-300">
                          {user?.email}
                        </div>
                      </div>
                    </Link>
                    <div className="mt-4 px-2">
                      <Button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        variant="outline"
                        size="sm"
                        fullWidth
                        leftIcon={LogOut}
                        className="py-2 px-4"
                      >
                        Sair
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="px-2 space-y-2">
                    <Button
                      onClick={openLoginModal}
                      variant="primary"
                      size="sm"
                      fullWidth
                      leftIcon={LogIn}
                      className="py-2 px-4"
                    >
                      Entrar
                    </Button>
                    <Button
                      onClick={openRegisterModal}
                      variant="outline"
                      size="sm"
                      fullWidth
                      leftIcon={UserPlus}
                      className="py-2 px-4"
                    >
                      Criar Conta
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialView={authModalType}
      />
    </>
  );
};

export default Header;
