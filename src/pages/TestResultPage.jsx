import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Award,
  Twitter,
  ArrowRight,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import Button from "../components/Common/Button";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import PathCard from "../components/Common/PathCard";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, " ").trim();
};

const TestResultPage = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const storedRecommendations = localStorage.getItem("recommendedPaths");
    if (storedRecommendations) {
      try {
        const parsed = JSON.parse(storedRecommendations);
        setRecommendations(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (e) {
        console.error("Erro ao parsear recomendações do localStorage:", e);
        setRecommendations(null);
      }
    } else {
      navigate("/teste-perfil", { replace: true });
    }

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(confettiTimer);
  }, [navigate]);

  if (!recommendations || recommendations.length === 0) {
    return <Navigate to="/teste-perfil" replace />;
  }

  const mainRecommendation = recommendations[0];

  const shareText = `Acabei de descobrir meu perfil tech na plataforma Elevate! Sou um futuro ${
    mainRecommendation.title || "profissional de tecnologia"
  }. 🚀 Começando minha jornada de aprendizado! #ElevateTech #CarreiraTech`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent("https://suaurl.com.br/elevate")}`;

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.1}
        />
      )}

      <div
        className={cleanTailwindClasses(
          "flex flex-col items-center justify-center text-center py-24 px-6"
        )}
      >
        <Award
          className={cleanTailwindClasses("text-brand-green mb-6")}
          size={64}
        />
        <h1
          className={cleanTailwindClasses(
            "text-2xl sm:text-3xl font-bold text-text-secondary mb-2"
          )}
        >
          Analisamos suas respostas e...
        </h1>
        <h2
          className={cleanTailwindClasses(
            "text-4xl sm:text-5xl font-extrabold text-brand-blue mb-6"
          )}
        >
          Seu Perfil é de {mainRecommendation.title}!
        </h2>
        <p
          className={cleanTailwindClasses(
            "text-lg text-text-secondary mb-12 max-w-2xl leading-relaxed"
          )}
        >
          Isso indica uma afinidade com os desafios e recompensas desta área.
          Preparamos uma trilha de aprendizado perfeita para você começar sua
          jornada.
        </p>

        {recommendations.length > 1 && (
          <div
            className={cleanTailwindClasses("mb-12 text-left w-full max-w-4xl")}
          >
            <h3
              className={cleanTailwindClasses(
                "text-xl font-bold text-text-primary mb-4 text-center"
              )}
            >
              Outras recomendações para você:
            </h3>
            <div
              className={cleanTailwindClasses(
                "grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              )}
            >
              {recommendations.slice(1).map((path) => (
                <PathCard key={path.id} path={path} />
              ))}
            </div>
            <p
              className={cleanTailwindClasses(
                "text-center text-text-secondary text-sm mt-6"
              )}
            >
              Explore todas as opções e encontre o seu caminho ideal!
            </p>
          </div>
        )}

        <div
          className={cleanTailwindClasses(
            "flex flex-col sm:flex-row gap-4 mb-12"
          )}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/trilha/${mainRecommendation.id}`)}
            rightIcon={ArrowRight}
            className={cleanTailwindClasses("py-4 px-8 text-lg font-semibold")}
          >
            Iniciar Minha Trilha
          </Button>
          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              leftIcon={Twitter}
              className={cleanTailwindClasses(
                "py-4 px-8 text-lg font-semibold"
              )}
            >
              Compartilhar Resultado
            </Button>
          </a>
        </div>

        <Link
          to="/trilhas"
          className={cleanTailwindClasses(
            "text-brand-blue hover:underline font-medium text-lg"
          )}
        >
          Ver todas as trilhas disponíveis
        </Link>
      </div>
    </>
  );
};

export default TestResultPage;
