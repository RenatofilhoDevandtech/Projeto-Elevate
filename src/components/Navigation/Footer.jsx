import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-text-primary text-brand-gray-medium text-center p-8 mt-auto">
      <div className="container mx-auto">
        <p className="text-lg font-semibold mb-2">Elevate</p>
        <p className="mb-4 text-sm">&copy; {new Date().getFullYear()} Elevate. Todos os direitos reservados.</p>
        <p className="text-xs mb-4">Potencialize sua carreira, construa seu futuro.</p>
        <div className="flex justify-center space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-white transition-colors"><Github size={20} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-white transition-colors"><Linkedin size={20} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-white transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;