import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Send } from "lucide-react";
import Button from "../Common/Button"; // Supondo que o Button esteja em Common

const Footer = () => {
  // MELHORIA: Centralize seus links e informações para fácil manutenção.
  const socialLinks = {
    github: "https://github.com/SEU_USUARIO/elevate", // <-- SUBSTITUA
    linkedin: "https://linkedin.com/company/elevate", // <-- SUBSTITUA
    twitter: "https://twitter.com/elevate_tech", // <-- SUBSTITUA
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Adicionar lógica para chamar a API /api/subscribe/feature-update com { email, feature: 'newsletter' }
    alert("Obrigado por se inscrever na nossa newsletter!");
    e.target.reset();
  };

  return (
    <footer className="bg-text-primary text-brand-gray-medium mt-auto border-t-4 border-brand-blue">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 text-center md:text-left">
          {/* Coluna da Marca e Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-2">Elevate 🚀</h3>
            <p className="text-sm text-brand-gray mb-6">
              Potencialize sua carreira, construa seu futuro.
            </p>
            {/* MELHORIA: Seção de Newsletter */}
            <p className="font-semibold text-white mb-2">
              Fique por dentro das novidades!
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto md:mx-0"
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                required
                className="flex-grow px-4 py-2 rounded-md bg-brand-gray border border-brand-gray-dark text-white placeholder:text-brand-gray-dark focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                rightIcon={Send}
              >
                Inscrever
              </Button>
            </form>
          </div>

          {/* Coluna de Navegação: Plataforma */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/trilhas"
                  className="hover:text-blue-500 transition-colors"
                >
                  Trilhas
                </Link>
              </li>
              <li>
                <Link
                  to="/teste-perfil"
                  className="hover:text-blue-500 transition-colors"
                >
                  Teste de Perfil
                </Link>
              </li>
              <li>
                <Link
                  to="/comunidade"
                  className="hover:text-blue-500 transition-colors"
                >
                  Comunidade
                </Link>
              </li>
              <li>
                <Link
                  to="/#auth-modal-login"
                  className="hover:text-blue-500 transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna de Navegação: Empresa */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Carreiras
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna de Navegação: Legal */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção Inferior: Copyright e Redes Sociais */}
        <div className="mt-12 pt-8 border-t border-brand-gray-dark flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-brand-gray mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Elevate. Todos os direitos
            reservados.
          </p>
          <div className="flex space-x-5">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
