import React, { useState, useMemo } from 'react';
import PathCard from '../components/Common/PathCard';
import { Search, Filter, X } from 'lucide-react';
import { allPathsData } from '../data/mockPaths'; // Importar dados mockados

const LearningPathsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(allPathsData.map(path => path.category))], []);
  const levels = useMemo(() => ['All', ...new Set(allPathsData.map(path => path.level))], []);

  const filteredPaths = useMemo(() => {
    return allPathsData.filter(path => {
      const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || path.level === selectedLevel;
      const matchesSearch = searchTerm === '' ||
        path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-blue mb-3">Explore Nossas Trilhas</h1>
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
          Encontre o caminho perfeito para decolar na sua carreira tech. Filtre por categoria, nível ou busque por palavras-chave.
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="mb-10 p-4 sm:p-6 bg-brand-white rounded-xl shadow-card sticky top-20 z-40"> {/* top-20 para não ficar sob o header */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search-paths" className="block text-sm font-medium text-text-secondary mb-1">Buscar Trilha</label>
            <div className="relative">
              <input
                id="search-paths"
                type="text"
                placeholder="Ex: React, Python, Design..."
                className="w-full p-3 pl-10 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-shadow focus:shadow-focus"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray-dark" size={20}/>
            </div>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-text-secondary mb-1">Categoria</label>
            <select
              id="category-filter"
              className="w-full p-3 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-shadow focus:shadow-focus bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="level-filter" className="block text-sm font-medium text-text-secondary mb-1">Nível</label>
            <select
              id="level-filter"
              className="w-full p-3 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-shadow focus:shadow-focus bg-white"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
            <button
                onClick={clearFilters}
                className="mt-4 text-sm text-brand-blue hover:text-brand-blue-dark flex items-center"
            >
                <X size={16} className="mr-1"/> Limpar filtros
            </button>
        )}
      </div>

      {filteredPaths.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPaths.map(path => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      ) : (
        <div className="text-center text-text-secondary text-xl py-20 bg-brand-white rounded-lg shadow-card">
          <Filter size={48} className="mx-auto mb-4 text-brand-gray-dark" />
          <p className="font-semibold mb-2">Nenhuma trilha encontrada.</p>
          <p className="text-sm">Tente ajustar seus filtros ou termos de busca.</p>
        </div>
      )}
    </div>
  );
}

export default LearningPathsPage;