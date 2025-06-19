import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Layers, BarChart2, ArrowRight } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

// Mapeamento de estilos para as tags de categoria, usando suas variáveis semânticas
const categoryStyles = {
  // Cores da marca
  "desenvolvimento web": cleanTailwindClasses("bg-brand-blue/10 text-brand-blue-dark"),
  "desenvolvimento mobile": cleanTailwindClasses("bg-brand-green/10 text-brand-green-dark"),
  // Cores neutras ou variantes das cores da marca, já que 'infra', 'qualidade', 'dados' não têm variáveis dedicadas no index.css
  "infraestrutura e operações": cleanTailwindClasses("bg-brand-gray-dark/20 text-text-primary"),
  "qualidade e testes": cleanTailwindClasses("bg-brand-blue/20 text-brand-blue-dark"),
  "dados e ia": cleanTailwindClasses("bg-brand-green/20 text-brand-green-dark"),
  design: cleanTailwindClasses("bg-pink-500/10 text-pink-700"), // Mantido, se não houver variável dedicada
  default: cleanTailwindClasses("bg-brand-gray-medium text-text-secondary"), // Usando suas neutras
};

const PathCard = ({ path }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const categoryTagClasses =
    categoryStyles[path.category?.toLowerCase()] || categoryStyles.default;

  // O progresso só será exibido se o usuário estiver logado E houver dados de progresso válidos
  const showProgress =
    isAuthenticated && path.userProgress && path.userProgress.total > 0;

  return (
    <Link
      to={cleanTailwindClasses(`/trilha/${path.id}`)}
      className={cleanTailwindClasses("group flex flex-col h-full bg-brand-white rounded-xl shadow-custom-light hover:shadow-custom-medium transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-white")}
    >
      <div className={cleanTailwindClasses("p-6 flex flex-col flex-grow")}>
        <div className={cleanTailwindClasses("flex items-start mb-4")}>
          <div className={cleanTailwindClasses("flex-shrink-0 w-14 h-14 rounded-lg bg-brand-blue text-brand-white flex items-center justify-center mr-4")}>
            <span className={cleanTailwindClasses("text-3xl")}>{path.icon || "💡"}</span>
          </div>
          <div className={cleanTailwindClasses("flex-grow min-w-0")}>
            <h3 className={cleanTailwindClasses("text-lg font-bold text-text-primary group-hover:text-brand-blue transition-colors duration-300 truncate pr-1")}>
              {path.title}
            </h3>
            {path.category && (
              <span
                className={cleanTailwindClasses(`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-1.5 whitespace-nowrap ${categoryTagClasses}`)}
              >
                {path.category}
              </span>
            )}
          </div>
        </div>
        <p className={cleanTailwindClasses("text-text-secondary text-sm leading-relaxed line-clamp-3 h-[4.5rem] mb-6")}>
          {path.description}
        </p>
        {/* Barra de progresso condicional */}
        {showProgress && (
          <div className={cleanTailwindClasses("mt-auto pt-6")}>
            <div className={cleanTailwindClasses("flex justify-between mb-2 text-xs")}>
              <span className={cleanTailwindClasses("font-semibold text-brand-blue")}>
                Seu Progresso
              </span>
              <span className={cleanTailwindClasses("text-text-secondary")}>
                {path.userProgress.percentage}%
              </span>
            </div>
            <div className={cleanTailwindClasses("w-full bg-brand-gray-medium rounded-full h-2 overflow-hidden")}>
              <div
                className={cleanTailwindClasses("bg-brand-green h-2 rounded-full transition-all duration-500 ease-in-out")}
                style={{ width: `${path.userProgress.percentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className={cleanTailwindClasses("border-t border-brand-gray-medium")}>
        <div className={cleanTailwindClasses("flex justify-between items-center text-xs text-text-secondary px-6 py-2")}>
          <span className={cleanTailwindClasses("flex items-center")}>
            <Layers size={14} className={cleanTailwindClasses("text-brand-green mr-1.5")} />
            {path.modules_count || path.modules} Módulos
          </span>
          <span className={cleanTailwindClasses("flex items-center")}>
            <BarChart2 size={14} className={cleanTailwindClasses("text-brand-green mr-1.5")} />
            {path.level}
          </span>
        </div>
        <div
          className={cleanTailwindClasses("bg-brand-gray group-hover:bg-brand-green text-brand-blue group-hover:text-brand-white text-center py-6 px-6 text-sm font-semibold transition-all duration-300 flex items-center justify-center cursor-pointer rounded-b-xl")}
        >
          Iniciar Trilha
          <ArrowRight
            size={16}
            className={cleanTailwindClasses("ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300")}
          />
        </div>
      </div>
    </Link>
  );
};

PathCard.propTypes = {
  path: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string,
    modules: PropTypes.number,
    modules_count: PropTypes.number,
    level: PropTypes.string.isRequired,
    category: PropTypes.string,
    userProgress: PropTypes.shape({
      completed: PropTypes.number,
      total: PropTypes.number,
      percentage: PropTypes.number,
    }),
  }).isRequired,
};

export default PathCard;