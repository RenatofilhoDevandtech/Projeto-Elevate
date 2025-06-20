import React from 'react';
import Footer from '../components/Navigation/Footer';

const EducatorCard = ({ name, specialty, bio, imageUrl, expertise, philosophy, curiosity }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
    {imageUrl && (
      <img
  src={imageUrl}
  alt={`Foto de ${name}`}
  className="w-40 h-40 object-cover rounded-full mb-4 mx-auto"
/>
    )}
    <h3 className="text-2xl font-semibold text-gray-800 mb-1">{name}</h3>
    <p className="text-indigo-700 font-medium mb-2">{specialty}</p>
    <p className="text-gray-700 mb-3">{bio}</p>
    <div className="mb-3">
      <span className="font-semibold text-gray-800">Áreas de Expertise:</span>
      <div className="flex flex-wrap gap-2 mt-1">
        {expertise.map((area, idx) => (
          <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-semibold">{area}</span>
        ))}
      </div>
    </div>
    <div className="mb-3">
      <span className="font-semibold text-gray-800">Filosofia de Ensino:</span>
      <div className="bg-gray-50 border-l-4 border-indigo-300 p-2 mt-1 text-gray-700 text-sm rounded">{philosophy}</div>
    </div>
    <div className="mt-auto">
      <span className="font-semibold text-gray-800">Curiosidade:</span>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 mt-1 text-gray-700 text-sm rounded">{curiosity}</div>
    </div>
  </div>
);

const educatorsData = [
  {
    id: 1,
    name: 'Sofia Lima Silva',
    specialty: 'Especialista em Front-end e UX',
    bio: 'Com mais de 10 anos transformando ideias em experiências digitais, Sofia é apaixonada por acessibilidade, design centrado no usuário e inovação.',
    imageUrl: '/src/Mayara/img-educadores/SofiaLima.svg',
    expertise: ['HTML', 'CSS', 'React', 'UX', 'Acessibilidade'],
    philosophy: 'Acredita que ensinar é inspirar e que todo código pode mudar o mundo de alguém.',
    curiosity: 'Já viajou para mais de 15 países e adora colecionar postais de cidades visitadas.'
  },
  {
    id: 2,
    name: 'Ricardo Alves Oliveira',
    specialty: 'Desenvolvedor Full-Stack e Arquiteto de Software',
    bio: 'Ricardo constrói sistemas escaláveis, ensina boas práticas e incentiva o pensamento crítico para resolver problemas reais.',
    imageUrl: '/src/Mayara/img-educadores/RicardoAlves.svg',
    expertise: ['Node.js', 'React', 'SQL', 'DevOps', 'API'],
    philosophy: 'Ensinar é compartilhar experiências e construir juntos soluções inovadoras.',
    curiosity: 'Foi atleta de natação e acredita que disciplina é essencial para aprender programação.'
  },
  {
    id: 3,
    name: 'Beatriz Pereira Costa',
    specialty: 'Especialista em Back-end, Performance e Segurança',
    bio: 'Fascinada pela lógica e pela infraestrutura dos sistemas, Beatriz é referência em práticas seguras e eficientes para aplicações web.',
    imageUrl: '/src/Mayara/img-educadores/BeatrizPereira.svg',
    expertise: ['Java', 'API', 'SQL', 'Segurança', 'Testes'],
    philosophy: 'A base do ensino está no código limpo e na busca constante por conhecimento.',
    curiosity: 'Gosta de resolver desafios lógicos e é fã de jogos de tabuleiro.'
  }
];

const Educadores = () => (
  <div className="min-h-screen flex flex-col">
    <main className="container mx-auto p-6 mt-8 mb-12 flex-1">
     <h1 className="text-5xl font-extrabold text-[#1877f2] mb-2 text-center leading-tight">
  Conheça Nossos Educadores
</h1>
<p className="text-2xl text-gray-900 mb-10 text-center max-w-3xl mx-auto">
  Profissionais experientes prontos para guiar sua jornada de programação
</p>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educatorsData.map((educator) => (
          <EducatorCard key={educator.id} {...educator} />
        ))}
      </section>
      <div className="bg-white rounded-lg shadow-md mt-16 p-8 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Pronto para começar sua jornada?</h2>
        <p className="text-gray-700 mb-4">
          Conheça nossas trilhas de conhecimento e avance, aprendendo com os melhores profissionais do mercado.
        </p>
        <a
          href="/trilhas"
          className="inline-block bg-[#5a6fdc] hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Explorar Trilhas
        </a>
      </div>
    </main>
    <Footer />
  </div>
);

export default Educadores;