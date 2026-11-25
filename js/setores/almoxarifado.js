(function () {
  'use strict';
  const C = window.CENA;
  const setor = window.JOGO_DADOS && window.JOGO_DADOS.setores.find((s) => s.id === 'almoxarifado');
  if (!C || !setor) return;

  const fundo = `
  <rect x="0" y="0" width="1000" height="342" fill="#e7e1d3"/>
  <rect x="0" y="0" width="1000" height="22" fill="#cdc5b2"/>
  <rect x="0" y="326" width="1000" height="16" fill="#b6aa92"/>
  <rect x="0" y="342" width="1000" height="218" fill="#aab0b6"/>
  <g stroke="#9ba2a9" stroke-width="2">
    <line x1="0" y1="372" x2="1000" y2="372"/><line x1="0" y1="468" x2="1000" y2="468"/>
    <line x1="160" y1="342" x2="120" y2="560"/><line x1="420" y1="342" x2="400" y2="560"/>
    <line x1="680" y1="342" x2="690" y2="560"/><line x1="900" y1="342" x2="950" y2="560"/>
  </g>
  <g fill="#4d5761">
    <rect x="215" y="22" width="80" height="9" rx="3"/><rect x="455" y="22" width="80" height="9" rx="3"/><rect x="760" y="22" width="80" height="9" rx="3"/>
  </g>
  <g fill="#fff6c9">
    <rect x="221" y="31" width="68" height="5" rx="2"/><rect x="461" y="31" width="68" height="5" rx="2"/><rect x="766" y="31" width="68" height="5" rx="2"/>
  </g>
  <rect x="600" y="52" width="170" height="36" rx="5" fill="#1b1c1e"/>
  <text x="685" y="76" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#ffc400" text-anchor="middle">ALMOXARIFADO</text>
  <g>
    <rect x="370" y="60" width="10" height="282" fill="#1f5fa6"/>
    <rect x="550" y="60" width="10" height="282" fill="#1f5fa6"/>
    <rect x="370" y="130" width="190" height="8" fill="#e8742a"/>
    <rect x="370" y="210" width="190" height="8" fill="#e8742a"/>
    <rect x="370" y="290" width="190" height="8" fill="#e8742a"/>
    <rect x="386" y="176" width="44" height="34" fill="#e6c595" stroke="#a88456" stroke-width="2"/>
    <rect x="440" y="182" width="40" height="28" fill="#e6c595" stroke="#a88456" stroke-width="2"/>
    <rect x="492" y="172" width="50" height="38" fill="#e6c595" stroke="#a88456" stroke-width="2"/>
    <text x="408" y="198" font-family="Arial, sans-serif" font-size="11" fill="#6b5232" text-anchor="middle">EPI</text>
    <rect x="384" y="244" width="76" height="46" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
    <rect x="466" y="248" width="76" height="42" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
    <rect x="388" y="302" width="150" height="40" fill="#b98448" stroke="#8a6236" stroke-width="2"/>
  </g>`;

  const portaSaida = `
    <rect x="30" y="128" width="92" height="34" rx="4" fill="#0b8a3e"/>
    <text x="76" y="151" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#ffffff" text-anchor="middle">SAÍDA</text>
    <rect x="28" y="172" width="96" height="170" fill="#56656f"/>
    <rect x="36" y="180" width="80" height="162" fill="#9fb4c0"/>
    <rect x="44" y="258" width="64" height="8" rx="3" fill="#dfe5e8" stroke="#56656f" stroke-width="2"/>`;

  const extintorParede = `
    <rect x="596" y="166" width="40" height="40" rx="3" fill="#d62828"/>
    <rect x="611" y="174" width="11" height="25" rx="4" fill="#ffffff"/>
    <path d="M622 178 q8 2 6 14" stroke="#ffffff" stroke-width="3" fill="none"/>
    <rect x="603" y="214" width="26" height="6" fill="#56606a"/>
    <rect x="609" y="220" width="14" height="10" fill="#333333"/>
    <rect x="604" y="228" width="24" height="72" rx="9" fill="#d62828"/>
    <path d="M623 224 q22 8 10 46" stroke="#222222" stroke-width="3" fill="none"/>`;

  const galao = `
    <rect x="824" y="276" width="16" height="8" rx="2" fill="#1f5fa6"/>
    <rect x="826" y="283" width="12" height="14" fill="#eef3f6" stroke="#8a98a3" stroke-width="2"/>
    <path d="M806 296 v-10 h14 v10" stroke="#8a98a3" stroke-width="4" fill="none"/>
    <rect x="798" y="295" width="46" height="49" rx="7" fill="#eef3f6" stroke="#8a98a3" stroke-width="2"/>
    <rect x="800" y="316" width="42" height="26" rx="5" fill="#9fc24a" opacity="0.55"/>`;

  const empilhadeiraBase = `
    <rect x="842" y="358" width="152" height="192" fill="none" stroke="#f2c200" stroke-width="5" stroke-dasharray="14 8"/>
    <rect x="872" y="300" width="12" height="192" fill="#3a3f45"/>
    <path d="M902 330 H966 V420" stroke="#2b2f33" stroke-width="6" fill="none"/>
    <line x1="902" y1="330" x2="902" y2="420" stroke="#2b2f33" stroke-width="6"/>
    <rect x="928" y="396" width="26" height="24" rx="4" fill="#2b2f33"/>
    <path d="M890 420 H986 V492 H890 Z" fill="#f5b700" stroke="#9c7400" stroke-width="2"/>
    <rect x="958" y="410" width="30" height="82" rx="4" fill="#d99c00"/>
    <circle cx="914" cy="494" r="21" fill="#222222"/><circle cx="914" cy="494" r="8" fill="#9aa0a6"/>
    <circle cx="966" cy="496" r="18" fill="#222222"/><circle cx="966" cy="496" r="7" fill="#9aa0a6"/>`;

  function funcionarioCaixas(calcado) {
    const sapatos = calcado === 'tenis'
      ? `<rect x="233" y="482" width="27" height="13" rx="6" fill="#e63946"/>
         <rect x="231" y="492" width="31" height="6" rx="2" fill="#ffffff" stroke="#bbbbbb"/>
         <rect x="254" y="482" width="27" height="13" rx="6" fill="#e63946"/>
         <rect x="252" y="492" width="31" height="6" rx="2" fill="#ffffff" stroke="#bbbbbb"/>`
      : `<rect x="236" y="472" width="22" height="24" rx="4" fill="#1b1b1b"/>
         <rect x="256" y="472" width="22" height="24" rx="4" fill="#1b1b1b"/>
         <rect x="233" y="492" width="27" height="6" rx="2" fill="#4a4a4a"/>
         <rect x="253" y="492" width="27" height="6" rx="2" fill="#4a4a4a"/>`;
    return `
    <rect x="241" y="420" width="13" height="66" fill="#2d3e5c"/>
    <rect x="258" y="420" width="13" height="66" fill="#2d3e5c"/>
    ${sapatos}
    <rect x="236" y="344" width="40" height="82" rx="10" fill="#4f86c6"/>
    <rect x="228" y="356" width="11" height="44" rx="5" fill="#c98e63"/>
    <rect x="273" y="356" width="11" height="44" rx="5" fill="#c98e63"/>
    <rect x="224" y="372" width="64" height="46" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
    <line x1="224" y1="392" x2="288" y2="392" stroke="#8a6236" stroke-width="2"/>
    <circle cx="256" cy="326" r="18" fill="#c98e63"/>
    <path d="M238 322 a18 18 0 0 1 36 0 z" fill="#3b2a1e"/>`;
  }

  const CENARIO = {
    rotulo: 'Cenário do almoxarifado: prateleiras, caixas, extintor, armário de produtos, empilhadeira, saída de emergência e funcionários',
    fundo: fundo,
    oks: [
      { id: 'corredor', descricao: 'Corredor de circulação com faixas amarelas pintadas no piso', alvo: [0, 388, 834, 164], svg: `
        <rect x="0" y="392" width="832" height="9" fill="#f2c200"/>
        <rect x="0" y="540" width="832" height="9" fill="#f2c200"/>
        <path d="M640 466 h60 v-13 l28 21 l-28 21 v-13 h-60 z" fill="#f4f4f4" opacity="0.85"/>` },
      { id: 'armario', descricao: 'Armário amarelo com símbolos de perigo e uma ficha FDS colada na porta', alvo: [690, 172, 100, 172], svg: `
        <rect x="694" y="176" width="92" height="166" rx="3" fill="#f2c200" stroke="#8b7300" stroke-width="2"/>
        <line x1="740" y1="180" x2="740" y2="338" stroke="#8b7300" stroke-width="2"/>
        <rect x="732" y="246" width="4" height="20" fill="#5a4a00"/><rect x="744" y="246" width="4" height="20" fill="#5a4a00"/>
        <rect x="701" y="196" width="32" height="32" fill="#ffffff" stroke="#d62828" stroke-width="3" transform="rotate(45 717 212)"/>
        <text x="717" y="219" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#d62828" text-anchor="middle">!</text>
        <rect x="747" y="196" width="32" height="32" fill="#ffffff" stroke="#d62828" stroke-width="3" transform="rotate(45 763 212)"/>
        <path d="M763 222 q-8 -6 -2 -16 q2 6 6 4 q2 -6 -2 -10 q10 6 6 16 q-2 6 -8 6z" fill="#d62828"/>
        <rect x="702" y="290" width="30" height="36" fill="#ffffff" stroke="#8b7300" stroke-width="1.5"/>
        <text x="717" y="313" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#1b1c1e" text-anchor="middle">FDS</text>` },
      { id: 'epi', descricao: 'Funcionário carregando uma caixa, de capacete, colete refletivo, luvas e botina', alvo: [440, 300, 72, 202], svg: `
        <rect x="461" y="420" width="13" height="52" fill="#3a4048"/>
        <rect x="478" y="420" width="13" height="52" fill="#3a4048"/>
        <rect x="456" y="466" width="21" height="28" rx="4" fill="#1b1b1b"/>
        <rect x="476" y="466" width="21" height="28" rx="4" fill="#1b1b1b"/>
        <rect x="454" y="492" width="25" height="6" rx="2" fill="#4a4a4a"/>
        <rect x="474" y="492" width="25" height="6" rx="2" fill="#4a4a4a"/>
        <rect x="456" y="344" width="40" height="82" rx="10" fill="#3c6e47"/>
        <rect x="459" y="348" width="34" height="66" rx="6" fill="#ff7a00"/>
        <rect x="459" y="370" width="34" height="5" fill="#e8e8e8"/>
        <rect x="459" y="392" width="34" height="5" fill="#e8e8e8"/>
        <rect x="448" y="356" width="11" height="40" rx="5" fill="#3c6e47"/>
        <rect x="493" y="356" width="11" height="40" rx="5" fill="#3c6e47"/>
        <rect x="446" y="384" width="60" height="36" fill="#e6c595" stroke="#a88456" stroke-width="2"/>
        <rect x="443" y="388" width="10" height="16" rx="3" fill="#8e979f"/>
        <rect x="499" y="388" width="10" height="16" rx="3" fill="#8e979f"/>
        <circle cx="476" cy="328" r="17" fill="#8d5a3b"/>
        <path d="M456 324 a20 20 0 0 1 40 0 z" fill="#ffffff" stroke="#b5b5b5" stroke-width="1.5"/>
        <rect x="452" y="321" width="48" height="6" rx="3" fill="#ffffff" stroke="#b5b5b5" stroke-width="1.5"/>` }
    ],
    partes: [
      {
        id: 'saida', alvo: [22, 122, 108, 222],
        descPerigo: 'Porta verde de saída de emergência; na frente dela, quatro caixas empilhadas',
        descSeguro: 'Porta verde de saída de emergência; na frente dela, o piso do corredor',
        seguro: portaSaida,
        perigo: portaSaida + `
          <rect x="26" y="290" width="60" height="52" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="70" y="282" width="56" height="60" fill="#b98448" stroke="#8a6236" stroke-width="2"/>
          <rect x="34" y="240" width="54" height="50" fill="#d2a06a" stroke="#8a6236" stroke-width="2"/>
          <rect x="76" y="236" width="44" height="46" fill="#c8955c" stroke="#8a6236" stroke-width="2" transform="rotate(5 98 259)"/>`
      },
      {
        id: 'prateleira', alvo: [134, 24, 222, 320],
        descPerigo: 'Prateleira laranja com caixas em quatro níveis até o topo; a barra azul do meio está curvada para baixo',
        descSeguro: 'Prateleira laranja com caixas em quatro níveis; no alto, uma placa “carga máxima 200 kg”',
        perigo: `
          <rect x="140" y="60" width="10" height="282" fill="#e8742a"/>
          <rect x="340" y="60" width="10" height="282" fill="#e8742a"/>
          <rect x="162" y="38" width="52" height="40" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="232" y="28" width="66" height="50" fill="#b98448" stroke="#8a6236" stroke-width="2"/>
          <rect x="151" y="80" width="56" height="50" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="208" y="76" width="64" height="54" fill="#d2a06a" stroke="#8a6236" stroke-width="2"/>
          <rect x="273" y="82" width="66" height="48" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="140" y="130" width="210" height="8" fill="#1f5fa6"/>
          <rect x="152" y="148" width="58" height="68" fill="#b98448" stroke="#8a6236" stroke-width="2" transform="rotate(4 181 182)"/>
          <rect x="213" y="156" width="72" height="68" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="286" y="150" width="54" height="68" fill="#d2a06a" stroke="#8a6236" stroke-width="2" transform="rotate(-4 313 184)"/>
          <path d="M145 212 Q245 246 345 212" stroke="#1f5fa6" stroke-width="9" fill="none"/>
          <rect x="152" y="236" width="60" height="54" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="214" y="232" width="64" height="58" fill="#b98448" stroke="#8a6236" stroke-width="2"/>
          <rect x="280" y="240" width="58" height="50" fill="#d2a06a" stroke="#8a6236" stroke-width="2"/>
          <rect x="140" y="290" width="210" height="8" fill="#1f5fa6"/>
          <rect x="152" y="300" width="88" height="42" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="244" y="296" width="94" height="46" fill="#b98448" stroke="#8a6236" stroke-width="2"/>`,
        seguro: `
          <rect x="140" y="60" width="10" height="282" fill="#e8742a"/>
          <rect x="340" y="60" width="10" height="282" fill="#e8742a"/>
          <rect x="140" y="130" width="210" height="8" fill="#1f5fa6"/>
          <rect x="140" y="210" width="210" height="8" fill="#1f5fa6"/>
          <rect x="140" y="290" width="210" height="8" fill="#1f5fa6"/>
          <rect x="160" y="96" width="56" height="34" fill="#d2a06a" stroke="#8a6236" stroke-width="2"/>
          <rect x="230" y="100" width="50" height="30" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="160" y="170" width="64" height="40" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="250" y="176" width="70" height="34" fill="#b98448" stroke="#8a6236" stroke-width="2"/>
          <rect x="160" y="248" width="70" height="42" fill="#b98448" stroke="#8a6236" stroke-width="2"/>
          <rect x="252" y="252" width="66" height="38" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="160" y="302" width="80" height="40" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="288" y="64" width="48" height="28" fill="#ffffff" stroke="#1b1c1e" stroke-width="2"/>
          <text x="312" y="76" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#1b1c1e" text-anchor="middle">CARGA MÁX.</text>
          <text x="312" y="87" font-family="Arial, sans-serif" font-size="9" font-weight="700" fill="#d62828" text-anchor="middle">200 kg</text>`
      },
      {
        id: 'carga-alta', alvo: [374, 64, 182, 70],
        descPerigo: 'Nível mais alto da prateleira azul: três caixas metálicas marcadas 30 kg, 28 kg e 25 kg',
        descSeguro: 'Nível mais alto da prateleira azul: três caixas de papelão marcadas 2 kg, 1 kg e 2 kg',
        perigo: `
          <rect x="382" y="78" width="54" height="52" fill="#6f7780" stroke="#454b52" stroke-width="2"/>
          <rect x="440" y="72" width="56" height="58" fill="#7d858e" stroke="#454b52" stroke-width="2"/>
          <rect x="500" y="82" width="48" height="48" fill="#6f7780" stroke="#454b52" stroke-width="2"/>
          <text x="409" y="109" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">30 kg</text>
          <text x="468" y="106" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">28 kg</text>
          <text x="524" y="111" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">25 kg</text>`,
        seguro: `
          <rect x="384" y="92" width="50" height="38" fill="#efd9b4" stroke="#a88456" stroke-width="2"/>
          <rect x="444" y="88" width="50" height="42" fill="#efd9b4" stroke="#a88456" stroke-width="2"/>
          <rect x="502" y="96" width="44" height="34" fill="#efd9b4" stroke="#a88456" stroke-width="2"/>
          <text x="409" y="116" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#6b5232" text-anchor="middle">2 kg</text>
          <text x="469" y="114" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#6b5232" text-anchor="middle">1 kg</text>
          <text x="524" y="118" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#6b5232" text-anchor="middle">2 kg</text>`
      },
      {
        id: 'extintor', alvo: [560, 160, 128, 184],
        descPerigo: 'Extintor vermelho na parede; logo abaixo e na frente dele, duas pilhas de caixas',
        descSeguro: 'Extintor vermelho na parede; abaixo dele, o piso pintado com listras vermelhas e brancas',
        perigo: extintorParede + `
          <rect x="566" y="250" width="66" height="92" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="626" y="272" width="56" height="70" fill="#b98448" stroke="#8a6236" stroke-width="2"/>
          <line x1="566" y1="290" x2="632" y2="290" stroke="#8a6236" stroke-width="2"/>`,
        seguro: extintorParede + `
          <rect x="584" y="326" width="64" height="16" fill="#d62828"/>
          <g stroke="#ffffff" stroke-width="3"><line x1="592" y1="342" x2="604" y2="326"/><line x1="608" y1="342" x2="620" y2="326"/><line x1="624" y1="342" x2="636" y2="326"/></g>`
      },
      {
        id: 'galao', alvo: [788, 266, 66, 82],
        descPerigo: 'Galão branco com líquido verde, no chão, ao lado do armário amarelo',
        descSeguro: 'Galão branco com líquido verde e uma etiqueta com losango vermelho, no chão, ao lado do armário amarelo',
        perigo: galao,
        seguro: galao + `
          <rect x="804" y="300" width="34" height="16" fill="#ffffff" stroke="#8a98a3" stroke-width="1"/>
          <rect x="808" y="303" width="10" height="10" fill="#ffffff" stroke="#d62828" stroke-width="2" transform="rotate(45 813 308)"/>
          <line x1="822" y1="305" x2="835" y2="305" stroke="#1b1c1e" stroke-width="2"/><line x1="822" y1="311" x2="832" y2="311" stroke="#1b1c1e" stroke-width="2"/>`
      },
      {
        id: 'empilhadeira', alvo: [856, 240, 140, 312],
        descPerigo: 'Empilhadeira estacionada na vaga, com os garfos lá no alto segurando um palete de caixas',
        descSeguro: 'Empilhadeira estacionada na vaga, com os garfos encostados no chão',
        perigo: empilhadeiraBase + `
          <rect x="846" y="330" width="44" height="8" fill="#3a3f45"/>
          <rect x="842" y="318" width="52" height="12" fill="#8a6236"/>
          <rect x="846" y="274" width="44" height="44" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
          <rect x="852" y="246" width="34" height="28" fill="#b98448" stroke="#8a6236" stroke-width="2"/>`,
        seguro: empilhadeiraBase + `<rect x="846" y="486" width="44" height="8" fill="#3a3f45"/>`
      },
      {
        id: 'calcado', alvo: [220, 346, 72, 156],
        descPerigo: 'Funcionário carregando uma caixa, de camiseta azul, calça e tênis vermelho de sola branca',
        descSeguro: 'Funcionário carregando uma caixa, de camiseta azul, calça e botina preta',
        perigo: funcionarioCaixas('tenis'),
        seguro: funcionarioCaixas('botina')
      }
    ]
  };

  Object.assign(setor, {
    tempoInspecao: 90,
    briefing: 'O gerente do almoxarifado pediu uma inspeção urgente: a equipe anda reclamando de dores e de ' +
      '“coisas fora do lugar”. Encontre os perigos escondidos no setor antes que o tempo acabe.',

    cenario: {
      mensagemPadrao: 'Aqui está tudo certo.',
      montar: (ativos) => C.montar(CENARIO, ativos)
    },

    naoPerigos: [
      { id: 'corredor', mensagem: 'Corredor de circulação demarcado no piso e livre. Tudo certo aqui!' },
      { id: 'armario', mensagem: 'Armário de produtos químicos sinalizado, com a FDS disponível. Tudo certo aqui!' },
      { id: 'epi', mensagem: 'Funcionário com capacete, colete refletivo, luvas e botina de segurança. Tudo certo aqui!' }
    ],

    perigos: [
      {
        id: 'calcado',
        nome: 'Funcionário de tênis manuseando caixas',
        descricao: 'Um funcionário carrega caixas usando tênis comum, sem calçado de segurança.',
        mensagemSeguro: 'Funcionário carregando caixas com botina de segurança. Tudo certo aqui!',
        nrs: ['NR-6'],
        referencia: { probabilidade: 1, gravidade: 1 },
        justificativaRisco: 'Caixas escorregam das mãos com alguma frequência no dia a dia (probabilidade média). ' +
          'Uma queda sobre o pé desprotegido pode causar fratura e afastamento, mas raramente deixa lesão permanente (gravidade moderada).',
        opcoes: [
          { nivel: 'epi', correta: true,
            texto: 'Fornecer de graça calçado de segurança com biqueira, orientar sobre o uso e exigir que seja usado.',
            explicacao: 'O EPI adequado, fornecido sem custo e com uso exigido, protege os pés contra a queda de objetos.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Proibir todo manuseio manual de caixas e fazer qualquer movimentação só com a empilhadeira.',
            explicacao: 'Parece eliminar o risco, mas é inviável: caixas pequenas sempre exigem manuseio com as mãos, e usar a empilhadeira em tudo traz riscos de colisão e atropelamento.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Cobrir o piso do almoxarifado com tapetes de borracha para amortecer a queda das caixas que escorregarem das mãos.',
            explicacao: 'O tapete não impede que uma caixa pesada atinja o pé e ainda pode criar risco de tropeço nas emendas.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Afixar cartazes pedindo atenção redobrada e cuidado ao carregar caixas pelo setor.',
            explicacao: 'Avisos ajudam, mas dependem só da atenção da pessoa. Uma caixa pode escapar mesmo com cuidado, e o pé continua desprotegido.' }
        ],
        porque: 'A hierarquia de controle manda tentar primeiro eliminar o risco ou usar proteção coletiva. Aqui, porém, ' +
          'o risco de queda de objetos sobre os pés no manuseio de cargas não pode ser eliminado por completo: sempre haverá ' +
          'caixas pegas com as mãos. Por isso o EPI é a medida certa neste caso. A NR-6 determina que a empresa forneça ' +
          'gratuitamente o EPI adequado ao risco, oriente sobre o uso correto e exija que ele seja usado. O equipamento ' +
          'precisa ter Certificado de Aprovação (CA).',
        consequencia: 'Uma caixa escorrega das mãos e cai sobre o pé. Com tênis comum, isso pode causar fratura nos dedos ' +
          'e afastamento do trabalho por semanas.',
        noticia: {
          manchete: 'Auxiliar de almoxarifado fratura dedo do pé ao deixar caixa cair',
          texto: 'Um funcionário da Metalúrgica Horizonte foi atendido no pronto-socorro depois que uma caixa de peças ' +
            'escorregou e caiu sobre seu pé. Ele trabalhava de tênis, sem calçado de segurança, e ficará afastado por ' +
            'cerca de 30 dias. A empresa informou que vai rever a entrega e a cobrança do uso de EPI.'
        }
      },
      {
        id: 'extintor',
        nome: 'Extintor bloqueado por caixas',
        descricao: 'Pilhas de caixas foram deixadas na frente do extintor de incêndio.',
        mensagemSeguro: 'Extintor sinalizado, com o piso demarcado à frente e acesso livre. Tudo certo aqui!',
        nrs: ['NR-23'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Um princípio de incêndio não é algo frequente (probabilidade baixa). Mas, se acontecer e o ' +
          'extintor não puder ser alcançado, o fogo pode se espalhar e colocar vidas em risco (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Tirar as caixas, demarcar no piso a área que deve ficar livre e incluir o item na inspeção de rotina.',
            explicacao: 'Libera o acesso agora e cria uma rotina para o problema não voltar.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Eliminar as fontes de ignição proibindo qualquer equipamento elétrico dentro do almoxarifado.',
            explicacao: 'Inviável: o setor precisa de iluminação e equipamentos. E o extintor continuaria bloqueado.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar um segundo extintor, sinalizado e com acesso livre, em outra parede do setor e deixar o atual como está.',
            explicacao: 'Um extintor a mais pode ajudar, mas o primeiro continua inacessível e o hábito de bloquear equipamentos de emergência permanece.' },
          { nivel: 'epi', correta: false,
            texto: 'Entregar luvas resistentes ao calor para toda a equipe do almoxarifado usar em emergências.',
            explicacao: 'Luvas não apagam incêndio. Sem acesso rápido ao extintor, um princípio de fogo pode sair do controle.' }
        ],
        porque: 'O extintor só protege se puder ser alcançado em poucos segundos. A NR-23 trata da proteção contra ' +
          'incêndios e, junto com as normas do Corpo de Bombeiros do estado, exige equipamentos de combate a incêndio ' +
          'sinalizados e com acesso livre. Demarcar o piso e incluir o item na inspeção periódica é uma medida ' +
          'administrativa simples que impede que as caixas voltem para lá.',
        consequencia: 'Num princípio de incêndio, a equipe perde minutos preciosos tirando caixas da frente. Nesse tempo, ' +
          'um foco pequeno pode virar um incêndio que destrói o estoque e põe pessoas em risco.',
        noticia: {
          manchete: 'Princípio de incêndio atinge almoxarifado; extintor estava bloqueado por caixas',
          texto: 'Um curto-circuito em uma tomada provocou fogo no almoxarifado da Metalúrgica Horizonte. Os funcionários ' +
            'demoraram a chegar ao extintor, que estava atrás de pilhas de caixas, e o Corpo de Bombeiros precisou ser ' +
            'chamado. Ninguém se feriu, mas parte do estoque foi perdida e o setor ficou interditado por uma semana.'
        }
      },
      {
        id: 'prateleira',
        nome: 'Prateleira sobrecarregada e envergada',
        descricao: 'Uma prateleira está lotada além do limite, com a longarina envergando e sem placa de carga máxima.',
        mensagemSeguro: 'Prateleira com a carga bem distribuída e placa de carga máxima. Tudo certo aqui!',
        nrs: ['NR-11', 'NR-26'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'A estrutura já está envergada, então o colapso é uma possibilidade real (probabilidade média). ' +
          'Se ceder, várias caixas caem de uma vez sobre quem estiver no corredor (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Redistribuir o peso dentro da capacidade da estrutura e afixar placa com a carga máxima por nível.',
            explicacao: 'Tira o excesso de peso da estrutura e deixa claro para todos o limite que não pode ser ultrapassado.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desmontar a prateleira de vez e passar a empilhar todas as caixas diretamente no chão.',
            explicacao: 'Troca um risco por outros: pilhas altas no chão ficam instáveis, ocupam os corredores e obrigam a pegar peso agachado.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Avisar a equipe para não passar perto dessa prateleira e colocar fita zebrada na frente dela até alguém ter tempo de arrumá-la.',
            explicacao: 'A estrutura continua sobrecarregada. Mais cedo ou mais tarde alguém vai precisar passar ou pegar algo ali.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir que todos que circulam pelo almoxarifado usem capacete o tempo todo.',
            explicacao: 'O capacete não segura uma prateleira que desaba. Ele é complemento, nunca substituto de corrigir a sobrecarga.' }
        ],
        porque: 'A NR-11 trata da armazenagem de materiais e determina que a carga não ultrapasse a capacidade das ' +
          'estruturas. A NR-26 trata da sinalização de segurança, como a placa de carga máxima. Redistribuir o peso e ' +
          'sinalizar o limite protege todos que circulam pelo corredor, não uma pessoa só: por isso é uma proteção ' +
          'coletiva. A longarina envergada também deve ser avaliada e, se estiver danificada, substituída.',
        consequencia: 'A longarina cede e as caixas despencam no corredor. Quem estiver passando pode ser atingido, além ' +
          'do prejuízo com o material danificado.',
        noticia: {
          manchete: 'Prateleira sobrecarregada cede e derruba estoque em corredor',
          texto: 'Uma prateleira do almoxarifado da Metalúrgica Horizonte cedeu sob o peso das caixas na manhã de ontem. ' +
            'Um funcionário que passava pelo corredor foi atingido no ombro, levado ao pronto-atendimento, medicado e ' +
            'liberado. A estrutura não tinha placa de carga máxima e já apresentava sinais de deformação.'
        }
      },
      {
        id: 'carga-alta',
        nome: 'Caixas pesadas na prateleira mais alta',
        descricao: 'Caixas de 25 a 30 kg estão guardadas no nível mais alto da prateleira, acima da altura dos ombros.',
        mensagemSeguro: 'Só caixas leves no nível mais alto da prateleira. Tudo certo aqui!',
        nrs: ['NR-17'],
        referencia: { probabilidade: 2, gravidade: 1 },
        justificativaRisco: 'As caixas são retiradas do alto várias vezes por dia (probabilidade alta). Levantar peso acima ' +
          'dos ombros causa lesões de coluna e ombro que costumam ser tratáveis, mas podem levar a afastamento (gravidade moderada).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Reorganizar: itens pesados entre a altura dos joelhos e a dos ombros, e só itens leves no alto.',
            explicacao: 'Acaba com a necessidade de levantar peso acima dos ombros, que é a raiz do problema.' },
          { nivel: 'epi', correta: false,
            texto: 'Entregar luvas antiderrapantes para melhorar a pegada nas caixas guardadas no alto.',
            explicacao: 'Luvas melhoram a pegada, mas o esforço de levantar 30 kg acima da cabeça continua igual.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Treinar a equipe em técnicas de levantamento de carga e pedir cuidado ao pegar caixas no alto.',
            explicacao: 'O treinamento é útil, mas não muda o peso nem a altura. A postura forçada continua acontecendo várias vezes ao dia.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar uma tela na frente da prateleira para segurar as caixas que escorregarem.',
            explicacao: 'Ajuda contra a queda de material, mas não resolve o esforço excessivo de tirar e colocar as caixas no alto.' }
        ],
        porque: 'A NR-17 trata da ergonomia e pede que o trabalho seja adaptado às características das pessoas, evitando ' +
          'esforços excessivos e posturas forçadas. Levantar peso acima dos ombros sobrecarrega a coluna e os ombros. ' +
          'Guardando o que é pesado entre a altura dos joelhos e a dos ombros, esse levantamento deixa de existir: isso ' +
          'é eliminação, o nível mais eficaz da hierarquia. Dar luvas ou pedir cuidado deixaria o risco no mesmo lugar.',
        consequencia: 'Depois de semanas tirando caixas pesadas do alto, um funcionário desenvolve uma lesão no ombro ou ' +
          'na coluna. Também existe o risco de a caixa escapar das mãos e cair sobre ele.',
        noticia: {
          manchete: 'Funcionário é afastado por lesão no ombro após meses erguendo caixas pesadas',
          texto: 'Um auxiliar do almoxarifado da Metalúrgica Horizonte foi afastado por lesão no ombro. Segundo colegas, ' +
            'ele retirava várias vezes por dia caixas de até 30 kg guardadas na prateleira mais alta. O médico do trabalho ' +
            'recomendou reorganizar o estoque e fazer uma análise ergonômica do setor.'
        }
      },
      {
        id: 'galao',
        nome: 'Galão de produto químico sem rótulo',
        descricao: 'Um galão com líquido foi deixado num canto, sem nenhuma identificação do produto.',
        mensagemSeguro: 'Galão rotulado, com a identificação do produto e os perigos. Tudo certo aqui!',
        nrs: ['NR-26'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'Sem rótulo, é bem possível que alguém use, mova ou descarte o produto do jeito errado ' +
          '(probabilidade média). Dependendo do que for, pode causar queimaduras químicas, intoxicação ou incêndio (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Identificar o produto, rotulá-lo, deixar a FDS acessível e guardá-lo no armário de produtos químicos.',
            explicacao: 'Todos passam a saber o que é o produto, quais são os perigos e o que fazer em caso de acidente.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Descartar o galão no lixo comum, já que ninguém sabe dizer o que tem dentro dele.',
            explicacao: 'Descartar um produto desconhecido no lixo comum pode causar contaminação, reação com outros resíduos ou ferir quem recolhe o lixo. Primeiro é preciso saber o que é.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar um exaustor no canto onde o galão está, para tirar possíveis vapores do ar.',
            explicacao: 'Sem saber qual é o produto, não dá para saber se a exaustão resolve. E o galão continua sem identificação para quem for usá-lo.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir luvas de borracha e máscara com filtro de qualquer pessoa que precisar mexer no galão ou passar perto dele.',
            explicacao: 'Sem conhecer o produto, não há como escolher a luva e o filtro certos. O EPI errado dá uma falsa sensação de proteção.' }
        ],
        porque: 'A NR-26 exige que os produtos químicos sejam classificados e rotulados conforme seus perigos e que a ' +
          'Ficha com Dados de Segurança (FDS) fique disponível para os trabalhadores. O rótulo diz o que é o produto, ' +
          'quais são os perigos e os cuidados; a FDS explica primeiros socorros, armazenamento e o que fazer em ' +
          'vazamentos. Sem essas informações, nenhuma outra medida pode ser escolhida com segurança.',
        consequencia: 'Alguém usa o líquido achando que é outro produto, ou o mistura com algo incompatível. Pode haver ' +
          'irritação na pele, nos olhos e nas vias respiratórias, ou até um princípio de incêndio.',
        noticia: {
          manchete: 'Funcionária passa mal após usar produto químico sem rótulo',
          texto: 'Uma funcionária da Metalúrgica Horizonte usou o líquido de um galão sem identificação achando que era ' +
            'detergente. O produto era um desengraxante corrosivo. Ela teve irritação na pele e nas vias respiratórias, ' +
            'foi atendida e passa bem. Quando o socorro chegou, ninguém sabia informar qual era o produto.'
        }
      },
      {
        id: 'empilhadeira',
        nome: 'Empilhadeira parada com a carga erguida',
        descricao: 'A empilhadeira foi estacionada com os garfos erguidos, segurando um palete com caixas no alto.',
        mensagemSeguro: 'Empilhadeira estacionada na vaga demarcada, com os garfos abaixados. Tudo certo aqui!',
        nrs: ['NR-11'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Não é comum alguém ficar embaixo dos garfos de uma empilhadeira parada (probabilidade baixa). ' +
          'Mas, se o palete escorregar ou o sistema hidráulico ceder, a carga cai sobre quem estiver perto (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Adotar e treinar o procedimento de estacionamento: garfos no chão, sem carga, motor desligado e chave retirada.',
            explicacao: 'Nenhuma carga fica suspensa sem necessidade e ninguém liga a máquina sem autorização.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar uma grade com portão em volta da vaga, para ninguém passar perto, e deixar a empilhadeira parada com a carga no alto.',
            explicacao: 'A grade afasta as pessoas, mas a carga continua suspensa sem motivo e pode cair quando alguém for operar a máquina.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir capacete de todos que passarem perto da empilhadeira enquanto ela estiver estacionada.',
            explicacao: 'Um capacete não segura um palete com caixas caindo de mais de um metro de altura.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Trocar a empilhadeira por paleteiras manuais em todo o almoxarifado.',
            explicacao: 'Elimina a carga erguida, mas impede o uso das prateleiras altas e aumenta muito o esforço físico da equipe.' }
        ],
        porque: 'A NR-11 trata do transporte e da movimentação de materiais e exige que os operadores de equipamentos como a ' +
          'empilhadeira sejam capacitados. Um procedimento básico de segurança é estacionar com os garfos apoiados no chão, ' +
          'sem carga, com o equipamento desligado e a chave retirada. É uma medida administrativa simples, que acaba com a ' +
          'carga suspensa e impede o uso por quem não é habilitado.',
        consequencia: 'O palete escorrega dos garfos e as caixas caem sobre um funcionário que passava ao lado da empilhadeira.',
        noticia: {
          manchete: 'Palete despenca de empilhadeira estacionada e atinge funcionário',
          texto: 'Um auxiliar do almoxarifado da Metalúrgica Horizonte foi atingido por caixas que caíram de um palete deixado ' +
            'no alto dos garfos de uma empilhadeira estacionada. Ele teve ferimentos no ombro e nas costas e foi levado ao ' +
            'hospital. O operador tinha saído para o almoço sem abaixar os garfos.'
        }
      },
      {
        id: 'saida',
        nome: 'Saída de emergência bloqueada por caixas',
        descricao: 'Caixas foram empilhadas na frente da porta de saída de emergência, bloqueando a passagem.',
        mensagemSeguro: 'Saída de emergência sinalizada e desobstruída. Tudo certo aqui!',
        nrs: ['NR-23'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Uma emergência que obrigue a evacuar o setor não é frequente (probabilidade baixa). Mas, se ' +
          'acontecer, pessoas podem ficar presas no meio da fumaça (gravidade grave).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Tirar as caixas da frente da porta e guardá-las numa área de estoque demarcada, fora da rota de fuga.',
            explicacao: 'A obstrução deixa de existir e a saída volta a ficar livre.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Afixar um aviso na porta dizendo que, numa emergência, é preciso tirar as caixas antes de sair.',
            explicacao: 'Numa emergência ninguém tem tempo de mover caixas. A saída precisa estar livre o tempo todo.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar iluminação de emergência sobre a porta, mantendo as caixas onde estão.',
            explicacao: 'A iluminação ajuda a achar a saída, mas de nada serve se a porta estiver bloqueada.' },
          { nivel: 'epi', correta: false,
            texto: 'Distribuir máscaras de fuga para a equipe usar se precisar procurar outra saída.',
            explicacao: 'A máscara não abre caminho. Sem uma saída livre, a equipe pode ficar presa.' }
        ],
        porque: 'A NR-23 exige que os locais de trabalho tenham saídas suficientes para a retirada rápida e segura das ' +
          'pessoas, e que essas saídas fiquem sinalizadas e desobstruídas. Retirar as caixas e guardá-las em outro lugar ' +
          'elimina o bloqueio. Como o problema costuma voltar, também vale incluir a porta na inspeção de rotina.',
        consequencia: 'Num princípio de incêndio, a equipe corre para a saída de emergência e encontra a porta bloqueada pelas caixas.',
        noticia: {
          manchete: 'Funcionários ficam presos em almoxarifado com saída de emergência bloqueada',
          texto: 'Durante um princípio de incêndio na Metalúrgica Horizonte, três funcionários do almoxarifado não ' +
            'conseguiram usar a saída de emergência, bloqueada por caixas. Eles saíram pela porta principal, atravessando ' +
            'a fumaça, e foram atendidos por inalação. O Corpo de Bombeiros notificou a empresa.'
        }
      }
    ],

    quiz: [
      {
        tema: 'EPI',
        nr: 'NR-6',
        pergunta: 'Segundo a NR-6, quem paga pelo Equipamento de Proteção Individual (EPI) do trabalhador?',
        opcoes: [
          'O próprio trabalhador, com desconto no salário',
          'A empresa, que deve fornecê-lo gratuitamente',
          'O sindicato da categoria',
          'Empresa e trabalhador dividem o custo'
        ],
        correta: 1,
        explicacao: 'A empresa deve fornecer gratuitamente o EPI adequado ao risco, em perfeito estado, orientar sobre o ' +
          'uso e exigir que ele seja usado. O trabalhador, por sua vez, deve usar e conservar o equipamento.'
      },
      {
        tema: 'Extintores',
        nr: 'NR-23',
        pergunta: 'Qual destas situações está correta para um extintor no local de trabalho?',
        opcoes: [
          'Guardado num armário trancado para não sumir',
          'Atrás das caixas, protegido de batidas',
          'Sinalizado, visível e com acesso livre',
          'Em qualquer lugar, desde que esteja carregado'
        ],
        correta: 2,
        explicacao: 'Numa emergência, cada segundo conta. O extintor precisa estar sinalizado, à vista e sem nada na ' +
          'frente. Um extintor carregado, mas bloqueado, não serve para nada na hora do fogo.'
      },
      {
        tema: 'Sinalização e rotulagem',
        nr: 'NR-26',
        pergunta: 'Qual documento reúne os perigos de um produto químico, os primeiros socorros e as orientações de armazenamento?',
        opcoes: [
          'A nota fiscal de compra',
          'A Ficha com Dados de Segurança (FDS)',
          'A ordem de serviço do setor',
          'O manual da empilhadeira'
        ],
        correta: 1,
        explicacao: 'A FDS traz a identificação do produto, os perigos, os primeiros socorros, o combate a incêndio, o ' +
          'armazenamento e o que fazer em vazamentos. A NR-26 exige rotulagem dos produtos químicos e que a FDS esteja ' +
          'disponível para os trabalhadores.'
      },
      {
        tema: 'Ergonomia',
        nr: 'NR-17',
        pergunta: 'Qual é a melhor forma de guardar caixas pesadas em uma prateleira?',
        opcoes: [
          'Na prateleira mais alta, para liberar espaço embaixo',
          'Entre a altura dos joelhos e a dos ombros',
          'Em qualquer altura, desde que o trabalhador use luvas',
          'Empilhadas no chão, encostadas na prateleira'
        ],
        correta: 1,
        explicacao: 'Entre os joelhos e os ombros o corpo faz menos esforço para pegar e guardar cargas. No alto, o peso ' +
          'fica acima dos ombros; no chão, obriga a curvar a coluna. A NR-17 pede que o trabalho seja adaptado às pessoas.'
      },
      {
        tema: 'Hierarquia de controle',
        nr: 'NR-1',
        pergunta: 'Na hierarquia de controle de riscos, qual é a ordem da medida mais eficaz para a menos eficaz?',
        opcoes: [
          'EPI → medidas administrativas → proteção coletiva → eliminação',
          'Eliminação → proteção coletiva → medidas administrativas → EPI',
          'Proteção coletiva → EPI → eliminação → medidas administrativas',
          'Medidas administrativas → eliminação → EPI → proteção coletiva'
        ],
        correta: 1,
        explicacao: 'Primeiro tenta-se eliminar o perigo. Se não for possível, protege-se o grupo todo com proteção ' +
          'coletiva. Depois vêm as medidas administrativas (procedimentos, sinalização, treinamento). O EPI é a última ' +
          'barreira ou um complemento. A NR-1, que trata do gerenciamento de riscos ocupacionais, segue essa lógica.'
      }
    ]
  });
})();
