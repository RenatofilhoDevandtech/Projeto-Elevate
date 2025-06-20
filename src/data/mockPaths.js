// src/data/allPathsData.js (Frontend - Fallback/Mock Data)

// Este arquivo serve como um mock ou fallback para o frontend,
// caso a API backend não esteja disponível. Os dados REAIS virão do backend.

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
      longDescription: "A trilha de Desenvolvedor Front-End é o seu portal para o mundo da criação de interfaces web. Você aprenderá desde os fundamentos do HTML, CSS e JavaScript, até o desenvolvimento de aplicações complexas e dinâmicas com React. Prepare-se para construir sites visualmente atraentes, responsivos e com ótima experiência do usuário.",
      skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Git", "APIs REST", "Design Responsivo"],
      careerOpportunities: ["Desenvolvedor Front-End Jr.", "Engenheiro de UI", "Desenvolvedor Web"],
      modulesData: [
        {
          id: "fe_module_1",
          title: "Fundamentos da Web (HTML5)",
          module_order: 1,
          lessons: [
            { id: 101, title: "O que é HTML?", type: "video", duration: "16min", youtubeId: "epDCjksKMok", content_order: 1 },
            { id: 102, title: "Tags Semânticas e Acessibilidade", type: "video", duration: "33min", youtubeId: "b21PApgtP9U", content_order: 2 },
            { id: 103, title: "Elementos HTML Básicos e Atributos", type: "video", duration: "18min", youtubeId: "M2Q2x_V2J6Y", content_order: 3 },
          ],
        },
        {
          id: "fe_module_2",
          title: "Estilização com CSS3",
          module_order: 2,
          lessons: [
            { id: 201, title: "Seletores CSS e Box Model", type: "video", duration: "28min", youtubeId: "GPK8A-A2w5A", content_order: 1 },
            { id: 202, title: "Flexbox e Grid", type: "video", duration: "25min", youtubeId: "fYq5PXgS_Q8", content_order: 2 },
            { id: 203, title: "Design Responsivo com Media Queries", type: "video", duration: "22min", youtubeId: "lAChEBGkEKQ", content_order: 3 },
          ],
        },
        {
            id: 'fe_module_3',
            title: 'Módulo 3: JavaScript Fundamental',
            module_order: 3,
            lessons: [
                { id: 301, title: 'Variáveis e Tipos de Dados', type: 'video', duration: '10min', youtubeId: 'PfJ_Vw9Fm_Q', content_order: 1 },
                { id: 302, title: 'Operadores e Estruturas Condicionais', type: 'video', duration: '15min', youtubeId: 'E_x_Jb-Q3o8', content_order: 2 },
                { id: 303, title: 'Loops e Funções', type: 'video', duration: '18min', youtubeId: 'W31M5C49L_E', content_order: 3 },
            ]
        },
        {
            id: 'fe_module_4',
            title: 'Módulo 4: Introdução ao React',
            module_order: 4,
            lessons: [
                { id: 401, title: 'O que é React e por que usar?', type: 'video', duration: '8min', youtubeId: 'dpw9EHDh2bM', content_order: 1 },
                { id: 402, title: 'Componentes e JSX', type: 'video', duration: '12min', youtubeId: 'DqM2tWkyI2M', content_order: 2 },
                { id: 403, title: 'States e Props', type: 'video', duration: '15min', youtubeId: 'sV-Ua1jCjH4', content_order: 3 },
            ]
        },
      ],
    },
  },
  // 2. TRILHA BACK-END
  {
    id: "backend",
    title: "Desenvolvedor Back-End",
    description: "Construa a lógica de servidor, APIs e gerencie bancos de dados com Node.js e PostgreSQL.",
    icon: "⚙️",
    level: "Intermediário",
    category: "Desenvolvimento Web",
    details: {
      longDescription: "A trilha de Desenvolvedor Back-End é focada na construção da infraestrutura que sustenta aplicações web. Você aprenderá a criar APIs robustas, gerenciar bancos de dados e implementar lógica de servidor com tecnologias modernas como Node.js, Python e Java.",
      skills: ["Node.js", "Express", "Python/Django", "Java/Spring", "SQL", "NoSQL", "APIs RESTful", "Autenticação e Autorização"],
      careerOpportunities: ["Desenvolvedor Back-End Jr.", "Engenheiro de Software", "Desenvolvedor de APIs"],
      modulesData: [
        {
          id: "be_module_1",
          title: "Fundamentos de Back-End",
          module_order: 1,
          level: "Básico",
          lessons: [
            { id: 1001, title: "Introdução a Servidores e HTTP", type: "video", duration: "15min", youtubeId: "ZtD65tPz4Qo", content_order: 1 },
            { id: 1002, title: "Conceitos de APIs RESTful", type: "video", duration: "18min", youtubeId: "S_t0WjP-85I", content_order: 2 },
          ],
        },
        {
          id: "be_module_2",
          title: "Node.js Essencial",
          module_order: 2,
          level: "Básico",
          lessons: [
            { id: 1003, title: "Introdução ao Node.js", type: "video", duration: "20min", youtubeId: "L73Wf3nL7j0", content_order: 1 },
            { id: 1004, title: "Express.js e Criação de Rotas", type: "video", duration: "25min", youtubeId: "pM_g52u6Jp8", content_order: 2 },
          ],
        },
        {
            id: 'be_module_3',
            title: 'Módulo 3: Banco de Dados SQL (PostgreSQL)',
            module_order: 3,
            level: 'Intermediário',
            lessons: [
                { id: 1005, title: 'Introdução a SQL e PostgreSQL', type: 'video', duration: '20min', youtubeId: 'AD0t71K9p1c', content_order: 1 },
                { id: 1006, title: 'CRUD com SQL', type: 'video', duration: '22min', youtubeId: 'oNl5P9f9XhQ', content_order: 2 },
            ]
        },
        {
            id: 'be_module_4',
            title: 'Módulo 4: Autenticação e Segurança',
            module_order: 4,
            level: 'Intermediário',
            lessons: [
                { id: 1007, title: 'Autenticação JWT', type: 'video', duration: '25min', youtubeId: '2V6d1b_rQoM', content_order: 1 },
                { id: 1008, title: 'Segurança em APIs (CORS, Sanitização)', type: 'video', duration: '18min', youtubeId: 'sF2d4D9oP9o', content_order: 2 },
            ]
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
        longDescription: "A trilha de Desenvolvedor Full Stack te capacita a construir aplicações web de ponta a ponta. Você aprenderá a integrar o front-end e o back-end de forma fluida, a gerenciar bancos de dados e a implantar suas aplicações. É a trilha para quem busca uma compreensão holística do desenvolvimento web.",
        skills: ["HTML", "CSS", "JavaScript", "React/Vue", "Node.js/Python", "Databases", "Git", "Deployment", "APIs"],
        careerOpportunities: ["Desenvolvedor Full Stack Jr.", "Engenheiro de Software Full Stack"],
        modulesData: [
            {
                id: 'fs_module_1',
                title: 'Módulo 1: Conectando Front-End e Back-End',
                module_order: 1,
                level: 'Intermediário',
                lessons: [
                    { id: 2001, title: 'Entendendo Requisições HTTP e CORS', type: 'video', duration: '12min', youtubeId: 'sF2d4D9oP9o', content_order: 1 },
                    { id: 2002, title: 'Consumindo APIs REST no Front-End', type: 'video', duration: '15min', youtubeId: 'k1Fz911bI08', content_order: 2 },
                ]
            },
            {
                id: 'fs_module_2',
                title: 'Módulo 2: Autenticação Full Stack',
                module_order: 2,
                level: 'Intermediário',
                lessons: [
                    { id: 2003, title: 'Fluxo de Autenticação JWT no Full Stack', type: 'video', duration: '20min', youtubeId: 'e8M8uQdY85w', content_order: 1 },
                    { id: 2004, title: 'Proteção de Rotas e Armazenamento Seguro de Tokens', type: 'video', duration: '18min', youtubeId: 'r5cE_RkQJg8', content_order: 2 },
                ]
            },
            {
                id: 'fs_module_3',
                title: 'Módulo 3: Implantação e DevOps Básico',
                module_order: 3,
                level: 'Avançado',
                lessons: [
                    { id: 2005, title: 'Introdução ao Docker', type: 'video', duration: '25min', youtubeId: 'W31M5C49L_E', content_order: 1 },
                    { id: 2006, title: 'Deploy de Aplicações Web (Front-End e Back-End)', type: 'video', duration: '30min', youtubeId: 'pM_g52u6Jp8', content_order: 2 },
                ]
            },
        ]
    }
  },
  // 4. TRILHA QA (MVP - Conteúdo Base)
  {
    id: "qa",
    title: "Engenheiro de QA",
    description: "Garanta a qualidade de software através de estratégias de testes manuais, automatizados e ferramentas de mercado.",
    icon: "🧪",
    level: "Iniciante",
    category: "Qualidade e Testes",
    details: {
        longDescription: "A trilha de Engenheiro de QA (Quality Assurance) é essencial para garantir que os produtos de software funcionem perfeitamente. Você aprenderá sobre metodologias de teste, automação de testes, identificação e rastreamento de bugs, e como contribuir para a entrega de software de alta qualidade.",
        skills: ["Testes Manuais", "Testes Automatizados", "Selenium", "Cypress", "Jira", "Metodologias Ágeis", "TestLink"],
        careerOpportunities: ["QA Tester", "Analista de Testes", "Engenheiro de QA"],
        modulesData: [
            {
                id: "qa_basic_fund",
                title: "Fundamentos de Qualidade de Software",
                module_order: 1,
                level: "Básico",
                lessons: [
                    { id: 10001, title: "Introdução à Qualidade de Software", type: "video", duration: "15min", youtubeId: "p8YgX6F90m8", content_order: 1 },
                    { id: 10002, title: "Tipos de Testes e Níveis de Teste", type: "video", duration: "20min", youtubeId: "V5dGZ_lR8n0", content_order: 2 },
                ],
            },
        ],
    },
  },
  // 5. TRILHA DATA SCIENCE (MVP - Conteúdo Base)
  {
    id: "datascience",
    title: "Cientista de Dados",
    description: "Analise grandes volumes de dados, crie modelos de Machine Learning e extraia insights valiosos para negócios.",
    icon: "📊",
    level: "Avançado",
    category: "Dados e IA",
    details: {
        longDescription: "A trilha de Cientista de Dados te capacita a trabalhar com grandes volumes de dados, transformando-os em insights acionáveis. Você aprenderá sobre estatística, programação (principalmente Python), Machine Learning e visualização de dados para tomar decisões baseadas em evidências.",
        skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning", "Estatística", "SQL", "Visualização de Dados (Matplotlib, Seaborn)"],
        careerOpportunities: ["Cientista de Dados Jr.", "Analista de Dados", "Engenheiro de Machine Learning"],
        modulesData: [
            {
                id: "ds_basic_python",
                title: "Python para Ciência de Dados",
                module_order: 1,
                level: "Básico",
                lessons: [
                    { id: 10006, title: "Introdução ao Python e Jupyter Notebooks", type: "video", duration: "25min", youtubeId: "W2C6bS7Wc0M", content_order: 1 },
                    { id: 10007, title: "Pandas e Manipulação de Dados", type: "video", duration: "30min", youtubeId: "hQ1-l5W1X5wI", content_order: 2 },
                ],
            },
        ],
    },
  },
  // 6. TRILHA UX/UI (MVP - Conteúdo Base)
  {
    id: "uxui",
    title: "Designer UX/UI",
    description: "Projete experiências intuitivas e acessíveis para produtos digitais.",
    icon: "🎨",
    level: "Intermediário",
    category: "Design",
    details: {
        longDescription: "A trilha de Designer UX/UI é para aqueles que amam criar produtos digitais que não são apenas bonitos, mas também fáceis de usar e prazerosos. Você aprenderá sobre pesquisa de usuário, prototipagem, design de interface e testes de usabilidade, focando em soluções centradas no ser humano.",
        skills: ["Pesquisa de Usuário", "Wireframing", "Prototipagem", "Figma", "Sketch", "Design System", "Testes de Usabilidade", "Acessibilidade"],
        careerOpportunities: ["Designer UX Jr.", "Designer UI Jr.", "Product Designer"],
        modulesData: [
            {
                id: "ux_basic_fund",
                title: "Fundamentos de UX",
                module_order: 1,
                level: "Básico",
                lessons: [
                    { id: 10011, title: "Design Centrado no Usuário", type: "video", duration: "18min", youtubeId: "lVw3B1358-k", content_order: 1 },
                    { id: 10012, title: "Pesquisa de Usuário e Personas", type: "video", duration: "22min", youtubeId: "iC-l5W1X5wI", content_order: 2 },
                ],
            },
        ],
    },
  },
];
