import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Button from '../components/Common/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 min-h-[60vh]">
      <AlertTriangle className="text-warning mb-6" size={64} />
      <h1 className="text-5xl font-bold text-text-primary mb-3">404</h1>
      <h2 className="text-2xl font-semibold text-text-secondary mb-6">Página Não Encontrada</h2>
      <p className="text-text-secondary mb-8 max-w-md">
        Oops! Parece que a página que você está procurando não existe ou foi movida.
      </p>
      <Button variant="primary" size="lg" onClick={() => document.getElementById('home-link-404').click()}>
        <Link to="/" id="home-link-404">
            Voltar para a Página Inicial
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;