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
    details: {
      longDescription: "A trilha de Desenvolvedor Back-End é focada na construção da infraestrutura que sustenta aplicações web. Você aprenderá a criar APIs robustas, gerenciar bancos de dados e implementar lógica de servidor com tecnologias modernas como Node.js, Python e Java. Esta trilha prepara você para construir sistemas escaláveis e seguros.",
      skills: ["Node.js", "Express", "Python/Django", "Java/Spring", "SQL", "NoSQL", "APIs RESTful", "Autenticação e Autorização"],
      careerOpportunities: ["Desenvolvedor Back-End Jr.", "Engenheiro de Software", "Desenvolvedor de APIs"],
      modulesData: [
        { id: 'be_basic_intro', title: 'Módulo 1: Fundamentos de Back-End', level: 'Básico', completed: false,
          lessons: [
            {id: 1, title: 'Introdução a Servidores e Arquitetura Web', type: 'video', duration: '15min', youtubeId: 'example1', completed: false},
            {id: 2, title: 'Protocolos HTTP e Métodos de Requisição', type: 'video', duration: '18min', youtubeId: 'example2', completed: false},
            {id: 3, title: 'Introdução a APIs e Formatos de Dados', type: 'article', duration: '20min', link: '#', completed: false},
          ]},
        { id: 'be_basic_node', title: 'Módulo 2: Node.js Essencial', level: 'Básico', completed: false,
          lessons: [
            {id: 4, title: 'Introdução ao Node.js e NPM', type: 'video', duration: '20min', youtubeId: 'example3', completed: false},
            {id: 5, title: 'Express.js e Criação de Rotas', type: 'video', duration: '25min', youtubeId: 'example4', completed: false},
            {id: 6, title: 'Middleware e Tratamento de Erros', type: 'video', duration: '22min', youtubeId: 'example5', completed: false},
          ]},
        { id: 'be_inter_db', title: 'Módulo 3: Bancos de Dados', level: 'Intermediário', completed: false, lessons: [ /* ... mais aulas ... */ ]},
        { id: 'be_inter_auth', title: 'Módulo 4: Autenticação e Segurança', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'be_adv_arch', title: 'Módulo 5: Arquitetura Avançada', level: 'Avançado', completed: false, lessons: [ /* ... */ ]},
      ]
    }
  },
  {
    id: 'fullstack',
    title: 'Desenvolvedor Full Stack',
    description: 'Domine o desenvolvimento front-end e back-end para criar aplicações web completas e escaláveis.',
    icon: '🚀',
    modules: 20,
    level: 'Avançado',
    category: 'Desenvolvimento Web',
    details: {
      longDescription: "A trilha de Desenvolvedor Full Stack combina habilidades de front-end e back-end para formar profissionais completos. Você aprenderá a desenvolver aplicações web do início ao fim, desde interfaces de usuário até a infraestrutura de servidor e banco de dados. Esta trilha é ideal para quem deseja ter uma visão holística do desenvolvimento web.",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "SQL", "Git", "DevOps Básico"],
      careerOpportunities: ["Desenvolvedor Full Stack Jr.", "Engenheiro de Software", "Desenvolvedor Web"],
      modulesData: [
        { id: 'fs_basic_front', title: 'Módulo 1: Fundamentos de Front-End', level: 'Básico', completed: false, lessons: [ /* ... */ ]},
        { id: 'fs_basic_back', title: 'Módulo 2: Fundamentos de Back-End', level: 'Básico', completed: false, lessons: [ /* ... */ ]},
        { id: 'fs_inter_api', title: 'Módulo 3: Desenvolvimento de APIs', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'fs_inter_db', title: 'Módulo 4: Bancos de Dados', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'fs_adv_arch', title: 'Módulo 5: Arquitetura de Aplicações', level: 'Avançado', completed: false, lessons: [ /* ... */ ]},
      ]
    }
  },
  {
    id: 'devops',
    title: 'Engenheiro DevOps',
    description: 'Automatize e otimize processos de desenvolvimento, integração contínua, entrega contínua e infraestrutura como código.',
    icon: '🛠️', // Ou <Cloud />
    modules: 18,
    level: 'Avançado',
    category: 'Infraestrutura e Operações',
    details: {
      longDescription: "A trilha de Engenheiro DevOps foca na união entre desenvolvimento e operações para criar processos eficientes de entrega de software. Você aprenderá sobre automação, CI/CD, containerização, orquestração e infraestrutura como código. Esta trilha prepara você para otimizar fluxos de trabalho e garantir implantações confiáveis e escaláveis.",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS/Azure/GCP", "Terraform", "Ansible", "Monitoramento", "Linux"],
      careerOpportunities: ["Engenheiro DevOps Jr.", "Especialista em Cloud", "SRE (Site Reliability Engineer)"],
      modulesData: [
        { id: 'do_basic_linux', title: 'Módulo 1: Fundamentos de Linux', level: 'Básico', completed: false,
          lessons: [
            {id: 1, title: 'Introdução ao Linux e Linha de Comando', type: 'video', duration: '20min', youtubeId: 'example6', completed: false},
            {id: 2, title: 'Gerenciamento de Usuários e Permissões', type: 'video', duration: '18min', youtubeId: 'example7', completed: false},
            {id: 3, title: 'Shell Scripting Básico', type: 'article', duration: '25min', link: '#', completed: false},
          ]},
        { id: 'do_basic_git', title: 'Módulo 2: Git Avançado e Fluxos de Trabalho', level: 'Básico', completed: false,
          lessons: [
            {id: 4, title: 'Branching Strategies e Git Flow', type: 'video', duration: '22min', youtubeId: 'example8', completed: false},
            {id: 5, title: 'Hooks e Automação com Git', type: 'video', duration: '20min', youtubeId: 'example9', completed: false},
            {id: 6, title: 'Resolução de Conflitos Avançada', type: 'video', duration: '18min', youtubeId: 'example10', completed: false},
          ]},
        { id: 'do_inter_docker', title: 'Módulo 3: Docker e Containerização', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'do_inter_ci', title: 'Módulo 4: CI/CD Pipelines', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'do_adv_k8s', title: 'Módulo 5: Kubernetes e Orquestração', level: 'Avançado', completed: false, lessons: [ /* ... */ ]},
      ]
    }
  },
  {
    id: 'qa',
    title: 'Engenheiro de QA',
    description: 'Garanta a qualidade de software através de estratégias de testes manuais, automatizados e ferramentas de mercado.',
    icon: '🧪', // Ou <ShieldCheck />
    modules: 10,
    level: 'Iniciante',
    category: 'Qualidade e Testes',
    details: {
      longDescription: "A trilha de Engenheiro de QA (Quality Assurance) é focada em garantir a qualidade e confiabilidade do software. Você aprenderá sobre testes manuais, automação de testes, ferramentas de QA e metodologias para identificar e prevenir defeitos. Esta trilha prepara você para ser um profissional essencial no ciclo de desenvolvimento de software.",
      skills: ["Testes Manuais", "Selenium", "Cypress", "Jest", "Postman", "JMeter", "BDD", "Gestão de Defeitos"],
      careerOpportunities: ["Analista de QA Jr.", "Testador de Software", "Engenheiro de Testes Automatizados"],
      modulesData: [
        { id: 'qa_basic_fund', title: 'Módulo 1: Fundamentos de Qualidade de Software', level: 'Básico', completed: false,
          lessons: [
            {id: 1, title: 'Introdução à Qualidade de Software', type: 'video', duration: '15min', youtubeId: 'example11', completed: false},
            {id: 2, title: 'Tipos de Testes e Níveis de Teste', type: 'video', duration: '20min', youtubeId: 'example12', completed: false},
            {id: 3, title: 'Planejamento e Documentação de Testes', type: 'article', duration: '18min', link: '#', completed: false},
          ]},
        { id: 'qa_basic_manual', title: 'Módulo 2: Testes Manuais', level: 'Básico', completed: false,
          lessons: [
            {id: 4, title: 'Técnicas de Teste Exploratório', type: 'video', duration: '22min', youtubeId: 'example13', completed: false},
            {id: 5, title: 'Casos de Teste e Cenários', type: 'video', duration: '18min', youtubeId: 'example14', completed: false},
            {id: 6, title: 'Relatórios de Defeitos e Gestão de Bugs', type: 'video', duration: '20min', youtubeId: 'example15', completed: false},
          ]},
        { id: 'qa_inter_auto', title: 'Módulo 3: Automação de Testes', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'qa_inter_api', title: 'Módulo 4: Testes de API', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'qa_adv_perf', title: 'Módulo 5: Testes de Performance', level: 'Avançado', completed: false, lessons: [ /* ... */ ]},
      ]
    }
  },
  {
    id: 'datascience',
    title: 'Cientista de Dados',
    description: 'Analise grandes volumes de dados, crie modelos de Machine Learning e extraia insights valiosos para negócios.',
    icon: '📊',
    modules: 22,
    level: 'Avançado',
    category: 'Dados e IA',
    details: {
      longDescription: "A trilha de Cientista de Dados prepara você para extrair conhecimento e insights de dados estruturados e não estruturados. Você aprenderá estatística, programação em Python, visualização de dados e algoritmos de machine learning. Esta trilha é ideal para quem deseja transformar dados em soluções e decisões de negócio.",
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "SQL", "Visualização de Dados", "Estatística"],
      careerOpportunities: ["Cientista de Dados Jr.", "Analista de Dados", "Especialista em Machine Learning"],
      modulesData: [
        { id: 'ds_basic_python', title: 'Módulo 1: Python para Ciência de Dados', level: 'Básico', completed: false,
          lessons: [
            {id: 1, title: 'Introdução ao Python e Jupyter Notebooks', type: 'video', duration: '25min', youtubeId: 'example16', completed: false},
            {id: 2, title: 'Pandas e Manipulação de Dados', type: 'video', duration: '30min', youtubeId: 'example17', completed: false},
            {id: 3, title: 'NumPy e Computação Numérica', type: 'article', duration: '22min', link: '#', completed: false},
          ]},
        { id: 'ds_basic_stats', title: 'Módulo 2: Estatística Fundamental', level: 'Básico', completed: false,
          lessons: [
            {id: 4, title: 'Estatística Descritiva', type: 'video', duration: '20min', youtubeId: 'example18', completed: false},
            {id: 5, title: 'Probabilidade e Distribuições', type: 'video', duration: '25min', youtubeId: 'example19', completed: false},
            {id: 6, title: 'Testes de Hipótese', type: 'video', duration: '28min', youtubeId: 'example20', completed: false},
          ]},
        { id: 'ds_inter_viz', title: 'Módulo 3: Visualização de Dados', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'ds_inter_ml', title: 'Módulo 4: Machine Learning Básico', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'ds_adv_deep', title: 'Módulo 5: Deep Learning', level: 'Avançado', completed: false, lessons: [ /* ... */ ]},
      ]
    }
  },
  {
    id: 'uxui',
    title: 'Designer UX/UI',
    description: 'Projete experiências de usuário intuitivas, acessíveis e interfaces visualmente atraentes para produtos digitais.',
    icon: '🎨', // Ou <Palette />
    modules: 14,
    level: 'Intermediário',
    category: 'Design',
    details: {
      longDescription: "A trilha de Designer UX/UI foca na criação de experiências digitais centradas no usuário. Você aprenderá pesquisa com usuários, arquitetura de informação, prototipagem e design visual. Esta trilha prepara você para criar produtos digitais que sejam tanto funcionais quanto esteticamente agradáveis.",
      skills: ["Figma", "Adobe XD", "Pesquisa de Usuário", "Wireframing", "Prototipagem", "Design System", "Acessibilidade", "UI Design"],
      careerOpportunities: ["Designer UX/UI Jr.", "UX Researcher", "UI Designer"],
      modulesData: [
        { id: 'ux_basic_fund', title: 'Módulo 1: Fundamentos de UX', level: 'Básico', completed: false,
          lessons: [
            {id: 1, title: 'Introdução ao Design Centrado no Usuário', type: 'video', duration: '18min', youtubeId: 'example21', completed: false},
            {id: 2, title: 'Pesquisa de Usuário e Personas', type: 'video', duration: '22min', youtubeId: 'example22', completed: false},
            {id: 3, title: 'Jornadas de Usuário e Mapas de Empatia', type: 'article', duration: '20min', link: '#', completed: false},
          ]},
        { id: 'ux_basic_wire', title: 'Módulo 2: Wireframing e Prototipagem', level: 'Básico', completed: false,
          lessons: [
            {id: 4, title: 'Criando Wireframes Efetivos', type: 'video', duration: '25min', youtubeId: 'example23', completed: false},
            {id: 5, title: 'Prototipagem com Figma', type: 'video', duration: '30min', youtubeId: 'example24', completed: false},
            {id: 6, title: 'Testes de Usabilidade', type: 'video', duration: '22min', youtubeId: 'example25', completed: false},
          ]},
        { id: 'ux_inter_ui', title: 'Módulo 3: UI Design', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'ux_inter_design', title: 'Módulo 4: Design Systems', level: 'Intermediário', completed: false, lessons: [ /* ... */ ]},
        { id: 'ux_adv_access', title: 'Módulo 5: Acessibilidade e Design Inclusivo', level: 'Avançado', completed: false, lessons: [ /* ... */ ]},
      ]
    }
  },
];