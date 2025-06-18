export const allPathsData = [
  // 1. TRILHA FRONT-END
  {
    id: "frontend",
    title: "Desenvolvedor Front-End",
    description:
      "Crie interfaces web interativas e responsivas com HTML, CSS, JavaScript e o poderoso framework React.",
    icon: "💻",
    level: "Iniciante",
    category: "Desenvolvimento Web",
    details: {
      modulesData: [
        {
          id: "fe_module_1",
          title: "Fundamentos da Web (HTML5)",
          lessons: [
            {
              id: 101,
              title: "O que é HTML?",
              type: "video",
              duration: "16min",
              youtubeId: "epDCjksKMok",
            },
            {
              id: 102,
              title: "Tags Semânticas e Acessibilidade",
              type: "video",
              duration: "33min",
              youtubeId: "b21PApgtP9U",
            },
          ],
        },
        {
          id: "fe_module_2",
          title: "Estilização com CSS3",
          lessons: [
            {
              id: 201,
              title: "Seletores e Box Model",
              type: "video",
              duration: "28min",
              youtubeId: "GPK8A-A2w5A",
            },
            {
              id: 202,
              title: "Flexbox e Grid",
              type: "video",
              duration: "25min",
              youtubeId: "fYq5PXgS_Q8",
            },
          ],
        },
      ],
    },
  },
  // 2. TRILHA BACK-END
  {
    id: "backend",
    title: "Desenvolvedor Back-End",
    description:
      "Construa a lógica de servidor, APIs e gerencie bancos de dados com Node.js e PostgreSQL.",
    icon: "⚙️",
    level: "Intermediário",
    category: "Desenvolvimento Web",
    details: {
      longDescription:
        "A trilha de Desenvolvedor Back-End é focada na construção da infraestrutura que sustenta aplicações web. Você aprenderá a criar APIs robustas, gerenciar bancos de dados e implementar lógica de servidor com tecnologias modernas como Node.js, Python e Java.",
      skills: [
        "Node.js",
        "Express",
        "Python/Django",
        "Java/Spring",
        "SQL",
        "NoSQL",
        "APIs RESTful",
        "Autenticação e Autorização",
      ],
      careerOpportunities: [
        "Desenvolvedor Back-End Jr.",
        "Engenheiro de Software",
        "Desenvolvedor de APIs",
      ],
      modulesData: [
        {
          id: "be_basic_intro",
          title: "Fundamentos de Back-End",
          level: "Básico",
          completed: false,
          lessons: [
            {
              id: 1,
              title: "Introdução a Servidores",
              type: "video",
              duration: "15min",
              youtubeId: "example1",
              completed: false,
            },
            {
              id: 2,
              title: "Protocolos HTTP",
              type: "video",
              duration: "18min",
              youtubeId: "example2",
              completed: false,
            },
          ],
        },
        {
          id: "be_basic_node",
          title: "Node.js Essencial",
          level: "Básico",
          completed: false,
          lessons: [
            {
              id: 4,
              title: "Introdução ao Node.js",
              type: "video",
              duration: "20min",
              youtubeId: "example3",
              completed: false,
            },
            {
              id: 5,
              title: "Express.js e Criação de Rotas",
              type: "video",
              duration: "25min",
              youtubeId: "example4",
              completed: false,
            },
          ],
        },
      ],
    },
  },
  // 3. TRILHA FULL STACK
  {
    id: "fullstack",
    title: "Desenvolvedor Full Stack",
    description: "Domine front-end e back-end para criar aplicações completas.",
    icon: "🚀",
    level: "Avançado",
    category: "Desenvolvimento Web",
    details: {
      modulesData: [
        {
          id: "fs_basic_front",
          title: "Fundamentos de Front-End",
          level: "Básico",
          completed: false,
          lessons: [
            /* ... */
          ],
        },
        {
          id: "fs_basic_back",
          title: "Fundamentos de Back-End",
          level: "Básico",
          completed: false,
          lessons: [
            /* ... */
          ],
        },
      ],
    },
  },
  // 4. TRILHA QA
  {
    id: "qa",
    title: "Engenheiro de QA",
    description:
      "Garanta a qualidade de software através de estratégias de testes manuais, automatizados e ferramentas de mercado.",
    icon: "🧪",
    level: "Iniciante",
    category: "Qualidade e Testes",
    details: {
      modulesData: [
        {
          id: "qa_basic_fund",
          title: "Fundamentos de Qualidade de Software",
          level: "Básico",
          completed: false,
          lessons: [
            {
              id: 1,
              title: "Introdução à Qualidade de Software",
              type: "video",
              duration: "15min",
              youtubeId: "example11",
              completed: false,
            },
            {
              id: 2,
              title: "Tipos de Testes e Níveis de Teste",
              type: "video",
              duration: "20min",
              youtubeId: "example12",
              completed: false,
            },
          ],
        },
      ],
    },
  },
  // 5. TRILHA DATA SCIENCE
  {
    id: "datascience",
    title: "Cientista de Dados",
    description:
      "Analise grandes volumes de dados, crie modelos de Machine Learning e extraia insights valiosos para negócios.",
    icon: "📊",
    level: "Avançado",
    category: "Dados e IA",
    details: {
      modulesData: [
        {
          id: "ds_basic_python",
          title: "Python para Ciência de Dados",
          level: "Básico",
          completed: false,
          lessons: [
            {
              id: 1,
              title: "Introdução ao Python e Jupyter Notebooks",
              type: "video",
              duration: "25min",
              youtubeId: "example16",
              completed: false,
            },
            {
              id: 2,
              title: "Pandas e Manipulação de Dados",
              type: "video",
              duration: "30min",
              youtubeId: "example17",
              completed: false,
            },
          ],
        },
      ],
    },
  },
  // 6. TRILHA UX/UI
  {
    id: "uxui",
    title: "Designer UX/UI",
    description:
      "Projete experiências intuitivas e acessíveis para produtos digitais.",
    icon: "🎨",
    level: "Intermediário",
    category: "Design",
    details: {
      modulesData: [
        {
          id: "ux_basic_fund",
          title: "Fundamentos de UX",
          level: "Básico",
          completed: false,
          lessons: [
            {
              id: 1,
              title: "Design Centrado no Usuário",
              type: "video",
              duration: "18min",
              youtubeId: "example21",
              completed: false,
            },
            {
              id: 2,
              title: "Pesquisa de Usuário",
              type: "video",
              duration: "22min",
              youtubeId: "example22",
              completed: false,
            },
          ],
        },
      ],
    },
  },
];
