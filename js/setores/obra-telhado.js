(function () {
  'use strict';
  const C = window.CENA;
  const setor = window.JOGO_DADOS && window.JOGO_DADOS.setores.find((s) => s.id === 'obra-telhado');
  if (!C || !setor) return;

  const fundo = `
  <rect x="0" y="0" width="1000" height="560" fill="#cfe6f5"/>
  <g fill="#ffffff" opacity="0.9">
    <ellipse cx="120" cy="70" rx="50" ry="18"/><ellipse cx="160" cy="58" rx="40" ry="20"/><ellipse cx="560" cy="64" rx="56" ry="18"/>
  </g>
  <rect x="0" y="470" width="1000" height="90" fill="#b89f7a"/>
  <rect x="0" y="470" width="1000" height="6" fill="#9c845f"/>
  <rect x="40" y="300" width="320" height="170" fill="#e2d4bc" stroke="#a8977d" stroke-width="3"/>
  <rect x="200" y="340" width="56" height="44" fill="#9fc3d8" stroke="#6b7178" stroke-width="3"/>
  <rect x="290" y="392" width="50" height="78" fill="#8a6236"/>
  <polygon points="20,302 200,200 380,302" fill="#b5553c" stroke="#7d3a28" stroke-width="3"/>
  <g stroke="#7d3a28" stroke-width="2">
    <line x1="60" y1="280" x2="340" y2="280"/><line x1="100" y1="257" x2="300" y2="257"/><line x1="140" y1="234" x2="260" y2="234"/>
  </g>
  <rect x="420" y="262" width="300" height="208" fill="#cfc9be" stroke="#9c958a" stroke-width="3"/>
  <rect x="410" y="250" width="320" height="14" fill="#8f8a80"/>
  <rect x="450" y="300" width="60" height="48" fill="#9fc3d8" stroke="#6b7178" stroke-width="3"/>
  <rect x="610" y="300" width="60" height="48" fill="#9fc3d8" stroke="#6b7178" stroke-width="3"/>
  <rect x="540" y="380" width="56" height="90" fill="#6b7178"/>`;

  const guardaCorpo = (x1, x2) => {
    const postes = [];
    for (let x = x1; x <= x2 - 6; x += 70) postes.push(`<rect x="${x}" y="188" width="6" height="62"/>`);
    postes.push(`<rect x="${x2 - 6}" y="188" width="6" height="62"/>`);
    return `<g fill="#f2c200" stroke="#8b7300" stroke-width="1.5">${postes.join('')}
      <rect x="${x1}" y="188" width="${x2 - x1}" height="6"/><rect x="${x1}" y="216" width="${x2 - x1}" height="6"/>
      <rect x="${x1}" y="236" width="${x2 - x1}" height="14"/></g>`;
  };

  const trabalhadorCimento = `
    <g fill="#b5553c" stroke="#6e2a1a" stroke-width="1.5">
      <rect x="590" y="236" width="30" height="14"/><rect x="622" y="236" width="30" height="14"/><rect x="606" y="222" width="30" height="14"/>
    </g>
    ${C.pessoaEmPe(676, 250, { capacete: '#ffffff', camisa: '#d35400', maoE: [702, 116], maoD: [712, 104] })}
    <rect x="694" y="86" width="42" height="22" rx="6" fill="#ecf0f1" stroke="#95a5a6" stroke-width="2"/>
    <text x="715" y="101" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#566573" text-anchor="middle">CIMENTO</text>`;

  const andaime = `
    <g stroke="#7f8c8d" stroke-width="5">
      <line x1="852" y1="250" x2="852" y2="470"/><line x1="988" y1="250" x2="988" y2="470"/><line x1="920" y1="300" x2="920" y2="470"/>
      <line x1="852" y1="385" x2="988" y2="385"/><line x1="852" y1="470" x2="988" y2="470"/>
      <line x1="852" y1="300" x2="920" y2="385"/><line x1="920" y1="385" x2="988" y2="470"/>
    </g>
    <g stroke="#f2c200" stroke-width="5"><line x1="852" y1="250" x2="988" y2="250"/><line x1="852" y1="274" x2="988" y2="274"/></g>
    <rect x="846" y="296" width="148" height="8" fill="#a5794c"/>
    ${C.pessoaEmPe(920, 296, { capacete: '#ffffff', colete: true, cinto: true, camisa: '#555555', maoE: [894, 252], maoD: [946, 252] })}`;

  const chuva = [];
  for (let i = 0; i < 14; i++) {
    const x = 846 + (i % 7) * 22 + (i >= 7 ? 11 : 0);
    const y = 120 + (i >= 7 ? 170 : 0) + (i % 3) * 40;
    chuva.push(`<line x1="${x}" y1="${y}" x2="${x - 8}" y2="${y + 26}"/>`);
  }

  const fundacao = (comProtetor) => {
    let s = `<rect x="450" y="520" width="220" height="30" fill="#9aa0a6" stroke="#6b7178" stroke-width="2"/>`;
    for (let x = 466; x <= 654; x += 26) {
      s += `<line x1="${x}" y1="520" x2="${x}" y2="482" stroke="#8a4b2a" stroke-width="4"/>`;
      s += comProtetor ? `<rect x="${x - 6}" y="474" width="12" height="12" rx="3" fill="#ff7a00"/>` : '';
    }
    return s;
  };

  const escadaAbrir = `
    <g stroke="#8a6236" stroke-width="5" stroke-linecap="round">
      <line x1="196" y1="550" x2="214" y2="472"/><line x1="232" y1="550" x2="214" y2="472"/>
    </g>
    <g stroke="#8a6236" stroke-width="3"><line x1="200" y1="530" x2="228" y2="530"/><line x1="204" y1="508" x2="224" y2="508"/><line x1="209" y1="490" x2="219" y2="490"/></g>
    <rect x="204" y="468" width="20" height="6" fill="#8a6236"/>`;

  const CENARIO = {
    rotulo: 'Cenário da obra: galpão com telhado, prédio com laje, fundação, escadas, andaime e trabalhadores',
    fundo: fundo,
    oks: [
      { id: 'guarda-corpo', alvo: [410, 180, 152, 72], descricao: 'Trecho esquerdo da laje, com grade amarela de três barras',
        svg: guardaCorpo(416, 560) },
      { id: 'placa', alvo: [286, 466, 128, 90], descricao: 'Placa azul de uso obrigatório de capacete', svg: `
        <rect x="346" y="518" width="6" height="36" fill="#5a6168"/>
        <rect x="290" y="470" width="120" height="50" rx="4" fill="#1f5fa6"/>
        <circle cx="312" cy="495" r="15" fill="#ffffff"/>
        <path d="M302 500 a10 10 0 0 1 20 0z" fill="#1f5fa6"/><rect x="300" y="499" width="24" height="3" fill="#1f5fa6"/>
        <g font-family="Arial, sans-serif" font-size="9.5" font-weight="700" fill="#ffffff" text-anchor="middle">
          <text x="368" y="489">USO</text><text x="368" y="501">OBRIGATÓRIO</text><text x="368" y="513">DE CAPACETE</text>
        </g>` }
    ],
    partes: [
      {
        id: 'cinto', alvo: [206, 50, 112, 192],
        descPerigo: 'Trabalhador no telhado, de cinto paraquedista laranja, com o talabarte azul pendurado na cintura',
        descSeguro: 'Trabalhador no telhado, de cinto paraquedista laranja, com o talabarte azul preso a um cabo laranja esticado sobre as telhas',
        perigo: `
          ${C.pessoaEmPe(262, 236, { capacete: '#ffc400', camisa: '#2e86c1', cinto: true, maoE: [240, 196], maoD: [290, 214] })}
          <path d="M278 152 q26 30 10 58 q-6 10 4 16" stroke="#1f5fa6" stroke-width="4" fill="none"/>
          <path d="M296 226 a6 6 0 1 1 -8 6" stroke="#8e979f" stroke-width="4" fill="none"/>`,
        seguro: `
          <rect x="198" y="182" width="6" height="20" fill="#5a6168"/><rect x="326" y="246" width="6" height="20" fill="#5a6168"/>
          <line x1="201" y1="184" x2="329" y2="248" stroke="#e8742a" stroke-width="3"/>
          ${C.pessoaEmPe(262, 236, { capacete: '#ffc400', camisa: '#2e86c1', cinto: true, maoE: [240, 196], maoD: [290, 214] })}
          <path d="M278 152 q8 30 4 62" stroke="#1f5fa6" stroke-width="4" fill="none"/>`
      },
      {
        id: 'borda', alvo: [564, 60, 152, 196],
        descPerigo: 'Trabalhador carregando um saco de cimento na beirada direita da laje; a grade amarela termina à esquerda dele',
        descSeguro: 'Trabalhador carregando um saco de cimento na beirada direita da laje, junto a uma grade amarela',
        perigo: trabalhadorCimento,
        seguro: guardaCorpo(564, 716) + trabalhadorCimento
      },
      {
        id: 'escada', alvo: [717, 268, 104, 276],
        descPerigo: 'Escada de mão de madeira com os pés sobre dois tijolos e o topo encostado na parede, abaixo da laje',
        descSeguro: 'Escada de mão de madeira com os pés numa base de concreto e o topo amarrado, passando da laje',
        perigo: `
          <rect x="748" y="524" width="54" height="14" fill="#a5432a" stroke="#6e2a1a" stroke-width="2" transform="rotate(-6 775 531)"/>
          <rect x="754" y="510" width="40" height="14" fill="#b5553c" stroke="#6e2a1a" stroke-width="2" transform="rotate(8 774 517)"/>
          ${C.escada(760, 512, 718, 276, 32, 30, '#8a6236', 8)}
          <path d="M744 536 q-10 -8 -2 -18 M812 536 q10 -8 2 -18" stroke="#d62828" stroke-width="3" fill="none"/>`,
        seguro: `
          <rect x="744" y="526" width="66" height="14" fill="#9aa0a6" stroke="#6b7178" stroke-width="2"/>
          ${C.escada(764, 526, 716, 212, 32, 30, '#8a6236', 10)}
          <path d="M720 258 q12 -8 24 0" stroke="#d4a017" stroke-width="3" fill="none"/>`
      },
      {
        id: 'material', alvo: [10, 246, 150, 306],
        descPerigo: 'Telhas e uma caixa de ferramentas na beirada do telhado; um martelo caindo em direção a uma pessoa que passa embaixo',
        descSeguro: 'Cones e fita listrada no chão, embaixo da beirada do telhado',
        perigo: `
          <rect x="34" y="280" width="40" height="10" fill="#b5553c" stroke="#7d3a28" stroke-width="1.5" transform="rotate(-29 54 285)"/>
          <rect x="80" y="252" width="26" height="14" fill="#d62828" stroke="#7a1f1f" stroke-width="1.5" transform="rotate(-29 93 259)"/>
          <g transform="rotate(35 70 340)">
            <rect x="66" y="320" width="7" height="34" fill="#8a6236"/><rect x="58" y="314" width="24" height="10" fill="#5a6168"/>
          </g>
          <path d="M60 306 v-14 M74 308 v-12" stroke="#5a6168" stroke-width="2"/>
          ${C.pessoaEmPe(96, 545, { camisa: '#8e44ad', cabelo: '#1b1b1b', pele: '#8d5a3b' })}`,
        seguro: `
          <path d="M24 512 L148 512" stroke="#d62828" stroke-width="4" stroke-dasharray="10 8"/>
          <polygon points="12,540 24,500 36,540" fill="#e8742a"/><polygon points="136,540 148,500 160,540" fill="#e8742a"/>
          <rect x="8" y="538" width="32" height="5" fill="#c0601e"/><rect x="132" y="538" width="32" height="5" fill="#c0601e"/>`
      },
      {
        id: 'pintura', alvo: [164, 262, 120, 292],
        descPerigo: 'Pintor em pé no degrau mais alto de uma escada de abrir, pintando o alto da parede',
        descSeguro: 'Pintor em pé no chão, pintando o alto da parede com um rolo de cabo longo',
        perigo: escadaAbrir + `
          ${C.pessoaEmPe(214, 470, { camisa: '#ecf0f1', calca: '#95a5a6', cabelo: '#5a3a22', maoE: [236, 318], maoD: [244, 306] })}
          <line x1="244" y1="306" x2="252" y2="300" stroke="#5a6168" stroke-width="3"/>
          <rect x="244" y="288" width="12" height="26" rx="3" fill="#ffffff" stroke="#95a5a6" stroke-width="2"/>
          <path d="M186 488 q-8 -8 0 -16 M244 488 q8 -8 0 -16" stroke="#d62828" stroke-width="3" fill="none"/>`,
        seguro: `
          ${C.pessoaEmPe(206, 550, { camisa: '#ecf0f1', calca: '#95a5a6', cabelo: '#5a3a22', maoE: [222, 420], maoD: [230, 404] })}
          <line x1="218" y1="440" x2="256" y2="312" stroke="#5a6168" stroke-width="4"/>
          <rect x="248" y="288" width="12" height="26" rx="3" fill="#ffffff" stroke="#95a5a6" stroke-width="2"/>`
      },
      {
        id: 'vergalhao', alvo: [430, 472, 256, 82],
        descPerigo: 'Fundação de concreto com oito pontas de vergalhão de aço apontando para cima',
        descSeguro: 'Fundação de concreto com oito pontas de vergalhão, cada uma com uma tampa laranja',
        perigo: fundacao(false),
        seguro: fundacao(true)
      },
      {
        id: 'clima', alvo: [832, 16, 166, 460],
        descPerigo: 'Trabalhador no alto do andaime, sob nuvem escura com raio, chuva e vento',
        descSeguro: 'Trabalhador no alto do andaime, sob sol e céu limpo',
        perigo: `
          <g fill="#5d6d7e">
            <ellipse cx="900" cy="62" rx="80" ry="30"/><ellipse cx="852" cy="80" rx="48" ry="22"/><ellipse cx="955" cy="82" rx="46" ry="24"/>
          </g>
          <polygon points="870,96 852,140 866,140 854,184 888,128 872,128 882,96" fill="#ffd43b" stroke="#e8a400" stroke-width="2"/>
          <g stroke="#5d8aa8" stroke-width="2" stroke-linecap="round">${chuva.join('')}</g>
          <path d="M840 220 q20 -10 40 0 t40 0" stroke="#7f8c8d" stroke-width="3" fill="none"/>
          ${andaime}`,
        seguro: `
          <circle cx="930" cy="70" r="28" fill="#ffd43b"/>
          <g stroke="#ffb703" stroke-width="3" stroke-linecap="round">
            <line x1="930" y1="28" x2="930" y2="36"/><line x1="888" y1="70" x2="896" y2="70"/><line x1="964" y1="70" x2="972" y2="70"/>
            <line x1="900" y1="40" x2="906" y2="46"/><line x1="960" y1="40" x2="954" y2="46"/><line x1="930" y1="104" x2="930" y2="112"/>
          </g>
          ${andaime}`
      }
    ]
  };

  Object.assign(setor, {
    disponivel: true,
    tempoInspecao: 90,
    nrs: ['NR-6', 'NR-18', 'NR-35'],
    resumo: 'Reforma do telhado e ampliação do prédio: trabalho em altura.',
    briefing: 'A empresa contratou uma reforma do telhado e a ampliação de um prédio. A obra está atrasada e a pressão para ' +
      'terminar é grande. Encontre os perigos escondidos no canteiro antes que o tempo acabe.',

    cenario: { mensagemPadrao: 'Aqui está tudo certo.', montar: (ativos) => C.montar(CENARIO, ativos) },

    naoPerigos: [
      { id: 'guarda-corpo', mensagem: 'Trecho da laje com guarda-corpo completo: travessão superior, travessão intermediário e rodapé. Tudo certo aqui!' },
      { id: 'placa', mensagem: 'Placa de uso obrigatório de capacete na entrada da obra. Tudo certo aqui!' }
    ],

    perigos: [
      {
        id: 'borda',
        nome: 'Borda da laje sem guarda-corpo',
        descricao: 'Metade da laje não tem guarda-corpo, e um trabalhador carrega um saco de cimento bem perto da beirada.',
        mensagemSeguro: 'Laje com guarda-corpo completo em toda a borda. Tudo certo aqui!',
        nrs: ['NR-35', 'NR-18'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'Ele anda perto da borda carregando peso, o que tira o equilíbrio e a visão do chão (probabilidade ' +
          'média). Uma queda dessa altura pode ser fatal (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Instalar guarda-corpo rígido em toda a borda, com travessão superior, intermediário e rodapé.',
            explicacao: 'Impede a queda de qualquer pessoa ou material, sem depender de ninguém lembrar de se prender.' },
          { nivel: 'epi', correta: false,
            texto: 'Dar um cinto paraquedista ao trabalhador e manter a borda da laje como está.',
            explicacao: 'O cinto só protege se estiver preso a uma ancoragem, e só protege quem está usando. A proteção coletiva vem antes.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Pintar uma faixa no piso a 1 metro da borda e proibir que alguém passe dela.',
            explicacao: 'A faixa avisa, mas não segura ninguém que tropece ou se desequilibre carregando peso.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Proibir qualquer pessoa na laje e subir todo o material só com o guincho até o fim da obra, mesmo que ela atrase.',
            explicacao: 'A obra precisa de gente na laje para continuar. O guarda-corpo permite trabalhar ali com segurança.' }
        ],
        porque: 'A NR-35 manda seguir uma ordem: primeiro evitar o trabalho em altura; se não der, adotar medidas que eliminem o ' +
          'risco de queda; só então medidas que reduzam as consequências da queda, como o cinto. A NR-18 exige proteção contra ' +
          'quedas nas bordas das lajes, como o guarda-corpo com travessão superior, travessão intermediário e rodapé. O ' +
          'guarda-corpo elimina o risco de queda para todos que circulam pela laje.',
        consequencia: 'O trabalhador tropeça com o saco no ombro, perde o equilíbrio e cai da laje.',
        noticia: {
          manchete: 'Servente cai de laje sem guarda-corpo em obra da Metalúrgica Horizonte',
          texto: 'Um servente que trabalhava na ampliação da Metalúrgica Horizonte caiu da laje enquanto carregava um saco de ' +
            'cimento. O trecho não tinha guarda-corpo. Ele sofreu fraturas nas pernas e na bacia e foi levado em estado grave ao ' +
            'hospital. A obra foi embargada.'
        }
      },
      {
        id: 'cinto',
        nome: 'Talabarte solto no telhado',
        descricao: 'Um trabalhador conserta o telhado usando cinto paraquedista, mas o talabarte está pendurado, sem estar preso a nenhuma ancoragem ou linha de vida.',
        mensagemSeguro: 'Trabalhador conectado a uma linha de vida no telhado. Tudo certo aqui!',
        nrs: ['NR-35', 'NR-6'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'No telhado inclinado, qualquer um pode escorregar numa telha (probabilidade média). Sem estar preso, ' +
          'o cinto não segura nada e a queda pode ser fatal (gravidade grave).',
        opcoes: [
          { nivel: 'epi', correta: true,
            texto: 'Instalar uma linha de vida no telhado e manter o talabarte sempre conectado a ela.',
            explicacao: 'O sistema contra quedas só funciona com o trabalhador conectado a uma ancoragem confiável o tempo todo.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Pedir que ele ande devagar no telhado e pise só sobre as linhas de pregos das telhas.',
            explicacao: 'Escorregar não depende só de cuidado. Sem estar preso, nada segura a queda.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Estender uma lona no chão embaixo do beiral, onde ele poderia cair.',
            explicacao: 'Uma lona no chão não amortece a queda de uma pessoa. Não é proteção.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Adiar o conserto do telhado por tempo indeterminado até alguém resolver.',
            explicacao: 'Deixar as goteiras só adia e piora o problema. Um dia alguém vai subir às pressas.' }
        ],
        porque: 'No telhado, o trabalho em altura não pode ser evitado. Quando não dá para proteger toda a área com medidas ' +
          'coletivas, a NR-35 exige um sistema de proteção individual contra quedas, com ponto de ancoragem ou linha de vida ' +
          'confiável, e que o trabalhador fique conectado durante todo o tempo de exposição. O cinto paraquedista e o talabarte ' +
          'são EPIs (NR-6), mas só funcionam conectados: sem ancoragem, o cinto não protege nada.',
        consequencia: 'O trabalhador escorrega numa telha, desliza até o beiral e cai. O cinto, solto, não impede nada.',
        noticia: {
          manchete: 'Trabalhador cai de telhado mesmo usando cinto de segurança',
          texto: 'Um telhadista que consertava a cobertura do galpão da Metalúrgica Horizonte escorregou e caiu de cerca de 6 ' +
            'metros. Ele usava cinto paraquedista, mas o talabarte não estava preso a nenhuma ancoragem. Ele está internado com ' +
            'fraturas na coluna.'
        }
      },
      {
        id: 'escada',
        nome: 'Escada de mão mal apoiada',
        descricao: 'A escada de mão está apoiada sobre tijolos soltos, sem amarração no topo, e nem chega à altura da laje.',
        mensagemSeguro: 'Escada apoiada em base firme, amarrada e passando da laje. Tudo certo aqui!',
        nrs: ['NR-18', 'NR-35'],
        referencia: { probabilidade: 1, gravidade: 1 },
        justificativaRisco: 'Os tijolos podem sair do lugar numa das subidas do dia (probabilidade média). A queda de uma escada ' +
          'costuma causar fraturas e afastamento (gravidade moderada).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Apoiar a escada em base firme, amarrá-la no topo e usar uma que passe 1 metro da laje.',
            explicacao: 'A escada fica estável para qualquer pessoa que subir e dá apoio seguro na passagem para a laje.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Pedir que um colega segure a escada lá embaixo, com as duas mãos, toda vez que alguém subir ou descer.',
            explicacao: 'Ajuda um pouco, mas a base continua sobre tijolos soltos e falta apoio no topo.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer luvas antiderrapantes para quem precisar subir pela escada.',
            explicacao: 'Luvas não seguram uma escada que escorrega na base.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Tirar a escada e levar os trabalhadores até a laje no guincho de materiais.',
            explicacao: 'Guincho de material não é feito para transportar pessoas. Isso cria um risco muito maior.' }
        ],
        porque: 'A NR-18 exige que as escadas de mão sejam apoiadas em piso resistente, presas para não escorregarem e que passem ' +
          'pelo menos 1 metro do piso superior, para dar apoio às mãos na passagem. A escada é o caminho de acesso à laje, e ' +
          'corrigir sua instalação protege todos os trabalhadores que usam esse caminho.',
        consequencia: 'Um tijolo da base se desloca, a escada escorrega e o trabalhador cai junto com ela.',
        noticia: {
          manchete: 'Escada escorrega e pedreiro cai em obra',
          texto: 'Um pedreiro que subia para a laje na obra de ampliação da Metalúrgica Horizonte caiu quando a escada escorregou ' +
            'da base improvisada com tijolos. Ele fraturou o tornozelo e o punho. A escada não estava amarrada nem passava da ' +
            'altura da laje.'
        }
      },
      {
        id: 'material',
        nome: 'Ferramentas soltas no beiral sobre a passagem',
        descricao: 'Ferramentas e telhas soltas estão na beirada do telhado, bem em cima de um caminho por onde as pessoas passam, sem isolamento da área.',
        mensagemSeguro: 'Área embaixo do beiral isolada e sinalizada. Tudo certo aqui!',
        nrs: ['NR-18', 'NR-35'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Uma ferramenta cair justo quando alguém passa não é frequente (probabilidade baixa). Mas um martelo ' +
          'caindo de vários metros pode causar traumatismo craniano (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Isolar e sinalizar a área embaixo do serviço e manter as ferramentas amarradas ao trabalhador.',
            explicacao: 'Ninguém fica na zona de queda, e as ferramentas deixam de cair.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir que qualquer pessoa que passe por baixo do telhado use capacete.',
            explicacao: 'O capacete ajuda, mas não deveria haver ninguém embaixo. E visitantes podem passar sem capacete.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Estender uma lona plástica por cima do caminho onde as pessoas passam, presa nas paredes com cordas.',
            explicacao: 'Uma lona fina não segura um martelo caindo de alguns metros e ainda esconde o perigo de quem passa.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Proibir qualquer ferramenta no telhado e fazer o conserto só com as mãos.',
            explicacao: 'Inviável: não dá para consertar um telhado sem ferramentas.' }
        ],
        porque: 'A NR-18 exige proteção contra a queda de materiais e o isolamento e a sinalização das áreas abaixo de serviços em ' +
          'altura. A NR-35 pede que a análise de risco considere o isolamento e a sinalização em volta da área de trabalho e o ' +
          'risco de queda de materiais e ferramentas. Isolar a área e prender as ferramentas impede que alguém esteja no caminho ' +
          'quando algo cair.',
        consequencia: 'Um martelo escorrega do beiral e atinge a cabeça de um funcionário que passava embaixo sem capacete.',
        noticia: {
          manchete: 'Martelo cai de telhado e atinge funcionário na cabeça',
          texto: 'Um auxiliar administrativo da Metalúrgica Horizonte foi atingido na cabeça por um martelo que caiu do telhado em ' +
            'reforma. Ele passava pela calçada, que não estava isolada. Sofreu um corte profundo e ficou em observação no hospital.'
        }
      },
      {
        id: 'clima',
        nome: 'Trabalho no andaime durante tempestade',
        descricao: 'Começou uma tempestade com raios e vento forte, mas um trabalhador continua no alto do andaime.',
        mensagemSeguro: 'Tempo bom e trabalhador protegido no andaime com guarda-corpo. Tudo certo aqui!',
        nrs: ['NR-35'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'Com chuva, o piso do andaime fica escorregadio e o vento empurra o trabalhador (probabilidade média). ' +
          'Uma queda ou uma descarga elétrica podem ser fatais (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Suspender o trabalho em altura e descer o trabalhador até a tempestade passar.',
            explicacao: 'Tira a pessoa da exposição enquanto o tempo estiver perigoso.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer uma capa de chuva e botas para ele terminar logo o serviço.',
            explicacao: 'A capa protege da chuva, não da queda nem do raio. O andaime molhado continua escorregadio.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Cobrir o andaime com uma lona para proteger o trabalhador da chuva.',
            explicacao: 'Com vento forte, a lona vira uma vela e pode até derrubar o andaime.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desmontar o andaime no meio da tempestade para ninguém mais subir nele.',
            explicacao: 'Desmontar exige ainda mais tempo lá em cima, justamente nas piores condições.' }
        ],
        porque: 'A NR-35 determina que a análise de risco considere as condições meteorológicas e que o trabalho em altura seja ' +
          'suspenso quando houver condições adversas, como chuva forte, ventania e raios. O andaime pode estar perfeito, mas com ' +
          'vento, raios e piso molhado o risco muda. A norma também garante ao trabalhador o direito de interromper a atividade ' +
          'quando perceber um risco grave e iminente.',
        consequencia: 'Uma rajada de vento desequilibra o trabalhador no piso molhado do andaime.',
        noticia: {
          manchete: 'Rajada de vento derruba trabalhador de andaime durante temporal',
          texto: 'Um pintor que trabalhava na fachada da Metalúrgica Horizonte foi derrubado por uma rajada de vento durante o ' +
            'temporal de ontem. Ele estava preso pelo cinto e ficou pendurado até ser resgatado pelos bombeiros, com escoriações. ' +
            'A previsão do tempo indicava tempestade desde a manhã.'
        }
      },
      {
        id: 'vergalhao',
        nome: 'Pontas de vergalhão sem proteção',
        descricao: 'Várias pontas de vergalhão saem do concreto de uma fundação, sem nenhuma proteção, ao lado do caminho dos trabalhadores.',
        mensagemSeguro: 'Pontas de vergalhão cobertas por protetores plásticos. Tudo certo aqui!',
        nrs: ['NR-18'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Cair ou tropeçar exatamente sobre as pontas não é comum (probabilidade baixa). Mas, se acontecer, a ' +
          'ponta de aço pode perfurar o corpo (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Cobrir todas as pontas com protetores plásticos e isolar a área em volta da fundação.',
            explicacao: 'Qualquer pessoa que tropece ali fica protegida, sem depender de atenção.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Pintar as pontas dos vergalhões de vermelho para que fiquem bem visíveis.',
            explicacao: 'Ver as pontas ajuda a desviar, mas não protege quem tropeçar ou cair sobre elas.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir botinas com biqueira e palmilha de aço de todos que precisarem passar perto da fundação.',
            explicacao: 'A palmilha protege só a sola do pé. Numa queda, a ponta pode atingir qualquer parte do corpo.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Cortar todos os vergalhões rente ao concreto para acabar com as pontas.',
            explicacao: 'Esses vergalhões ligam a fundação à próxima parte da estrutura. Cortá-los compromete a obra.' }
        ],
        porque: 'A NR-18, que trata da segurança na construção civil, exige que as pontas de vergalhões expostas sejam protegidas ' +
          'para evitar ferimentos. Protetores plásticos e o isolamento da área protegem qualquer pessoa que circule pela obra, sem ' +
          'depender de atenção. Por isso são uma medida coletiva.',
        consequencia: 'Um servente tropeça carregando uma lata de massa e cai sobre as pontas dos vergalhões.',
        noticia: {
          manchete: 'Servente se fere ao cair sobre vergalhões em obra',
          texto: 'Um servente da obra de ampliação da Metalúrgica Horizonte tropeçou e caiu sobre as pontas de vergalhões de uma ' +
            'fundação. Uma das pontas perfurou sua coxa. Ele foi levado pelo SAMU e passou por cirurgia. Os vergalhões estavam ' +
            'sem protetores.'
        }
      },
      {
        id: 'pintura',
        nome: 'Pintor no último degrau da escada',
        descricao: 'Para pintar a parte alta da parede, um pintor subiu no último degrau de uma escada de abrir, sem ter onde se segurar.',
        mensagemSeguro: 'Pintor trabalhando do chão, com rolo de cabo comprido. Tudo certo aqui!',
        nrs: ['NR-35', 'NR-18'],
        referencia: { probabilidade: 1, gravidade: 1 },
        justificativaRisco: 'No último degrau não há onde se apoiar, e o pintor estica o corpo a cada passada do rolo ' +
          '(probabilidade média). Uma queda dessa altura costuma causar torções e fraturas (gravidade moderada).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Pintar a parte alta da parede do chão mesmo, usando um rolo com cabo extensor.',
            explicacao: 'Com os pés no chão, o risco de queda deixa de existir.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Amarrar a escada de abrir na parede com uma corda para ela não balançar.',
            explicacao: 'A escada fica mais firme, mas o pintor continua no último degrau, sem apoio para as mãos.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Permitir subir no último degrau da escada só quando houver um colega segurando a base.',
            explicacao: 'O colega não impede o pintor de se desequilibrar lá em cima.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer capacete e luvas antiderrapantes para o pintor usar na escada.',
            explicacao: 'O capacete reduz o dano de uma batida, mas não evita a queda.' }
        ],
        porque: 'A lógica da NR-35, que vale para qualquer serviço em altura, é primeiro evitar subir sempre que houver outro meio ' +
          'de fazer o trabalho. Um rolo com cabo extensor permite pintar a parte alta da parede com os pés no chão: o risco de ' +
          'queda deixa de existir. Além disso, o último degrau de uma escada de abrir nunca deve ser usado para ficar em pé.',
        consequencia: 'O pintor estica o braço para alcançar o canto, a escada balança e ele cai de costas no chão.',
        noticia: {
          manchete: 'Pintor cai de escada e fratura o punho em obra',
          texto: 'Um pintor que trabalhava na obra da Metalúrgica Horizonte caiu do último degrau de uma escada de abrir enquanto ' +
            'pintava o alto de uma parede. Ele fraturou o punho ao tentar amortecer a queda e ficará afastado por cerca de 40 dias.'
        }
      }
    ],

    quiz: [
      {
        tema: 'Trabalho em altura', nr: 'NR-35',
        pergunta: 'A partir de que altura a NR-35 considera uma atividade como trabalho em altura?',
        opcoes: ['Acima de 50 centímetros', 'Acima de 1 metro', 'Acima de 2 metros do nível inferior, com risco de queda', 'Somente acima de 10 metros'],
        correta: 2,
        explicacao: 'Para a NR-35, trabalho em altura é toda atividade feita acima de 2 metros do nível inferior, onde haja risco de queda.'
      },
      {
        tema: 'Cinto de segurança', nr: 'NR-35',
        pergunta: 'Qual tipo de cinto de segurança deve ser usado para proteção contra quedas?',
        opcoes: ['Cinto abdominal (de cintura)', 'Cinto paraquedista', 'Cinto de couro comum', 'Qualquer cinto com fivela de metal'],
        correta: 1,
        explicacao: 'O cinto paraquedista distribui a força da queda pelas coxas, quadril, tronco e ombros. O cinto abdominal pode ' +
          'causar lesões graves na coluna e nos órgãos e não serve para segurar quedas.'
      },
      {
        tema: 'Planejamento', nr: 'NR-35',
        pergunta: 'Segundo a NR-35, qual é a primeira medida a considerar no planejamento de um trabalho em altura?',
        opcoes: ['Comprar cintos para todos', 'Evitar o trabalho em altura, quando houver outro meio de fazer o serviço', 'Estender uma lona no chão', 'Fazer o serviço o mais rápido possível'],
        correta: 1,
        explicacao: 'A ordem é: evitar o trabalho em altura sempre que houver outro meio; se não der, eliminar o risco de queda ' +
          '(guarda-corpo, plataformas); e só então reduzir as consequências da queda (cinto e linha de vida).'
      },
      {
        tema: 'Capacitação', nr: 'NR-35',
        pergunta: 'Com que frequência deve ser feito o treinamento periódico para trabalho em altura?',
        opcoes: ['A cada 6 meses', 'A cada 2 anos', 'A cada 10 anos', 'Não precisa repetir'],
        correta: 1,
        explicacao: 'A NR-35 exige um treinamento inicial teórico e prático de pelo menos 8 horas e um treinamento periódico a ' +
          'cada dois anos. Ele também deve ser repetido em casos como mudança nos procedimentos ou volta de um afastamento de mais de 90 dias.'
      },
      {
        tema: 'Escadas', nr: 'NR-18',
        pergunta: 'Quanto uma escada de mão deve passar do piso superior em que se apoia?',
        opcoes: ['Nada, deve ficar rente', '30 centímetros', 'Pelo menos 1 metro', '5 metros'],
        correta: 2,
        explicacao: 'A escada deve passar pelo menos 1 metro do piso superior. Assim a pessoa tem onde segurar ao passar da escada ' +
          'para a laje e na hora de voltar.'
      }
    ]
  });
})();
