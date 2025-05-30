import React from 'react';
import PropTypes from 'prop-types'; // Lembre-se: npm install prop-types
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, ArrowRight, Layers } from 'lucide-react'; // Adicionando Layers para categoria

const PathCard = ({ path }) => {
  // Determina a cor da tag da categoria dinamicamente.
  // Essas classes são padrão do Tailwind e funcionarão bem para diferenciação visual.
  // Se quiser usar suas cores 'brand-*', você precisaria criar classes para cada combinação.
  let categoryTagClasses = 'bg-gray-100 text-gray-700'; // Padrão
  if (path.category) {
    switch (path.category.toLowerCase()) {
      case 'desenvolvimento web':
        categoryTagClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        break;
      case 'infraestrutura e operações':
        categoryTagClasses = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
        break;
      case 'qualidade e testes':
        categoryTagClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300'; // Ajustado para melhor contraste no modo escuro
        break;
      case 'dados e ia':
        categoryTagClasses = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
        break;
      case 'design':
        categoryTagClasses = 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
        break;
      case 'desenvolvimento mobile':
        categoryTagClasses = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        break;
      default:
        // Se tiver uma cor 'secondary' definida em suas variáveis e classes, poderia usar aqui
        // categoryTagClasses = 'bg-brand-secondary-light text-brand-secondary-dark';
        categoryTagClasses = 'bg-brand-gray-medium text-text-secondary'; // Usando suas cores neutras
    }
  }

  return (
    <Link
      to={`/trilha/${path.id}`}
      // Usando suas classes personalizadas e utilitários Tailwind
      className="group flex flex-col h-full bg-brand-white rounded-xl shadow-lg hover:shadow-xl
                 transition-all duration-300 ease-out overflow-hidden transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-gray"
    >
      {/* Seção do Ícone e Título */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start mb-3 sm:mb-4">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-brand-blue text-brand-white flex items-center justify-center mr-3 sm:mr-4">
            {/* O ícone deve ser um emoji ou um componente SVG/Lucide-React.
                Se for string, idealmente é um emoji. Se for componente, renderize-o. */}
            {typeof path.icon === 'string' && path.icon.length < 3 ? ( // Supõe que emoji tem 1 ou 2 chars
              <span className="text-2xl sm:text-3xl">{path.icon || '💡'}</span>
            ) : (
              path.icon || <Layers size={24} smSize={28} /> // Ícone padrão se path.icon for componente ou não existir
            )}
          </div>
          <div className="flex-grow min-w-0"> {/* min-w-0 para text-ellipsis funcionar corretamente */}
            <h3 className="text-md sm:text-lg lg:text-xl font-bold text-text-primary group-hover:text-brand-blue transition-colors duration-200 truncate pr-1">
              {path.title}
            </h3>
            {path.category && (
              <span
                className={`inline-block px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-full mt-1.5 whitespace-nowrap ${categoryTagClasses}`}
              >
                {path.category}
              </span>
            )}
          </div>
        </div>

        {/* Descrição */}
        <p className="text-text-secondary text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3 sm:line-clamp-4 h-[3.75rem] sm:h-[5rem]">
          {/* line-clamp requer plugin ou CSS custom. Se não, use overflow-hidden text-ellipsis com altura fixa */}
          {/* Se o plugin tailwindcss-line-clamp não estiver instalado, a altura fixa será a principal forma de controle. */}
          {path.description}
        </p>
      </div>

      {/* Metadados e Botão - Empurrado para o final do card */}
      <div className="mt-auto border-t border-brand-gray-medium">
        <div className="flex justify-between items-center text-xs text-text-secondary px-5 sm:px-6 py-3">
          <span className="flex items-center">
            <BookOpen size={14} className="mr-1.5 text-brand-green" /> {path.modules} Módulos
          </span>
          <span className="flex items-center">
            <BarChart2 size={14} className="mr-1.5 text-brand-green" /> {path.level}
          </span>
        </div>
        {/* Use suas classes personalizadas para o botão */}
        <div className="bg-brand-gray group-hover:bg-brand-green text-brand-blue group-hover:text-brand-white text-center py-3 px-5 sm:px-6 text-sm font-semibold transition-all duration-300 flex items-center justify-center cursor-pointer">
          Iniciar Trilha <ArrowRight size={16} className="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
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
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]), // Pode ser string (emoji) ou um nó React (ícone SVG)
    modules: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default PathCard;