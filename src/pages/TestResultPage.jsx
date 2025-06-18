import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Award, Twitter, ArrowRight } from 'lucide-react';
import Button from '../components/Common/Button';
import Confetti from 'react-confetti'; // Bônus: npm install react-confetti

const TestResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recommendation = location.state?.recommendation;

  // Se alguém tentar acessar esta página diretamente sem os dados, redireciona.
  if (!recommendation) {
    return <Navigate to="/teste-perfil" replace />;
  }

  const shareText = `Acabei de descobrir meu perfil tech na plataforma Elevate! Sou um futuro ${recommendation.title}. 🚀 Começando minha jornada de aprendizado! #ElevateTech #CarreiraTech`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://SUA_URL_FINAL.com')}`; // Substitua pela URL do seu site
  
  return (
    <>
      <Confetti recycle={false} numberOfPieces={250} width={window.innerWidth} height={window.innerHeight} />
      <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24">
        <Award className="text-brand-green mb-6" size={64} />
        <h1 className="text-2xl sm:text-3xl font-bold text-text-secondary mb-2">Analisamos suas respostas e...</h1>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-blue mb-4">Seu Perfil é de {recommendation.title}!</h2>
        <p className="text-lg text-text-secondary mb-10 max-w-2xl">
          Isso indica uma afinidade com os desafios e recompensas desta área. Preparamos uma trilha de aprendizado perfeita para você começar sua jornada.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate(`/trilha/${recommendation.id}`)}
            rightIcon={ArrowRight}
          >
            Iniciar Minha Trilha
          </Button>
          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" leftIcon={<Twitter size={18}/>}>
              Compartilhar Resultado
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default TestResultPage;