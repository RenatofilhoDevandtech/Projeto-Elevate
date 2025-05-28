import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Check, Send } from 'lucide-react';
import { profileTestQuestions, calculateProfileResult } from '../data/mockProfileTest';
import Button from '../components/Common/Button';

const ProfileTestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < profileTestQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finalizar teste
      const recommendedPathId = calculateProfileResult(answers);
      // TODO: Salvar resultado, talvez em AuthContext ou localStorage
      navigate(`/trilha/${recommendedPathId}?source=test`);
    }
  };

  const currentQuestion = profileTestQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === profileTestQuestions.length - 1;

  return (
    <div className="container max-w-full mx-auto bg-brand-white p-6 sm:p-8 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <Lightbulb className="mx-auto text-brand-green mb-3 animate-pulse" size={48} />
        <h1 className="text-3xl font-bold text-brand-blue">Teste de Perfil Vocacional</h1>
        <p className="text-text-secondary mt-2">Descubra qual carreira tecnológica mais combina com você respondendo algumas perguntas.</p>
      </div>

      {currentQuestion && (
        <div>
          <p className="text-sm text-text-secondary mb-2">Pergunta {currentQuestionIndex + 1} de {profileTestQuestions.length}</p>
          <h2 className="text-xl font-semibold text-text-primary mb-6">{currentQuestion.text}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQuestion.id, option.id)}
                className={`w-full text-left p-4 border rounded-lg flex items-center justify-between transition-transform duration-200
                  ${answers[currentQuestion.id] === option.id
                    ? 'bg-brand-blue border-brand-blue text-white shadow-lg transform scale-105'
                    : 'bg-brand-gray hover:bg-blue-50 border-brand-gray-medium text-text-primary hover:shadow-md active:scale-95'
                  }`}
              >
                <span>{option.text}</span>
                {answers[currentQuestion.id] === option.id && <Check size={20} />}
              </button>
            ))}
          </div>

          <div className="mt-10 text-right">
            <Button
              onClick={handleNextQuestion}
              disabled={!answers[currentQuestion.id]}
              size="lg"
              variant="primary"
            >
              {isLastQuestion ? 'Ver Resultado' : 'Próxima Pergunta'} <Send size={18} className="ml-2"/>
            </Button>
          </div>
        </div>
      )}

      <div className="w-full bg-brand-gray-medium rounded-full h-2.5 mt-8 relative">
        <div className="bg-brand-green h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentQuestionIndex + 1) / profileTestQuestions.length) * 100}%` }}>
        </div>
      </div>
    </div>
  );
};

export default ProfileTestPage;
