import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Navigation/Header';
import Footer from '../components/Navigation/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-gray">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet /> {/* Conteúdo da página específica será renderizado aqui */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
