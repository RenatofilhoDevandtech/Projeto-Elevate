import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Users2, TrendingUp, Layers, CheckCircle, Target, Compass, Award as AwardIcon, UserPlus } from 'lucide-react'; // Ícones relevantes
import Button from '../components/Common/Button';
import PathCard from '../components/Common/PathCard';
import { allPathsData } from '../data/mockPaths'; // Seus dados mockados

const HomePage = () => {
  const featuredPaths = allPathsData.slice(0, 3); // Ou uma lógica mais elaborada para destacar
  const navigate = useNavigate();

  const whyElevateFeatures = [
    {
      icon: Compass, // Direção, Guia
      iconColorClass: "text-[var(--brand-blue)]", // Azul da sua marca
      bgColorClass: "bg-[var(--brand-blue)]/10", // Fundo sutil com opacidade
      title: "Norte na sua Jornada Tech",
      text: "Cansado de informações soltas? Oferecemos trilhas estruturadas e curadoria de conteúdo para você não se perder e focar no que realmente importa."
    },
    {
      icon: TrendingUp, // Crescimento, Carreira
      iconColorClass: "text-[var(--brand-green)]", // Verde da sua marca
      bgColorClass: "bg-[var(--brand-green)]/10",
      title: "Evolução Profissional Contínua",
      text: "De iniciante a especialista, prepare-se com projetos práticos, simulações de entrevista e construa um portfólio que abre portas no mercado."
    },
    {
      icon: Users2, // Comunidade
      iconColorClass: "text-orange-500", // Uma cor de destaque para comunidade
      bgColorClass: "bg-orange-500/10",
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
      icon: AwardIcon, // Renomeado para evitar conflito
      title: "4. Conquiste Seu Espaço",
      text: "Prepare-se para entrevistas, receba certificados e dê o próximo passo na sua carreira."
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 md:space-y-40"> {/* Espaçamento generoso */}

      {/* Hero Section - Impacto Visual e Clareza */}
      <section
        className="text-center pt-20 pb-24 sm:pt-28 sm:pb-32 md:pt-32 md:pb-40 bg-gradient-to-br from-[var(--brand-blue)] via-blue-600 to-purple-700 text-white rounded-b-3xl sm:rounded-b-[40px] md:rounded-b-[50px] shadow-2xl overflow-hidden relative"
      >
        {/* Elementos sutis de fundo para um toque futurista (opcional) */}
        <div className="absolute inset-0 opacity-5 animate-pulse-slow">
          {/* Exemplo: <GridPatternOuSimilar /> - se tiver um componente de padrão */}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tighter !leading-tight">
            Sua Carreira Tech <span className=" text-cyan-500 ">Começa Agora</span>.<br /> Eleve suas Habilidades.
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-10 font-light max-w-lg lg:max-w-2xl mx-auto leading-relaxed">
            Chega de se sentir perdido! A Elevate organiza o conhecimento e te guia passo a passo, desde a escolha da carreira até a conquista da sua vaga.
          </p>
          <Button
            variant="secondary" // Verde, para um CTA de destaque
            size="lg"
            className="!px-10 !py-4 text-md sm:text-lg font-semibold shadow-xl transform hover:scale-105"
            onClick={() => navigate('/teste-perfil')}
            rightIcon={ArrowRight}
          >
            Descobrir Minha Trilha Ideal
          </Button>
          <p className="text-xs mt-4 opacity-80">Junte-se a nós e transforme seu futuro!</p>
        </div>
      </section>

      {/* Seção "Como Funciona?" - Clareza e Simplicidade */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Descomplicando sua Entrada na Área Tech
        </h2>
        <p className="text-md sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 sm:mb-16">
          Quatro passos simples para você sair do zero e alcançar seus objetivos profissionais.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-[var(--brand-white)] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-3 mb-4 bg-[var(--brand-blue)]/10 rounded-full">
                <step.icon size={32} className="text-[var(--brand-blue)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção "Por que escolher a Elevate?" - Benefícios Claros */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
            A Plataforma Completa para <span className="text-[var(--brand-blue)]">Sua Ascensão</span>
          </h2>
          <p className="text-md sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Ferramentas, conhecimento e suporte para você ir além.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 text-center md:text-left">
          {whyElevateFeatures.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--brand-white)] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-2 group"
            >
              <div className={`inline-flex items-center justify-center p-4 rounded-full mb-5 ${item.bgColorClass}`}>
                <item.icon className={item.iconColorClass} size={30} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)] group-hover:text-[var(--brand-blue)] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção "Trilhas em Destaque" - Prova de Valor */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">Explore Nossas Trilhas Mais Populares</h2>
            <p className="text-md sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">Conteúdo de ponta para você dominar as tecnologias do futuro, hoje.</p>
        </div>
        {featuredPaths.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredPaths.map(path => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-10">Novas trilhas incríveis chegando em breve. Explore todas as disponíveis!</p>
        )}
        <div className="text-center mt-12 sm:mt-16">
          <Button
            variant="primary"
            size="lg"
            className="!px-10 !py-4 text-md sm:text-lg font-semibold"
            onClick={() => navigate('/trilhas')}
            rightIcon={Layers}
          >
            Ver Todas as Trilhas
          </Button>
        </div>
      </section>

      {/* Seção Final de CTA - Reforço da Mensagem */}
      <section className="bg-[var(--brand-gray)] py-16 sm:py-24 rounded-t-3xl sm:rounded-t-[40px] md:rounded-t-[50px]">
        <div className="container mx-auto px-4 text-center">
          <Zap size={48} className="text-[var(--brand-blue)] mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-5">
            Pronto para <span className="text-[var(--brand-blue)]">Elevar</span> sua Carreira?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-xl mx-auto">
            Não espere o futuro acontecer. Construa-o. Junte-se à comunidade Elevate e comece sua transformação hoje mesmo.
          </p>
          <Button
            variant="primary" // Primário para destaque
            size="lg"
            className="!px-12 !py-4 text-lg font-semibold shadow-xl transform hover:scale-105"
            onClick={/* idealmente abre o modal de registro */ () => navigate('/#auth-modal-register')} // Ou navega para uma página de registro
            rightIcon={UserPlus}
          >
            Crie Sua Conta Grátis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;