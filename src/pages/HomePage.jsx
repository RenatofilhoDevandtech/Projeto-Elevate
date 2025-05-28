import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Users2, BarChartBig } from 'lucide-react';
import Button from '../components/Common/Button';
import PathCard from '../components/Common/PathCard';
import { allPathsData } from '../data/mockPaths'; // Importar dados mockados

const HomePage = () => {
  const featuredPaths = allPathsData.slice(0, 3); // Pegar as 3 primeiras trilhas como destaque

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-20 bg-gradient-to-br from-brand-blue via-blue-600 to-purple-600 text-white rounded-xl shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Elevate
          </h1>
          <p className="text-xl sm:text-2xl mb-8 font-light max-w-2xl mx-auto">
            Potencialize sua carreira, construa seu futuro. Descubra trilhas de aprendizado personalizadas e impulsione suas habilidades tech.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="shadow-lg transform hover:scale-105"
            onClick={() => document.getElementById('profile-test-link').click()} // Para usar o Link do React Router
          >
            <Link to="/teste-perfil" id="profile-test-link" className="flex items-center">
              Descubra sua Trilha Ideal <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Why Elevate Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">Por que escolher a Elevate?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { icon: <Zap className="text-brand-green" size={36} />, title: "Trilhas Direcionadas", text: "Conteúdo organizado do YouTube em trilhas de aprendizado focadas na sua carreira dos sonhos." },
            { icon: <BarChartBig className="text-brand-green" size={36} />, title: "Progressão Clara", text: "Acompanhe seu desenvolvimento com indicadores visuais e conquiste badges por seus marcos." },
            { icon: <Users2 className="text-brand-green" size={36} />, title: "Comunidade Ativa", text: "Conecte-se com outros estudantes, tire dúvidas e compartilhe conhecimento em nossos fóruns." },
          ].map(item => (
            <div key={item.title} className="bg-brand-white p-6 rounded-xl shadow-card hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-brand-blue">{item.title}</h3>
              <p className="text-text-secondary text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Learning Paths Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">Trilhas em Destaque</h2>
        {featuredPaths.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPaths.map(path => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary">Nenhuma trilha em destaque no momento.</p>
        )}
        <div className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('all-paths-link').click()}
          >
             <Link to="/trilhas" id="all-paths-link" className="flex items-center">
                Ver todas as trilhas <ArrowRight className="ml-2" />
             </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;