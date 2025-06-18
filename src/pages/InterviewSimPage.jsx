import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bot, User, Send, Mic, Settings, CornerDownLeft } from 'lucide-react';
import Button from '../components/Common/Button';
import api from '../services/api'; // Importando nosso cliente de API

const InterviewSimPage = ({ initialDifficulty = 'geral' }) => {
  const [messages, setMessages] = useState([
    {
      id: 'init-bot-' + Date.now(),
      text: `Olá! Sou o Mentor IA da Elevate, pronto para sua simulação de entrevista em nível ${initialDifficulty}. Para começar, você pode escolher um dos tópicos sugeridos ou digitar sua primeira resposta/pergunta. Vamos praticar?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
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
      // Chamada real à nossa API backend
      const response = await api.post('/ai/interview-chat', {
        topic: currentTopic,
        history: currentMessages,
      });
      return response.data.response;
    } catch (error) {
      console.error("Erro ao chamar a API de IA:", error);
      return "Desculpe, estou com um problema para me conectar. Por favor, tente novamente em instantes.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (textToSend = inputValue) => {
    const currentInput = textToSend.trim();
    if (currentInput === '' || isSending || isTyping) return;

    setIsSending(true);
    const newUserMessage = { id: 'user-' + Date.now(), text: currentInput, sender: 'user', timestamp: new Date() };
    
    // Passamos o histórico ATUALIZADO para a função de resposta do bot
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    if (textToSend === inputValue) {
      setInputValue('');
    }

    const botResponseText = await getBotResponse(updatedMessages);
    
    const newBotMessage = { id: 'bot-' + Date.now(), text: botResponseText, sender: 'bot', timestamp: new Date() };
    setMessages(prev => [...prev, newBotMessage]);
    
    setIsSending(false);
  };

  const quickSuggestions = [
    { label: "Técnicas React", value: "Quais são as perguntas técnicas comuns sobre React?" },
    { label: "Comportamentais", value: "Gostaria de praticar perguntas comportamentais." },
    { label: "Falar de um Projeto", value: "Posso falar sobre um dos meus projetos?" }
  ];

  const handleOpenSettings = () => {
    const newTopicInput = prompt(
      `Configurações da Entrevista:\nQual tópico você gostaria de focar agora? (ex: react, python, comportamental, ${currentTopic})\nDeixe em branco para cancelar.`,
      currentTopic
    );

    if (newTopicInput && newTopicInput.trim() !== '' && newTopicInput.trim().toLowerCase() !== currentTopic) {
      const newTopic = newTopicInput.trim().toLowerCase();
      setCurrentTopic(newTopic);
      setMessages(prev => [
        ...prev,
        {
          id: 'system-' + Date.now(),
          text: `Ok, o foco da entrevista foi alterado para "${newTopic}".`,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,6.5rem)-3rem)] max-w-2xl xl:max-w-3xl mx-auto bg-[var(--brand-white)] rounded-xl shadow-2xl overflow-hidden border border-[var(--brand-gray-medium)] my-6">
      {/* Header */}
      <header className="p-4 border-b border-[var(--brand-gray-medium)] bg-[var(--brand-gray)] flex justify-between items-center flex-shrink-0">
        <h1 className="text-lg font-semibold text-[var(--brand-blue)] flex items-center">
          <Bot size={22} className="mr-2.5 flex-shrink-0" />
          Simulador de Entrevista IA
        </h1>
        <Button variant="ghost" size="sm" onClick={handleOpenSettings} className="p-2 text-[var(--text-secondary)] hover:text-[var(--brand-blue)]" aria-label="Configurações">
          <Settings size={20} />
        </Button>
      </header>

      {/* Mensagens */}
      <div className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto bg-[var(--brand-white)] scroll-smooth">
        {messages.map(msg => (
          <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] sm:max-w-[75%] py-2.5 px-4 rounded-2xl shadow-sm text-sm sm:text-[15px] leading-relaxed flex items-start space-x-2
              ${ msg.sender === 'user'
                  ? 'bg-[var(--brand-blue)] text-[var(--brand-white)] rounded-br-md'
                  : 'bg-[var(--brand-gray-medium)] text-[var(--text-primary)] rounded-bl-md'
              }`}
            >
              {msg.sender === 'bot' && <Bot size={18} className="flex-shrink-0 mt-0.5 text-[var(--brand-blue)]" />}
              <span className="whitespace-pre-wrap">{msg.text}</span>
              {msg.sender === 'user' && <User size={18} className="flex-shrink-0 mt-0.5 text-[var(--brand-white)]/70" />}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[75%] py-2.5 px-4 rounded-2xl bg-[var(--brand-gray-medium)] text-[var(--text-secondary)] rounded-bl-md inline-flex items-center text-sm shadow-sm">
              <span className="typing-indicator mr-2.5">
                <span></span><span></span><span></span>
              </span>
              Mentor IA está digitando...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer com Input */}
      <footer className="p-3 sm:p-4 border-t border-[var(--brand-gray-medium)] bg-[var(--brand-gray)]/70 backdrop-blur-sm flex-shrink-0">
        {!isTyping && !isSending && messages.length < 5 && (
            <div className="flex flex-wrap gap-2 mb-2.5">
            {quickSuggestions.map(suggestion => (
                <button
                    key={suggestion.label}
                    onClick={() => { handleSendMessage(suggestion.value); }}
                    className="text-xs py-1.5 px-3 border border-[var(--brand-gray-dark)] text-[var(--text-secondary)] rounded-full hover:bg-[var(--brand-gray-medium)] hover:text-[var(--brand-blue)] hover:border-[var(--brand-blue)]/50 transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--brand-blue)]"
                >
                    {suggestion.label} <CornerDownLeft size={12} className="inline ml-1 opacity-70" />
                </button>
            ))}
            </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2 sm:space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isTyping ? "Aguarde o mentor responder..." : "Sua resposta aqui..."}
            className="flex-grow px-4 py-2.5 border border-[var(--brand-gray-dark)] rounded-lg focus:ring-2 focus:ring-[var(--brand-blue)]/50 focus:border-[var(--brand-blue)] outline-none text-sm sm:text-base bg-[var(--brand-white)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition-shadow focus:shadow-md"
            disabled={isTyping || isSending}
          />
          <Button
            type="button"
            variant="ghost"
            size="md"
            className={`p-2.5 text-[var(--text-secondary)] hover:text-[var(--brand-blue)] ${isMicActive ? '!text-[var(--brand-blue)] bg-[var(--brand-blue)]/10' : ''}`}
            onClick={() => {
                setIsMicActive(!isMicActive);
                if (!isMicActive) alert("Funcionalidade de microfone em desenvolvimento!");
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
            className="p-2.5"
            aria-label="Enviar mensagem"
            disabled={isTyping || isSending || inputValue.trim() === ''}
          >
             <Send size={20} />
          </Button>
        </form>
      </footer>
    </div>
  );
};

InterviewSimPage.propTypes = {
  initialDifficulty: PropTypes.string,
};

export default InterviewSimPage;