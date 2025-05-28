// Ícones podem ser emojis ou componentes Lucide-React importados
// import { Code, Server, Users, Palette, Cloud, ShieldCheck } from 'lucide-react';

export const allPathsData = [
  {
    id: 'frontend',
    title: 'Desenvolvedor Front-End',
    description: 'Crie interfaces web interativas e responsivas com HTML, CSS, JavaScript e frameworks modernos como React ou Vue.',
    icon: '💻', // Ou <Code />
    modules: 12,
    level: 'Iniciante',
    category: 'Desenvolvimento Web',
    details: {
      longDescription: "A trilha de Desenvolvedor Front-End é o seu portal para o mundo da criação de interfaces web. Você aprenderá desde os fundamentos do HTML, CSS e JavaScript, até o desenvolvimento de aplicações complexas e dinâmicas com React. Prepare-se para construir sites visualmente atraentes, responsivos e com ótima experiência do usuário.",
      skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Git", "APIs REST", "Design Responsivo"],
      careerOpportunities: ["Desenvolvedor Front-End Jr.", "Engenheiro de UI", "Desenvolvedor Web"],
      modulesData: [
        { id: 'fe_basic_html', title: 'Módulo 1: HTML Essencial', level: 'Básico', completed: false,
          lessons: [
            {id: 1, title: 'Introdução ao HTML e Estrutura de Páginas', type: 'video', duration: '12min', youtubeId: 'epDCjksKMok', completed: false}, // Exemplo de ID do YouTube
            {id: 2, title: 'Tags Semânticas e Boas Práticas', type: 'video', duration: '15min', youtubeId: 'b21PApgtP9U', completed: false},
            {id: 3, title: 'Formulários e Entradas de Usuário', type: 'article', duration: '20min', link: '#', completed: false},
          ]},
        { id: 'fe_basic_css', title: 'Módulo 2: CSS para Estilização', level: 'Básico', completed: false,
          lessons: [
            {id: 4, title: 'Seletores CSS e Box Model', type: 'video', duration: '18min', youtubeId: 'GPK8A-A2w5A', completed: false},
            {id: 5, title: 'Flexbox e Grid Layout', type: 'video', duration: '25min', youtubeId: 'fYq5PXgS_Q8', completed: false},
            {id: 6, title: 'Design Responsivo com Media Queries', type: 'video', duration: '22min', youtubeId: 'lAChEBGkEKQ', completed: false},
          ]},
        { id: 'fe_inter_js', title: 'Módulo 3: JavaScript Fundamental', level: 'Intermediário', completed: false, lessons: [ /* ... mais aulas ... */ ]},
        { id: 'fe_inter_react', title: 'Módulo 4: Introdução ao React', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'fe_adv_state', title: 'Módulo 5: Gerenciamento de Estado Avançado', level: 'Avançado', completed: false, lessons: [ /* ... */ ]},
      ]
    }
  },
  {
    id: 'backend',
    title: 'Desenvolvedor Back-End',
    description: 'Construa a lógica de servidor, APIs robustas e gerencie bancos de dados com tecnologias como Node.js, Python/Flask ou Java.',
    icon: '⚙️', // Ou <Server />
    modules: 15,
    level: 'Intermediário',
    category: 'Desenvolvimento Web',
    details: { /* ... preencher similarmente ... */ }
  },
  {
    id: 'fullstack',
    title: 'Desenvolvedor Full Stack',
    description: 'Domine o desenvolvimento front-end e back-end para criar aplicações web completas e escaláveis.',
    icon: '🚀',
    modules: 20,
    level: 'Avançado',
    category: 'Desenvolvimento Web',
    details: { /* ... preencher similarmente ... */ }
  },
  {
    id: 'devops',
    title: 'Engenheiro DevOps',
    description: 'Automatize e otimize processos de desenvolvimento, integração contínua, entrega contínua e infraestrutura como código.',
    icon: '🛠️', // Ou <Cloud />
    modules: 18,
    level: 'Avançado',
    category: 'Infraestrutura e Operações',
    details: { /* ... preencher similarmente ... */ }
  },
  {
    id: 'qa',
    title: 'Engenheiro de QA',
    description: 'Garanta a qualidade de software através de estratégias de testes manuais, automatizados e ferramentas de mercado.',
    icon: '🧪', // Ou <ShieldCheck />
    modules: 10,
    level: 'Iniciante',
    category: 'Qualidade e Testes',
    details: { /* ... preencher similarmente ... */ }
  },
  {
    id: 'datascience',
    title: 'Cientista de Dados',
    description: 'Analise grandes volumes de dados, crie modelos de Machine Learning e extraia insights valiosos para negócios.',
    icon: '📊',
    modules: 22,
    level: 'Avançado',
    category: 'Dados e IA',
    details: { /* ... preencher similarmente ... */ }
  },
  {
    id: 'uxui',
    title: 'Designer UX/UI',
    description: 'Projete experiências de usuário intuitivas, acessíveis e interfaces visualmente atraentes para produtos digitais.',
    icon: '🎨', // Ou <Palette />
    modules: 14,
    level: 'Intermediário',
    category: 'Design',
    details: { /* ... preencher similarmente ... */ }
  },
];