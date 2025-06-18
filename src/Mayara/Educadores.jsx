// src/pages/Educadores.jsx (ou onde preferir organizar suas "páginas"/componentes maiores)

import React from 'react';
// Importe seus componentes de Header e Footer aqui.
// Ajuste os caminhos conforme a estrutura do seu projeto.
import Header from '../components/Header'; // Exemplo: se Header está em src/components
import Footer from '../components/Footer'; // Exemplo: se Footer está em src/components

// Componente opcional para o card de educador, para reusabilidade.
// Crie este arquivo em src/components/EducatorCard.jsx
const EducatorCard = ({ name, specialty, bio, imageUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {imageUrl && (
        <img src={imageUrl} alt={`Foto de ${name}`} className="w-full h-48 object-cover rounded-md mb-4" />
      )}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-700 mb-2">Especialidade: {specialty}</p>
      <p className="text-gray-600 text-sm">{bio}</p>
    </div>
  );
};

const Educadores = () => {
  // Dados dos educadores. Você pode buscar isso de uma API real ou definir aqui.
  const educatorsData = [
    {
      id: 1,
      name: 'Professor João Silva',
      specialty: 'Matemática Aplicada',
      bio: 'Professor com 15 anos de experiência no ensino superior, focado em metodologias ativas e resolução de problemas complexos.',
      imageUrl: 'https://via.placeholder.com/400x300?text=Prof.+Joao' // Substitua por imagens reais
    },
    {
      id: 2,
      name: 'Professora Maria Souza',
      specialty: 'Linguagens e Literaturas',
      bio: 'PhD em Estudos Literários, apaixonada por incentivar a leitura, escrita criativa e o pensamento crítico.',
      imageUrl: 'https://via.placeholder.com/400x300?text=Prof.+Maria' // Substitua por imagens reais
    },
    {
      id: 3,
      name: 'Professor Carlos Lima',
      specialty: 'Ciência da Computação',
      bio: 'Desenvolvedor Full-stack e educador, com foco em desenvolvimento web moderno e inteligência artificial.',
      imageUrl: 'https://via.placeholder.com/400x300?text=Prof.+Carlos' // Substitua por imagens reais
    },
    {
        id: 4,
        name: 'Professora Ana Paula',
        specialty: 'História e Sociedade',
        bio: 'Historiadora e pesquisadora, especializada em história contemporânea e movimentos sociais.',
        imageUrl: 'https://via.placeholder.com/400x300?text=Prof.+Ana' // Substitua por imagens reais
      },
      {
        id: 5,
        name: 'Professor Fernando Santos',
        specialty: 'Química Orgânica',
        bio: 'Químico com paixão pelo ensino, focado em experimentos práticos e desmistificação da ciência.',
        imageUrl: 'https://via.placeholder.com/400x300?text=Prof.+Fernando' // Substitua por imagens reais
      },
      {
        id: 6,
        name: 'Professora Beatriz Costa',
        specialty: 'Artes Visuais',
        bio: 'Artista plástica e educadora, com foco em técnicas de desenho, pintura e expressão artística.',
        imageUrl: 'https://via.placeholder.com/400x300?text=Prof.+Beatriz' // Substitua por imagens reais
      },
  ];

  return (
    // Um fragmento <> é usado para encapsular múltiplos elementos irmãos.
    <>
      <Header /> {/* Seu componente de cabeçalho do Projeto Elevate */}

      <main className="container mx-auto p-6 mt-8 mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center leading-tight">
          Conheça Nossos Educadores
        </h1>
        <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Nossa equipe de educadores é formada por profissionais apaixonados e dedicados, prontos para guiar você em sua jornada de aprendizado.
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapeia os dados dos educadores para renderizar um EducatorCard para cada um */}
          {educatorsData.map((educator) => (
            <EducatorCard
              key={educator.id} // É crucial ter uma key única para cada item em listas no React
              name={educator.name}
              specialty={educator.specialty}
              bio={educator.bio}
              imageUrl={educator.imageUrl}
            />
          ))}
        </section>
      </main>

      <Footer /> {/* Seu componente de rodapé do Projeto Elevate */}
    </>
  );
};

export default Educadores;