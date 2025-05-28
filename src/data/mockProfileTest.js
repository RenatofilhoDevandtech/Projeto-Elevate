export const profileTestQuestions = [
  {
    id: 'q1',
    text: 'Qual destas atividades mais te atrai em um projeto de tecnologia?',
    type: 'multiple-choice', // 'single-choice', 'rating'
    options: [
      { id: 'q1o1', text: 'Criar a aparência visual e a interatividade de um site ou app.', value: { frontend: 3, uxui: 2 } },
      { id: 'q1o2', text: 'Resolver problemas lógicos complexos e construir a "mente" por trás de uma aplicação.', value: { backend: 3, datascience: 1 } },
      { id: 'q1o3', text: 'Garantir que tudo funcione perfeitamente e encontrar falhas antes dos usuários.', value: { qa: 3 } },
      { id: 'q1o4', text: 'Planejar como diferentes partes de um sistema se conectam e otimizar processos.', value: { devops: 2, backend: 1 } },
    ],
  },
  {
    id: 'q2',
    text: 'Como você prefere aprender coisas novas?',
    type: 'multiple-choice',
    options: [
      { id: 'q2o1', text: 'Experimentando e construindo coisas práticas.', value: { frontend: 2, fullstack: 2 } },
      { id: 'q2o2', text: 'Analisando dados e entendendo padrões.', value: { datascience: 3 } },
      { id: 'q2o3', text: 'Lendo documentações e entendendo a fundo a teoria.', value: { backend: 2, devops: 1 } },
      { id: 'q2o4', text: 'Colaborando com outros e discutindo ideias.', value: { qa: 1, uxui: 1 } },
    ],
  },
  // Adicione mais perguntas aqui
  // ...
];

// Função de exemplo para calcular o resultado (simplificada)
export const calculateProfileResult = (answers) => {
  const scores = {
    frontend: 0,
    backend: 0,
    fullstack: 0, // Fullstack pode ser uma combinação de front e back
    qa: 0,
    devops: 0,
    datascience: 0,
    uxui: 0,
  };

  for (const questionId in answers) {
    const selectedOptionIds = Array.isArray(answers[questionId]) ? answers[questionId] : [answers[questionId]];
    const question = profileTestQuestions.find(q => q.id === questionId);

    if (question) {
      selectedOptionIds.forEach(optionId => {
        const option = question.options.find(o => o.id === optionId);
        if (option && option.value) {
          for (const area in option.value) {
            scores[area] = (scores[area] || 0) + option.value[area];
          }
        }
      });
    }
  }

  // Lógica para determinar o perfil principal
  // Exemplo:
  let bestMatch = 'frontend'; // Default
  let maxScore = 0;
  for (const area in scores) {
    if (scores[area] > maxScore) {
      maxScore = scores[area];
      bestMatch = area;
    }
  }
  // Para Full Stack, pode ser uma lógica como: if (scores.frontend > X && scores.backend > Y) bestMatch = 'fullstack';

  // Retorna o ID da trilha recomendada (deve corresponder aos IDs em mockPaths.js)
  return bestMatch;
};