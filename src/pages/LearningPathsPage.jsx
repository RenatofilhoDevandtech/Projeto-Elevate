import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PathCard from '../components/Common/PathCard'; // Seu componente PathCard
import { Search, Filter, X, Loader2, WifiOff, AlertTriangle } from 'lucide-react'; // Adicionado AlertTriangle
import api from '../services/api'; // Cliente de API
import useDebounce from '../hooks/useDebounce'; // Seu hook useDebounce
import { allPathsData } from '../data/mockPaths'; // Seus dados de fallback
import Modal from '../components/Common/Modal'; // Para o modal de filtros em mobile
import Button from '../components/Common/Button'; // Necessário para os botões

// Componente de esqueleto para o PathCard (melhorado com classes semânticas)
// Idealmente, mover PathCardSkeleton para um arquivo separado como src/components/Common/PathCardSkeleton.jsx
const PathCardSkeleton = React.memo(() => (
    <div className="bg-brand-white rounded-xl shadow-custom-light p-6 space-y-4 animate-pulse">
        <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-lg bg-brand-gray-medium"></div>
            <div className="flex-grow space-y-2">
                <div className="h-4 bg-brand-gray-medium rounded w-3/4"></div>
                <div className="h-3 bg-brand-gray-medium rounded w-1/2"></div>
            </div>
        </div>
        <div className="h-4 bg-brand-gray-medium rounded"></div>
        <div className="h-4 bg-brand-gray-medium rounded w-5/6"></div>
    </div>
));

const LearningPathsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [paths, setPaths] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // Estado de erro
    const [isOfflineMode, setIsOfflineMode] = useState(false); // Novo estado para controlar o modo offline
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // Para o modal de filtros em mobile

    // Debounce para o termo de busca (evita requisições excessivas)
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Função auxiliar para limpar classes Tailwind
    const cleanTailwindClasses = useCallback((classString) => {
        return classString.replace(/\s+/g, ' ').trim();
    }, []);

    // Opções de categorias e níveis, memorizadas com useMemo
    const categories = useMemo(() => [
        'All',
        'Desenvolvimento Web',
        'Desenvolvimento Mobile',
        'Infraestrutura e Operações',
        'Qualidade e Testes',
        'Dados e IA',
        'Design',
    ], []);

    const levels = useMemo(() => [
        'All',
        'Iniciante',
        'Intermediário',
        'Avançado',
    ], []);

    // Efeito para buscar as trilhas do backend
    useEffect(() => {
        const fetchPaths = async () => {
            setLoading(true);
            setError(''); 
            setIsOfflineMode(false); // Reseta o modo offline ao iniciar nova busca
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
                console.error("Falha ao buscar trilhas da API:", err);
                setError("Não foi possível carregar as trilhas do servidor. Você está vendo uma versão offline de demonstração.");
                setIsOfflineMode(true); // Ativa o modo offline

                // Filtra os dados mockados localmente
                const filteredFallbackPaths = allPathsData.map(path => ({
                    ...path,
                    modules_count: path.details?.modulesData?.length || 0,
                    userProgress: null
                })).filter(path => {
                    const matchesSearch = !debouncedSearchTerm ||
                        path.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        path.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
                    const matchesCategory = selectedCategory === 'All' ||
                        (path.category && path.category.toLowerCase() === selectedCategory.toLowerCase());
                    const matchesLevel = selectedLevel === 'All' ||
                        (path.level && path.level.toLowerCase() === selectedLevel.toLowerCase());
                    return matchesSearch && matchesCategory && matchesLevel;
                });

                setPaths(filteredFallbackPaths); // Define os caminhos mockados
                setPagination(null); // Desativa paginação no modo offline
            } finally {
                setLoading(false);
            }
        };
        fetchPaths();
    }, [debouncedSearchTerm, selectedCategory, selectedLevel, currentPage, categories, levels]);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedCategory('All');
        setSelectedLevel('All');
        setCurrentPage(1);
    }, []);

    const handleFilterChange = useCallback((setter) => (e) => {
        setter(e.target.value);
        setCurrentPage(1);
    }, []);

    const handleApplyFilters = useCallback(() => {
        setIsFilterModalOpen(false);
    }, []);

    // Se estiver carregando, mostramos apenas o spinner
    if (loading) {
        return (
            <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
                <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue mb-4")} size={40} />
                <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary font-semibold")}>Carregando trilhas...</p>
            </div>
        );
    }

    return (
        <div className={cleanTailwindClasses("container mx-auto px-6 py-8")}>
            <h1 className={cleanTailwindClasses("text-4xl font-bold text-text-primary mb-2")}>Explore Nossas Trilhas</h1>
            <p className={cleanTailwindClasses("text-lg text-text-secondary mb-8")}>Encontre o caminho perfeito para decolar na sua carreira tech.</p>

            {/* Mensagem de Erro / Modo Offline - Agora exibida de forma não-bloqueante */}
            {isOfflineMode && ( // Exibe se estiver em modo offline (erro de API)
                <div className={cleanTailwindClasses("mb-8 p-4 bg-danger-red/10 text-danger-red border-l-4 border-danger-red rounded-r-lg flex items-center shadow-custom-light")}>
                    <WifiOff size={20} className={cleanTailwindClasses("mr-4 flex-shrink-0")} />
                    <p className={cleanTailwindClasses("text-sm font-medium")}>{error}</p>
                </div>
            )}

            {/* Filtros e Busca - Desktop */}
            <div className={cleanTailwindClasses("hidden md:flex bg-brand-white p-6 rounded-xl shadow-custom-light mb-8 items-center gap-4 sticky top-24 z-40 border border-brand-gray-medium")}>
                <div className={cleanTailwindClasses("relative flex-grow")}>
                    <Search size={20} className={cleanTailwindClasses("absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-dark")} />
                    <input
                        type="text"
                        placeholder="Buscar trilha por título ou descrição..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={cleanTailwindClasses("w-full pl-10 pr-4 py-2.5 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")}
                    />
                </div>

                <select
                    value={selectedCategory}
                    onChange={handleFilterChange(setSelectedCategory)}
                    // LINHA 165: Corrigido 'cleanTailtailClasses' para 'cleanTailwindClasses'
                    className={cleanTailwindClasses("py-2.5 px-4 border border-brand-gray-medium rounded-md text-text-primary bg-brand-white focus:ring-brand-blue focus:border-brand-blue outline-none transition-all duration-200 ease-in-out")}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat === 'All' ? 'Todas as Categorias' : cat}</option>
                    ))}
                </select>

                <select
                    value={selectedLevel}
                    onChange={handleFilterChange(setSelectedLevel)}
                    className={cleanTailwindClasses("py-2.5 px-4 border border-brand-gray-medium rounded-md text-text-primary bg-brand-white focus:ring-brand-blue focus:border-brand-blue outline-none transition-all duration-200 ease-in-out")}
                >
                    {levels.map(level => (
                        <option key={level} value={level}>{level === 'All' ? 'Todos os Níveis' : level}</option>
                    ))}
                </select>
                {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        leftIcon={X}
                        className={cleanTailwindClasses("py-2.5 px-4 text-brand-blue hover:underline")}
                    >
                        Limpar
                    </Button>
                )}
            </div>

            {/* Botão de Filtro - Mobile */}
            <div className={cleanTailwindClasses("md:hidden flex flex-col sm:flex-row gap-4 mb-8")}>
                <div className={cleanTailwindClasses("relative flex-grow")}>
                    <Search size={20} className={cleanTailwindClasses("absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-dark")} />
                    <input
                        type="text"
                        placeholder="Buscar trilha..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={cleanTailwindClasses("w-full pl-10 pr-4 py-2.5 border border-brand-gray-medium rounded-md focus:ring-brand-blue focus:border-brand-blue outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")}
                    />
                </div>
                <Button
                    variant="outline"
                    leftIcon={Filter}
                    onClick={() => setIsFilterModalOpen(true)}
                    className={cleanTailwindClasses("sm:w-auto py-2.5 px-6")}
                >
                    Filtrar
                </Button>
            </div>

            {/* Modal de Filtros para Mobile */}
            <Modal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                title="Filtrar Trilhas"
            >
                <div className={cleanTailwindClasses("space-y-6")}>
                    <div>
                        <label htmlFor="modal-category-filter" className={cleanTailwindClasses("block text-sm font-medium text-text-primary mb-2")}>Categoria:</label>
                        <select
                            id="modal-category-filter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={cleanTailwindClasses("w-full py-2.5 px-4 border border-brand-gray-medium rounded-md text-text-primary bg-brand-white focus:ring-brand-blue focus:border-brand-blue outline-none transition-all duration-200 ease-in-out")}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat === 'All' ? 'Todas as Categorias' : cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="modal-level-filter" className={cleanTailwindClasses("block text-sm font-medium text-text-primary mb-2")}>Nível:</label>
                        <select
                            id="modal-level-filter"
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className={cleanTailwindClasses("w-full py-2.5 px-4 border border-brand-gray-medium rounded-md text-text-primary bg-brand-white focus:ring-brand-blue focus:border-brand-blue outline-none transition-all duration-200 ease-in-out")}
                        >
                            {levels.map(level => (
                                <option key={level} value={level}>{level === 'All' ? 'Todos os Níveis' : level}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cleanTailwindClasses("flex justify-end")}>
                        <Button variant="primary" onClick={handleApplyFilters}>Aplicar Filtros</Button>
                    </div>
                </div>
            </Modal>

            {/* Exibição dos resultados */}
            <div className={cleanTailwindClasses("relative z-10")}>
                {paths.length === 0 && !loading && !isOfflineMode ? (
                    // Nenhuma trilha encontrada (após filtros)
                    <div className={cleanTailwindClasses("text-center text-text-secondary text-xl py-24 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium")}>
                        <Filter size={48} className={cleanTailwindClasses("mx-auto mb-4 text-brand-gray-dark")} />
                        <p className={cleanTailwindClasses("font-semibold mb-2")}>Nenhuma trilha encontrada.</p>
                        <p className={cleanTailwindClasses("text-sm")}>Tente ajustar seus filtros ou termos de busca.</p>
                    </div>
                ) : paths.length === 0 && !loading && isOfflineMode ? ( // Se não houver caminhos E não estiver carregando E estiver offline
                    <div className={cleanTailwindClasses("text-center text-text-secondary text-xl py-24 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium")}>
                        <WifiOff size={48} className={cleanTailwindClasses("mx-auto mb-4 text-brand-gray-dark")} />
                        <p className={cleanTailwindClasses("font-semibold mb-2")}>Sem conexão com o servidor.</p>
                        <p className={cleanTailwindClasses("text-sm")}>Não foi possível carregar as trilhas do servidor. Exibindo dados de demonstração.</p>
                        <p className={cleanTailwindClasses("text-sm mt-2")}>Tente novamente mais tarde.</p>
                    </div>
                ) : ( // Se houver caminhos
                    <>
                        <div className={cleanTailwindClasses("grid sm:grid-cols-2 lg:grid-cols-3 gap-8")}>
                            {paths.map(path => (
                                <PathCard key={path.id} path={path} />
                            ))}
                        </div>
                        {/* Paginação */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className={cleanTailwindClasses("flex justify-center items-center mt-12 space-x-4")}>
                                <button
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    disabled={currentPage === 1}
                                    className={cleanTailwindClasses("px-4 py-2 border border-brand-gray-medium rounded-lg disabled:opacity-50 bg-brand-white hover:bg-brand-gray transition-colors text-text-primary")}
                                >
                                    Anterior
                                </button>
                                <span className={cleanTailwindClasses("text-text-secondary font-medium")}>Página {pagination.currentPage} de {pagination.totalPages}</span>
                                <button
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    disabled={currentPage === pagination.totalPages}
                                    className={cleanTailwindClasses("px-4 py-2 border border-brand-gray-medium rounded-lg disabled:opacity-50 bg-brand-white hover:bg-brand-gray transition-colors text-text-primary")}
                                >
                                    Próxima
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LearningPathsPage;