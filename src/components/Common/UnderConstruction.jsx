import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft, Home, Mail } from 'lucide-react';
import Button from './Button';
import api from '../../services/api'; // Importamos a API para uso real

const UnderConstruction = ({
  pageName,
  expectedFeatures = [],
  message,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFeedback('Por favor, insira um e-mail válido.');
      return;
    }
    
    setIsSubmitting(true);
    setFeedback('Registrando seu interesse...');
    
    try {
      // Chamada real à API que criamos
      const response = await api.post('/subscribe/feature-update', { email, feature: pageName });
      
      setFeedback(response.data.message || 'Obrigado! Seu interesse foi registrado.');
      setEmail('');
    } catch (error) { // A variável 'error' agora será usada
      // MELHORIA: Usamos a variável 'error' para dar um feedback mais detalhado e registrá-la no console.
      console.error("Erro ao registrar interesse:", error); // Log para depuração
      setFeedback(error.response?.data?.message || 'Ocorreu um erro. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20 bg-brand-white rounded-xl shadow-xl min-h-[70vh] px-4 sm:px-6">
      <Construction className="text-brand-blue mb-6 animate-pulse" size={50} />

      <h1 className="text-3xl sm:text-4xl font-bold text-brand-blue mb-4">
        Em Construção!
      </h1>

      <p className="text-lg text-text-secondary mb-8 max-w-lg leading-relaxed">
        {message || `A seção de ${pageName} está sendo preparada pela nossa equipe para elevar sua experiência.`}
      </p>

      {expectedFeatures.length > 0 && (
        <div className="mb-8 text-left w-full max-w-lg bg-brand-gray p-6 rounded-lg border border-brand-gray-medium">
          <h3 className="text-lg font-semibold text-text-primary mb-3">O que esperar em breve:</h3>
          <ul className="list-disc list-inside text-text-secondary space-y-2 text-base">
            {expectedFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
          </ul>
        </div>
      )}

      {/* Formulário de captura de leads */}
      <div className="w-full max-w-lg mb-8 p-6 rounded-lg bg-blue-50 border border-blue-200">
        <h3 className="text-lg font-semibold text-brand-blue mb-3">Seja o primeiro a saber!</h3>
        <p className="text-sm text-blue-800 mb-4">Deixe seu e-mail e nós te avisaremos assim que esta seção for lançada.</p>
        <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-dark" size={20} />
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              required
              className="w-full p-3 pl-10 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
            Avise-me
          </Button>
        </form>
        {feedback && <p className="text-xs mt-3 text-gray-600">{feedback}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Button variant="outline" size="md" onClick={() => navigate(-1)} leftIcon={ArrowLeft} fullWidth>
          Voltar
        </Button>
        <Button variant="primary" size="md" onClick={() => navigate('/')} leftIcon={Home} fullWidth>
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