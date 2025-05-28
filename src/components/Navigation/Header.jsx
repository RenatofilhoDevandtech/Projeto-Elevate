import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Briefcase, Users, Award, MessageSquareText, Home, Lightbulb, LogIn, LogOut, UserCircle } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../Common/Button'; // Usaremos o componente Button

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Exemplo de uso do AuthContext

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
      isActive
        ? 'bg-brand-blue text-white shadow-sm'
        : 'text-text-secondary hover:bg-brand-gray-medium hover:text-brand-blue'
    }`;

  return (
    <header className="bg-brand-white shadow-card sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-brand-blue hover:text-brand-green transition-colors duration-300">
          Elevate ✨
        </Link>
        <ul className="flex flex-wrap items-center space-x-1 sm:space-x-2 mt-3 sm:mt-0">
          <li><NavLink to="/" className={navLinkClasses}><Home size={18} className="mr-1 sm:mr-2"/> <span className="hidden sm:inline">Início</span></NavLink></li>
          <li><NavLink to="/trilhas" className={navLinkClasses}><Briefcase size={18} className="mr-1 sm:mr-2"/> <span className="hidden sm:inline">Trilhas</span></NavLink></li>
          <li><NavLink to="/teste-perfil" className={navLinkClasses}><Lightbulb size={18} className="mr-1 sm:mr-2"/> <span className="hidden sm:inline">Perfil</span></NavLink></li>
          <li><NavLink to="/simulador-entrevista" className={navLinkClasses}><MessageSquareText size={18} className="mr-1 sm:mr-2"/> <span className="hidden sm:inline">Entrevista</span></NavLink></li>
          <li><NavLink to="/comunidade" className={navLinkClasses}><Users size={18} className="mr-1 sm:mr-2"/> <span className="hidden sm:inline">Comunidade</span></NavLink></li>
          <li><NavLink to="/certificados" className={navLinkClasses}><Award size={18} className="mr-1 sm:mr-2"/> <span className="hidden sm:inline">Certificados</span></NavLink></li>
        </ul>
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          {user ? (
            <>
              <span className="text-text-secondary text-sm hidden md:inline">Olá, {user.name}!</span>
              <Button onClick={logout} variant="outline" size="sm">
                <LogOut size={16} className="mr-1" /> Sair
              </Button>
            </>
          ) : (
            <Button onClick={() => {/* TODO: Abrir modal de login ou redirecionar */}} variant="primary" size="sm">
              <LogIn size={16} className="mr-1" /> Entrar
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;