import React from 'react';
import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const UnderConstruction = ({ pageName, expectedFeatures = [] }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 sm:py-20 bg-brand-white rounded-lg shadow-xl min-h-[60vh]">
      <Construction className="text-brand-blue mb-6" size={56} />
      <h1 className="text-3xl sm:text-4xl font-bold text-brand-blue mb-3">Em Construção!</h1>
      <p className="text-lg sm:text-xl text-text-secondary mb-6 max-w-md">
        A seção de <strong className="text-brand-green">{pageName}</strong> está sendo preparada com carinho para você.
      </p>
      {expectedFeatures.length > 0 && (
        <div className="mb-8 text-left max-w-md bg-brand-gray p-4 rounded-md">
            <h3 className="text-md font-semibold text-text-primary mb-2">O que esperar em breve:</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-1 text-sm">
                {expectedFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
      )}
      <p className="text-text-secondary mb-8">Volte em breve para conferir as novidades!</p>
      <Button variant="primary" size="lg" onClick={() => window.history.back()}>
        Voltar
      </Button>
    </div>
  );
};

export default UnderConstruction;