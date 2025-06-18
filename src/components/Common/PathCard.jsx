import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layers, BarChart2, ArrowRight } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

const categoryStyles = {
  'desenvolvimento web': 'bg-[var(--brand-blue)]/15 text-[var(--brand-blue-dark)]',
  'desenvolvimento mobile': 'bg-[var(--brand-green)]/15 text-[var(--brand-green-dark)]',
  'infraestrutura e operações': 'bg-purple-500/15 text-purple-800',
  'qualidade e testes': 'bg-yellow-500/20 text-yellow-800',
  'dados e ia': 'bg-indigo-500/15 text-indigo-800',
  'design': 'bg-pink-500/15 text-pink-800',
  default: 'bg-[var(--brand-gray-medium)] text-[var(--text-secondary)]',
};

const PathCard = ({ path }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const categoryTagClasses = categoryStyles[path.category?.toLowerCase()] || categoryStyles.default;
  
  const progress = isAuthenticated && path.userProgress;

  return (
    <Link
      to={`/trilha/${path.id}`}
      className="group flex flex-col h-full bg-brand-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-brand-blue text-brand-white flex items-center justify-center mr-4">
            <span className="text-3xl">{path.icon || '💡'}</span>
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-blue transition-colors duration-200 truncate pr-1">
              {path.title}
            </h3>
            {/* CORREÇÃO: A tag de categoria foi adicionada de volta aqui */}
            {path.category && (
              <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full mt-1.5 whitespace-nowrap ${categoryTagClasses}`}>
                {path.category}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 h-[4.5rem] mb-4">
          {path.description}
        </p>

        {/* Barra de progresso condicional */}
        {progress && progress.total > 0 && (
          <div className="mt-auto pt-4"> {/* mt-auto empurra esta seção para baixo */}
            <div className="flex justify-between mb-1 text-xs">
              <span className="font-semibold text-brand-blue">Seu Progresso</span>
              <span className="text-text-secondary">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-brand-gray-medium rounded-full h-2 overflow-hidden">
              <div className="bg-brand-green h-2 rounded-full transition-all" style={{ width: `${progress.percentage}%` }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-brand-gray-medium">
        <div className="flex justify-between items-center text-xs text-text-secondary px-6 py-3">
          <span className="flex items-center">
            <Layers size={14} className="text-brand-green mr-1.5" /> {path.modules} Módulos
          </span>
          <span className="flex items-center">
            <BarChart2 size={14} className="text-brand-green mr-1.5" /> {path.level}
          </span>
        </div>
        <div className="bg-brand-gray group-hover:bg-brand-green text-brand-blue group-hover:text-brand-white text-center py-3 px-5 text-sm font-semibold transition-all duration-300 flex items-center justify-center cursor-pointer rounded-b-xl">
          Iniciar Trilha <ArrowRight size={16} className="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

// PropTypes atualizados para incluir a nova prop opcional
PathCard.propTypes = {
  path: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string,
    modules: PropTypes.number, // Pode não vir em todos os contextos, então não é isRequired
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