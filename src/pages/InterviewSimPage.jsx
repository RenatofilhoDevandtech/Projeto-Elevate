import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Mic, Settings } from 'lucide-react';
import Button from '../components/Common/Button';

const InterviewSimPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Sou seu assistente de simulação de entrevista. Pronto para começar? Escolha uma área ou tipo de pergunta abaixo.', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newUserMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular resposta da IA
    // TODO: Integrar com a API da OpenAI (GPT)
    setTimeout(() => {
      // Exemplo de resposta da IA baseada na entrada do usuário
      let botResponseText = "Entendi. Poderia me falar mais sobre sua experiência com [tecnologia mencionada]?";
      if (inputValue.toLowerCase().includes("react")) {
        botResponseText = "Ótimo! React é uma ótima escolha. Qual foi o projeto mais desafiador que você desenvolveu com React e por quê?";
      } else if (inputValue.toLowerCase().includes("python")) {
        botResponseText = "Python é muito versátil. Para qual tipo de aplicação você mais utilizou Python? (ex: Web, Data Science, Automação)";
      }

      const newBotMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto bg-brand-white rounded-xl shadow-xl overflow-hidden">
      <header className="p-4 border-b bg-brand-gray flex justify-between items-center">
        <h1 className="text-xl font-semibold text-brand-blue flex items-center">
          <Bot size={24} className="mr-2" /> Simulador de Entrevista IA
        </h1>
        <Button variant="ghost" size="sm"><Settings size={18}/></Button>
      </header>

      <div className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[70%] p-3 rounded-xl shadow-subtle ${
                msg.sender === 'user'
                  ? 'bg-brand-blue text-white rounded-br-none'
                  : 'bg-brand-gray text-text-primary rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-lg bg-brand-gray text-text-primary rounded-bl-none inline-flex items-center">
              <span className="typing-indicator">
                <span></span><span></span><span></span>
              </span>
              <style jsx>{`
                .typing-indicator span {
                  height: 8px;
                  width: 8px;
                  background-color: #b0b0b0;
                  border-radius: 50%;
                  display: inline-block;
                  margin: 0 1px;
                  animation: kf_typing_indicator 1s infinite ease-in-out;
                }
                .typing-indicator span:nth-of-type(1) { animation-delay: -0.18s; }
                .typing-indicator span:nth-of-type(2) { animation-delay: -0.09s; }
                @keyframes kf_typing_indicator {
                  0%, 80%, 100% { box-shadow: 0 0 #b0b0b000; transform: translateY(0); }
                  40% { box-shadow: 0 -4px #b0b0b0; transform: translateY(-4px); }
                }
              `}</style>
               Digitando...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 border-t bg-brand-gray">
        {/* Opções rápidas (Exemplo) */}
        <div className="flex space-x-2 mb-2 overflow-x-auto pb-2">
            {["Perguntas técnicas sobre React", "Desafios comportamentais", "Fale sobre um projeto"].map(suggestion => (
                <Button key={suggestion} variant="outline" size="sm" onClick={() => setInputValue(suggestion)}>
                    {suggestion}
                </Button>
            ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua resposta aqui..."
            className="flex-grow p-3 border border-brand-gray-medium rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
          />
          <Button variant="ghost" size="md" className="p-3"><Mic size={20}/></Button>
          <Button variant="primary" size="md" onClick={handleSendMessage} className="p-3">
            <Send size={20} />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default InterviewSimPage;