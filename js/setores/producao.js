(function () {
  'use strict';
  const C = window.CENA;
  const setor = window.JOGO_DADOS && window.JOGO_DADOS.setores.find((s) => s.id === 'producao');
  if (!C || !setor) return;

  const fundo = `
  <rect x="0" y="0" width="1000" height="330" fill="#d8d4cb"/>
  <rect x="0" y="0" width="1000" height="24" fill="#bdb7aa"/>
  <rect x="0" y="318" width="1000" height="12" fill="#a39d90"/>
  <rect x="0" y="330" width="1000" height="230" fill="#9ba1a7"/>
  <g stroke="#8b9197" stroke-width="2">
    <line x1="0" y1="400" x2="1000" y2="400"/><line x1="0" y1="470" x2="1000" y2="470"/>
    <line x1="240" y1="330" x2="210" y2="560"/><line x1="640" y1="330" x2="650" y2="560"/>
  </g>
  <g fill="#4d5761">
    <rect x="120" y="24" width="80" height="9" rx="3"/><rect x="480" y="24" width="80" height="9" rx="3"/><rect x="800" y="24" width="80" height="9" rx="3"/>
  </g>
  <rect x="680" y="44" width="150" height="34" rx="5" fill="#1b1c1e"/>
  <text x="755" y="67" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffc400" text-anchor="middle">PRODUÇÃO</text>`;

  const maquina = `
    <rect x="40" y="300" width="170" height="110" rx="4" fill="#4b6b8a" stroke="#2f475e" stroke-width="3"/>
    <rect x="70" y="322" width="44" height="30" rx="3" fill="#2f475e"/>
    <circle cx="82" cy="337" r="6" fill="#2e9e4f"/><circle cx="102" cy="337" r="6" fill="#d62828"/>
    <rect x="150" y="140" width="44" height="162" fill="#4b6b8a" stroke="#2f475e" stroke-width="3"/>
    <rect x="58" y="222" width="64" height="50" rx="4" fill="#5c7d9c" stroke="#2f475e" stroke-width="3"/>
    <rect x="66" y="272" width="48" height="28" fill="#4b6b8a"/>`;

  const esmeril = `
    <rect x="330" y="360" width="116" height="10" fill="#6b5232"/>
    <rect x="336" y="370" width="8" height="110" fill="#6b5232"/><rect x="432" y="370" width="8" height="110" fill="#6b5232"/>
    <rect x="380" y="344" width="44" height="16" fill="#3c6e47"/>
    <ellipse cx="402" cy="330" rx="20" ry="16" fill="#3c6e47"/>
    <circle cx="374" cy="330" r="19" fill="#b8b8b8" stroke="#6b7178" stroke-width="3"/>
    <circle cx="430" cy="330" r="19" fill="#b8b8b8" stroke="#6b7178" stroke-width="3"/>`;
  const faiscasEsmeril = `
    <rect x="344" y="328" width="18" height="9" fill="#7d858e"/>
    <g stroke="#ff8c00" stroke-width="3" stroke-linecap="round">
      <line x1="356" y1="330" x2="326" y2="304"/><line x1="354" y1="326" x2="334" y2="296"/>
      <line x1="356" y1="336" x2="322" y2="322"/><line x1="358" y1="322" x2="348" y2="296"/>
    </g>
    <g fill="#ffd43b"><circle cx="318" cy="300" r="3"/><circle cx="330" cy="290" r="2.5"/><circle cx="316" cy="318" r="2.5"/></g>`;

  const furadeira = `
    <rect x="528" y="446" width="96" height="14" rx="3" fill="#3a3f45"/>
    <rect x="600" y="216" width="12" height="232" fill="#5a6168"/>
    <rect x="560" y="200" width="46" height="30" rx="4" fill="#7a1f1f"/>
    <rect x="534" y="228" width="84" height="48" rx="6" fill="#c0392b"/>
    <rect x="552" y="276" width="18" height="18" fill="#8e979f"/>
    <rect x="558" y="294" width="6" height="34" fill="#d0d4d8"/>
    <path d="M546 288 a16 7 0 1 0 30 0" stroke="#d62828" stroke-width="2.5" fill="none"/>
    <rect x="532" y="345" width="76" height="10" fill="#5a6168"/>
    <rect x="548" y="333" width="40" height="12" fill="#8e979f"/>`;

  const compressor = `
    <rect x="712" y="398" width="112" height="52" rx="26" fill="#c0392b" stroke="#7a1f1f" stroke-width="3"/>
    <rect x="736" y="356" width="48" height="42" rx="4" fill="#4d5761"/>
    <circle cx="800" cy="372" r="18" fill="#8e979f" stroke="#4d5761" stroke-width="4"/>
    <rect x="724" y="450" width="10" height="18" fill="#4d5761"/><rect x="802" y="450" width="10" height="18" fill="#4d5761"/>
    <circle cx="729" cy="472" r="7" fill="#222222"/><circle cx="807" cy="472" r="7" fill="#222222"/>`;
  const placaRuido = (valor, cor) => `
    <rect x="690" y="196" width="130" height="62" rx="4" fill="${cor}" stroke="#1b1c1e" stroke-width="3"/>
    <text x="755" y="218" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#1b1c1e" text-anchor="middle">NÍVEL DE RUÍDO</text>
    <text x="755" y="246" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1b1c1e" text-anchor="middle">${valor}</text>`;

  const trilho = `
    <rect x="240" y="96" width="400" height="12" fill="#f2c200" stroke="#8b7300" stroke-width="2"/>
    <rect x="246" y="86" width="8" height="12" fill="#5a6168"/><rect x="626" y="86" width="8" height="12" fill="#5a6168"/>`;

  const CENARIO = {
    rotulo: 'Cenário da produção: ponte rolante, máquina com polias, esmeril, furadeira de bancada, compressor e operadores',
    fundo: fundo,
    oks: [
      { id: 'faixa', alvo: [240, 492, 760, 68], descricao: 'Faixa de circulação de pedestres pintada em amarelo no piso', svg: `
        <rect x="240" y="498" width="760" height="8" fill="#f2c200"/>
        <rect x="240" y="548" width="760" height="8" fill="#f2c200"/>
        <path d="M480 520 h60 v-10 l24 17 l-24 17 v-10 h-60 z" fill="#f4f4f4" opacity="0.85"/>` },
      { id: 'quadro', alvo: [852, 52, 136, 116], descricao: 'Quadro de checklist diário das máquinas, preenchido', svg: `
        <rect x="858" y="58" width="124" height="104" rx="4" fill="#ffffff" stroke="#3a3f45" stroke-width="3"/>
        <text x="920" y="80" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#1b1c1e" text-anchor="middle">CHECKLIST</text>
        <g stroke="#2e9e4f" stroke-width="3" fill="none"><path d="M870 96 l4 5 l8 -9"/><path d="M870 116 l4 5 l8 -9"/><path d="M870 136 l4 5 l8 -9"/></g>
        <g stroke="#b5b5b5" stroke-width="3"><line x1="890" y1="98" x2="968" y2="98"/><line x1="890" y1="118" x2="960" y2="118"/><line x1="890" y1="138" x2="966" y2="138"/></g>` },
      { id: 'operador', alvo: [880, 290, 116, 196], descricao: 'Operador na bancada de capacete, óculos, protetor auricular vermelho, luvas e botina', svg: `
        <rect x="940" y="380" width="56" height="10" fill="#6b5232"/>
        <rect x="946" y="390" width="8" height="90" fill="#6b5232"/><rect x="984" y="390" width="8" height="90" fill="#6b5232"/>
        <rect x="952" y="360" width="34" height="20" fill="#7d858e"/>
        ${C.pessoaEmPe(912, 480, { capacete: '#ffffff', oculos: true, abafador: true, camisa: '#1f5fa6', pele: '#8d5a3b', luvas: '#e6b800', maoD: [948, 372] })}` }
    ],
    partes: [
      {
        id: 'ponte', alvo: [240, 84, 400, 104],
        descPerigo: 'Ponte rolante amarela no teto carregando um bloco de 2 toneladas por cima das bancadas',
        descSeguro: 'Ponte rolante amarela no teto, parada na ponta do trilho, com o gancho vazio',
        perigo: trilho + `
          <rect x="392" y="108" width="40" height="12" fill="#5a6168"/>
          <line x1="412" y1="120" x2="412" y2="150" stroke="#3a3f45" stroke-width="3"/>
          <path d="M412 150 v6 a5 5 0 1 1 -6 4" stroke="#3a3f45" stroke-width="3" fill="none"/>
          <g stroke="#3a3f45" stroke-width="2"><line x1="410" y1="158" x2="388" y2="168"/><line x1="410" y1="158" x2="436" y2="168"/></g>
          <rect x="384" y="166" width="56" height="22" fill="#6f7780" stroke="#454b52" stroke-width="2"/>
          <text x="412" y="182" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">2 t</text>
          <path d="M446 176 h40 l-8 -6 M486 176 l-8 6" stroke="#d62828" stroke-width="3" fill="none"/>`,
        seguro: trilho + `
          <rect x="590" y="108" width="40" height="12" fill="#5a6168"/>
          <line x1="610" y1="120" x2="610" y2="132" stroke="#3a3f45" stroke-width="3"/>
          <path d="M610 132 v6 a5 5 0 1 1 -6 4" stroke="#3a3f45" stroke-width="3" fill="none"/>`
      },
      {
        id: 'correia', alvo: [22, 100, 204, 312],
        descPerigo: 'Máquina azul com duas polias e uma correia preta girando, visíveis por fora',
        descSeguro: 'Máquina azul com as polias e a correia cobertas por uma tampa amarela parafusada',
        perigo: maquina + `
          <path d="M77 230 L150 145 M107 262 L194 191" stroke="#1b1c1e" stroke-width="7" stroke-linecap="round"/>
          <circle cx="92" cy="246" r="22" fill="#a8b0b7" stroke="#1b1c1e" stroke-width="6"/>
          <circle cx="92" cy="246" r="6" fill="#3a3f45"/>
          <circle cx="172" cy="168" r="32" fill="#a8b0b7" stroke="#1b1c1e" stroke-width="6"/>
          <g stroke="#6b7178" stroke-width="3"><line x1="172" y1="142" x2="172" y2="194"/><line x1="146" y1="168" x2="198" y2="168"/></g>
          <circle cx="172" cy="168" r="8" fill="#3a3f45"/>
          <path d="M130 150 a46 46 0 0 1 52 -38" stroke="#d62828" stroke-width="4" fill="none"/>
          <path d="M180 104 l12 10 l-14 4 z" fill="#d62828"/>`,
        seguro: maquina + `
          <path d="M62 222 L136 126 L214 130 L214 210 L128 280 L62 280 Z" fill="#f2c200" stroke="#8b7300" stroke-width="3"/>
          <g stroke="#c99a00" stroke-width="2">
            <line x1="80" y1="210" x2="200" y2="150"/><line x1="76" y1="240" x2="206" y2="176"/><line x1="90" y1="266" x2="210" y2="200"/>
          </g>
          <circle cx="76" cy="230" r="3" fill="#5a6168"/><circle cx="206" cy="140" r="3" fill="#5a6168"/><circle cx="206" cy="204" r="3" fill="#5a6168"/>`
      },
      {
        id: 'oleo', alvo: [22, 416, 204, 94],
        descPerigo: 'Mancha preta e brilhante no piso ao lado da máquina azul, com gotas caindo da base',
        descSeguro: 'Bandeja metálica no piso, embaixo da base da máquina azul',
        perigo: `
          <path d="M150 412 q4 10 0 16 q-4 -6 0 -16z" fill="#1b1b1b"/>
          <circle cx="150" cy="440" r="3" fill="#1b1b1b"/>
          <ellipse cx="122" cy="478" rx="92" ry="24" fill="#23201c" opacity="0.85"/>
          <ellipse cx="100" cy="472" rx="40" ry="7" fill="#6d6a8a" opacity="0.5"/>
          <ellipse cx="152" cy="486" rx="22" ry="4" fill="#7b8a5a" opacity="0.4"/>`,
        seguro: `<rect x="100" y="412" width="90" height="10" rx="2" fill="#5a6168" stroke="#3a3f45" stroke-width="2"/>`
      },
      {
        id: 'oculos', alvo: [236, 270, 214, 216],
        descPerigo: 'Operador de camisa marrom afiando uma peça no esmeril; as faíscas voam em direção ao rosto',
        descSeguro: 'Operador de camisa marrom e óculos transparentes afiando uma peça no esmeril; as faíscas voam em direção ao rosto',
        perigo: esmeril + C.pessoaEmPe(296, 480, { camisa: '#8a5a2b', cabelo: '#111111', maoD: [350, 334], maoE: [340, 346] }) + faiscasEsmeril,
        seguro: esmeril + C.pessoaEmPe(296, 480, { camisa: '#8a5a2b', cabelo: '#111111', oculos: true, maoD: [350, 334], maoE: [340, 346] }) + faiscasEsmeril
      },
      {
        id: 'cabelo', alvo: [456, 192, 180, 294],
        descPerigo: 'Operadora de cabelo comprido e luvas amarelas trabalhando na furadeira de bancada ligada',
        descSeguro: 'Operadora de cabelo em coque e óculos trabalhando na furadeira de bancada ligada',
        perigo: furadeira +
          C.pessoaEmPe(516, 480, { cabeloLongo: true, cabelo: '#6b3e1e', camisa: '#9b59b6', pele: '#e0b48c', luvas: '#e6b800', inclinar: 8, maoE: [548, 340], maoD: [556, 330] }) +
          `<path d="M544 314 q6 -8 14 -4" stroke="#6b3e1e" stroke-width="3" fill="none"/>`,
        seguro: furadeira +
          C.pessoaEmPe(512, 480, { coque: true, cabelo: '#6b3e1e', camisa: '#9b59b6', pele: '#e0b48c', oculos: true, maoE: [548, 340], maoD: [556, 330] })
      },
      {
        id: 'ruido', alvo: [644, 188, 186, 298],
        descPerigo: 'Compressor vermelho ao lado de um funcionário com as mãos nos ouvidos; placa “Nível de ruído: 98 dB(A)”',
        descSeguro: 'Compressor dentro de uma cabine cinza ao lado de um funcionário; placa “Nível de ruído: 80 dB(A)”',
        perigo: placaRuido('98 dB(A)', '#ffc400') + compressor + `
          <g stroke="#d62828" stroke-width="3" fill="none"><path d="M708 380 q-10 14 0 28"/><path d="M698 372 q-16 22 0 44"/></g>
          ${C.pessoaEmPe(666, 480, { camisa: '#16a085', cabelo: '#222222', pele: '#8d5a3b', maoE: [648, 314], maoD: [684, 314] })}`,
        seguro: placaRuido('80 dB(A)', '#b9e4c9') + `
          <rect x="704" y="338" width="124" height="140" rx="4" fill="#7f8c8d" stroke="#4d5761" stroke-width="3"/>
          <g stroke="#6b7178" stroke-width="2"><line x1="704" y1="372" x2="828" y2="372"/><line x1="704" y1="406" x2="828" y2="406"/><line x1="704" y1="440" x2="828" y2="440"/></g>
          <rect x="744" y="390" width="44" height="86" fill="#6b7178" stroke="#4d5761" stroke-width="2"/>
          <text x="766" y="358" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">CABINE ACÚSTICA</text>
          ${C.pessoaEmPe(666, 480, { camisa: '#16a085', cabelo: '#222222', pele: '#8d5a3b' })}`
      },
      {
        id: 'palete', alvo: [690, 494, 150, 62],
        descPerigo: 'Palete com duas caixas em cima da faixa amarela de pedestres',
        descSeguro: 'Trecho da faixa amarela de pedestres, perto da seta',
        perigo: `
          <rect x="700" y="534" width="124" height="14" fill="#8a6236" stroke="#5a3e1e" stroke-width="2"/>
          <rect x="706" y="500" width="54" height="34" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="762" y="506" width="56" height="28" fill="#b98448" stroke="#8a6236" stroke-width="2"/>`,
        seguro: ''
      }
    ]
  };

  Object.assign(setor, {
    disponivel: true,
    tempoInspecao: 100,
    nrs: ['NR-6', 'NR-11', 'NR-12', 'NR-15'],
    resumo: 'Máquinas, ferramentas, cargas e ruído na linha de produção.',
    briefing: 'A produção bateu recorde no mês, mas o ambulatório também: cortes, uma queda e queixas de zumbido no ouvido. ' +
      'O gerente pediu uma inspeção antes do próximo turno. Encontre os perigos escondidos no setor antes que o tempo acabe.',

    cenario: { mensagemPadrao: 'Aqui está tudo certo.', montar: (ativos) => C.montar(CENARIO, ativos) },

    naoPerigos: [
      { id: 'faixa', mensagem: 'Faixa de circulação de pedestres pintada no piso. Tudo certo aqui!' },
      { id: 'quadro', mensagem: 'Quadro com o checklist diário de segurança das máquinas, preenchido. Tudo certo aqui!' },
      { id: 'operador', mensagem: 'Operador com capacete, óculos de proteção, protetor auricular e botina, trabalhando na bancada. Tudo certo aqui!' }
    ],

    perigos: [
      {
        id: 'correia',
        nome: 'Polias e correia sem proteção',
        descricao: 'A máquina funciona com as polias e a correia de transmissão expostas, sem nenhuma proteção.',
        mensagemSeguro: 'Polias e correia cobertas por uma proteção fixa. Tudo certo aqui!',
        nrs: ['NR-12'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'O operador passa perto das partes móveis o tempo todo, e basta um descuido para a mão ou a roupa ' +
          'encostar (probabilidade média). Ser puxado por uma correia em movimento pode causar amputação (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Instalar uma proteção fixa cobrindo polias e correia, presa de modo que só saia com ferramenta.',
            explicacao: 'Impede fisicamente que qualquer pessoa encoste nas partes móveis, sem depender da atenção de ninguém.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir que o operador use luvas de couro sempre que trabalhar perto da máquina.',
            explicacao: 'Pior ainda: a luva pode ser agarrada pela correia e puxar a mão junto. Perto de partes que giram, luva é perigo.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Pintar as polias de amarelo, afixar uma placa de “cuidado, partes móveis” e treinar os operadores.',
            explicacao: 'Sinalizar ajuda a perceber o perigo, mas não impede o contato. A NR-12 exige proteção física.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desativar a máquina de vez e comprar essa etapa pronta de um fornecedor.',
            explicacao: 'Elimina o risco aqui, mas é caro, demora e só leva o perigo para outra empresa. Uma proteção fixa resolve com a máquina funcionando.' }
        ],
        porque: 'A NR-12 determina que as zonas de perigo das máquinas, como as transmissões de força (polias, correias e ' +
          'engrenagens), tenham proteções que impeçam o acesso. A proteção fixa deve ser presa de forma que só possa ser retirada ' +
          'com ferramenta. É uma proteção coletiva: vale para o operador, para quem faz a limpeza e para quem passa perto.',
        consequencia: 'A manga do uniforme encosta na correia, é puxada para dentro da polia e leva o braço junto.',
        noticia: {
          manchete: 'Operador tem a mão puxada por correia de máquina sem proteção',
          texto: 'Um operador da Metalúrgica Horizonte teve a mão puxada pela correia de uma máquina enquanto retirava uma peça. ' +
            'A transmissão estava sem proteção havia semanas. Ele passou por cirurgia e perdeu parte de dois dedos. A fiscalização ' +
            'do trabalho interditou a máquina.'
        }
      },
      {
        id: 'oleo',
        nome: 'Vazamento de óleo no piso',
        descricao: 'A máquina está vazando óleo, e uma poça se espalhou pelo piso ao lado da área de trabalho.',
        mensagemSeguro: 'Piso limpo, com bandeja de contenção sob a máquina. Tudo certo aqui!',
        nrs: ['NR-12'],
        referencia: { probabilidade: 1, gravidade: 1 },
        justificativaRisco: 'A poça fica ao lado da máquina, por onde os operadores passam (probabilidade média). Um escorregão ' +
          'costuma causar torções e batidas que podem afastar a pessoa por alguns dias (gravidade moderada).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Consertar o vazamento na origem e limpar o piso com material absorvente.',
            explicacao: 'Sem vazamento, não há mais poça. O perigo deixa de existir.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Colocar um cone de “piso escorregadio” ao lado da poça até a próxima limpeza.',
            explicacao: 'O aviso ajuda por um tempo, mas a poça continua crescendo enquanto a máquina vazar.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar uma grade em volta da máquina para ninguém pisar perto da poça.',
            explicacao: 'O operador precisa chegar à máquina, e a poça continua crescendo enquanto o vazamento existir.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer botinas com solado antiderrapante para os operadores da área.',
            explicacao: 'O solado ajuda, mas não segura ninguém numa poça de óleo. E o vazamento continua.' }
        ],
        porque: 'A NR-12 exige que as máquinas passem por manutenção para manter suas condições de segurança e que os pisos ao ' +
          'redor sejam mantidos limpos e livres de óleos, graxas e outras substâncias que os deixem escorregadios. Consertar o ' +
          'vazamento elimina a fonte do problema. Cones e serragem são só soluções temporárias.',
        consequencia: 'Um operador escorrega na poça carregando uma peça, cai de costas e bate a cabeça na base da máquina.',
        noticia: {
          manchete: 'Funcionário escorrega em óleo e fratura o braço na área de produção',
          texto: 'Um operador da Metalúrgica Horizonte escorregou numa poça de óleo ao lado de uma máquina e fraturou o braço ao ' +
            'tentar se apoiar. O vazamento já tinha sido notado por colegas dias antes, mas não havia sido consertado.'
        }
      },
      {
        id: 'oculos',
        nome: 'Esmerilhamento sem óculos de proteção',
        descricao: 'Um operador afia uma peça no esmeril sem óculos de proteção, com as faíscas e partículas voando na direção do rosto.',
        mensagemSeguro: 'Operador usando óculos de proteção no esmeril. Tudo certo aqui!',
        nrs: ['NR-6', 'NR-12'],
        referencia: { probabilidade: 2, gravidade: 1 },
        justificativaRisco: 'Partículas voam toda vez que o esmeril é usado (probabilidade alta). Um fragmento de metal no olho ' +
          'costuma ser removido no pronto-socorro, mas pode deixar sequelas na visão (gravidade moderada).',
        opcoes: [
          { nivel: 'epi', correta: true,
            texto: 'Fornecer óculos de proteção com CA, orientar e exigir o uso, e manter o visor do esmeril ajustado.',
            explicacao: 'As partículas fazem parte do esmerilhamento. O EPI protege os olhos, que são a parte exposta.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Comprar só peças já rebarbadas para que ninguém mais precise usar o esmeril.',
            explicacao: 'Até elimina o esmerilhamento, mas nem sempre é possível: afiar ferramentas e ajustar peças faz parte do trabalho.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Orientar o operador a virar o rosto, manter distância da pedra e trabalhar devagar enquanto esmerilha a peça.',
            explicacao: 'Virar o rosto atrapalha a visão da peça e não impede que uma partícula atinja o olho.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Colocar um ventilador ao lado do esmeril para soprar as faíscas para longe.',
            explicacao: 'O vento espalha as partículas pelo setor e pode jogar faíscas em outras pessoas ou em materiais inflamáveis.' }
        ],
        porque: 'No esmerilhamento, as partículas fazem parte do processo: não dá para eliminá-las. O esmeril deve ter as ' +
          'proteções (capa e visor) ajustadas, conforme a NR-12, e, como ainda sobra risco para os olhos, o EPI é indispensável. ' +
          'A NR-6 obriga a empresa a fornecer gratuitamente óculos ou protetor facial com Certificado de Aprovação (CA), orientar ' +
          'sobre o uso e exigir que sejam usados.',
        consequencia: 'Um fragmento de metal quente atinge o olho do operador e se prende na córnea.',
        noticia: {
          manchete: 'Fragmento de metal atinge olho de operador de esmeril',
          texto: 'Um operador da Metalúrgica Horizonte foi levado ao pronto-socorro oftalmológico depois que uma partícula de ' +
            'metal atingiu seu olho direito durante o esmerilhamento de uma peça. Ele não usava óculos de proteção. O fragmento ' +
            'foi removido, mas ele ficará afastado e pode ter sequela na visão.'
        }
      },
      {
        id: 'cabelo',
        nome: 'Cabelo solto e luvas na furadeira de bancada',
        descricao: 'Uma operadora trabalha na furadeira de bancada com o cabelo comprido solto e usando luvas, bem perto da broca girando.',
        mensagemSeguro: 'Operadora com o cabelo preso e sem luvas na furadeira. Tudo certo aqui!',
        nrs: ['NR-12'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'Ela se inclina sobre a peça a cada furo, então o enrosco é uma possibilidade real (probabilidade ' +
          'média). Cabelo ou luva puxados pela broca podem arrancar o couro cabeludo ou ferir gravemente a mão (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Criar e treinar um procedimento: cabelo preso, sem luvas, sem adornos e roupa ajustada.',
            explicacao: 'Remove os pontos de enrosco por meio de regras claras, treinadas e cobradas no setor.' },
          { nivel: 'epi', correta: false,
            texto: 'Trocar as luvas dela por um modelo mais grosso e resistente a corte, com CA.',
            explicacao: 'Luvas mais grossas enroscam do mesmo jeito, ou até mais. Perto de partes que giram, não se usa luva.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar uma luminária forte sobre a bancada para ela enxergar melhor a broca e a peça durante o furo.',
            explicacao: 'Enxergar melhor não impede o cabelo ou a luva de serem puxados pela broca.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Retirar a furadeira de bancada e passar a furar as peças com furadeira manual.',
            explicacao: 'A furadeira manual também gira, também enrosca e ainda exige mais força e uma postura pior.' }
        ],
        porque: 'A NR-12 exige que os trabalhadores sejam capacitados para operar as máquinas com segurança e que existam ' +
          'procedimentos de trabalho. Em máquinas com partes que giram, cabelo solto, luvas, mangas largas, colares e anéis podem ' +
          'ser agarrados e puxar a pessoa. Como o problema está na forma de trabalhar, a medida certa é administrativa: ' +
          'procedimento escrito, treinamento e fiscalização. A proteção do mandril da furadeira também deve estar instalada.',
        consequencia: 'Ao se inclinar para ver o furo, uma mecha de cabelo encosta na broca e é enrolada em segundos.',
        noticia: {
          manchete: 'Operadora tem o cabelo puxado por furadeira e sofre ferimento grave',
          texto: 'Uma operadora da Metalúrgica Horizonte teve o cabelo enrolado pela broca de uma furadeira de bancada. Colegas ' +
            'desligaram a máquina, mas ela sofreu um ferimento grave no couro cabeludo e foi levada de ambulância ao hospital. Não ' +
            'havia procedimento escrito para a operação da máquina.'
        }
      },
      {
        id: 'ruido',
        nome: 'Ruído alto sem proteção auditiva',
        descricao: 'Um compressor barulhento fica no meio do setor, e a placa indica 98 dB(A). O funcionário ao lado tapa os ouvidos com as mãos.',
        mensagemSeguro: 'Compressor isolado numa cabine acústica, com o ruído do setor em 80 dB(A). Tudo certo aqui!',
        nrs: ['NR-15', 'NR-6'],
        referencia: { probabilidade: 2, gravidade: 2 },
        justificativaRisco: 'A exposição acontece durante a jornada inteira, todos os dias (probabilidade alta). A perda de ' +
          'audição causada pelo ruído é permanente e não tem cura (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Isolar o compressor numa cabine acústica e, até a obra terminar, fornecer protetor auricular.',
            explicacao: 'Reduz o ruído na fonte para todo o setor, e o protetor cobre o período até a cabine ficar pronta.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer protetor auricular com CA para quem trabalha perto do compressor e exigir o uso durante toda a jornada.',
            explicacao: 'O protetor ajuda, mas o barulho continua atingindo todo o setor, e a proteção depende de cada um usar corretamente o tempo todo.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Fazer rodízio para que cada pessoa fique só meio turno perto do compressor.',
            explicacao: 'Diminui o tempo de exposição, mas o ruído continua alto e mais gente passa a ser exposta.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desligar o compressor durante o expediente e ligá-lo só à noite.',
            explicacao: 'Sem ar comprimido, as ferramentas pneumáticas param e a produção também.' }
        ],
        porque: 'A NR-15 define limites de tolerância para o ruído: numa jornada de 8 horas, o limite é de 85 dB(A). Com 98 dB(A), ' +
          'o tempo máximo de exposição cai para 1 hora e 15 minutos por dia. A hierarquia manda atacar a fonte primeiro: isolar o ' +
          'compressor protege todo o setor. O protetor auricular, fornecido conforme a NR-6, é o complemento enquanto a medida ' +
          'coletiva não fica pronta.',
        consequencia: 'Depois de anos, os trabalhadores do setor começam a ter zumbido e dificuldade para entender conversas. A perda de audição não tem volta.',
        noticia: {
          manchete: 'Exames apontam perda auditiva em funcionários da produção',
          texto: 'Audiometrias feitas na Metalúrgica Horizonte mostraram perda auditiva em vários trabalhadores da produção, que ' +
            'ficavam perto de um compressor sem isolamento acústico. A perda causada pelo ruído é irreversível. A empresa foi ' +
            'notificada e terá que isolar o equipamento.'
        }
      },
      {
        id: 'ponte',
        nome: 'Carga suspensa passando sobre as bancadas',
        descricao: 'A ponte rolante transporta um bloco de 2 toneladas por cima da área onde os operadores trabalham, sem isolar a área.',
        mensagemSeguro: 'Ponte rolante estacionada no fim do trilho, sem carga. Tudo certo aqui!',
        nrs: ['NR-11'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'A carga passa ali só algumas vezes por dia e raramente se solta (probabilidade baixa). Mas, se cair, ' +
          'atinge quem estiver embaixo com duas toneladas (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Definir uma rota de içamento que não passe sobre pessoas e isolar a área durante cada movimentação.',
            explicacao: 'Ninguém fica embaixo da carga. Se algo se soltar, não atinge ninguém.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir capacete com jugular de todos que trabalham embaixo do trajeto da ponte rolante durante o içamento.',
            explicacao: 'Nenhum capacete protege contra a queda de duas toneladas.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar uma cobertura de tela metálica sobre as bancadas da área.',
            explicacao: 'Uma tela comum não segura duas toneladas e dá uma falsa sensação de segurança.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desativar a ponte rolante e passar a mover as peças com carrinhos manuais.',
            explicacao: 'Peças desse peso não podem ser movidas à mão. Isso criaria riscos de esforço e esmagamento ainda maiores.' }
        ],
        porque: 'A NR-11 trata da movimentação de materiais e exige que equipamentos como pontes rolantes sejam operados por ' +
          'pessoas capacitadas e usados com segurança. Uma regra básica do içamento é nunca passar a carga por cima de pessoas: ' +
          'define-se uma rota livre e isola-se a área durante a movimentação. É uma medida administrativa que tira as pessoas do ' +
          'caminho da carga.',
        consequencia: 'Uma das correntes se solta e o bloco cai sobre a bancada onde o operador estava trabalhando.',
        noticia: {
          manchete: 'Bloco de aço cai de ponte rolante na área de produção',
          texto: 'Um bloco de aço de duas toneladas caiu de uma ponte rolante na Metalúrgica Horizonte durante o transporte por ' +
            'cima das bancadas. O operador tinha acabado de se afastar para buscar uma ferramenta. A bancada foi destruída, e a ' +
            'fiscalização do trabalho exigiu a revisão dos procedimentos de içamento.'
        }
      },
      {
        id: 'palete',
        nome: 'Palete largado na faixa de pedestres',
        descricao: 'Um palete com caixas foi deixado no meio da faixa de circulação de pedestres.',
        mensagemSeguro: 'Faixa de pedestres livre, sem nenhum obstáculo. Tudo certo aqui!',
        nrs: ['NR-11', 'NR-12'],
        referencia: { probabilidade: 2, gravidade: 0 },
        justificativaRisco: 'Muita gente passa pela faixa o dia todo e precisa desviar (probabilidade alta). O mais comum é um ' +
          'tropeço ou uma canelada sem maiores consequências (gravidade leve).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Tirar o palete da faixa e levá-lo para uma área de armazenagem demarcada.',
            explicacao: 'Sem o obstáculo, a faixa volta a cumprir sua função.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Passar fita zebrada em volta do palete para que todos desviem dele.',
            explicacao: 'A fita deixa o palete à vista, mas obriga as pessoas a sair da faixa e passar perto das máquinas.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer botinas com biqueira para todos que usam a faixa de pedestres.',
            explicacao: 'A biqueira protege os dedos, mas não evita o tropeço nem o desvio para perto das máquinas.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Pintar uma segunda faixa de pedestres contornando o palete.',
            explicacao: 'Muda o caminho de todo mundo para acomodar um problema que se resolve tirando o palete dali.' }
        ],
        porque: 'A NR-12 exige que as áreas de circulação perto das máquinas sejam demarcadas e mantidas livres, e a NR-11 ' +
          'determina que os materiais sejam armazenados sem obstruir a circulação. Tirar o palete da faixa elimina o obstáculo. ' +
          'Para não voltar a acontecer, os paletes precisam ter um lugar demarcado.',
        consequencia: 'Um operador desvia do palete, sai da faixa e esbarra numa máquina em funcionamento.',
        noticia: {
          manchete: 'Operador tropeça em palete deixado na faixa de pedestres',
          texto: 'Um operador da Metalúrgica Horizonte tropeçou num palete deixado no meio da faixa de pedestres e caiu sobre o ' +
            'braço. Ele teve uma luxação no ombro e foi afastado por uma semana. O palete estava ali desde o turno anterior.'
        }
      }
    ],

    quiz: [
      {
        tema: 'Proteções de máquinas', nr: 'NR-12',
        pergunta: 'Segundo a NR-12, como deve ser presa uma proteção fixa de máquina?',
        opcoes: ['Com abraçadeira de plástico, para tirar rápido', 'De forma que só possa ser retirada com ferramenta', 'Pode ficar só encostada na máquina', 'Com fita adesiva bem resistente'],
        correta: 1,
        explicacao: 'A proteção fixa precisa ser presa por parafusos ou outros meios que exijam ferramenta para a retirada. Assim ' +
          'ninguém a tira “só um minutinho” e esquece de recolocar.'
      },
      {
        tema: 'Partes rotativas', nr: 'NR-12',
        pergunta: 'Por que não se deve usar luvas perto de partes que giram, como brocas e correias?',
        opcoes: ['Porque atrapalham a visão', 'Porque podem ser agarradas e puxar a mão junto', 'Porque desgastam muito rápido', 'Porque esquentam demais'],
        correta: 1,
        explicacao: 'A luva pode enroscar na broca ou na correia e arrastar a mão para dentro da máquina em frações de segundo. O ' +
          'mesmo vale para cabelo solto, mangas largas, anéis e correntes.'
      },
      {
        tema: 'Ruído', nr: 'NR-15',
        pergunta: 'Qual é o limite de tolerância ao ruído contínuo para uma jornada de 8 horas, segundo a NR-15?',
        opcoes: ['65 dB(A)', '85 dB(A)', '100 dB(A)', '120 dB(A)'],
        correta: 1,
        explicacao: 'Para 8 horas por dia, o limite é de 85 dB(A). Quanto mais alto o ruído, menor o tempo permitido de exposição.'
      },
      {
        tema: 'Parada de emergência', nr: 'NR-12',
        pergunta: 'Como deve ser o botão de parada de emergência de uma máquina?',
        opcoes: ['Escondido, para ninguém apertar sem querer', 'Em local de fácil acesso e bem visível', 'Usado também para ligar a máquina', 'Desativado durante a produção'],
        correta: 1,
        explicacao: 'A NR-12 exige dispositivos de parada de emergência visíveis e de fácil acesso, que não podem ser usados ' +
          'para dar partida na máquina.'
      },
      {
        tema: 'Manutenção', nr: 'NR-12',
        pergunta: 'Antes de fazer manutenção ou limpeza numa máquina, o correto é:',
        opcoes: ['Fazer com a máquina ligada, mas com cuidado', 'Desligar, bloquear as fontes de energia e sinalizar', 'Pedir a um colega para vigiar o botão', 'Apenas avisar o encarregado'],
        correta: 1,
        explicacao: 'A NR-12 determina que manutenção, inspeção, limpeza e ajustes sejam feitos com a máquina parada e com as ' +
          'fontes de energia bloqueadas e sinalizadas, para que ninguém a ligue por engano.'
      }
    ]
  });
})();
