import React from 'react';
import PropTypes from 'prop-types'; // Lembre-se: npm install prop-types
import { Link, useNavigate } from 'react-router-dom'; // Usando useNavigate para melhor navegação
import { Construction, ArrowLeft, Home } from 'lucide-react';
import Button from './Button'; // Seu componente Button estilizado

const UnderConstruction = ({
  pageName,
  expectedFeatures = [],
  message, // Mensagem customizada opcional
}) => {
  const navigate = useNavigate();

  return (
    <div
      // Usando suas classes personalizadas e utilitários Tailwind
      className="flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20
                 bg-brand-white rounded-xl shadow-xl min-h-[70vh] sm:min-h-[65vh] px-4 sm:px-6 lg:px-8"
    >
      <Construction
        // Use .text-brand-blue
        className="text-brand-blue mb-5 sm:mb-6 animate-pulse" // Animação sutil para o ícone
        size={50} // Tamanho base para mobile
        // Ajuste de tamanho para telas maiores (Tailwind não suporta props responsivas diretamente,
        // mas você pode ter diferentes ícones/componentes ou ajustar via CSS se necessário)
        // Para lucide-react, o size é um número.
      />

      <h1
        // Use .text-brand-blue
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-blue mb-3 sm:mb-4"
      >
        Em Construção!
      </h1>

      <p
        // Use .text-text-secondary e .text-brand-green
        className="text-md sm:text-lg lg:text-xl text-text-secondary mb-6 sm:mb-8 max-w-md md:max-w-lg leading-relaxed"
      >
        {message || (
          <>
            A seção de <strong className="text-brand-green font-semibold">{pageName}</strong> está sendo
            cuidadosamente preparada pela nossa equipe para elevar sua experiência.
          </>
        )}
      </p>

      {expectedFeatures.length > 0 && (
        <div
          // Use .bg-brand-gray, .text-text-primary, .text-text-secondary
          className="mb-8 text-left w-full max-w-md md:max-w-lg bg-brand-gray p-4 sm:p-6 rounded-lg shadow-sm border border-brand-gray-medium"
        >
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3">
            O que esperar em breve:
          </h3>
          <ul className="list-disc list-inside text-text-secondary space-y-1.5 text-sm sm:text-base">
            {expectedFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-text-secondary mb-8 text-sm sm:text-base">
        Agradecemos sua paciência e volte em breve para conferir as novidades!
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <Button
          variant="outline" // Para um visual mais sutil no "Voltar"
          size="md"       // Tamanho base
          // smSize="lg" // Se o seu Button aceitar props de tamanho responsivo
          onClick={() => navigate(-1)} // useNavigate para voltar uma página no histórico
          leftIcon={ArrowLeft}
          fullWidth
        >
          Voltar
        </Button>
        <Button
          variant="primary"
          size="md"
          // smSize="lg"
          onClick={() => navigate('/')} // Navega para a página inicial
          leftIcon={Home}
          fullWidth
        >
          Página Inicial
        </Button>
      </div>
    </div>
  );
};

UnderConstruction.propTypes = {
  pageName: PropTypes.string.isRequired,
  expectedFeatures: PropTypes.arrayOf(PropTypes.string),
  message: PropTypes.string,
};

export default UnderConstruction;