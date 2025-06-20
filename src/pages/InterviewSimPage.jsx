// src/pages/InterviewSimPage.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Bot,
  User,
  Send,
  Mic,
  Settings,
  CornerDownLeft,
  Loader2,
  AlertTriangle,
  MessageSquareQuote,
  LogIn, // Necessário para o ícone do botão
} from "lucide-react";
import Button from "../components/Common/Button";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
// Link não é mais necessário para o botão de login, pois usaremos onClick
import { Link } from "react-router-dom"; // Link ainda é necessário para outros propósitos, se houver.

// Função auxiliar para limpar classes Tailwind (para evitar erros de parsing)
const cleanTailwindClasses = (classString) => {
  return classString.replace(/\s+/g, ' ').trim();
};

const InterviewSimPage = ({ initialDifficulty = "geral" }) => {
  // openLoginModal agora será usado
  const { isAuthenticated, loading: authLoading, openLoginModal } = useContext(AuthContext); 

  const [messages, setMessages] = useState([
    {
      id: "init-bot-" + Date.now(),
      text: `Olá! Sou o Mentor IA da Elevate, pronto para sua simulação de entrevista em nível ${initialDifficulty}. Para começar, você pode escolher um dos tópicos sugeridos ou digitar sua primeira resposta/pergunta. Vamos praticar?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(initialDifficulty);
  const [isMicActive, setIsMicActive] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  const getBotResponse = async (currentMessages) => {
    setIsTyping(true);
    try {
      const historyForAPI = currentMessages.map((msg) => ({
        role: msg.sender === "bot" ? "assistant" : "user",
        content: msg.text,
      }));

      const response = await api.post("/ai/interview-chat", {
        topic: currentTopic,
        history: historyForAPI,
      });
      return response.data.response;
    } catch (error) {
      console.error("Erro ao chamar a API de IA:", error);
      return "Desculpe, estou com um problema para me conectar com o Mentor IA. Por favor, tente novamente em instantes ou verifique sua conexão.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (textToSend = inputValue) => {
    const currentInput = textToSend.trim();
    if (currentInput === "" || isSending || isTyping) return;

    setIsSending(true);
    const newUserMessage = {
      id: "user-" + Date.now(),
      text: currentInput,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    if (textToSend === inputValue) {
      setInputValue("");
    }

    setTimeout(async () => {
      const botResponseText = await getBotResponse(updatedMessages);
      const newBotMessage = {
        id: "bot-" + Date.now(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsSending(false);
    }, 500);
  };

  const quickSuggestions = [
    {
      label: "Perguntas Técnicas React",
      value: "Quais são as perguntas técnicas comuns sobre React?",
    },
    {
      label: "Perguntas Comportamentais",
      value: "Gostaria de praticar perguntas comportamentais.",
    },
    {
      label: "Feedback da Minha Última Resposta",
      value: "Poderia me dar um feedback sobre a minha última resposta?",
    },
    {
      label: "Sobre um Projeto Específico",
      value:
        "Posso falar sobre um dos meus projetos? Qual é a melhor forma de apresentá-lo?",
    },
  ];

  const handleOpenSettings = () => {
    const newTopicInput = prompt(
      `Configurações da Entrevista:\nQual tópico você gostaria de focar agora? (ex: react, python, java, comportamental)\nTópico atual: ${currentTopic}\nDeixe em branco para cancelar.`,
      currentTopic
    );

    if (
      newTopicInput &&
      newTopicInput.trim() !== "" &&
      newTopicInput.trim().toLowerCase() !== currentTopic
    ) {
      const newTopic = newTopicInput.trim().toLowerCase();
      setCurrentTopic(newTopic);
      setMessages((prev) => [
        ...prev,
        {
          id: "system-" + Date.now(),
          text: `Ok, o foco da entrevista foi alterado para "${newTopic}".`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  };

  if (authLoading) {
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <Loader2 className={cleanTailwindClasses("animate-spin text-brand-blue mb-4")} size={40} />
        <p className={cleanTailwindClasses("ml-4 text-lg text-text-secondary font-semibold")}>
          Verificando autenticação...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={cleanTailwindClasses("flex flex-col justify-center items-center py-32 bg-brand-white rounded-xl shadow-custom-light min-h-[50vh]")}>
        <AlertTriangle className={cleanTailwindClasses("text-danger-red mb-4")} size={40} />
        <h2 className={cleanTailwindClasses("text-2xl font-semibold text-text-primary mb-4")}>
          Acesso Restrito
        </h2>
        <p className={cleanTailwindClasses("text-text-secondary mb-6")}>
          Por favor, faça login para acessar o Simulador de Entrevista IA.
        </p>
        {/* CORREÇÃO AQUI: Chamar openLoginModal diretamente */}
        <Button variant="primary" size="lg" leftIcon={LogIn} onClick={() => openLoginModal()}>
          Fazer Login ou Criar Conta
        </Button>
      </div>
    );
  }

  return (
    <div className={cleanTailwindClasses("flex flex-col h-[calc(100vh-var(--header-height)-var(--footer-height))] md:h-[calc(100vh-var(--header-height)-var(--footer-height)-var(--main-layout-padding-y))] max-w-2xl xl:max-w-3xl mx-auto bg-brand-white rounded-xl shadow-custom-medium overflow-hidden border border-brand-gray-medium my-8")}>
      <header className={cleanTailwindClasses("p-6 border-b border-brand-gray-medium bg-brand-gray flex justify-between items-center flex-shrink-0")}>
        <h1 className={cleanTailwindClasses("text-lg font-semibold text-brand-blue flex items-center")}>
          <Bot size={22} className={cleanTailwindClasses("mr-2 flex-shrink-0")} />
          Simulador de Entrevista IA
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenSettings}
          className={cleanTailwindClasses("p-2 text-text-secondary hover:text-brand-blue")}
          aria-label="Configurações"
        >
          <Settings size={20} />
        </Button>
      </header>

      <div className={cleanTailwindClasses("flex-grow p-6 sm:p-8 space-y-4 overflow-y-auto bg-brand-white scroll-smooth custom-scrollbar")}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cleanTailwindClasses(`flex w-full ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`)}
          >
            <div
              className={cleanTailwindClasses(`max-w-[80%] sm:max-w-[75%] py-2 px-4 rounded-xl shadow-sm text-sm sm:text-base leading-relaxed flex items-start gap-2 ${
                msg.sender === "user"
                  ? "bg-brand-blue text-brand-white rounded-br-md"
                  : "bg-brand-gray-medium text-text-primary rounded-bl-md"
              }`)}
            >
              {msg.sender === "bot" && (
                <Bot
                  size={18}
                  className={cleanTailwindClasses("flex-shrink-0 mt-px text-brand-blue")}
                  aria-hidden="true"
                />
              )}
              <span className={cleanTailwindClasses("whitespace-pre-wrap")}>
                {msg.text}
              </span>
              {msg.sender === "user" && (
                <User
                  size={18}
                  className={cleanTailwindClasses("flex-shrink-0 mt-px text-brand-white/70")}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={cleanTailwindClasses("flex justify-start")}>
            <div
              className={cleanTailwindClasses("max-w-[75%] py-2 px-4 rounded-xl bg-brand-gray-medium text-text-secondary rounded-bl-md inline-flex items-center text-sm shadow-sm")}
            >
              <span className={cleanTailwindClasses("typing-indicator mr-2")}>
                <span></span>
                <span></span>
                <span></span>
              </span>
              Mentor IA está digitando...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <footer className={cleanTailwindClasses("p-6 sm:p-8 border-t border-brand-gray-medium bg-brand-gray/70 backdrop-blur-sm flex-shrink-0")}>
        {!isTyping && !isSending && messages.length < 5 && (
          <div className={cleanTailwindClasses("flex flex-wrap gap-2 mb-2")}>
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion.label}
                onClick={() => {
                  handleSendMessage(suggestion.value);
                }}
                className={cleanTailwindClasses("text-xs py-1.5 px-3 border border-brand-gray-dark text-text-secondary rounded-full hover:bg-brand-gray-medium hover:text-brand-blue hover:border-brand-blue/50 transition-colors focus:outline-none focus:ring-1 focus:ring-brand-blue whitespace-nowrap")}
              >
                {suggestion.label}{" "}
                <CornerDownLeft
                  size={12}
                  className={cleanTailwindClasses("inline ml-0.5 opacity-70")}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className={cleanTailwindClasses("flex items-center space-x-2 sm:space-x-4")}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              isTyping
                ? "Aguarde o mentor responder..."
                : "Sua resposta aqui..."
            }
            className={cleanTailwindClasses("flex-grow px-4 py-2.5 border border-brand-gray-dark rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none text-sm sm:text-base bg-brand-white text-text-primary placeholder:text-text-secondary transition-all duration-200 ease-in-out")}
            disabled={isTyping || isSending}
            aria-label="Digite sua resposta"
          />
          <Button
            type="button"
            variant="ghost"
            size="md"
            className={cleanTailwindClasses(`p-2 text-text-secondary hover:text-brand-blue ${
              isMicActive ? "!text-brand-blue bg-brand-blue/10" : ""
            }`)}
            onClick={() => {
              setIsMicActive(!isMicActive);
              if (!isMicActive)
                alert("Funcionalidade de microfone em desenvolvimento!");
            }}
            aria-label="Usar microfone para ditar resposta"
            disabled={isTyping || isSending}
          >
            <Mic size={20} />
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className={cleanTailwindClasses("p-2")}
            aria-label="Enviar mensagem"
            disabled={isTyping || isSending || inputValue.trim() === ""}
          >
            <Send size={20} />
          </Button>
        </form>
      </footer>

      {/* Definindo o CSS para o typing-indicator e custom-scrollbar */}
      <style jsx>{`
        /* Animação para os pontos do typing indicator */
        @keyframes pulse-dot {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .typing-indicator span {
          display: inline-block;
          width: 7px;
          height: 7px;
          background-color: var(--text-secondary);
          border-radius: 50%;
          margin: 0 1.5px;
          animation: pulse-dot 1s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        /* Estilização da Scrollbar Customizada */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--brand-gray-medium);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--brand-gray-dark);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};

InterviewSimPage.propTypes = {
  initialDifficulty: PropTypes.string,
};

export default InterviewSimPage;