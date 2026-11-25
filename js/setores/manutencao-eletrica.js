(function () {
  'use strict';
  const C = window.CENA;
  const setor = window.JOGO_DADOS && window.JOGO_DADOS.setores.find((s) => s.id === 'manutencao-eletrica');
  if (!C || !setor) return;

  const fundo = `
  <rect x="0" y="0" width="1000" height="340" fill="#e4e1d8"/>
  <rect x="0" y="0" width="1000" height="22" fill="#c9c5b8"/>
  <rect x="0" y="328" width="1000" height="12" fill="#b0ab9d"/>
  <rect x="0" y="340" width="1000" height="220" fill="#8f979e"/>
  <g stroke="#7f878e" stroke-width="2">
    <line x1="0" y1="410" x2="1000" y2="410"/><line x1="0" y1="485" x2="1000" y2="485"/>
    <line x1="220" y1="340" x2="190" y2="560"/><line x1="660" y1="340" x2="670" y2="560"/>
  </g>
  <rect x="300" y="40" width="240" height="34" rx="5" fill="#1b1c1e"/>
  <text x="420" y="63" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffc400" text-anchor="middle">MANUTENÇÃO ELÉTRICA</text>
  <rect x="476" y="24" width="172" height="14" fill="#8a8f94"/>`;

  const quadroCaixa = `<rect x="40" y="90" width="120" height="224" fill="#b9c0c6" stroke="#6b7178" stroke-width="4"/>`;

  const motorBancada = `
    <path d="M263 218 V352 H368" stroke="#4d5761" stroke-width="6" fill="none"/>
    <rect x="350" y="380" width="116" height="10" fill="#6b5232"/>
    <rect x="356" y="390" width="8" height="90" fill="#6b5232"/><rect x="452" y="390" width="8" height="90" fill="#6b5232"/>
    <rect x="368" y="334" width="80" height="46" rx="10" fill="#2c6fa6" stroke="#1d4f78" stroke-width="3"/>
    <g stroke="#1d4f78" stroke-width="2">
      <line x1="382" y1="340" x2="382" y2="374"/><line x1="396" y1="340" x2="396" y2="374"/><line x1="424" y1="340" x2="424" y2="374"/><line x1="438" y1="340" x2="438" y2="374"/>
    </g>
    <rect x="448" y="352" width="16" height="9" fill="#8e979f"/>
    <rect x="392" y="318" width="30" height="16" fill="#3a3f45"/>
    <g stroke="#d4a017" stroke-width="2"><line x1="400" y1="318" x2="400" y2="312"/><line x1="408" y1="318" x2="408" y2="312"/><line x1="416" y1="318" x2="416" y2="312"/></g>
    ${C.pessoaEmPe(326, 480, { camisa: '#34495e', capacete: '#1f5fa6', oculos: true, luvas: '#1b1b1b', maoD: [394, 322], maoE: [378, 340] })}
    <line x1="394" y1="322" x2="406" y2="316" stroke="#e8742a" stroke-width="4" stroke-linecap="round"/>`;

  const refletor = `
    <rect x="494" y="296" width="18" height="24" rx="2" fill="#f4f4f4" stroke="#8a98a3" stroke-width="2"/>
    <g stroke="#3a3f45" stroke-width="4" stroke-linecap="round">
      <line x1="620" y1="418" x2="598" y2="482"/><line x1="620" y1="418" x2="642" y2="482"/><line x1="620" y1="418" x2="620" y2="482"/>
    </g>
    <rect x="600" y="386" width="42" height="32" rx="4" fill="#3a3f45"/>
    <rect x="605" y="391" width="32" height="22" rx="2" fill="#fff3b0"/>`;

  const caixaLigacao = `
    <rect x="762" y="258" width="62" height="56" rx="3" fill="#95a5a6" stroke="#3a3f45" stroke-width="3"/>
    <rect x="770" y="266" width="46" height="40" fill="#2f3338"/>
    <g fill="#d4a017"><circle cx="780" cy="280" r="3.5"/><circle cx="793" cy="280" r="3.5"/><circle cx="806" cy="280" r="3.5"/></g>
    <g stroke-width="3">
      <line x1="780" y1="284" x2="780" y2="306" stroke="#d62828"/><line x1="793" y1="284" x2="793" y2="306" stroke="#1b1c1e"/><line x1="806" y1="284" x2="806" y2="306" stroke="#1f5fa6"/>
    </g>
    <polygon points="793,320 803,336 783,336" fill="#ffc400" stroke="#1b1c1e" stroke-width="2"/>`;

  const bancadaFerramentas = `
    <rect x="858" y="400" width="134" height="10" fill="#6b5232"/>
    <rect x="864" y="410" width="8" height="70" fill="#6b5232"/><rect x="978" y="410" width="8" height="70" fill="#6b5232"/>
    <path d="M930 384 l26 -6 l2 6 l-26 8z" fill="#8e979f"/>
    <path d="M930 390 l26 2 l-1 6 l-26 -3z" fill="#8e979f"/>
    <path d="M930 386 L872 376" stroke="#d62828" stroke-width="8" stroke-linecap="round"/>
    <path d="M930 392 L872 398" stroke="#d62828" stroke-width="8" stroke-linecap="round"/>
    <circle cx="930" cy="389" r="4" fill="#5a6168"/>
    <rect x="944" y="374" width="30" height="8" rx="3" fill="#f2c200"/>
    <rect x="974" y="376" width="16" height="3" fill="#8e979f"/>`;

  const extintorClasse = (co2) => `
    ${C.extintor(690, 150)}
    ${co2 ? '<path d="M708 162 q16 -2 16 18 l6 14 l-12 0 z" fill="#1b1c1e"/>' : ''}
    <rect x="${co2 ? 692 : 694}" y="180" width="${co2 ? 22 : 18}" height="16" fill="#ffffff"/>
    <text x="703" y="192" font-family="Arial, sans-serif" font-size="${co2 ? 8 : 7}" font-weight="700" fill="#1b1c1e" text-anchor="middle">${co2 ? 'CO₂' : 'ÁGUA'}</text>
    <rect x="718" y="210" width="16" height="22" rx="2" fill="#ffffff" stroke="#1b1c1e" stroke-width="1.5"/>
    <text x="726" y="226" font-family="Arial, sans-serif" font-size="${co2 ? 9 : 13}" font-weight="700" fill="${co2 ? '#1f5fa6' : '#2e9e4f'}" text-anchor="middle">${co2 ? 'BC' : 'A'}</text>`;

  const CENARIO = {
    rotulo: 'Cenário da manutenção elétrica: quadro de distribuição, motor em bancada, extensão, caixa de ligação, extintor, escada, ferramentas e eletricistas',
    fundo: fundo,
    oks: [
      { id: 'placa', alvo: [852, 58, 144, 108], descricao: 'Placa de advertência: perigo, somente pessoas autorizadas', svg: `
        <rect x="858" y="64" width="132" height="96" rx="4" fill="#ffffff" stroke="#1b1c1e" stroke-width="3"/>
        <polygon points="924,72 946,108 902,108" fill="#ffc400" stroke="#1b1c1e" stroke-width="3"/>
        <path d="M927 80 l-9 15 h7 l-4 10 l11 -15 h-7 l4 -10z" fill="#1b1c1e"/>
        <text x="924" y="128" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#d62828" text-anchor="middle">PERIGO</text>
        <text x="924" y="148" font-family="Arial, sans-serif" font-size="9.5" font-weight="700" fill="#1b1c1e" text-anchor="middle">SOMENTE AUTORIZADOS</text>` }
    ],
    partes: [
      {
        id: 'painel', alvo: [26, 80, 190, 244],
        descPerigo: 'Quadro de distribuição com a porta escancarada, mostrando três barras de cobre e os disjuntores',
        descSeguro: 'Quadro de distribuição com a porta fechada, um cadeado e um triângulo amarelo com raio',
        perigo: quadroCaixa + `
          <rect x="50" y="100" width="100" height="204" fill="#2f3338"/>
          <rect x="62" y="112" width="9" height="176" fill="#c87533"/>
          <rect x="80" y="112" width="9" height="176" fill="#c87533"/>
          <rect x="98" y="112" width="9" height="176" fill="#c87533"/>
          <g fill="#e6e6e6">
            <rect x="118" y="120" width="24" height="18" rx="2"/><rect x="118" y="146" width="24" height="18" rx="2"/>
            <rect x="118" y="172" width="24" height="18" rx="2"/><rect x="118" y="198" width="24" height="18" rx="2"/>
            <rect x="118" y="224" width="24" height="18" rx="2"/><rect x="118" y="250" width="24" height="18" rx="2"/>
          </g>
          <g stroke-width="3">
            <line x1="71" y1="129" x2="118" y2="129" stroke="#d62828"/><line x1="89" y1="181" x2="118" y2="181" stroke="#1b1c1e"/>
            <line x1="107" y1="233" x2="118" y2="233" stroke="#1f5fa6"/>
          </g>
          <polygon points="160,92 210,112 210,296 160,312" fill="#a8b0b7" stroke="#6b7178" stroke-width="3"/>
          ${C.faisca(86, 214, 13)}`,
        seguro: quadroCaixa + `
          <rect x="48" y="98" width="104" height="208" fill="#a8b0b7" stroke="#6b7178" stroke-width="2"/>
          <polygon points="100,130 124,172 76,172" fill="#ffc400" stroke="#1b1c1e" stroke-width="3"/>
          <path d="M103 140 l-9 15 h7 l-4 10 l11 -15 h-7 l4 -10z" fill="#1b1c1e"/>
          <rect x="138" y="196" width="8" height="30" rx="3" fill="#3a3f45"/>
          <path d="M134 238 v-7 a6 6 0 0 1 12 0 v7" stroke="#3a3f45" stroke-width="3" fill="none"/>
          <rect x="131" y="237" width="18" height="14" rx="2" fill="#d4a017"/>`
      },
      {
        id: 'bloqueio', alvo: [218, 130, 252, 356],
        descPerigo: 'Eletricista mexendo nos terminais de um motor; na parede, a chave do circuito com a alavanca para cima e a palavra LIGADO',
        descSeguro: 'Eletricista mexendo nos terminais de um motor; na parede, a chave do circuito com a alavanca para baixo, um cadeado e uma etiqueta “não ligar”',
        perigo: `
          <rect x="234" y="138" width="58" height="80" rx="4" fill="#7f8c8d" stroke="#3a3f45" stroke-width="3"/>
          <rect x="256" y="150" width="14" height="34" rx="3" fill="#d62828"/>
          <text x="263" y="206" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">LIGADO</text>
          ${motorBancada}
          <path d="M414 296 l-6 10 h6 l-4 9 l10 -12 h-6 l4 -7z" fill="#ffd43b" stroke="#e8742a" stroke-width="1"/>`,
        seguro: `
          <rect x="234" y="138" width="58" height="80" rx="4" fill="#7f8c8d" stroke="#3a3f45" stroke-width="3"/>
          <text x="263" y="156" font-family="Arial, sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">DESLIGADO</text>
          <rect x="256" y="176" width="14" height="34" rx="3" fill="#2e9e4f"/>
          <path d="M274 196 v-7 a6 6 0 0 1 12 0 v7" stroke="#3a3f45" stroke-width="3" fill="none"/>
          <rect x="271" y="195" width="18" height="14" rx="2" fill="#d62828"/>
          <rect x="278" y="210" width="26" height="32" fill="#d62828" stroke="#7a1f1f" stroke-width="1.5"/>
          <text x="291" y="224" font-family="Arial, sans-serif" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">NÃO</text>
          <text x="291" y="233" font-family="Arial, sans-serif" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">LIGAR</text>
          ${motorBancada}`
      },
      {
        id: 'cabo', alvo: [476, 288, 172, 228],
        descPerigo: 'Extensão laranja ligando um refletor, com uma emenda de fita preta dentro de uma poça d’água que pinga do teto',
        descSeguro: 'Extensão laranja ligando um refletor, estendida sobre o piso seco',
        perigo: refletor + `
          <g fill="#5dade2">
            <path d="M574 46 q4 8 0 11 q-4 -3 0 -11z"/><path d="M574 120 q4 8 0 11 q-4 -3 0 -11z"/>
            <path d="M574 210 q4 8 0 11 q-4 -3 0 -11z"/><path d="M574 330 q4 8 0 11 q-4 -3 0 -11z"/>
          </g>
          <ellipse cx="566" cy="494" rx="74" ry="20" fill="#7fb3d5" opacity="0.85"/>
          <ellipse cx="566" cy="494" rx="40" ry="9" fill="none" stroke="#d6eaf8" stroke-width="2"/>
          <path d="M503 312 C 506 380, 496 450, 530 488 C 556 504, 600 500, 618 474" stroke="#e8742a" stroke-width="5" fill="none"/>
          <rect x="548" y="490" width="22" height="10" fill="#1b1c1e" transform="rotate(10 559 495)"/>
          <path d="M546 488 l-4 -7 M572 498 l6 -5" stroke="#d4a017" stroke-width="2.5"/>
          ${C.faisca(556, 476, 10)}`,
        seguro: refletor + `
          <path d="M503 312 C 506 380, 496 450, 530 488 C 556 504, 600 500, 618 474" stroke="#e8742a" stroke-width="5" fill="none"/>`
      },
      {
        id: 'extintor', alvo: [676, 110, 62, 136],
        descPerigo: 'Extintor vermelho com etiqueta “ÁGUA” e placa “A”, ao lado da caixa de ligação elétrica',
        descSeguro: 'Extintor vermelho com difusor preto, etiqueta “CO₂” e placa “BC”, ao lado da caixa de ligação elétrica',
        perigo: extintorClasse(false),
        seguro: extintorClasse(true)
      },
      {
        id: 'adornos', alvo: [656, 250, 180, 236],
        descPerigo: 'Eletricista de camiseta vermelha medindo a tensão na caixa de ligação aberta, com aliança, relógio e corrente dourados',
        descSeguro: 'Eletricista de macacão azul-marinho, capacete, óculos e luvas pretas medindo a tensão na caixa de ligação aberta',
        perigo: caixaLigacao + `
          ${C.pessoaEmPe(716, 480, { camisa: '#e74c3c', cabelo: '#3b2a1e', maoD: [776, 286], maoE: [758, 300] })}
          <circle cx="776" cy="290" r="4.5" fill="none" stroke="#ffcf33" stroke-width="3"/>
          <rect x="762" y="290" width="11" height="10" rx="2" fill="#ffcf33" stroke="#9c7400" stroke-width="1.5"/>
          <path d="M706 332 q10 14 20 0" stroke="#ffcf33" stroke-width="3" fill="none"/>`,
        seguro: caixaLigacao +
          C.pessoaEmPe(716, 480, { camisa: '#1f3a5f', calca: '#1f3a5f', capacete: '#ffffff', oculos: true, luvas: '#1b1b1b', maoD: [776, 286], maoE: [758, 300] })
      },
      {
        id: 'escada', alvo: [898, 174, 84, 166],
        descPerigo: 'Escada de alumínio prateada encostada na parede',
        descSeguro: 'Escada de fibra de vidro amarela encostada na parede',
        perigo: C.escada(908, 336, 932, 182, 50, 40, '#a8b0b7', 5),
        seguro: C.escada(908, 336, 932, 182, 50, 40, '#f2c200', 5)
      },
      {
        id: 'ferramenta', alvo: [852, 346, 144, 70],
        descPerigo: 'Bancada com um alicate de cabo vermelho com um trecho de metal à mostra e fita preta, e uma chave de fenda com um risco no cabo',
        descSeguro: 'Bancada com um alicate de cabo vermelho e uma chave de fenda de cabo amarelo',
        perigo: bancadaFerramentas + `
          <line x1="896" y1="380" x2="912" y2="383" stroke="#8e979f" stroke-width="8"/>
          <rect x="880" y="390" width="10" height="12" fill="#1b1c1e" transform="rotate(8 885 396)"/>
          <path d="M953 374 l3 4 l-2 4" stroke="#1b1c1e" stroke-width="1.5" fill="none"/>`,
        seguro: bancadaFerramentas
      }
    ]
  };

  Object.assign(setor, {
    disponivel: true,
    tempoInspecao: 100,
    nrs: ['NR-6', 'NR-10', 'NR-23', 'NR-26'],
    resumo: 'Quadros, motores, extensões e ferramentas em serviços com eletricidade.',
    briefing: 'Na semana passada um eletricista levou um “choquinho” e ninguém registrou. O supervisor quer uma inspeção completa ' +
      'antes que aconteça algo pior. Encontre os perigos escondidos no setor antes que o tempo acabe.',

    cenario: { mensagemPadrao: 'Aqui está tudo certo.', montar: (ativos) => C.montar(CENARIO, ativos) },

    naoPerigos: [
      { id: 'placa', mensagem: 'Placa de advertência de risco elétrico, avisando que só pessoas autorizadas podem entrar. Tudo certo aqui!' }
    ],

    perigos: [
      {
        id: 'painel',
        nome: 'Quadro elétrico aberto e sem sinalização',
        descricao: 'A porta do quadro de distribuição foi deixada aberta, com os barramentos energizados expostos e sem nenhuma placa de advertência.',
        mensagemSeguro: 'Quadro elétrico fechado, trancado e sinalizado. Tudo certo aqui!',
        nrs: ['NR-10', 'NR-26'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'O quadro fica num corredor por onde passam pessoas não autorizadas, e qualquer um pode encostar ou ' +
          'enfiar uma ferramenta (probabilidade média). Um choque nos barramentos pode matar ou causar queimaduras graves (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Fechar e trancar o quadro, colocar barreiras nas partes energizadas e afixar a sinalização de risco.',
            explicacao: 'Impede o contato acidental de qualquer pessoa com as partes energizadas.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir luvas isolantes de todos que precisarem passar pelo corredor do quadro.',
            explicacao: 'Quem passa pelo corredor não deveria chegar perto do quadro. EPI não substitui fechar o painel.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Enviar um comunicado a todos os setores avisando que o quadro está aberto e que ninguém deve chegar perto.',
            explicacao: 'Visitantes e funcionários novos nunca vão ler o comunicado. As partes energizadas continuam expostas.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desligar a energia de toda a fábrica até alguém ter tempo de fechar o quadro.',
            explicacao: 'Para tudo sem necessidade: basta fechar e proteger o quadro. Desligar tudo de repente também cria riscos, como máquinas parando no meio de uma operação.' }
        ],
        porque: 'A NR-10 exige que as partes energizadas das instalações sejam protegidas contra contatos acidentais, com ' +
          'invólucros, barreiras ou obstáculos, e que os quadros fiquem fechados, com acesso só para pessoas autorizadas. A ' +
          'sinalização de segurança, prevista na NR-10 e na NR-26, avisa sobre o risco. Fechar e trancar o quadro protege ' +
          'qualquer pessoa que passe por ali.',
        consequencia: 'Um ajudante que procurava uma tomada encosta a mão no barramento e leva um choque.',
        noticia: {
          manchete: 'Ajudante leva choque em quadro elétrico deixado aberto',
          texto: 'Um ajudante geral da Metalúrgica Horizonte levou um choque elétrico ao encostar no barramento de um quadro de ' +
            'distribuição que estava aberto e sem sinalização. Ele teve queimaduras na mão e ficou internado em observação por ' +
            'causa do risco de arritmia cardíaca.'
        }
      },
      {
        id: 'bloqueio',
        nome: 'Manutenção no motor sem desligar e bloquear',
        descricao: 'Um eletricista mexe nos terminais do motor, mas a chave do circuito continua na posição LIGADO, sem cadeado nem etiqueta.',
        mensagemSeguro: 'Chave desligada, travada com cadeado e etiqueta durante a manutenção. Tudo certo aqui!',
        nrs: ['NR-10'],
        referencia: { probabilidade: 2, gravidade: 2 },
        justificativaRisco: 'Ele está com as mãos nos terminais agora, com o circuito ligado (probabilidade alta). O choque ou a ' +
          'partida inesperada do motor podem matar (gravidade grave).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Desligar a chave, travar com cadeado e etiqueta, testar a ausência de tensão e aterrar o circuito.',
            explicacao: 'Sem energia no circuito, não há choque. O cadeado garante que ninguém religue durante o serviço.' },
          { nivel: 'epi', correta: false,
            texto: 'Manter o circuito ligado e fazer o serviço usando luvas isolantes e capacete com viseira.',
            explicacao: 'Trabalhar com o circuito energizado só é admitido em casos especiais, com procedimentos próprios. Aqui dá para desligar, então deve-se desligar.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Pedir para um colega ficar ao lado da chave o tempo todo, impedindo que alguém a ligue.',
            explicacao: 'O colega pode se distrair ou ser chamado. E o circuito continua energizado enquanto o eletricista trabalha.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Colocar um tapete isolante de borracha no chão embaixo do eletricista antes de ele começar o serviço.',
            explicacao: 'O tapete reduz um dos caminhos do choque, mas ele continua mexendo em terminais energizados.' }
        ],
        porque: 'A NR-10 define a sequência para considerar uma instalação desenergizada: seccionamento; impedimento de ' +
          'reenergização (cadeado e etiqueta); constatação da ausência de tensão; aterramento temporário com equipotencialização; ' +
          'proteção dos elementos energizados que estiverem na zona controlada; e sinalização de impedimento de reenergização. ' +
          'Sem energia, o perigo deixa de existir durante o serviço.',
        consequencia: 'Um operador, sem saber da manutenção, aciona o motor. O eletricista leva a descarga elétrica pelas mãos.',
        noticia: {
          manchete: 'Eletricista leva choque durante manutenção em motor',
          texto: 'Um eletricista da Metalúrgica Horizonte levou um choque enquanto fazia a manutenção de um motor. O circuito não ' +
            'tinha sido desligado nem bloqueado com cadeado. Ele foi socorrido pelo SAMU, ficou dois dias internado e passa bem.'
        }
      },
      {
        id: 'cabo',
        nome: 'Extensão emendada passando pela água',
        descricao: 'Uma extensão com uma emenda feita com fita isolante passa por uma poça d’água, formada por um vazamento no teto, para ligar um refletor.',
        mensagemSeguro: 'Extensão inteira e piso seco. Tudo certo aqui!',
        nrs: ['NR-10'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'A emenda está dentro da água e qualquer pessoa pode pisar na poça (probabilidade média). Um choque ' +
          'com o corpo molhado pode ser fatal (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Trocar por um cabo inteiro, ligado a circuito com DR, longe da água, e consertar o vazamento.',
            explicacao: 'O DR desliga o circuito se houver fuga de corrente, protegendo qualquer pessoa que passe por ali.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Colocar uma placa de “cuidado, piso molhado” ao lado da poça e avisar a equipe para não pisar ali.',
            explicacao: 'A placa fala do escorregão e esquece o choque. A emenda continua energizada dentro da água.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir botas de borracha de todos que precisarem passar pelo local.',
            explicacao: 'Nem toda bota é isolante, e quem não souber do perigo vai passar sem ela. O cabo continua danificado na água.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desligar o refletor e deixar o setor sem iluminação até o fim do turno.',
            explicacao: 'Trabalhar no escuro também é perigoso. O certo é corrigir a instalação.' }
        ],
        porque: 'A NR-10 exige que as instalações elétricas, incluindo extensões e cabos provisórios, estejam em bom estado e ' +
          'adequadas ao ambiente, e prevê dispositivos de proteção como o desligamento automático do circuito, papel do DR. ' +
          'Emendas improvisadas com fita e cabos em contato com água são causas clássicas de choques. Um cabo inteiro, longe da ' +
          'água e protegido por DR, protege qualquer pessoa que passe por ali.',
        consequencia: 'Um funcionário pisa na poça, a corrente passa pela água e ele leva um choque.',
        noticia: {
          manchete: 'Funcionário leva choque ao pisar em poça com extensão elétrica',
          texto: 'Um auxiliar de manutenção da Metalúrgica Horizonte levou um choque ao pisar numa poça d’água por onde passava ' +
            'uma extensão emendada com fita isolante. Ele caiu, foi atendido pela brigada de emergência e levado ao hospital. O ' +
            'vazamento no teto tinha sido relatado uma semana antes.'
        }
      },
      {
        id: 'adornos',
        nome: 'Eletricista com adornos e sem EPI',
        descricao: 'Um eletricista mede a tensão numa caixa de ligação energizada usando aliança, relógio e corrente de metal, de camiseta comum e sem luvas isolantes. A medição precisa ser feita com o circuito ligado.',
        mensagemSeguro: 'Eletricista sem adornos, com luvas isolantes e vestimenta adequada. Tudo certo aqui!',
        nrs: ['NR-10', 'NR-6'],
        referencia: { probabilidade: 2, gravidade: 2 },
        justificativaRisco: 'Ele está com as mãos dentro da caixa energizada, com metal nos dedos e no pulso (probabilidade alta). ' +
          'Um arco elétrico ou um choque podem causar queimaduras gravíssimas ou a morte (gravidade grave).',
        opcoes: [
          { nivel: 'epi', correta: true,
            texto: 'Tirar os adornos e usar luvas isolantes, roupa resistente a arco, capacete e óculos, todos com CA.',
            explicacao: 'Como a medição exige o circuito ligado, o EPI certo e a retirada dos adornos protegem o eletricista.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Pedir que ele trabalhe mais devagar e com bastante cuidado perto dos terminais.',
            explicacao: 'Cuidado não isola eletricidade. Aliança e relógio continuam conduzindo corrente.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar mais uma luminária sobre a caixa de ligação para ele enxergar melhor os terminais durante a medição.',
            explicacao: 'Enxergar melhor ajuda, mas não impede que o metal encoste nos terminais.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desligar o circuito antes de começar, mesmo que a medição precise dele ligado.',
            explicacao: 'A tarefa é justamente medir a tensão, o que exige o circuito ligado. Por isso a proteção tem que estar no trabalhador.' }
        ],
        porque: 'A NR-10 proíbe o uso de adornos pessoais (anéis, alianças, relógios, correntes, pulseiras) em trabalhos com ' +
          'instalações elétricas, porque o metal conduz corrente e esquenta com o arco. A norma também exige vestimentas adequadas, ' +
          'que levem em conta a condutibilidade e a inflamabilidade. Quando a tarefa precisa ser feita com o circuito energizado, ' +
          'como numa medição, o EPI correto, fornecido conforme a NR-6, é a última barreira entre o eletricista e a energia.',
        consequencia: 'A aliança encosta em dois terminais ao mesmo tempo, provoca um curto-circuito e esquenta em segundos, queimando o dedo do eletricista.',
        noticia: {
          manchete: 'Aliança causa queimadura grave em eletricista durante medição',
          texto: 'Um eletricista da Metalúrgica Horizonte sofreu uma queimadura de terceiro grau no dedo quando a aliança encostou ' +
            'em dois terminais energizados durante uma medição. O arco elétrico também atingiu o antebraço, protegido só por uma ' +
            'camiseta comum. Ele vai passar por cirurgia.'
        }
      },
      {
        id: 'ferramenta',
        nome: 'Alicate com isolamento danificado',
        descricao: 'Na bancada há um alicate com o cabo isolante rasgado e remendado com fita, e uma chave de fenda com o cabo trincado.',
        mensagemSeguro: 'Ferramentas isoladas em bom estado. Tudo certo aqui!',
        nrs: ['NR-10'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'A parte danificada só causa choque se encostar num ponto energizado, o que não acontece sempre ' +
          '(probabilidade baixa). Mas, se acontecer, a corrente passa direto para a mão (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Tirar de uso as ferramentas danificadas, trocá-las por isoladas certificadas e inspecionar antes de usar.',
            explicacao: 'Troca o que está ruim e cria uma rotina para que ferramentas danificadas não voltem para a bancada.' },
          { nivel: 'epi', correta: false,
            texto: 'Continuar usando as mesmas ferramentas, mas sempre com luvas isolantes de borracha por baixo de luvas de couro.',
            explicacao: 'A luva é uma barreira importante, mas não autoriza usar ferramenta danificada. Se a luva tiver algum defeito, nada mais protege.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Remendar os cabos das ferramentas com várias camadas novas de fita isolante.',
            explicacao: 'Fita isolante não devolve à ferramenta o isolamento original e certificado. É um remendo que pode falhar.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Proibir o uso de alicates e chaves de fenda nos serviços de manutenção elétrica.',
            explicacao: 'Inviável: são as ferramentas básicas do eletricista. O certo é usar ferramentas em bom estado.' }
        ],
        porque: 'A NR-10 exige que os trabalhadores usem ferramentas adequadas e que equipamentos e ferramentas sejam inspecionados ' +
          'e mantidos em bom estado. Ferramentas isoladas para trabalho elétrico são fabricadas e testadas para uma tensão ' +
          'definida; um remendo com fita não tem essa garantia. Tirar de uso as danificadas e inspecionar antes de usar é uma ' +
          'medida administrativa simples e eficaz.',
        consequencia: 'Durante um reparo, a parte exposta do alicate encosta num fio energizado e o eletricista leva um choque na mão.',
        noticia: {
          manchete: 'Eletricista leva choque ao usar alicate com cabo danificado',
          texto: 'Um eletricista da Metalúrgica Horizonte levou um choque ao usar um alicate cujo isolamento estava rasgado e ' +
            'remendado com fita. Ele foi atendido no ambulatório da empresa e liberado. Depois do acidente, todas as ferramentas ' +
            'do setor foram inspecionadas, e doze delas foram descartadas.'
        }
      },
      {
        id: 'extintor',
        nome: 'Extintor de água perto de equipamento elétrico',
        descricao: 'Ao lado da caixa de ligação elétrica, o único extintor do setor é de água, próprio para papel e madeira (classe A).',
        mensagemSeguro: 'Extintor de CO₂, adequado para equipamentos elétricos. Tudo certo aqui!',
        nrs: ['NR-23', 'NR-10'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Um princípio de incêndio no setor não é frequente (probabilidade baixa). Mas jogar água num ' +
          'equipamento energizado pode dar choque em quem estiver combatendo o fogo (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Instalar um extintor de CO₂ (classe C) junto aos quadros e levar o de água para onde há papel e madeira.',
            explicacao: 'O setor passa a ter o extintor certo para fogo em equipamento elétrico, protegendo quem for combater.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Colar no extintor de água um aviso de “não usar em eletricidade” e mantê-lo onde está.',
            explicacao: 'O aviso evita o erro, mas deixa o setor sem extintor para o tipo de fogo mais provável ali.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer luvas isolantes para quem precisar combater fogo em equipamentos elétricos.',
            explicacao: 'Luvas não tornam seguro jogar água em equipamento energizado: a água leva a corrente até a pessoa.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Desligar a energia geral em qualquer princípio de incêndio e, depois, usar o extintor de água mesmo assim.',
            explicacao: 'Desligar é um bom primeiro passo, mas nem sempre é rápido ou possível, e alguns equipamentos continuam energizados. O setor precisa do extintor certo.' }
        ],
        porque: 'A NR-23 exige que os extintores sejam adequados à classe de fogo de cada área. Fogo em equipamento elétrico ' +
          'energizado é classe C: usa-se gás carbônico (CO₂) ou pó químico, que não conduzem eletricidade. A água conduz a ' +
          'corrente e pode eletrocutar quem estiver combatendo o fogo. Instalar o extintor certo protege todos que estiverem no ' +
          'setor numa emergência.',
        consequencia: 'Num curto-circuito na caixa de ligação, alguém pega o extintor de água e joga o jato no equipamento energizado.',
        noticia: {
          manchete: 'Funcionário leva choque ao combater incêndio com extintor de água',
          texto: 'Um eletricista da Metalúrgica Horizonte levou um choque ao usar um extintor de água num princípio de incêndio ' +
            'numa caixa de ligação. O jato conduziu a corrente até suas mãos. Ele foi atendido pela brigada e passa bem. O setor ' +
            'não tinha extintor de CO₂.'
        }
      },
      {
        id: 'escada',
        nome: 'Escada de alumínio na manutenção elétrica',
        descricao: 'A escada usada nos serviços elétricos do setor é de alumínio, um metal que conduz eletricidade.',
        mensagemSeguro: 'Escada de fibra de vidro, que não conduz eletricidade. Tudo certo aqui!',
        nrs: ['NR-10'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'A escada só oferece perigo se encostar em fios ou partes energizadas (probabilidade baixa). Mas, se ' +
          'encostar, a corrente passa pelo metal até quem está nela (gravidade grave).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Substituir a escada de alumínio por uma de fibra de vidro, que não conduz eletricidade.',
            explicacao: 'Sem metal, a escada deixa de ser um caminho para a corrente até o trabalhador.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Treinar a equipe para nunca encostar a escada de alumínio em fios ou quadros elétricos.',
            explicacao: 'Treinar ajuda, mas um descuido ao posicionar a escada basta para o metal tocar num ponto energizado.' },
          { nivel: 'epi', correta: false,
            texto: 'Exigir luvas isolantes de quem subir na escada de alumínio em serviços elétricos.',
            explicacao: 'A corrente pode passar pelos pés ou por outras partes do corpo apoiadas na escada. A luva protege só as mãos.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Enrolar fita isolante nos degraus e nas laterais da escada de alumínio.',
            explicacao: 'Fita isolante não foi feita para isso e se desgasta com o uso. A escada continua sendo de metal.' }
        ],
        porque: 'A NR-10 exige que os trabalhadores usem ferramentas e equipamentos adequados aos serviços com eletricidade. Em ' +
          'trabalhos perto de instalações elétricas, a escada deve ser de material isolante, como a fibra de vidro. Trocar a ' +
          'escada de metal por uma isolante elimina o caminho que a corrente teria até o trabalhador.',
        consequencia: 'Ao posicionar a escada, o topo de alumínio encosta num cabo energizado e o eletricista, apoiado nela, leva um choque.',
        noticia: {
          manchete: 'Eletricista leva choque ao encostar escada de alumínio em cabo',
          texto: 'Um eletricista da Metalúrgica Horizonte levou um choque quando a escada de alumínio em que subia encostou num ' +
            'cabo energizado do teto. Ele caiu de cerca de dois metros e fraturou o braço. Depois do acidente, a empresa comprou ' +
            'escadas de fibra de vidro para o setor.'
        }
      }
    ],

    quiz: [
      {
        tema: 'Desenergização', nr: 'NR-10',
        pergunta: 'Qual destes passos faz parte da desenergização prevista na NR-10?',
        opcoes: ['Desligar o disjuntor e começar o serviço na hora', 'Travar com cadeado e etiqueta e testar a ausência de tensão', 'Pedir a um colega para segurar o disjuntor desligado', 'Tirar o fusível e guardá-lo no bolso'],
        correta: 1,
        explicacao: 'A sequência inclui seccionamento, impedimento de reenergização (cadeado e etiqueta), constatação da ausência ' +
          'de tensão, aterramento temporário, proteção dos elementos energizados na zona controlada e sinalização. Só depois o ' +
          'circuito pode ser considerado desenergizado.'
      },
      {
        tema: 'Adornos', nr: 'NR-10',
        pergunta: 'Por que a NR-10 proíbe adornos, como alianças e relógios, em trabalhos com eletricidade?',
        opcoes: ['Porque atrapalham a concentração', 'Porque o metal conduz corrente e pode causar choque e queimaduras', 'Porque podem ser roubados no vestiário', 'Porque estragam com o calor'],
        correta: 1,
        explicacao: 'O metal conduz corrente e, num curto-circuito ou arco elétrico, esquenta em segundos. Anéis e alianças ' +
          'podem causar queimaduras graves e até a perda do dedo.'
      },
      {
        tema: 'Dispositivo DR', nr: 'NR-10',
        pergunta: 'Para que serve o dispositivo DR (diferencial residual) numa instalação elétrica?',
        opcoes: ['Para economizar energia', 'Para desligar o circuito quando detecta fuga de corrente, como num choque', 'Para aumentar a tensão das tomadas', 'Para substituir o disjuntor'],
        correta: 1,
        explicacao: 'O DR compara a corrente que entra e a que sai do circuito. Se uma parte dela escapa, por exemplo pelo corpo ' +
          'de uma pessoa, ele desliga em frações de segundo. Ele complementa o disjuntor, que protege contra sobrecarga e curto-circuito.'
      },
      {
        tema: 'Capacitação', nr: 'NR-10',
        pergunta: 'Qual é a carga horária mínima do curso básico de segurança em instalações e serviços com eletricidade da NR-10?',
        opcoes: ['4 horas', '8 horas', '40 horas', '200 horas'],
        correta: 2,
        explicacao: 'O curso básico da NR-10 tem no mínimo 40 horas. Quem trabalha no Sistema Elétrico de Potência (SEP) faz ' +
          'ainda um curso complementar. A reciclagem deve ser feita a cada dois anos.'
      },
      {
        tema: 'Combate a incêndio', nr: 'NR-23',
        pergunta: 'Que tipo de extintor pode ser usado num princípio de incêndio em equipamento elétrico energizado?',
        opcoes: ['Extintor de água', 'Extintor de espuma', 'Extintor de gás carbônico (CO₂) ou de pó químico', 'Qualquer um serve'],
        correta: 2,
        explicacao: 'Água e espuma conduzem eletricidade e podem dar choque em quem estiver combatendo o fogo. Em equipamentos ' +
          'energizados (classe C), usa-se CO₂ ou pó químico.'
      }
    ]
  });
})();
