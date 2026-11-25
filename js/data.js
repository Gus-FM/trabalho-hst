window.JOGO_DADOS = {
  empresa: 'Metalúrgica Horizonte',

  config: {
    indiceInicial: 50,
    tempoInspecao: 90,
    perigosPorFase: 5,
    segundosCliqueErrado: 3,
    diasPorFase: 30,
    pontos: {
      cliqueErrado: 20,
      perigoEncontrado: 100,
      avaliacaoExata: 50,
      avaliacaoPorUmaCasa: 25,
      acaoCorreta: 100,
      quizCorreta: 40
    },
    indice: {
      bonusSemAcidentes: 10,
      porAcaoCorreta: 2,
      penalidadePorAcidente: 10
    }
  },

  textos: {
    papel: 'Você acaba de ser contratado(a) como técnico(a) de segurança do trabalho da Metalúrgica Horizonte. ' +
      'Sua missão é inspecionar cada setor, encontrar os perigos, avaliar os riscos e escolher as melhores ' +
      'medidas de controle, sempre com base nas Normas Regulamentadoras (NRs). Cada perigo que passar ' +
      'despercebido pode virar um acidente no dia seguinte.',
    comoFunciona: [
      { titulo: 'Identificar', texto: 'Inspecione o cenário e clique nos perigos antes que o tempo acabe. Clique errado custa tempo e pontos.' },
      { titulo: 'Avaliar', texto: 'Classifique cada risco na matriz de probabilidade × gravidade.' },
      { titulo: 'Resolver', texto: 'Escolha a melhor medida segundo a hierarquia de controle.' },
      { titulo: 'Aprender', texto: 'Veja o feedback, responda ao quiz e imprima seu relatório.' }
    ],
    semPerigo: 'Aqui está tudo certo.',
    avisoNRs: 'Conteúdo educativo. Confira sempre o texto atualizado das NRs no site do Ministério do Trabalho e Emprego (gov.br).'
  },

  cargos: [
    // Cada cargo exige pontos E setores concluídos. Os pontos de carreira são a soma da melhor pontuação
    // em cada setor (máximo de 1.450 por setor, 8.700 no total): Engenheiro(a) exige todos os setores, com ~85%.
    { nome: 'Estagiário(a)', minimo: 0, setores: 0 },
    { nome: 'Técnico(a) Júnior', minimo: 1000, setores: 1 },
    { nome: 'Técnico(a) Pleno', minimo: 3000, setores: 3 },
    { nome: 'Técnico(a) Sênior', minimo: 5500, setores: 5 },
    { nome: 'Engenheiro(a) de Segurança', minimo: 7400, setores: 6 }
  ],

  medalhas: [
    { id: 'olho-de-aguia', nome: 'Olho de Águia', icone: '🦅', criterio: 'todosEncontradosRapido', limiteSegundos: 45,
      descricao: 'Encontrou todos os perigos de um setor em até 45 segundos.' },
    { id: 'zero-acidentes', nome: 'Zero Acidentes', icone: '🛡️', criterio: 'todosEncontrados',
      descricao: 'Nenhum perigo ficou de fora da inspeção.' },
    { id: 'analista-de-risco', nome: 'Analista de Risco', icone: '📊', criterio: 'avaliacoesExatas',
      descricao: 'Encontrou e classificou todos os riscos exatamente como a referência.' },
    { id: 'mestre-da-hierarquia', nome: 'Mestre da Hierarquia', icone: '🏆', criterio: 'todasAcoesCorretas',
      descricao: 'Encontrou todos os perigos e escolheu a melhor ação para cada um.' },
    { id: 'estudioso', nome: 'Estudioso(a)', icone: '📚', criterio: 'quizPerfeito',
      descricao: 'Acertou 100% do quiz de um setor.' }
  ],

  escalas: {
    probabilidade: ['Baixa', 'Média', 'Alta'],
    gravidade: ['Leve', 'Moderada', 'Grave']
  },
  niveisRisco: [
    { nome: 'Baixo', cor: '#2e9e4f', corTexto: '#ffffff' },
    { nome: 'Médio', cor: '#f5b800', corTexto: '#1b1c1e' },
    { nome: 'Alto', cor: '#d32f2f', corTexto: '#ffffff' }
  ],
  matrizRisco: [
    [0, 0, 1],
    [0, 1, 2],
    [1, 2, 2]
  ],

  hierarquia: [
    { id: 'eliminacao', nome: 'Eliminação', cor: '#0b6e35' },
    { id: 'coletiva', nome: 'Proteção coletiva', cor: '#1f5fa6' },
    { id: 'administrativa', nome: 'Medida administrativa', cor: '#6a3d9a' },
    { id: 'epi', nome: 'EPI', cor: '#b85600' }
  ],

  setores: [
    { id: 'almoxarifado', nome: 'Almoxarifado', icone: '📦', nrs: ['NR-6', 'NR-11', 'NR-17', 'NR-23', 'NR-26'], disponivel: true,
      resumo: 'Estoque de peças e materiais. Movimentação de cargas, armazenagem e produtos químicos.' },

    { id: 'escritorio', nome: 'Escritório', icone: '💻', nrs: ['NR-17'], disponivel: false,
      resumo: 'Ergonomia em postos de trabalho com computador.' },
    { id: 'producao', nome: 'Produção', icone: '⚙️', nrs: ['NR-12'], disponivel: false,
      resumo: 'Segurança em máquinas e equipamentos.' },
    { id: 'manutencao-eletrica', nome: 'Manutenção elétrica', icone: '⚡', nrs: ['NR-10'], disponivel: false,
      resumo: 'Segurança em instalações e serviços com eletricidade.' },
    { id: 'obra-telhado', nome: 'Obra / telhado', icone: '🏗️', nrs: ['NR-35'], disponivel: false,
      resumo: 'Trabalho em altura.' },
    { id: 'tanque-silo', nome: 'Tanque / silo', icone: '🛢️', nrs: ['NR-33'], disponivel: false,
      resumo: 'Segurança em espaços confinados.' }
  ]
};
