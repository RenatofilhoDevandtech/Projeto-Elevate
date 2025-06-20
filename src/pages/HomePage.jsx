// src/pages/HomePage.jsx
import React, { useState, useEffect, useContext } from 'react'; // Adicionado useContext
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Users2, TrendingUp, Layers, CheckCircle, Target, Compass, Award as AwardIcon, UserPlus, BookOpen, Loader2, AlertTriangle, WifiOff } from 'lucide-react';
import Button from '../components/Common/Button';
import PathCard from '../components/Common/PathCard';
import api from '../services/api';
import { allPathsData } from '../data/mockPaths';
import { AuthContext } from '../contexts/AuthContext'; // Importe o AuthContext

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
    return classString.replace(/\s+/g, ' ').trim();
};

const HomePage = () => {
    const [featuredPaths, setFeaturedPaths] = useState([]);
    const [loadingPaths, setLoadingPaths] = useState(true);
    const [pathsError, setPathsError] = useState('');
    const [isOfflineMode, setIsOfflineMode] = useState(false);
    const navigate = useNavigate();

    // Acessar as funções do modal diretamente do AuthContext
    const { openLoginModal, openRegisterModal } = useContext(AuthContext); 

    // ... (restante do seu useEffect para fetchFeaturedPaths, ele permanece o mesmo)
    useEffect(() => {
        const fetchFeaturedPaths = async () => {
            try {
                setLoadingPaths(true);
                setPathsError('');
                setIsOfflineMode(false);

                const response = await api.get('/paths?limit=3');
                setFeaturedPaths(response.data.data || []);
            } catch (err) {
                console.error("Erro ao buscar trilhas em destaque:", err);
                setPathsError("Não foi possível carregar as trilhas do servidor. Você está vendo uma versão offline de demonstração.");
                setIsOfflineMode(true);

                const mockPathsWithModulesCount = allPathsData.slice(0, 3).map(path => ({
                    ...path,
                    modules_count: path.details?.modulesData?.length || 0,
                    userProgress: null
                }));
                setFeaturedPaths(mockPathsWithModulesCount);
            } finally {
                setLoadingPaths(false);
            }
        };
        fetchFeaturedPaths();
    }, []);

    const whyElevateFeatures = [
        {
            icon: Compass,
            iconColorClass: cleanTailwindClasses("text-brand-blue"),
            bgColorClass: cleanTailwindClasses("bg-brand-blue/10"),
            title: "Norte na sua Jornada Tech",
            text: "Cansado de informações soltas? Oferecemos trilhas estruturadas e curadoria de conteúdo para você não se perder e focar no que realmente importa."
        },
        {
            icon: TrendingUp,
            iconColorClass: cleanTailwindClasses("text-brand-green"),
            bgColorClass: cleanTailwindClasses("bg-brand-green/10"),
            title: "Evolução Profissional Contínua",
            text: "De iniciante a especialista, prepare-se com projetos práticos, simulações de entrevista e construa um portfólio que abre portas no mercado."
        },
        {
            icon: Users2,
            iconColorClass: cleanTailwindClasses("text-brand-green"),
            bgColorClass: cleanTailwindClasses("bg-brand-green/10"),
            title: "Comunidade e Networking de Valor",
            text: "Aprenda, compartilhe e cresça junto com outros devs e mentores experientes. Sua rede de contatos começa aqui."
        },
    ];

    const howItWorksSteps = [
        {
            icon: Target,
            title: "1. Descubra Seu Perfil",
            text: "Faça nosso teste vocacional e encontre as carreiras tech que mais combinam com você."
        },
        {
            icon: Layers,
            title: "2. Siga Trilhas Personalizadas",
            text: "Acesse conteúdos organizados, de vídeos a artigos, focados no seu desenvolvimento."
        },
        {
            icon: Zap,
            title: "3. Pratique com Projetos Reais",
            text: "Aplique seu conhecimento em desafios práticos e construa um portfólio de destaque."
        },
        {
            icon: AwardIcon,
            title: "4. Conquiste Seu Espaço",
            text: "Prepare-se para entrevistas, receba certificados e dê o próximo passo na sua carreira."
        }
    ];

    return (
        <div className={cleanTailwindClasses("space-y-24 md:space-y-32 font-sans bg-brand-gray")}>

            {/* Hero Section - Impacto Visual e Clareza */}
            <section
                className={cleanTailwindClasses("text-center pt-24 pb-32 sm:pt-28 sm:pb-32 md:pt-32 md:pb-40 bg-gradient-elevate text-brand-white rounded-b-3xl sm:rounded-b-[40px] md:rounded-b-[50px] shadow-2xl overflow-hidden relative")}
            >
                <div className={cleanTailwindClasses("absolute inset-0 opacity-5 animate-pulse-slow")}>
                </div>
                <div className={cleanTailwindClasses("container mx-auto px-6 relative z-10")}>
                    <h1 className={cleanTailwindClasses("text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tighter !leading-tight")}>
                        Sua Carreira Tech <span className={cleanTailwindClasses("text-brand-white")}>Começa Agora</span>.<br /> Eleve suas Habilidades.
                    </h1>
                    <p className={cleanTailwindClasses("text-lg sm:text-xl lg:text-2xl mb-8 font-light max-w-lg lg:max-w-2xl mx-auto leading-relaxed")}>
                        Chega de se sentir perdido! A Elevate organiza o conhecimento e te guia passo a passo, desde a escolha da carreira até a conquista da sua vaga.
                    </p>
                    <Button
                        variant="secondary"
                        size="lg"
                        className={cleanTailwindClasses("!px-8 !py-4 text-lg font-semibold shadow-xl transform hover:scale-105")}
                        onClick={() => navigate('/teste-perfil')}
                        rightIcon={ArrowRight}
                    >
                        Descobrir Minha Trilha Ideal
                    </Button>
                    <p className={cleanTailwindClasses("text-sm mt-4 opacity-80")}>Junte-se a nós e transforme seu futuro!</p>
                </div>
            </section>

            {/* Seção "Como Funciona?" - Clareza e Simplicidade */}
            <section className={cleanTailwindClasses("container mx-auto px-6 text-center")}>
                <h2 className={cleanTailwindClasses("text-3xl sm:text-4xl font-bold text-text-primary mb-4")}>
                    Descomplicando sua Entrada na Área Tech
                </h2>
                <p className={cleanTailwindClasses("text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-12")}>
                    Quatro passos simples para você sair do zero e alcançar seus objetivos profissionais.
                </p>
                <div className={cleanTailwindClasses("grid sm:grid-cols-2 lg:grid-cols-4 gap-8")}>
                    {howItWorksSteps.map((step, index) => (
                        <div key={index}
                            className={cleanTailwindClasses("flex flex-col items-center p-8 bg-brand-white rounded-xl shadow-custom-light hover:shadow-custom-medium transition-shadow duration-300")}>
                            <div className={cleanTailwindClasses("p-4 mb-4 bg-brand-blue/10 rounded-full")}>
                                <step.icon size={32} className={cleanTailwindClasses("text-brand-blue")} />
                            </div>
                            <h3 className={cleanTailwindClasses("text-xl font-semibold text-text-primary mb-2")}>{step.title}</h3>
                            <p className={cleanTailwindClasses("text-sm text-text-secondary leading-relaxed")}>{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seção "Por que escolher a Elevate?" - Benefícios Claros */}
            <section className={cleanTailwindClasses("container mx-auto px-6")}>
                <div className={cleanTailwindClasses("text-center mb-12")}>
                    <h2 className={cleanTailwindClasses("text-3xl sm:text-4xl font-bold text-text-primary mb-4")}>
                        A Plataforma Completa para <span className={cleanTailwindClasses("text-brand-blue")}>Sua Ascensão</span>
                    </h2>
                    <p className={cleanTailwindClasses("text-base sm:text-lg text-text-secondary max-w-2xl mx-auto")}>
                        Ferramentas, conhecimento e suporte para você ir além.
                    </p>
                </div>
                <div className={cleanTailwindClasses("grid md:grid-cols-3 gap-8 text-center md:text-left")}>
                    {whyElevateFeatures.map((item) => (
                        <div
                            key={item.title}
                            className={cleanTailwindClasses("bg-brand-white p-8 rounded-xl shadow-custom-light hover:shadow-custom-medium transition-all duration-300 ease-out transform hover:-translate-y-2 group")}
                        >
                            <div className={cleanTailwindClasses(`inline-flex items-center justify-center p-4 rounded-full mb-4 ${item.bgColorClass}`)}>
                                <item.icon className={item.iconColorClass} size={30} />
                            </div>
                            <h3 className={cleanTailwindClasses("text-xl font-semibold mb-2 text-text-primary group-hover:text-brand-blue transition-colors duration-300")}>
                                {item.title}
                            </h3>
                            <p className={cleanTailwindClasses("text-sm text-text-secondary leading-relaxed")}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seção "Trilhas em Destaque" - Prova de Valor */}
            <section className={cleanTailwindClasses("container mx-auto px-6")}>
                <div className={cleanTailwindClasses("text-center mb-12")}>
                    <h2 className={cleanTailwindClasses("text-3xl sm:text-4xl font-bold text-text-primary mb-4")}>Explore Nossas Trilhas Mais Populares</h2>
                    <p className={cleanTailwindClasses("text-base sm:text-lg text-text-secondary max-w-xl mx-auto")}>Conteúdo de ponta para você dominar as tecnologias do futuro, hoje.</p>
                </div>
                {/* Mensagem de Erro / Modo Offline - Exibida de forma não-bloqueante */}
                {isOfflineMode && (
                    <div className={cleanTailwindClasses("mb-8 p-4 bg-danger-red/10 text-danger-red border-l-4 border-danger-red rounded-r-lg flex items-center shadow-custom-light")}>
                        <WifiOff size={20} className={cleanTailwindClasses("mr-4 flex-shrink-0")} />
                        <p className={cleanTailwindClasses("text-sm font-medium")}>{pathsError}</p>
                    </div>
                )}
                {loadingPaths ? (
                    <div className={cleanTailwindClasses("flex justify-center items-center py-10")}>
                        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue")} size={32} />
                        <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary")}>Carregando trilhas em destaque...</p>
                    </div>
                ) : featuredPaths.length > 0 ? (
                    <div className={cleanTailwindClasses("grid sm:grid-cols-2 lg:grid-cols-3 gap-8")}>
                        {featuredPaths.map(path => (
                            <PathCard key={path.id} path={path} />
                        ))}
                    </div>
                ) : (
                    // Mensagem para quando não há trilhas em destaque (mesmo sem erro)
                    <p className={cleanTailwindClasses("text-center text-text-secondary py-10 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium")}>
                        Novas trilhas incríveis chegando em breve. Explore todas as disponíveis!
                    </p>
                )}
                <div className={cleanTailwindClasses("text-center mt-12")}>
                    <Button
                        variant="primary"
                        size="lg"
                        className={cleanTailwindClasses("!px-8 !py-4 text-lg font-semibold")}
                        onClick={() => navigate('/trilhas')}
                        rightIcon={BookOpen}
                    >
                        Ver Todas as Trilhas
                    </Button>
                </div>
            </section>

            {/* Seção Final de CTA - Reforço da Mensagem */}
            <section
                className={cleanTailwindClasses("bg-brand-gray-medium py-32 rounded-t-3xl sm:rounded-t-[40px] md:rounded-t-[50px] shadow-custom-light")}>
                <div className={cleanTailwindClasses("container mx-auto px-6 text-center")}>
                    <Zap size={48} className={cleanTailwindClasses("text-brand-blue mx-auto mb-4")} />
                    <h2 className={cleanTailwindClasses("text-3xl sm:text-4xl font-bold text-text-primary mb-2")}>
                        Pronto para <span className={cleanTailwindClasses("text-brand-blue")}>Elevar</span> sua Carreira?
                    </h2>
                    <p className={cleanTailwindClasses("text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-12")}>
                        Junte-se a milhares de profissionais que estão transformando suas carreiras com a Elevate.
                    </p>
                    <div className={cleanTailwindClasses("flex flex-col sm:flex-row justify-center gap-4")}>
                        <Button
                            variant="primary"
                            size="lg"
                            className={cleanTailwindClasses("py-4 px-8 text-lg font-semibold")} // Removido '!' prefixos
                            onClick={openRegisterModal}
                            rightIcon={UserPlus}
                        >
                            Criar Conta Gratuita
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className={cleanTailwindClasses("py-4 px-8 text-lg font-semibold")} // Removido '!' prefixos
                            onClick={openLoginModal}
                        >
                            Explorar Trilhas
                        </Button>
                    </div>
                    <p className={cleanTailwindClasses("text-sm mt-8 text-text-secondary")}>
                        Já tem uma conta? <button type="button" onClick={openLoginModal} className={cleanTailwindClasses("text-brand-blue hover:underline focus:outline-none")}>Faça login</button>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;