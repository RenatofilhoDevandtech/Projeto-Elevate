import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

const MainLayout = () => {
  return (
    // O container principal da aplicação, garantindo que o layout ocupe toda a altura da tela
    // e tenha uma cor de fundo consistente.
    <div className="flex flex-col min-h-screen bg-brand-gray font-sans"> {/* Usando bg-brand-gray e garantindo a fonte padrão */}
      {/* Componente de Cabeçalho, presente em todas as páginas que usam este layout */}
      <Header />
      {/* Área principal de conteúdo. 
          'flex-grow' faz com que ocupe todo o espaço disponível entre o Header e o Footer.
          'container mx-auto' centraliza o conteúdo horizontalmente.
          'px-6 sm:px-8 py-8' para espaçamento consistente em todos os dispositivos.
      */}
      <main className="flex-grow container mx-auto px-6 sm:px-8 py-8"> {/* Traduzido px-md, sm:px-lg, py-xl */}
        {/* <Outlet /> é onde o conteúdo da rota específica (definida no App.jsx) 
            será renderizado. Ex: HomePage, LearningPathsPage, etc.
        */}
        <Outlet />
      </main>
      {/* Componente de Rodapé, presente em todas as páginas que usam este layout */}
      <Footer />
    </div>
  );
};

export default MainLayout;