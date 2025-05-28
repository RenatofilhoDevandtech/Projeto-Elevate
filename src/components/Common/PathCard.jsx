import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, ArrowRight } from 'lucide-react';

const PathCard = ({ path }) => {
  return (
    <Link
      to={`/trilha/${path.id}`}
      className="group block bg-brand-white rounded-xl shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start mb-4">
          <span className="text-4xl mr-4 bg-brand-blue text-white p-2 rounded-md inline-block">{path.icon || '💡'}</span>
          <div>
            <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-blue transition-colors duration-200">{path.title}</h3>
            <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${
                path.category === 'Desenvolvimento Web' ? 'bg-blue-100 text-blue-700' :
                path.category === 'Infraestrutura e Operações' ? 'bg-purple-100 text-purple-700' :
                path.category === 'Qualidade e Testes' ? 'bg-yellow-100 text-yellow-700' :
                path.category === 'Dados e IA' ? 'bg-indigo-100 text-indigo-700' :
                path.category === 'Design' ? 'bg-pink-100 text-pink-700' :
                'bg-gray-100 text-gray-700'
              }`}>{path.category}</span>
          </div>
        </div>
        <p className="text-text-secondary text-sm mb-4 h-20 overflow-hidden text-ellipsis">{path.description}</p>
        <div className="flex justify-between items-center text-xs text-text-secondary border-t border-brand-gray-medium pt-3 mt-auto">
          <span className="flex items-center"><BookOpen size={14} className="mr-1.5 text-brand-green" /> {path.modules} Módulos</span>
          <span className="flex items-center"><BarChart2 size={14} className="mr-1.5 text-brand-green" /> {path.level}</span>
        </div>
      </div>
      <div className="bg-brand-gray group-hover:bg-brand-green text-brand-blue group-hover:text-white text-center py-3 px-6 text-sm font-semibold transition-all duration-300 flex items-center justify-center">
        Iniciar Trilha <ArrowRight size={16} className="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
};

export default PathCard;