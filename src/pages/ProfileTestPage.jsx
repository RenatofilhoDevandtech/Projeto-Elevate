import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lightbulb,
  Check,
  Send,
  Loader2,
  AlertTriangle,
  ChevronLeft,
} from "lucide-react";
import Button from "../components/Common/Button";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const ProfileTestPage = () => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [error, setError] = useState("");
  const [isSubmittingAnswers, setIsSubmittingAnswers] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!isAuthenticated && !authLoading) {
        setLoadingQuestions(false);
        return;
      }
      if (authLoading) return;

      setLoadingQuestions(true);
      setError("");
      try {
        const response = await api.get("/profile-test/questions");
        // Verifica se a resposta tem dados e se é um array
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setQuestions(response.data);
          // Garante que o índice da questão atual não excede o número de perguntas
          setCurrentQuestionIndex(0); // Sempre inicia na primeira pergunta
        } else {
          // Se não houver perguntas, define um erro
          setError("Não foi possível carregar as perguntas do teste. Nenhuma pergunta encontrada.");
          setQuestions([]); // Garante que 'questions' é um array vazio
        }
      } catch (err) {
        console.error("Erro ao buscar perguntas do teste:", err);
        setError(
          err.response?.data?.error ||
            "Não foi possível carregar as perguntas do teste. Tente novamente mais tarde."
        );
      } finally {
        setLoadingQuestions(false);
      }
    };
    fetchQuestions();
  }, [isAuthenticated, authLoading]);

  const handleAnswer = (questionId, optionId) => {
    // Adicionando validação para garantir que a 'question' existe antes de acessar 'type'
    const question = questions.find((q) => q.id === questionId);
    if (!question) {
      console.error(`Pergunta com ID ${questionId} não encontrada.`);
      return; // Sai da função se a pergunta não for encontrada
    }
    const questionType = question.type;

    if (questionType === "multiple-choice") {
      setAnswers((prev) => {
        const currentSelected = prev[questionId] || [];
        if (currentSelected.includes(optionId)) {
          return {
            ...prev,
            [questionId]: currentSelected.filter((id) => id !== optionId),
          };
        } else {
          return { ...prev, [questionId]: [...currentSelected, optionId] };
        }
      });
    } else {
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    }
  };

  const handleNextQuestion = async () => {
    // CORREÇÃO: Verifica se currentQuestion existe antes de acessar 'id'
    if (!currentQuestion) {
        console.error("currentQuestion é indefinido ao tentar handleNextQuestion.");
        return;
    }

    // 1. Validação se a pergunta atual foi respondida
    if (
      !answers[currentQuestion.id] ||
      (Array.isArray(answers[currentQuestion.id]) &&
        answers[currentQuestion.id].length === 0)
    ) {
      alert("Por favor, selecione uma opção para continuar.");
      return;
    }

    // 2. Navegar para a próxima pergunta ou finalizar o teste
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // 3. Finalizar teste: enviar respostas para o backend
      setIsSubmittingAnswers(true);
      setError(""); // Limpa erros de submissão anteriores
      try {
        const response = await api.post("/profile-test/submit", { answers });

        const recommendedPaths = response.data.recommendation;

        localStorage.setItem(
          "recommendedPaths",
          JSON.stringify(recommendedPaths)
        );

        navigate("/teste/resultado");
      } catch (err) {
        console.error("Erro ao finalizar teste de perfil:", err);
        setError(
          err.response?.data?.error ||
            "Não foi possível finalizar o teste. Tente novamente."
        );
      } finally {
        setIsSubmittingAnswers(false);
      }
    }
  };

  // CORREÇÃO: currentQuestion só é acessado APÓS a verificação de loading/error
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // --- Estados de Carregamento e Erro (UX) ---
  if (authLoading) {
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue mb-4")} size={40} />
        <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary font-semibold")}>
          Verificando seu acesso...
        </p>
      </div>
    );
  }

  // Não precisamos mais desse bloco se a ProtectedRoute estiver funcionando
  // if (!isAuthenticated) { ... }

  if (loadingQuestions) {
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue mb-4")} size={40} />
        <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary font-semibold")}>
          Carregando perguntas do teste...
        </p>
      </div>
    );
  }

  // Se houver um erro na busca/submissão das perguntas
  if (error) {
    return (
      <div className={cleanTailwindClasses("flex items-center justify-center py-32 bg-danger-red/10 border border-danger-red/20 text-danger-red rounded-xl shadow-custom-light min-h-[50vh] px-6")}>
        <AlertTriangle size={32} className={cleanTailwindClasses("mr-4 flex-shrink-0")} />
        <p className={cleanTailwindClasses("text-lg font-semibold")}>{error}</p>
      </div>
    );
  }

  // Se não houver perguntas após o carregamento (backend retornou vazio ou erro)
  // A mensagem de erro já deveria ter sido definida acima em 'fetchQuestions'
  if (!questions.length) {
    return (
      <div className={cleanTailwindClasses("text-center py-32 bg-brand-white rounded-xl shadow-custom-light border border-brand-gray-medium")}>
        <Lightbulb size={52} className={cleanTailwindClasses("mx-auto text-brand-gray-dark mb-4")} />
        <h2 className={cleanTailwindClasses("text-2xl font-semibold text-text-primary mb-4")}>
          Nenhuma pergunta encontrada.
        </h2>
        <p className={cleanTailwindClasses("text-text-secondary mb-6")}>
          Não foi possível carregar as perguntas do teste de perfil. Por favor,
          tente novamente mais tarde.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" leftIcon={ChevronLeft}>
            Voltar à Página Inicial
          </Button>
        </Link>
      </div>
    );
  }

  // Renderiza o teste de perfil
  return (
    <div className={cleanTailwindClasses("container mx-auto px-6 py-8")}>
      <div className={cleanTailwindClasses("max-w-2xl mx-auto bg-brand-white p-8 rounded-xl shadow-custom-medium border border-brand-gray-medium")}>
        <div className={cleanTailwindClasses("text-center mb-12")}>
          <Lightbulb
            className={cleanTailwindClasses("mx-auto text-brand-green mb-4 animate-pulse")}
            size={48}
          />
          <h1 className={cleanTailwindClasses("text-3xl font-bold text-text-primary")}>
            Teste de Perfil Vocacional
          </h1>
          <p className={cleanTailwindClasses("text-text-secondary mt-2")}>
            Descubra qual carreira tecnológica mais combina com você respondendo
            algumas perguntas.
          </p>
        </div>

        {/* Garante que currentQuestion existe antes de renderizar */}
        {currentQuestion && (
          <div>
            <p className={cleanTailwindClasses("text-sm text-text-secondary mb-2")}>
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </p>
            <h2 className={cleanTailwindClasses("text-xl font-semibold text-text-primary mb-6")}>
              {currentQuestion.text}
            </h2>
            <div className={cleanTailwindClasses("space-y-4")}>
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQuestion.id, option.id)}
                  className={cleanTailwindClasses(`w-full text-left p-4 border rounded-lg flex items-center justify-between transition-all duration-200
                    ${
                      (Array.isArray(answers[currentQuestion.id]) &&
                        answers[currentQuestion.id].includes(option.id)) ||
                      (!Array.isArray(answers[currentQuestion.id]) &&
                        answers[currentQuestion.id] === option.id)
                        ? "bg-brand-blue border-brand-blue text-brand-white shadow-custom-light transform scale-[1.01]"
                        : "bg-brand-gray hover:bg-brand-gray-medium border-brand-gray-medium text-text-primary hover:shadow-custom-light active:scale-98"
                    }`)}
                >
                  <span className={cleanTailwindClasses("flex-grow pr-2")}>{option.text}</span>
                  {(Array.isArray(answers[currentQuestion.id]) &&
                    answers[currentQuestion.id].includes(option.id)) ||
                  (!Array.isArray(answers[currentQuestion.id]) &&
                    answers[currentQuestion.id] === option.id) ? (
                    <Check size={20} className={cleanTailwindClasses("flex-shrink-0")} />
                  ) : null}
                </button>
              ))}
            </div>

            <div className={cleanTailwindClasses("mt-12 text-right")}>
              <Button
                onClick={handleNextQuestion}
                // Adicionado mais segurança à condição 'disabled'
                disabled={
                  isSubmittingAnswers || // Desabilita durante a submissão
                  !answers[currentQuestion.id] || // Nenhuma resposta selecionada
                  (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0) // Nenhuma opção em multiselect
                }
                size="lg"
                variant="primary"
                isLoading={isSubmittingAnswers}
              >
                {isLastQuestion ? "Ver Resultado" : "Próxima Pergunta"}{" "}
                <Send size={18} className={cleanTailwindClasses("ml-2")} />
              </Button>
            </div>
          </div>
        )}

        {/* Barra de Progresso */}
        <div className={cleanTailwindClasses("w-full bg-brand-gray-medium rounded-full h-3 mt-12 relative overflow-hidden")}>
          <div
            className={cleanTailwindClasses("bg-gradient-to-r from-brand-green/70 to-brand-green h-full rounded-full transition-all duration-500 ease-in-out")}
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTestPage;