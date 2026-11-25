(function () {
  'use strict';
  const C = window.CENA;
  const setor = window.JOGO_DADOS && window.JOGO_DADOS.setores.find((s) => s.id === 'tanque-silo');
  if (!C || !setor) return;

  function degraus(x1, x2, yTopo, yBase, passo) {
    let s = '';
    for (let y = yTopo + passo; y < yBase; y += passo) s += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/>`;
    return s;
  }

  function cone(cx) {
    return `<polygon points="${cx - 14},530 ${cx},488 ${cx + 14},530" fill="#e8742a"/>` +
      `<polygon points="${cx - 8},512 ${cx + 8},512 ${cx + 5},502 ${cx - 5},502" fill="#ffffff"/>` +
      `<rect x="${cx - 18}" y="528" width="36" height="6" rx="2" fill="#c0601e"/>`;
  }

  const fundo = `
  <rect x="0" y="0" width="1000" height="300" fill="#d6e6ef"/>
  <g fill="#b7c6cf">
    <rect x="20" y="210" width="80" height="90"/><rect x="110" y="240" width="50" height="60"/><rect x="720" y="200" width="60" height="100"/><rect x="880" y="230" width="90" height="70"/>
  </g>
  <rect x="0" y="300" width="1000" height="260" fill="#a9a596"/>
  <rect x="0" y="300" width="1000" height="6" fill="#8f8b7d"/>
  <rect x="30" y="36" width="150" height="34" rx="5" fill="#1b1c1e"/>
  <text x="105" y="59" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffc400" text-anchor="middle">TANQUE T-03</text>
  <ellipse cx="510" cy="470" rx="130" ry="18" fill="#9aa5ad"/>
  <rect x="380" y="110" width="260" height="360" fill="#b8c2c9" stroke="#7d8a94" stroke-width="4"/>
  <g stroke="#9aa5ad" stroke-width="3"><line x1="382" y1="200" x2="638" y2="200"/><line x1="382" y1="300" x2="638" y2="300"/><line x1="382" y1="400" x2="638" y2="400"/></g>
  <ellipse cx="510" cy="110" rx="130" ry="22" fill="#cfd7dc" stroke="#7d8a94" stroke-width="4"/>
  <rect x="420" y="140" width="180" height="300" fill="#262a26" stroke="#5a6168" stroke-width="4"/>
  <rect x="424" y="402" width="172" height="34" fill="#55602f"/>
  <g fill="none" stroke="#9fc24a" stroke-width="3" opacity="0.6">
    <path d="M450 400 q-10 -20 0 -40 q10 -20 0 -40"/><path d="M500 400 q10 -24 0 -48 q-10 -20 0 -40"/>
  </g>
  <g stroke="#8e979f" stroke-width="4">
    <line x1="572" y1="140" x2="572" y2="440"/><line x1="592" y1="140" x2="592" y2="440"/>
    ${degraus(572, 592, 140, 440, 24)}
  </g>
  <g stroke="#5a6168" stroke-width="4">
    <line x1="648" y1="110" x2="648" y2="470"/><line x1="668" y1="110" x2="668" y2="470"/>
    ${degraus(648, 668, 110, 470, 22)}
  </g>
  <rect x="372" y="422" width="12" height="40" rx="3" fill="#7d8a94" stroke="#5a6168" stroke-width="2"/>`;

  const bocaTanque = `
    <rect x="486" y="76" width="48" height="34" fill="#8d99a3" stroke="#5a6168" stroke-width="3"/>
    <ellipse cx="562" cy="80" rx="26" ry="6" fill="#7d8a94" transform="rotate(-30 562 80)"/>`;

  const ventilador = `
    <rect x="84" y="496" width="56" height="10" fill="#3a3f45"/>
    <circle cx="112" cy="466" r="34" fill="#f2c200" stroke="#8b7300" stroke-width="4"/>
    <circle cx="112" cy="466" r="22" fill="#3a3f45"/>
    <path d="M112 466 l0 -18 l9 5z M112 466 l16 9 l-9 4z M112 466 l-16 9 l0 -9z" fill="#8e979f"/>`;

  const quadroPet = `
    <line x1="300" y1="472" x2="318" y2="460" stroke="#5a6168" stroke-width="4"/>
    <line x1="352" y1="472" x2="334" y2="460" stroke="#5a6168" stroke-width="4"/>
    <rect x="290" y="376" width="72" height="88" rx="3" fill="#ffffff" stroke="#3a3f45" stroke-width="3"/>
    <rect x="314" y="370" width="24" height="10" rx="2" fill="#8e979f"/>
    <text x="326" y="399" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#1b1c1e" text-anchor="middle">PET</text>`;

  const cadeiraVigia = `
    <rect x="716" y="412" width="44" height="40" rx="3" fill="#1f5fa6"/>
    <text x="738" y="430" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">VIGIA</text>
    <rect x="712" y="456" width="54" height="8" fill="#1f5fa6"/>
    <g stroke="#3a3f45" stroke-width="4"><line x1="716" y1="464" x2="760" y2="520"/><line x1="760" y1="464" x2="716" y2="520"/></g>`;

  const tubulacao = `
    <rect x="640" y="242" width="360" height="20" fill="#7f8c8d" stroke="#566573" stroke-width="2"/>
    <rect x="636" y="234" width="10" height="36" fill="#566573"/>
    <text x="890" y="257" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">PRODUTO</text>`;

  const CENARIO = {
    rotulo: 'Cenário do tanque: tanque em corte com trabalhador dentro, ventilador, quadro da permissão de entrada, cadeira do vigia, tubulação e área isolada',
    fundo: fundo,
    oks: [
      { id: 'placa', alvo: [134, 164, 164, 150], descricao: 'Placa: espaço confinado, entrada somente com permissão (PET)', svg: `
        <rect x="212" y="250" width="8" height="60" fill="#5a6168"/>
        <rect x="138" y="168" width="156" height="86" rx="4" fill="#ffffff" stroke="#d62828" stroke-width="4"/>
        <text x="216" y="192" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#d62828" text-anchor="middle">ESPAÇO CONFINADO</text>
        <text x="216" y="213" font-family="Arial, sans-serif" font-size="11" fill="#1b1c1e" text-anchor="middle">ENTRADA SOMENTE</text>
        <text x="216" y="229" font-family="Arial, sans-serif" font-size="11" fill="#1b1c1e" text-anchor="middle">COM PERMISSÃO</text>
        <text x="216" y="245" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#1b1c1e" text-anchor="middle">(PET)</text>` },
      { id: 'isolamento', alvo: [828, 482, 170, 60], descricao: 'Área isolada com cones e corrente', svg: `
        <path d="M856 504 q32 14 64 0 q32 14 64 0" stroke="#f2c200" stroke-width="3" fill="none" stroke-dasharray="6 4"/>
        ${cone(856)}${cone(920)}${cone(984)}` }
    ],
    partes: [
      {
        id: 'resgate', alvo: [424, 20, 172, 326],
        descPerigo: 'Trabalhador descendo a escada dentro do tanque; na abertura de cima, só a tampa aberta',
        descSeguro: 'Trabalhador descendo a escada dentro do tanque, de cinto paraquedista preso a um cabo que sobe até um tripé com guincho na abertura',
        perigo: bocaTanque + C.pessoaEmPe(556, 340, { capacete: '#ffffff', camisa: '#e67e22', maoD: [578, 200], maoE: [574, 228] }),
        seguro: bocaTanque + `
          <g stroke="#3a3f45" stroke-width="5" stroke-linecap="round">
            <line x1="510" y1="26" x2="474" y2="104"/><line x1="510" y1="26" x2="548" y2="104"/><line x1="510" y1="26" x2="512" y2="106"/>
          </g>
          <rect x="514" y="44" width="18" height="16" rx="3" fill="#d62828"/>
          ${C.pessoaEmPe(556, 340, { capacete: '#ffffff', camisa: '#e67e22', cinto: true, maoD: [578, 200], maoE: [574, 228] })}
          <path d="M510 30 L548 254" stroke="#f2c200" stroke-width="2.5" fill="none"/>`
      },
      {
        id: 'lanterna', alvo: [426, 348, 140, 52],
        descPerigo: 'Lâmpada de bulbo pendurada por um fio laranja dentro do tanque, no meio dos vapores',
        descSeguro: 'Lanterna amarela marcada “Ex” pendurada dentro do tanque, no meio dos vapores',
        perigo: `
          <path d="M572 352 Q 552 356, 540 370" stroke="#e8742a" stroke-width="3" fill="none"/>
          <rect x="534" y="368" width="12" height="8" fill="#5a6168"/>
          <circle cx="540" cy="384" r="9" fill="#fff3b0" stroke="#e8a400" stroke-width="2"/>
          <circle cx="540" cy="384" r="18" fill="#ffe066" opacity="0.25"/>`,
        seguro: `
          <line x1="572" y1="352" x2="548" y2="366" stroke="#3a3f45" stroke-width="2"/>
          <rect x="534" y="364" width="28" height="30" rx="4" fill="#f2c200" stroke="#8b7300" stroke-width="2"/>
          <text x="548" y="384" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#1b1c1e" text-anchor="middle">Ex</text>`
      },
      {
        id: 'medicao', alvo: [274, 364, 104, 174],
        descPerigo: 'Quadro “PET” com as linhas em branco e detector de gases amarelo no chão mostrando “OFF”',
        descSeguro: 'Quadro “PET” com os itens marcados e uma assinatura, e detector de gases amarelo mostrando “20,9%”',
        perigo: quadroPet + `
          <g stroke="#c4c4c4" stroke-width="2">
            <line x1="298" y1="412" x2="354" y2="412"/><line x1="298" y1="424" x2="354" y2="424"/><line x1="298" y1="436" x2="354" y2="436"/>
          </g>
          <text x="326" y="454" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#d62828" text-anchor="middle">EM BRANCO</text>
          <rect x="300" y="488" width="34" height="44" rx="6" fill="#f2c200" stroke="#3a3f45" stroke-width="2"/>
          <rect x="306" y="494" width="22" height="14" fill="#3a3f45"/>
          <text x="317" y="505" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle">OFF</text>`,
        seguro: quadroPet + `
          <g stroke="#2e9e4f" stroke-width="2.5" fill="none">
            <path d="M298 410 l3 4 l6 -7"/><path d="M298 422 l3 4 l6 -7"/><path d="M298 434 l3 4 l6 -7"/>
          </g>
          <g stroke="#9a9a9a" stroke-width="2"><line x1="312" y1="412" x2="354" y2="412"/><line x1="312" y1="424" x2="350" y2="424"/><line x1="312" y1="436" x2="352" y2="436"/></g>
          <path d="M304 454 q8 -8 14 0 t14 -2 t12 2" stroke="#1f5fa6" stroke-width="2" fill="none"/>
          <rect x="300" y="488" width="34" height="44" rx="6" fill="#f2c200" stroke="#3a3f45" stroke-width="2"/>
          <rect x="304" y="494" width="26" height="14" fill="#1e8449"/>
          <text x="317" y="505" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#ffffff" text-anchor="middle">20,9%</text>`
      },
      {
        id: 'ventilacao', alvo: [50, 414, 218, 128],
        descPerigo: 'Ventilador amarelo com etiqueta “DESLIGADO” e a mangueira laranja caída no chão, longe do tanque',
        descSeguro: 'Ventilador amarelo soprando, com a mangueira laranja ligada à abertura lateral do tanque',
        perigo: `
          <path d="M80 470 C 60 480, 70 520, 100 526" stroke="#1b1c1e" stroke-width="3" fill="none"/>
          <rect x="100" y="520" width="12" height="10" fill="#1b1c1e"/>
          <path d="M146 466 C 190 470, 200 520, 256 512" stroke="#e8742a" stroke-width="16" fill="none" stroke-linecap="round"/>
          <path d="M146 466 C 190 470, 200 520, 256 512" stroke="#c0601e" stroke-width="16" fill="none" stroke-dasharray="2 7"/>
          ${ventilador}
          <rect x="92" y="420" width="42" height="14" fill="#ffffff" stroke="#d62828" stroke-width="2"/>
          <text x="113" y="431" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#d62828" text-anchor="middle">DESLIGADO</text>`,
        seguro: `
          <path d="M146 470 C 220 480, 300 478, 372 444" stroke="#e8742a" stroke-width="16" fill="none" stroke-linecap="round"/>
          <path d="M146 470 C 220 480, 300 478, 372 444" stroke="#c0601e" stroke-width="16" fill="none" stroke-dasharray="2 7"/>
          ${ventilador}
          <path d="M70 446 q-8 6 0 12 M60 440 q-14 12 0 24" stroke="#5dade2" stroke-width="3" fill="none"/>`
      },
      {
        id: 'vigia', alvo: [700, 336, 110, 194],
        descPerigo: 'Cadeira azul escrita “VIGIA”, com um rádio no assento e um capacete no chão',
        descSeguro: 'Cadeira azul escrita “VIGIA”, com uma pessoa de colete e capacete em pé ao lado, segurando um rádio',
        perigo: cadeiraVigia + `
          <rect x="724" y="440" width="12" height="16" rx="2" fill="#1b1c1e"/>
          <line x1="732" y1="440" x2="734" y2="430" stroke="#1b1c1e" stroke-width="2"/>
          <path d="M776 520 a12 12 0 0 1 24 0z" fill="#ffffff" stroke="#999999" stroke-width="1.5"/>`,
        seguro: cadeiraVigia + `
          ${C.pessoaEmPe(784, 528, { capacete: '#ffffff', colete: true, camisa: '#34495e', maoD: [806, 438] })}
          <rect x="800" y="424" width="10" height="16" rx="2" fill="#1b1c1e"/>`
      },
      {
        id: 'valvula', alvo: [680, 196, 316, 100],
        descPerigo: 'Tubulação de produto chegando ao tanque, com a válvula vermelha marcada “ABERTA” e setas de fluxo',
        descSeguro: 'Tubulação de produto chegando ao tanque, com um disco vermelho entre as flanges, um cadeado e a etiqueta “BLOQUEADA”',
        perigo: tubulacao + `
          <polygon points="744,236 776,268 776,236 744,268" fill="#c0392b" stroke="#7a1f1f" stroke-width="2"/>
          <rect x="757" y="214" width="6" height="22" fill="#566573"/>
          <ellipse cx="760" cy="212" rx="20" ry="5" fill="none" stroke="#c0392b" stroke-width="4"/>
          <text x="760" y="288" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#c0392b" text-anchor="middle">ABERTA</text>
          <g fill="#ffffff"><path d="M708 252 l-10 -6 v12z"/><path d="M820 252 l-10 -6 v12z"/><path d="M970 252 l-10 -6 v12z"/></g>`,
        seguro: tubulacao + `
          <polygon points="744,236 776,268 776,236 744,268" fill="#7f8c8d" stroke="#3a3f45" stroke-width="2"/>
          <rect x="757" y="214" width="6" height="22" fill="#566573"/>
          <ellipse cx="760" cy="212" rx="20" ry="5" fill="none" stroke="#3a3f45" stroke-width="4"/>
          <rect x="708" y="230" width="8" height="44" fill="#d62828"/>
          <path d="M770 228 v-7 a6 6 0 0 1 12 0 v7" stroke="#3a3f45" stroke-width="3" fill="none"/>
          <rect x="767" y="227" width="18" height="14" rx="2" fill="#d4a017"/>
          <rect x="786" y="268" width="34" height="24" fill="#d62828" stroke="#7a1f1f" stroke-width="1.5"/>
          <text x="803" y="284" font-family="Arial, sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">BLOQUEADA</text>`
      },
      {
        id: 'gerador', alvo: [26, 312, 104, 98],
        descPerigo: 'Gerador laranja a gasolina soltando fumaça, ao lado do ventilador',
        descSeguro: 'Caixa de tomada azul “220 V” num poste, ao lado do ventilador',
        perigo: `
          <rect x="40" y="352" width="80" height="48" rx="4" fill="#d35400" stroke="#7a3500" stroke-width="2"/>
          <rect x="48" y="360" width="40" height="22" fill="#3a3f45"/>
          <text x="68" y="375" font-family="Arial, sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">GASOLINA</text>
          <rect x="104" y="340" width="8" height="14" fill="#3a3f45"/>
          <g fill="#7f8c8d" opacity="0.7"><circle cx="112" cy="330" r="8"/><circle cx="122" cy="320" r="10"/><circle cx="120" cy="392" r="0"/></g>
          <path d="M116 336 q10 40 0 80" stroke="#7f8c8d" stroke-width="6" fill="none" opacity="0.5"/>
          <circle cx="56" cy="404" r="5" fill="#222222"/><circle cx="104" cy="404" r="5" fill="#222222"/>`,
        seguro: `
          <rect x="76" y="340" width="8" height="64" fill="#5a6168"/>
          <rect x="60" y="326" width="40" height="30" rx="3" fill="#1f5fa6"/>
          <text x="80" y="345" font-family="Arial, sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">220 V</text>`
      }
    ]
  };

  Object.assign(setor, {
    disponivel: true,
    tempoInspecao: 100,
    nrs: ['NR-10', 'NR-33', 'NR-35'],
    resumo: 'Limpeza de um tanque de armazenamento: segurança em espaços confinados.',
    briefing: 'Uma equipe terceirizada está limpando o tanque T-03, que guardava produto químico. O serviço começou há pouco e ' +
      'já tem gente lá dentro. Encontre os perigos escondidos no local antes que o tempo acabe.',

    cenario: { mensagemPadrao: 'Aqui está tudo certo.', montar: (ativos) => C.montar(CENARIO, ativos) },

    naoPerigos: [
      { id: 'placa', mensagem: 'Placa de espaço confinado avisando que a entrada só é permitida com PET. Tudo certo aqui!' },
      { id: 'isolamento', mensagem: 'Área isolada com cones e corrente, mantendo curiosos longe. Tudo certo aqui!' }
    ],

    perigos: [
      {
        id: 'medicao',
        nome: 'Entrada sem PET e sem medição de gases',
        descricao: 'A Permissão de Entrada e Trabalho (PET) está em branco e o detector de gases está desligado no chão, mas já há um trabalhador dentro do tanque.',
        mensagemSeguro: 'PET preenchida e assinada, e detector de gases ligado. Tudo certo aqui!',
        nrs: ['NR-33'],
        referencia: { probabilidade: 2, gravidade: 2 },
        justificativaRisco: 'Tanques com resíduo químico quase sempre têm gases ou falta de oxigênio, e ninguém mediu nada ' +
          '(probabilidade alta). Uma atmosfera perigosa pode causar desmaio e morte em minutos (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Parar a entrada, medir oxigênio, inflamáveis e tóxicos antes e durante o serviço, e só entrar com a PET assinada.',
            explicacao: 'Só se entra quando se sabe que o ar é seguro, e qualquer mudança é percebida a tempo.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer máscara com filtro químico para o trabalhador continuar lá dentro enquanto alguém procura o detector.',
            explicacao: 'Máscara com filtro não fornece oxigênio. Se faltar oxigênio, a pessoa desmaia mesmo com a máscara.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Deixar a tampa aberta por mais tempo para o tanque “respirar” sozinho antes de entrar.',
            explicacao: 'Uma tampa aberta não garante a troca do ar lá no fundo. Sem medir, ninguém sabe se o ar está seguro.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Encher o tanque de água e esvaziá-lo antes de entrar, para “lavar” os gases.',
            explicacao: 'A lavagem pode ajudar, mas não garante que o ar ficou seguro. Sem medir, ninguém sabe o que restou lá dentro.' }
        ],
        porque: 'A NR-33 exige que, antes de qualquer entrada em espaço confinado, a atmosfera seja avaliada (oxigênio, ' +
          'inflamáveis e tóxicos) com equipamento calibrado, e que seja monitorada continuamente durante o trabalho. A entrada só ' +
          'pode acontecer com a Permissão de Entrada e Trabalho (PET) emitida e assinada pelo supervisor de entrada. A PET é um ' +
          'procedimento administrativo, mas é ela que garante que todas as outras medidas foram verificadas.',
        consequencia: 'O tanque tem pouco oxigênio. O trabalhador fica tonto, desmaia lá dentro e ninguém percebe a tempo.',
        noticia: {
          manchete: 'Trabalhador desmaia dentro de tanque sem medição de gases',
          texto: 'Um trabalhador desmaiou dentro de um tanque da Metalúrgica Horizonte durante a limpeza. Não foi feita medição de ' +
            'gases nem emitida a permissão de entrada. Os bombeiros o retiraram usando equipamento de respiração autônoma, e ele ' +
            'está internado na UTI.'
        }
      },
      {
        id: 'ventilacao',
        nome: 'Ventilação desligada e desconectada',
        descricao: 'O ventilador está desligado no chão, e a mangueira nem chega ao tanque. Do resíduo no fundo sobem vapores.',
        mensagemSeguro: 'Ventilador ligado, com a mangueira mandando ar limpo para dentro do tanque. Tudo certo aqui!',
        nrs: ['NR-33'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'Os vapores do resíduo se acumulam sem nenhuma renovação de ar (probabilidade média). Podem causar ' +
          'intoxicação, asfixia ou explosão (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Ligar a ventilação mecânica com a mangueira dentro do tanque e mantê-la funcionando o serviço todo.',
            explicacao: 'Renova o ar de todo o espaço e protege todos que estiverem lá dentro.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer máscara PFF2 para cada pessoa que entrar no tanque e trocá-la a cada entrada.',
            explicacao: 'A PFF2 filtra poeira, não gases, e não fornece oxigênio. Em espaço confinado, dá uma falsa sensação de segurança.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Limitar cada entrada no tanque a 15 minutos, com intervalos de descanso do lado de fora para respirar ar fresco.',
            explicacao: 'Numa atmosfera perigosa, poucos minutos bastam para desmaiar. Ficar menos tempo não torna o ar seguro.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Cancelar a limpeza e deixar o resíduo acumulando no tanque por tempo indeterminado.',
            explicacao: 'O resíduo continua lá e a limpeza terá de ser feita um dia, provavelmente com ainda mais vapores.' }
        ],
        porque: 'A NR-33 prevê a ventilação para tornar e manter aceitável a atmosfera do espaço confinado, sempre junto com o ' +
          'monitoramento contínuo. A ventilação mecânica injeta ar limpo e dilui gases e vapores, protegendo todos que estão lá ' +
          'dentro. É proibido ventilar com oxigênio puro, porque o excesso de oxigênio aumenta muito o risco de incêndio.',
        consequencia: 'Os vapores se acumulam no fundo do tanque. O trabalhador sente tontura e dor de cabeça e começa a perder a consciência.',
        noticia: {
          manchete: 'Vapores intoxicam trabalhador durante limpeza de tanque',
          texto: 'Um trabalhador que limpava um tanque da Metalúrgica Horizonte foi intoxicado pelos vapores do resíduo acumulado ' +
            'no fundo. O ventilador estava no local, mas desligado. Ele foi retirado consciente, com náuseas e confusão mental, ' +
            'e ficou em observação no hospital.'
        }
      },
      {
        id: 'vigia',
        nome: 'Vigia ausente',
        descricao: 'A cadeira do vigia está vazia, com o rádio largado em cima. Não há ninguém do lado de fora acompanhando quem está no tanque.',
        mensagemSeguro: 'Vigia do lado de fora, com rádio, acompanhando a entrada. Tudo certo aqui!',
        nrs: ['NR-33'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Na maioria das entradas nada dá errado (probabilidade baixa). Mas, se o trabalhador passar mal e ' +
          'ninguém perceber, o desmaio pode terminar em morte (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Designar um vigia capacitado do lado de fora, em contato permanente e pronto para acionar o resgate.',
            explicacao: 'Alguém acompanha a entrada o tempo todo e chama ajuda ao primeiro sinal de problema.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Combinar com o trabalhador que ele saia sozinho, pela escada, assim que sentir tontura ou começar a passar mal.',
            explicacao: 'Quem passa mal por falta de oxigênio perde a consciência antes de conseguir sair.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar uma câmera na boca do tanque para alguém olhar de vez em quando.',
            explicacao: 'Olhar “de vez em quando” não é acompanhar. Sem vigia, ninguém aciona o resgate a tempo.' },
          { nivel: 'epi', correta: false,
            texto: 'Entregar um apito ao trabalhador para ele chamar ajuda se precisar.',
            explicacao: 'Uma pessoa desmaiada não apita. E pode não haver ninguém por perto para ouvir.' }
        ],
        porque: 'A NR-33 exige um vigia em toda entrada em espaço confinado. Ele fica do lado de fora, controla quem entra e sai, ' +
          'mantém contato com os trabalhadores e aciona a equipe de resgate numa emergência. O vigia nunca deve entrar para ' +
          'socorrer: muitas vítimas de acidentes em espaços confinados são pessoas que tentaram salvar um colega sem preparo.',
        consequencia: 'O trabalhador lá dentro desmaia. Sem vigia, só percebem a falta dele muito tempo depois.',
        noticia: {
          manchete: 'Trabalhador fica 40 minutos desacordado em tanque sem que ninguém percebesse',
          texto: 'Um trabalhador da Metalúrgica Horizonte foi encontrado desacordado dentro de um tanque, cerca de 40 minutos depois ' +
            'de entrar. Não havia vigia do lado de fora. Ele foi resgatado pelos bombeiros e está internado em estado grave.'
        }
      },
      {
        id: 'resgate',
        nome: 'Sem tripé e sem cinto para resgate',
        descricao: 'O trabalhador desceu pela escada interna sem cinto paraquedista e sem cabo, e não há tripé com guincho de resgate na boca do tanque.',
        mensagemSeguro: 'Tripé de resgate montado e trabalhador preso a ele pelo cinto. Tudo certo aqui!',
        nrs: ['NR-33', 'NR-35'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Precisar de resgate não é o esperado em toda entrada (probabilidade baixa). Mas, se acontecer, sem ' +
          'tripé e sem cinto a retirada pela abertura estreita demora demais e pode ser fatal (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Instalar tripé com guincho sobre a abertura e manter o trabalhador preso a ele por cinto paraquedista.',
            explicacao: 'Permite retirar o trabalhador pela abertura sem que ninguém precise entrar.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Afixar perto do tanque um cartaz com o telefone dos bombeiros e do SAMU.',
            explicacao: 'Chamar socorro é importante, mas ele demora a chegar. A retirada precisa poder começar na hora.' },
          { nivel: 'epi', correta: false,
            texto: 'Dar ao trabalhador um capacete com lanterna para enxergar melhor lá dentro.',
            explicacao: 'A lanterna ajuda a enxergar, mas não tira ninguém de dentro do tanque.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Combinar que, se ele passar mal, o colega mais forte da equipe desce imediatamente pela escada para buscá-lo.',
            explicacao: 'É assim que muitas tragédias acontecem: o colega entra sem proteção e também desmaia.' }
        ],
        porque: 'A NR-33 exige que a empresa tenha procedimentos e equipamentos de resgate prontos antes da entrada, com uma ' +
          'equipe capacitada. Em espaços com acesso vertical, o trabalhador deve estar conectado a um sistema que permita retirá-lo ' +
          'por fora, como o tripé com guincho. Assim o resgate começa em segundos e ninguém precisa entrar numa atmosfera que ' +
          'pode estar perigosa.',
        consequencia: 'O trabalhador passa mal no fundo do tanque, e ninguém consegue tirá-lo pela abertura estreita sem entrar também.',
        noticia: {
          manchete: 'Colega desmaia ao tentar socorrer trabalhador dentro de tanque',
          texto: 'Um trabalhador passou mal dentro de um tanque da Metalúrgica Horizonte e um colega desceu para ajudar, sem ' +
            'nenhuma proteção. Os dois desmaiaram. Os bombeiros fizeram o resgate com tripé e equipamento de respiração. Ambos ' +
            'estão internados. Não havia equipamento de resgate no local.'
        }
      },
      {
        id: 'valvula',
        nome: 'Linha de produto aberta para o tanque',
        descricao: 'A válvula da tubulação que abastece o tanque está aberta, sem raquete, cadeado ou etiqueta, enquanto há gente lá dentro.',
        mensagemSeguro: 'Linha isolada com flange cega, cadeado e etiqueta. Tudo certo aqui!',
        nrs: ['NR-33'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Alguém ligar a bomba por engano não é comum (probabilidade baixa). Mas, se acontecer, o produto ' +
          'atinge o trabalhador e pode intoxicá-lo ou até afogá-lo (gravidade grave).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Isolar a linha antes da entrada: flange cega ou desconexão, com cadeado e etiqueta na válvula.',
            explicacao: 'Com a linha cortada fisicamente, não há como o produto chegar ao tanque.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Avisar o operador da bomba, por rádio, para não ligá-la durante a limpeza.',
            explicacao: 'Um aviso pode ser esquecido ou não chegar ao turno seguinte. A linha continua aberta.' },
          { nivel: 'epi', correta: false,
            texto: 'Dar ao trabalhador roupa impermeável, luvas e botas de PVC, para o caso de entrar produto no tanque.',
            explicacao: 'A roupa protege de respingos, não de uma inundação de produto.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar um alarme sonoro que toque sempre que a bomba for ligada.',
            explicacao: 'O alarme avisa quando a bomba liga, mas o produto já vai estar entrando no tanque.' }
        ],
        porque: 'A NR-33 exige que, antes da entrada, o espaço confinado seja isolado de todas as fontes de energia e de entrada de ' +
          'produtos: tubulações, bombas, agitadores e outras. Só fechar a válvula não basta, porque ela pode ser aberta ou vazar. ' +
          'A raquete (flange cega) ou a desconexão da linha, com cadeado e etiqueta, elimina a possibilidade de o produto entrar.',
        consequencia: 'Alguém liga a bomba em outro setor e o produto começa a jorrar dentro do tanque, atingindo o trabalhador.',
        noticia: {
          manchete: 'Produto químico é bombeado para tanque com trabalhador dentro',
          texto: 'Um trabalhador que limpava um tanque da Metalúrgica Horizonte foi atingido por um jato de produto químico ' +
            'bombeado por engano para dentro do tanque. A linha não estava bloqueada. Ele sofreu queimaduras químicas nas pernas e ' +
            'conseguiu sair pela escada antes que o nível subisse.'
        }
      },
      {
        id: 'gerador',
        nome: 'Gerador a gasolina perto da captação de ar',
        descricao: 'Um gerador a gasolina funciona ao lado do ventilador que manda ar para dentro do tanque, soltando fumaça na direção da captação.',
        mensagemSeguro: 'Equipamentos ligados na rede elétrica, sem motor a combustão perto do tanque. Tudo certo aqui!',
        nrs: ['NR-33'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'Com o ventilador ligado, a fumaça do motor tende a ser puxada para dentro do tanque (probabilidade ' +
          'média). O monóxido de carbono não tem cheiro nem cor e pode matar em pouco tempo (gravidade grave).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Tirar o gerador do local e alimentar os equipamentos pela rede elétrica, longe da captação.',
            explicacao: 'Sem motor a combustão perto do tanque, não há monóxido de carbono para ser puxado.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Colocar um ventilador a mais para soprar a fumaça do gerador para longe.',
            explicacao: 'O vento muda de direção, e parte da fumaça ainda pode ser puxada para dentro do tanque.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer máscara com filtro para quem estiver dentro do tanque, contra a fumaça do motor.',
            explicacao: 'Filtros comuns não retêm monóxido de carbono, e a máscara não resolve a contaminação do ar.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Ligar o gerador só nos intervalos, quando não houver ninguém dentro do tanque.',
            explicacao: 'O gás pode ficar acumulado lá dentro e atingir a equipe quando ela voltar.' }
        ],
        porque: 'A NR-33 exige que o ar levado para dentro de um espaço confinado seja limpo e que se controlem as fontes de ' +
          'contaminação perto da entrada e da captação de ar. Motores a combustão soltam monóxido de carbono, um gás sem cor e ' +
          'sem cheiro, muito tóxico. Tirar o gerador dali, ou trocá-lo pela rede elétrica, elimina a fonte do gás.',
        consequencia: 'O ventilador puxa a fumaça do gerador e manda monóxido de carbono para dentro do tanque. O trabalhador sente dor de cabeça e tontura.',
        noticia: {
          manchete: 'Trabalhador é intoxicado por monóxido de carbono dentro de tanque',
          texto: 'Um trabalhador que limpava um tanque da Metalúrgica Horizonte foi intoxicado por monóxido de carbono. A fumaça de ' +
            'um gerador a gasolina, ligado ao lado do ventilador, estava sendo levada para dentro do tanque. Ele foi retirado com ' +
            'dor de cabeça e confusão mental e recebeu oxigênio no hospital.'
        }
      },
      {
        id: 'lanterna',
        nome: 'Lâmpada comum dentro do tanque com vapores',
        descricao: 'Dentro do tanque, onde sobem vapores do resíduo, a iluminação é uma lâmpada comum presa numa extensão improvisada.',
        mensagemSeguro: 'Lanterna certificada para atmosfera explosiva (Ex). Tudo certo aqui!',
        nrs: ['NR-33', 'NR-10'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Para haver explosão, os vapores precisam atingir uma concentração inflamável e encontrar uma faísca ' +
          '(probabilidade baixa). Mas uma explosão dentro do tanque costuma ser fatal (gravidade grave).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Trocar a lâmpada por uma lanterna certificada para atmosfera explosiva (Ex), de baixa tensão.',
            explicacao: 'A iluminação deixa de ser uma fonte de faísca dentro do tanque.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Manter a lâmpada comum e aumentar a ventilação do tanque para diluir os vapores antes que se acumulem.',
            explicacao: 'Ventilar é importante, mas a lâmpada continua sendo uma fonte de faísca se a ventilação falhar.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Pedir ao trabalhador que não encoste na lâmpada nem mexa na extensão.',
            explicacao: 'A faísca pode vir do próprio soquete ou de um mau contato, sem ninguém encostar.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer roupa antichama ao trabalhador, para o caso de os vapores pegarem fogo.',
            explicacao: 'A roupa reduz queimaduras, mas não impede a explosão, que pode matar mesmo assim.' }
        ],
        porque: 'A NR-33 exige que, em espaços confinados onde a atmosfera pode ficar explosiva, os equipamentos elétricos, ' +
          'incluindo a iluminação, sejam próprios para áreas classificadas (certificados “Ex”). Lâmpadas comuns e extensões ' +
          'improvisadas podem soltar faíscas ou esquentar. Trocar a lâmpada por um equipamento certificado elimina essa fonte de ' +
          'ignição. A NR-10 também trata das instalações elétricas em áreas classificadas.',
        consequencia: 'Um mau contato no soquete solta uma faísca no meio dos vapores e provoca uma explosão dentro do tanque.',
        noticia: {
          manchete: 'Explosão em tanque durante limpeza deixa trabalhador ferido',
          texto: 'Uma pequena explosão atingiu um tanque da Metalúrgica Horizonte durante a limpeza. Os vapores do resíduo foram ' +
            'inflamados por uma lâmpada comum ligada numa extensão. O trabalhador que estava dentro sofreu queimaduras nos braços ' +
            'e no rosto e foi levado ao hospital.'
        }
      }
    ],

    quiz: [
      {
        tema: 'Espaço confinado', nr: 'NR-33',
        pergunta: 'O que caracteriza um espaço confinado, segundo a NR-33?',
        opcoes: ['Qualquer sala sem janelas', 'Local não projetado para ocupação humana contínua, com entrada e saída limitadas e onde pode haver atmosfera perigosa', 'Qualquer lugar abaixo do nível do chão', 'Um escritório pequeno com muitas pessoas'],
        correta: 1,
        explicacao: 'Tanques, silos, galerias, poços e reatores são exemplos. Por não serem feitos para as pessoas ficarem lá ' +
          'dentro e terem saída difícil, qualquer problema com o ar vira uma emergência.'
      },
      {
        tema: 'Atmosfera', nr: 'NR-33',
        pergunta: 'Qual é a faixa de oxigênio considerada aceitável para entrar num espaço confinado?',
        opcoes: ['Entre 10% e 15%', 'Entre 19,5% e 23%', 'Acima de 30%', 'Qualquer valor, se houver ventilação'],
        correta: 1,
        explicacao: 'Abaixo de 19,5% há falta de oxigênio; acima de 23%, excesso, que aumenta muito o risco de incêndio. O ar ' +
          'normal tem cerca de 21% de oxigênio.'
      },
      {
        tema: 'Permissão de entrada', nr: 'NR-33',
        pergunta: 'O que é a PET?',
        opcoes: ['Uma garrafa de água para o trabalhador', 'A Permissão de Entrada e Trabalho, documento que autoriza a entrada no espaço confinado', 'Um tipo de máscara respiratória', 'O relatório feito depois do acidente'],
        correta: 1,
        explicacao: 'A PET registra os riscos, as medições, as medidas de controle, quem está autorizado a entrar, o vigia e o ' +
          'supervisor de entrada. Sem PET emitida e assinada, ninguém entra.'
      },
      {
        tema: 'Vigia', nr: 'NR-33',
        pergunta: 'Se o trabalhador desmaiar dentro do espaço confinado, o que o vigia deve fazer?',
        opcoes: ['Entrar imediatamente para tirá-lo de lá', 'Acionar a equipe de resgate e iniciar a retirada pelo lado de fora, sem entrar', 'Esperar alguns minutos para ver se ele acorda', 'Ir buscar o supervisor no escritório'],
        correta: 1,
        explicacao: 'O vigia nunca entra. Se ele entrar sem proteção, pode desmaiar também. Ele aciona o resgate e, se houver ' +
          'tripé com guincho, começa a retirada por fora.'
      },
      {
        tema: 'Proteção respiratória', nr: 'NR-33',
        pergunta: 'Uma máscara com filtro protege contra a falta de oxigênio?',
        opcoes: ['Sim, qualquer máscara resolve', 'Não: o filtro só retém contaminantes e não fornece oxigênio', 'Sim, se o filtro for novo', 'Sim, se a pessoa respirar devagar'],
        correta: 1,
        explicacao: 'Com pouco oxigênio no ar, é preciso um equipamento que forneça ar respirável, como a máscara autônoma ou de ' +
          'linha de ar. Filtro nenhum “fabrica” oxigênio.'
      }
    ]
  });
})();
