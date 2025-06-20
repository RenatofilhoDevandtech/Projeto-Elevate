import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle,
  AlertTriangle,
  Rocket,
  Mail, // Importando o ícone de e-mail para o input
} from "lucide-react";
import Button from "../Common/Button";
import api from "../../services/api";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, " ").trim();
};

const Footer = () => {
  const socialLinks = {
    github: "https://github.com/SEU_USUARIO", // Lembre-se de atualizar com o link correto
    linkedin: "https://www.linkedin.com/company/sua-empresa-elevate-aqui/", // Lembre-se de atualizar com o link correto
    twitter: "https://x.com/seu_twitter_elevate_aqui", // Lembre-se de atualizar com o link correto
  };

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterFeedback, setNewsletterFeedback] = useState("");
  const [newsletterFeedbackType, setNewsletterFeedbackType] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterFeedback("");
    setNewsletterFeedbackType("");

    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterFeedback("Por favor, insira um e-mail válido.");
      setNewsletterFeedbackType("error");
      return;
    }

    setIsSubmittingNewsletter(true);
    setNewsletterFeedback("Registrando seu interesse...");
    setNewsletterFeedbackType("");

    try {
      const response = await api.post("/subscribe/feature-update", {
        email: newsletterEmail,
        feature: "newsletter",
      });

      setNewsletterFeedback(
        response.data.message || "Obrigado! Sua inscrição foi registrada."
      );
      setNewsletterFeedbackType("success");
      setNewsletterEmail("");
    } catch (error) {
      console.error(
        "Erro ao registrar newsletter:",
        error.response?.data || error.message
      );
      setNewsletterFeedback(
        error.response?.data?.message ||
          "Ocorreu um erro ao inscrever-se. Tente novamente mais tarde."
      );
      setNewsletterFeedbackType("error");
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  return (
    <footer
      className={cleanTailwindClasses(
        "bg-text-primary text-brand-gray-medium mt-auto border-t-4 border-brand-blue font-sans"
      )}
    >
      {/* Container principal com padding horizontal e vertical responsivos */}
      <div
        className={cleanTailwindClasses("container mx-auto px-4 py-8 md:py-12")}
      >
        {/* Grid principal para as colunas do footer, responsivo para 1, 4 ou 5 colunas */}
        <div
          className={cleanTailwindClasses(
            "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 text-center md:text-left"
          )}
        >
          {/* Coluna da Marca e Newsletter */}
          <div className={cleanTailwindClasses("lg:col-span-2")}>
            {/* Título da marca com ícone e cor da marca */}
            <h3
              className={cleanTailwindClasses(
                "text-2xl sm:text-3xl font-bold text-brand-white mb-2 flex items-center justify-center md:justify-start"
              )}
            >
              <Rocket
                size={28}
                className={cleanTailwindClasses("mr-2 text-brand-blue")}
              />
              Elevate
            </h3>
            {/* Descrição da marca */}
            <p
              className={cleanTailwindClasses(
                "text-sm text-brand-gray-medium mb-6 leading-relaxed"
              )}
            >
              Potencialize sua carreira, construa seu futuro.
            </p>
            {/* Seção de Newsletter */}
            <p
              className={cleanTailwindClasses(
                "font-semibold text-brand-white mb-3"
              )}
            >
              Fique por dentro das novidades!
            </p>
            {/* Formulário de inscrição da Newsletter */}
            <form
              onSubmit={handleNewsletterSubmit}
              className={cleanTailwindClasses(
                "relative flex flex-col sm:flex-row gap-2 max-w-sm mx-auto md:mx-0"
              )}
            >
              {/* Ícone de e-mail dentro do input para melhor UX */}
              <div
                className={cleanTailwindClasses(
                  "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                )}
              >
                <Mail
                  className={cleanTailwindClasses(
                    "h-5 w-5 text-brand-gray-dark"
                  )}
                  aria-hidden="true"
                />
              </div>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={isSubmittingNewsletter}
                className={cleanTailwindClasses(
                  "flex-grow pl-10 pr-4 py-2.5 border border-brand-gray-medium rounded-md text-text-primary placeholder:text-brand-gray-dark focus:outline-none focus:ring-2 focus:ring-brand-blue bg-brand-white transition-all duration-200 ease-in-out"
                )}
              />
              {/* Botão de inscrição, usando o componente Button */}
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmittingNewsletter}
                disabled={isSubmittingNewsletter}
                rightIcon={Send}
                className={cleanTailwindClasses("py-2.5 px-5")}
              >
                Inscrever
              </Button>
            </form>
            {/* Feedback da Newsletter (sucesso ou erro) */}
            {newsletterFeedback && (
              <div
                className={cleanTailwindClasses(
                  `mt-3 flex items-center px-3 py-2 text-xs rounded-md max-w-sm mx-auto md:mx-0 ${
                    newsletterFeedbackType === "success"
                      ? "bg-brand-green/10 border border-brand-green text-brand-green"
                      : "bg-danger-red/10 border border-danger-red text-danger-red"
                  }`
                )}
                role="alert"
              >
                {newsletterFeedbackType === "success" ? (
                  <CheckCircle
                    size={14}
                    className={cleanTailwindClasses("mr-2 flex-shrink-0")}
                  />
                ) : (
                  <AlertTriangle
                    size={14}
                    className={cleanTailwindClasses("mr-2 flex-shrink-0")}
                  />
                )}
                <span
                  className={cleanTailwindClasses("font-medium leading-tight")}
                >
                  {newsletterFeedback}
                </span>
              </div>
            )}
          </div>

          {/* Coluna de Navegação: Plataforma */}
          <div>
            <h4
              className={cleanTailwindClasses(
                "font-semibold text-brand-white uppercase tracking-wider mb-4"
              )}
            >
              Plataforma
            </h4>
            <ul className={cleanTailwindClasses("space-y-3 text-sm")}>
              <li>
                <Link
                  to="/trilhas"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Trilhas
                </Link>
              </li>
              <li>
                <Link
                  to="/teste-perfil"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Teste de Perfil
                </Link>
              </li>
              <li>
                <Link
                  to="/comunidade"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Comunidade
                </Link>
              </li>
              <li>
                <Link
                  to="/login-register"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna de Navegação: Empresa */}
          <div>
            <h4
              className={cleanTailwindClasses(
                "font-semibold text-brand-white uppercase tracking-wider mb-4"
              )}
            >
              Empresa
            </h4>
            <ul className={cleanTailwindClasses("space-y-3 text-sm")}>
              <li>
                <Link
                  to="/sobre"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  to="/carreiras"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Carreiras
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna de Navegação: Legal */}
          <div>
            <h4
              className={cleanTailwindClasses(
                "font-semibold text-brand-white uppercase tracking-wider mb-4"
              )}
            >
              Legal
            </h4>
            <ul className={cleanTailwindClasses("space-y-3 text-sm")}>
              <li>
                <Link
                  to="/termos"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className={cleanTailwindClasses(
                    "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
                  )}
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção Inferior: Copyright e Redes Sociais */}
        <div
          className={cleanTailwindClasses(
            "mt-10 pt-6 border-t border-brand-gray-dark flex flex-col sm:flex-row justify-between items-center text-center sm:text-left"
          )}
        >
          <p
            className={cleanTailwindClasses(
              "text-xs text-brand-gray-medium mb-4 sm:mb-0 leading-relaxed"
            )}
          >
            &copy; {new Date().getFullYear()} Elevate. Todos os direitos
            reservados.
          </p>
          <div className={cleanTailwindClasses("flex space-x-5 mt-2 sm:mt-0")}>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cleanTailwindClasses(
                "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
              )}
              aria-label="GitHub da Elevate"
            >
              <Github size={22} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cleanTailwindClasses(
                "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
              )}
              aria-label="LinkedIn da Elevate"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={cleanTailwindClasses(
                "text-brand-gray-medium hover:text-(--brand-blue) transition-colors duration-300"
              )}
              aria-label="Twitter da Elevate"
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
