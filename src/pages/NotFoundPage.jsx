import React from "react";
import { Link } from "react-router-dom"; // Importe Link diretamente
import { AlertTriangle } from "lucide-react";
import Button from "../components/Common/Button"; // Seu componente Button

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, " ").trim();
};

const NotFoundPage = () => {
  return (
    <div
      className={cleanTailwindClasses(
        "flex flex-col items-center justify-center text-center py-32 min-h-[60vh] bg-brand-white rounded-xl shadow-custom-medium border border-brand-gray-medium px-6"
      )}
    >
      <AlertTriangle
        className={cleanTailwindClasses("text-text-secondary mb-6")}
        size={64}
      />
      <h1
        className={cleanTailwindClasses(
          "text-5xl font-bold text-text-primary mb-4"
        )}
      >
        404
      </h1>
      <h2
        className={cleanTailwindClasses(
          "text-2xl font-semibold text-text-secondary mb-6"
        )}
      >
        Página Não Encontrada
      </h2>
      <p
        className={cleanTailwindClasses(
          "text-text-secondary mb-12 max-w-md leading-relaxed"
        )}
      >
        Oops! Parece que a página que você está procurando não existe ou foi
        movida. Não se preocupe, vamos te guiar de volta ao caminho certo.
      </p>
      <Button
        variant="primary"
        size="lg"
        as={Link} // Use a prop 'as' para renderizar o Button como um Link
        to="/"
        className={cleanTailwindClasses("py-4 px-8 text-lg font-semibold")}
      >
        Voltar para a Página Inicial
      </Button>
    </div>
  );
};

export default NotFoundPage;
