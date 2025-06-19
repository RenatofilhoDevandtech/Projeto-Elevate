import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  Construction,
  ArrowLeft,
  Home,
  Mail,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Button from "./Button";
import api from "../../services/api";

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const UnderConstruction = ({ pageName, expectedFeatures = [], message }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState(""); // 'success' ou 'error'

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    setFeedbackType("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFeedback("Por favor, insira um e-mail válido.");
      setFeedbackType("error");
      return;
    }

    setIsSubmitting(true);
    setFeedback("Registrando seu interesse...");
    setFeedbackType("");

    try {
      const response = await api.post("/subscribe/feature-update", {
        email,
        feature: pageName,
      });

      setFeedback(
        response.data.message || "Obrigado! Seu interesse foi registrado."
      );
      setFeedbackType("success");
      setEmail("");
    } catch (error) {
      console.error("Erro ao registrar interesse:", error);
      setFeedback(
        error.response?.data?.message ||
          "Ocorreu um erro. Tente novamente mais tarde."
      );
      setFeedbackType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cleanTailwindClasses("flex flex-col items-center justify-center text-center py-24 sm:py-32 bg-brand-white rounded-xl shadow-custom-medium min-h-[70vh] px-6 sm:px-8 mx-auto my-8 max-w-4xl w-full")}
    >
      <Construction
        className={cleanTailwindClasses("text-brand-blue mb-8 animate-pulse")}
        size={60}
      />
      <h1 className={cleanTailwindClasses("text-3xl sm:text-4xl font-bold text-brand-blue mb-4")}>
        Em Construção!
      </h1>
      <p className={cleanTailwindClasses("text-lg text-text-secondary mb-12 max-w-lg leading-relaxed")}>
        {message ||
          `A seção de ${pageName} está sendo preparada pela nossa equipe para elevar sua experiência.`}
      </p>
      {expectedFeatures.length > 0 && (
        <div className={cleanTailwindClasses("mb-12 text-left w-full max-w-lg bg-brand-gray p-8 rounded-lg border border-brand-gray-medium")}>
          <h3 className={cleanTailwindClasses("text-xl font-semibold text-text-primary mb-4")}>
            O que esperar em breve:
          </h3>
          <ul className={cleanTailwindClasses("list-disc list-inside text-text-secondary space-y-2 text-base")}>
            {expectedFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Formulário de captura de leads */}
      <div className={cleanTailwindClasses("w-full max-w-lg mb-12 p-8 rounded-lg bg-brand-green/10 border border-brand-green/20")}>
        <h3 className={cleanTailwindClasses("text-xl font-semibold text-brand-blue mb-4")}>
          Seja o primeiro a saber!
        </h3>
        <p className={cleanTailwindClasses("text-sm text-brand-green-dark mb-4")}>
          Deixe seu e-mail e nós te avisaremos assim que esta seção for lançada.
        </p>
        {/* Feedback do formulário */}
        {feedback && (
          <div
            className={cleanTailwindClasses(`mt-3 flex items-start p-3 text-sm rounded-md ${
              feedbackType === "success"
                ? "bg-brand-green/10 border border-brand-green/20 text-brand-green"
                : "bg-danger-red/10 border border-danger-red/20 text-danger-red"
            }`)}
            role="alert"
          >
            {feedbackType === "success" ? (
              <CheckCircle size={18} className={cleanTailwindClasses("mr-2 flex-shrink-0")} />
            ) : (
              <AlertTriangle size={18} className={cleanTailwindClasses("mr-2 flex-shrink-0")} />
            )}
            <span className={cleanTailwindClasses("font-medium")}>{feedback}</span>
          </div>
        )}
        <form
          onSubmit={handleNotifySubmit}
          className={cleanTailwindClasses("flex flex-col sm:flex-row gap-3 mt-4")}
        >
          <div className={cleanTailwindClasses("relative flex-grow")}>
            <Mail
              className={cleanTailwindClasses("absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-dark")}
              size={20}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              required
              className={cleanTailwindClasses("w-full p-4 pl-10 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none text-text-primary placeholder:text-brand-gray-dark transition-all duration-200 ease-in-out")}
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className={cleanTailwindClasses("py-3 px-6")}
          >
            Avise-me
          </Button>
        </form>
      </div>
      <div className={cleanTailwindClasses("flex flex-col sm:flex-row gap-3 w-full max-w-md")}>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          leftIcon={ArrowLeft}
          fullWidth
          className={cleanTailwindClasses("py-3 px-6")}
        >
          Voltar
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          leftIcon={Home}
          fullWidth
          className={cleanTailwindClasses("py-3 px-6")}
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