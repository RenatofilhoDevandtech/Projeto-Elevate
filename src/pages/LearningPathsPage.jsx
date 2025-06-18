import React, { useState, useEffect } from 'react';
import PathCard from '../components/Common/PathCard';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import api from '../services/api';
import useDebounce from '../hooks/useDebounce';

// Componente de esqueleto para o card enquanto os dados carregam
const PathCardSkeleton = () => (
  <div className="bg-brand-white rounded-xl shadow-lg p-5 space-y-4 animate-pulse">
    <div className="flex items-start space-x-4"><div className="w-14 h-14 rounded-lg bg-brand-gray-medium"></div><div className="flex-grow space-y-2"><div className="h-4 bg-brand-gray-medium rounded w-3/4"></div><div className="h-3 bg-brand-gray-medium rounded w-1/2"></div></div></div>
    <div className="h-4 bg-brand-gray-medium rounded"></div><div className="h-4 bg-brand-gray-medium rounded w-5/6"></div>
  </div>
);

const LearningPathsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [paths, setPaths] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchPaths = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: 9,
          search: debouncedSearchTerm,
          category: selectedCategory,
          level: selectedLevel,
        });
        
        const response = await api.get(`/paths?${params.toString()}`);
        setPaths(response.data.data);
        setPagination(response.data.pagination);
      } catch (err) {
        console.error("Erro ao buscar trilhas:", err);
        setError("Não foi possível carregar as trilhas.");
      } finally {
        setLoading(false);
      }
    };
    fetchPaths();
  }, [debouncedSearchTerm, selectedCategory, selectedLevel, currentPage]);

  const categories = ['All', 'Desenvolvimento Web', 'Infraestrutura e Operações', 'Qualidade e Testes', 'Dados e IA', 'Design', 'Desenvolvimento Mobile'];
  const levels = ['All', 'Iniciante', 'Intermediário', 'Avançado'];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setCurrentPage(1);
  };
  
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1); // Reseta para a primeira página ao mudar o filtro
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-blue mb-3">Explore Nossas Trilhas</h1>
        <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">Encontre o caminho perfeito para decolar na sua carreira tech.</p>
      </div>

      {/* Filtros e Busca */}
      <div className="mb-10 p-6 bg-brand-white rounded-xl shadow-lg sticky top-24 z-40 border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search-paths" className="block text-sm font-medium text-text-secondary mb-1">Buscar Trilha</label>
            <div className="relative"><input id="search-paths" type="text" placeholder="Ex: React, Python, Design..." className="w-full p-3 pl-10 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-dark" size={20}/></div>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-text-secondary mb-1">Categoria</label>
            <select id="category-filter" className="w-full p-3 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue bg-white" value={selectedCategory} onChange={handleFilterChange(setSelectedCategory)}>
              {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="level-filter" className="block text-sm font-medium text-text-secondary mb-1">Nível</label>
            <select id="level-filter" className="w-full p-3 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue bg-white" value={selectedLevel} onChange={handleFilterChange(setSelectedLevel)}>
              {levels.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
        </div>
        {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && ( <button onClick={clearFilters} className="mt-4 text-sm text-brand-blue hover:underline flex items-center"><X size={16} className="mr-1"/> Limpar filtros</button>)}
      </div>

      {/* Listagem */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{[...Array(6)].map((_, i) => <PathCardSkeleton key={i} />)}</div>
      ) : error ? (
        <div className="text-center text-danger-red py-20">{error}</div>
      ) : paths.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{paths.map(path => <PathCard key={path.id} path={path} />)}</div>
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded-lg disabled:opacity-50">Anterior</button>
              <span className="text-text-secondary">Página {pagination.currentPage} de {pagination.totalPages}</span>
              <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === pagination.totalPages} className="px-4 py-2 border rounded-lg disabled:opacity-50">Próxima</button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-text-secondary text-xl py-20 bg-brand-white rounded-lg shadow-md">
          <Filter size={48} className="mx-auto mb-4 text-brand-gray-dark" /><p className="font-semibold mb-2">Nenhuma trilha encontrada.</p><p className="text-sm">Tente ajustar seus filtros.</p>
        </div>
      )}
    </div>
  );
}

export default LearningPathsPage;