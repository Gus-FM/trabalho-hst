(function () {
  'use strict';
  const C = window.CENA;
  const setor = window.JOGO_DADOS && window.JOGO_DADOS.setores.find((s) => s.id === 'escritorio');
  if (!C || !setor) return;

  const fundo = `
  <rect x="0" y="0" width="1000" height="380" fill="#dfe6ec"/>
  <rect x="0" y="0" width="1000" height="20" fill="#c5ced6"/>
  <rect x="0" y="368" width="1000" height="12" fill="#aeb8c1"/>
  <rect x="0" y="380" width="1000" height="180" fill="#c9ad86"/>
  <g stroke="#b59670" stroke-width="2">
    <line x1="0" y1="420" x2="1000" y2="420"/><line x1="0" y1="480" x2="1000" y2="480"/>
    <line x1="150" y1="380" x2="110" y2="560"/><line x1="700" y1="380" x2="710" y2="560"/><line x1="900" y1="380" x2="930" y2="560"/>
  </g>
  <g fill="#4d5761">
    <rect x="140" y="20" width="80" height="8" rx="3"/><rect x="460" y="20" width="80" height="8" rx="3"/><rect x="800" y="20" width="80" height="8" rx="3"/>
  </g>
  <rect x="250" y="44" width="150" height="34" rx="5" fill="#1b1c1e"/>
  <text x="325" y="67" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffc400" text-anchor="middle">ESCRITÓRIO</text>`;

  const armario = `
    <rect x="20" y="200" width="100" height="180" fill="#8e9aa6" stroke="#5f6b75" stroke-width="3"/>
    <line x1="70" y1="204" x2="70" y2="376" stroke="#5f6b75" stroke-width="2"/>
    <rect x="60" y="280" width="4" height="18" fill="#3a3f45"/><rect x="76" y="280" width="4" height="18" fill="#3a3f45"/>
    <rect x="26" y="168" width="42" height="32" fill="#c8955c" stroke="#8a6236" stroke-width="2"/>
    <rect x="74" y="176" width="15" height="24" fill="#1f5fa6"/><rect x="92" y="172" width="15" height="28" fill="#d62828"/>`;
  const pessoaAlcancando = C.pessoaEmPe(160, 396, { camisa: '#7a4fa0', cabelo: '#2a1d14', maoE: [116, 184], maoD: [130, 178] });

  const janela = (comSol) => `
    <rect x="612" y="70" width="156" height="180" fill="${comSol ? '#fff4c4' : '#e9e4d2'}" stroke="#8a98a3" stroke-width="6"/>
    ${comSol ? `<circle cx="738" cy="104" r="22" fill="#ffd43b"/>
    <g stroke="#ffb703" stroke-width="3" stroke-linecap="round">
      <line x1="738" y1="72" x2="738" y2="78"/><line x1="706" y1="104" x2="712" y2="104"/><line x1="715" y1="81" x2="719" y2="85"/>
      <line x1="715" y1="127" x2="719" y2="123"/><line x1="738" y1="130" x2="738" y2="136"/><line x1="761" y1="127" x2="757" y2="123"/>
    </g>` : `<g stroke="#bdb39a" stroke-width="3">${[86, 102, 118, 134, 150, 166, 182, 198, 214, 230].map((y) => `<line x1="615" y1="${y}" x2="765" y2="${y}"/>`).join('')}</g>`}
    <line x1="690" y1="70" x2="690" y2="250" stroke="#8a98a3" stroke-width="4"/>
    <line x1="612" y1="160" x2="768" y2="160" stroke="#8a98a3" stroke-width="4"/>`;

  const posteMeta = (titulo, linha1, linha2, corBorda) => `
    <rect x="812" y="64" width="178" height="92" fill="#ffffff" stroke="${corBorda}" stroke-width="3"/>
    <text x="901" y="86" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="${corBorda}" text-anchor="middle">${titulo}</text>
    <text x="901" y="112" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#1b1c1e" text-anchor="middle">${linha1}</text>
    <text x="901" y="138" font-family="Arial, sans-serif" font-size="13" fill="#1b1c1e" text-anchor="middle">${linha2}</text>
    <circle cx="962" cy="196" r="22" fill="#ffffff" stroke="#3a3f45" stroke-width="4"/>
    <line x1="962" y1="196" x2="962" y2="180" stroke="#1b1c1e" stroke-width="3"/><line x1="962" y1="196" x2="974" y2="200" stroke="#1b1c1e" stroke-width="3"/>
    ${C.mesa(862, 330, 128)}
    ${C.monitor(908, 262, 56, 40, { pe: 23 })}
    <rect x="872" y="324" width="36" height="6" rx="2" fill="#3a3f45"/>
    <rect x="968" y="304" width="20" height="26" fill="#f4f4f4" stroke="#bbbbbb"/><rect x="972" y="298" width="20" height="26" fill="#ffffff" stroke="#bbbbbb"/>
    ${C.pessoaSentada(826, 380, { camisa: '#f08c00', cabelo: '#7a4a1e', pele: '#e0b48c', headset: true, mao: [880, 324] })}`;

  const extintorComManometro = (vazio) => `
    ${C.extintor(458, 160)}
    <circle cx="488" cy="172" r="8" fill="#ffffff" stroke="#333333" stroke-width="2"/>
    <path d="M482 175 a7 7 0 0 1 12 -6" stroke="${vazio ? '#d62828' : '#2e9e4f'}" stroke-width="3" fill="none"/>
    <line x1="488" y1="172" x2="${vazio ? 482 : 492}" y2="${vazio ? 176 : 166}" stroke="#1b1c1e" stroke-width="2"/>`;

  const CENARIO = {
    rotulo: 'Cenário do escritório: armário, mesas com computadores, janela, cartaz de metas, extintor, tapete e funcionários',
    fundo: fundo,
    oks: [
      { id: 'posto', alvo: [386, 262, 176, 200],
        descricao: 'Funcionário sentado digitando, com o monitor num pé na altura dos olhos',
        svg: `${C.mesa(455, 330, 105)}
          ${C.monitor(494, 262, 56, 40, { pe: 23 })}
          <rect x="466" y="324" width="36" height="6" rx="2" fill="#3a3f45"/>
          ${C.pessoaSentada(420, 380, { camisa: '#1f5fa6', cabelo: '#111111', pele: '#8d5a3b', mao: [482, 324] })}` }
    ],
    partes: [
      {
        id: 'extintor', alvo: [448, 120, 50, 135],
        descPerigo: 'Extintor vermelho na parede, com o ponteiro do manômetro na faixa vermelha',
        descSeguro: 'Extintor vermelho na parede, com o ponteiro do manômetro na faixa verde',
        perigo: extintorComManometro(true),
        seguro: extintorComManometro(false)
      },
      {
        id: 'escada-cadeira', alvo: [10, 150, 192, 315],
        descPerigo: 'Funcionário em pé sobre uma cadeira giratória de rodinhas, pegando pastas no alto do armário',
        descSeguro: 'Funcionário em pé sobre uma banqueta amarela de dois degraus, pegando pastas no alto do armário',
        perigo: armario + C.cadeira(160, 396) + pessoaAlcancando +
          `<path d="M124 462 q-10 -8 -2 -18 M198 462 q10 -8 2 -18" stroke="#d62828" stroke-width="3" fill="none"/>`,
        seguro: armario + `
          <g stroke="#5a6168" stroke-width="5" stroke-linecap="round"><line x1="134" y1="398" x2="124" y2="460"/><line x1="188" y1="398" x2="198" y2="460"/></g>
          <rect x="128" y="428" width="66" height="8" rx="2" fill="#f2c200" stroke="#8b7300" stroke-width="1.5"/>
          <rect x="130" y="396" width="60" height="8" rx="2" fill="#f2c200" stroke="#8b7300" stroke-width="1.5"/>` + pessoaAlcancando
      },
      {
        id: 'notebook', alvo: [204, 230, 180, 232],
        descPerigo: 'Funcionário digitando num notebook apoiado no tampo da mesa, com a cabeça inclinada para baixo',
        descSeguro: 'Funcionário digitando num teclado separado, com o notebook num suporte na altura dos olhos',
        perigo: `${C.mesa(268, 330, 118)}
          <rect x="300" y="324" width="58" height="6" rx="2" fill="#555b61"/>
          <polygon points="352,325 362,289 367,290 357,325" fill="#2b2f33"/>
          ${C.pessoaSentada(232, 380, { camisa: '#2e9e4f', cabelo: '#5a3a22', inclinar: 22, mao: [280, 296] })}
          <path d="M236 262 q6 -7 12 0 M242 250 q6 -7 12 0" stroke="#d62828" stroke-width="3" fill="none"/>`,
        seguro: `${C.mesa(268, 330, 118)}
          <polygon points="318,330 328,300 352,300 358,330" fill="#8e979f"/>
          <rect x="322" y="296" width="40" height="5" rx="2" fill="#555b61"/>
          <polygon points="356,297 366,262 371,263 361,297" fill="#2b2f33"/>
          <rect x="282" y="324" width="32" height="6" rx="2" fill="#3a3f45"/>
          ${C.pessoaSentada(232, 380, { camisa: '#2e9e4f', cabelo: '#5a3a22', mao: [292, 324] })}`
      },
      {
        id: 'reflexo', alvo: [568, 60, 214, 402],
        descPerigo: 'Funcionário olhando um monitor colocado na frente de uma janela com sol forte',
        descSeguro: 'Funcionário olhando um monitor colocado na frente de uma janela com a persiana fechada',
        perigo: janela(true) + `
          <polygon points="650,150 712,126 628,262 618,272" fill="#ffe066" opacity="0.5"/>
          ${C.mesa(650, 330, 130)}
          ${C.monitor(688, 260, 60, 42, { pe: 23, brilho: true })}
          <rect x="662" y="324" width="36" height="6" rx="2" fill="#3a3f45"/>
          ${C.pessoaSentada(612, 380, { camisa: '#c0392b', cabelo: '#111111', mao: [670, 324] })}
          <path d="M617 266 l8 -3 M617 272 l8 2" stroke="#1b1c1e" stroke-width="2"/>`,
        seguro: janela(false) + `
          ${C.mesa(650, 330, 130)}
          ${C.monitor(688, 260, 60, 42, { pe: 23 })}
          <rect x="662" y="324" width="36" height="6" rx="2" fill="#3a3f45"/>
          ${C.pessoaSentada(612, 380, { camisa: '#c0392b', cabelo: '#111111', mao: [670, 324] })}`
      },
      {
        id: 'pausas', alvo: [790, 56, 206, 406],
        descPerigo: 'Cartaz “Meta do dia: 14.000 toques/hora. Pausa: só no almoço” e funcionário de headset digitando',
        descSeguro: 'Cartaz “Programa de pausas: 10 min a cada 50 min de digitação” e funcionário de headset digitando',
        perigo: posteMeta('META DO DIA', '14.000 toques/hora', 'Pausa: só no almoço', '#d62828') + `
          <path d="M866 312 l6 -6 l4 6 l6 -6" stroke="#d62828" stroke-width="3" fill="none"/>
          <path d="M842 250 q5 9 0 13 q-5 -4 0 -13z" fill="#5dade2"/>`,
        seguro: posteMeta('PROGRAMA DE PAUSAS', 'Pausa de 10 min', 'a cada 50 min de digitação', '#2e9e4f')
      },
      {
        id: 'fios', alvo: [222, 468, 346, 84],
        descPerigo: 'Benjamim no chão com adaptadores encaixados uns nos outros e cinco fios espalhados pelo piso',
        descSeguro: 'Tomadas na parede atrás das mesas, com os fios presos numa canaleta branca',
        perigo: `
          <rect x="520" y="346" width="18" height="22" rx="2" fill="#f4f4f4" stroke="#8a98a3" stroke-width="2"/>
          <path d="M529 360 C 532 420, 470 470, 446 500" stroke="#1b1c1e" stroke-width="4" fill="none"/>
          <path d="M388 506 C 330 520, 300 470, 300 430" stroke="#3a3f45" stroke-width="3" fill="none"/>
          <path d="M400 498 C 404 470, 450 452, 470 432" stroke="#3a3f45" stroke-width="3" fill="none"/>
          <path d="M448 512 C 540 548, 640 520, 680 432" stroke="#1b1c1e" stroke-width="3" fill="none"/>
          <path d="M416 514 C 380 548, 270 548, 230 500" stroke="#1b1c1e" stroke-width="3" fill="none"/>
          <rect x="380" y="498" width="72" height="18" rx="4" fill="#f2f2f2" stroke="#8a98a3" stroke-width="2"/>
          <rect x="404" y="476" width="18" height="24" rx="2" fill="#f2f2f2" stroke="#8a98a3" stroke-width="2"/>
          <g fill="#2b2f33">
            <rect x="386" y="490" width="12" height="12" rx="2"/><rect x="428" y="490" width="12" height="12" rx="2"/>
            <rect x="400" y="466" width="9" height="12" rx="2"/><rect x="416" y="466" width="9" height="12" rx="2"/>
          </g>
          ${C.faisca(446, 482, 11)}
          <path d="M462 496 q4 -6 0 -12 q-4 -6 0 -12" stroke="#e8742a" stroke-width="2" fill="none"/>`,
        seguro: `
          <rect x="222" y="358" width="520" height="8" fill="#f4f4f4" stroke="#b3bdc6" stroke-width="1.5"/>
          <g fill="#f4f4f4" stroke="#8a98a3" stroke-width="2">
            <rect x="300" y="340" width="16" height="20" rx="2"/><rect x="520" y="340" width="16" height="20" rx="2"/><rect x="700" y="340" width="16" height="20" rx="2"/>
          </g>
          <g stroke="#3a3f45" stroke-width="3" fill="none">
            <path d="M308 340 V332"/><path d="M528 340 V332"/><path d="M708 340 V332"/>
          </g>`
      },
      {
        id: 'tapete', alvo: [720, 482, 270, 66],
        descPerigo: 'Tapete vinho no corredor, com uma das pontas levantada',
        descSeguro: 'Tapete vinho no corredor, com a borda presa por um friso cinza',
        perigo: `
          <polygon points="736,540 762,504 976,504 960,540" fill="#8e3b46"/>
          <polygon points="748,532 768,510 962,510 950,532" fill="none" stroke="#c98f6a" stroke-width="2"/>
          <path d="M762 504 q18 -26 46 -14 l-14 18 z" fill="#a24d58" stroke="#6b2a33" stroke-width="2"/>`,
        seguro: `
          <polygon points="736,540 762,504 976,504 960,540" fill="#8e3b46" stroke="#5a6168" stroke-width="4"/>
          <polygon points="748,532 768,510 962,510 950,532" fill="none" stroke="#c98f6a" stroke-width="2"/>`
      }
    ]
  };

  Object.assign(setor, {
    disponivel: true,
    tempoInspecao: 90,
    nrs: ['NR-1', 'NR-8', 'NR-10', 'NR-17', 'NR-23'],
    resumo: 'Postos com computador, arquivo e instalações elétricas do setor administrativo.',
    briefing: 'O RH recebeu várias queixas do escritório: dores no pescoço e nos punhos, vista cansada e um “cheiro de queimado” ' +
      'perto das mesas. Encontre os perigos escondidos no setor antes que o tempo acabe.',

    cenario: { mensagemPadrao: 'Aqui está tudo certo.', montar: (ativos) => C.montar(CENARIO, ativos) },

    naoPerigos: [
      { id: 'posto', mensagem: 'Monitor na altura dos olhos, teclado e mouse sobre a mesa, costas apoiadas e pés no chão. Tudo certo aqui!' }
    ],

    perigos: [
      {
        id: 'notebook',
        nome: 'Notebook direto na mesa, com o pescoço curvado',
        descricao: 'Um funcionário passa o dia digitando no notebook apoiado direto na mesa, com a tela bem abaixo dos olhos e o pescoço curvado para a frente.',
        mensagemSeguro: 'Notebook num suporte, com a tela na altura dos olhos e teclado externo. Tudo certo aqui!',
        nrs: ['NR-17'],
        referencia: { probabilidade: 2, gravidade: 0 },
        justificativaRisco: 'A postura se repete o dia inteiro, todos os dias (probabilidade alta). As dores no pescoço e nos ombros ' +
          'costumam melhorar com tratamento, principalmente se o problema for corrigido cedo (gravidade leve).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Colocar o notebook num suporte com a tela na altura dos olhos e usar teclado e mouse externos.',
            explicacao: 'Com a tela na altura certa, o pescoço deixa de curvar. A postura forçada acaba na origem.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Orientar o funcionário a manter a coluna reta e fazer alongamentos durante o expediente.',
            explicacao: 'Alongar ajuda, mas com a tela lá embaixo o corpo volta a curvar em poucos minutos. A orientação não muda o posto.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Trocar as mesas do setor por modelos mais altos, todos com a mesma altura fixa.',
            explicacao: 'Mesa fixa mais alta não serve para todo mundo e sobe também o teclado, criando tensão nos ombros.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer munhequeira e almofada lombar individuais para o funcionário usar.',
            explicacao: 'São itens individuais que não mudam a altura da tela. O pescoço continua curvado.' }
        ],
        porque: 'A NR-17 determina que o posto de trabalho seja adaptado às características de quem trabalha. No trabalho com ' +
          'computador, a tela deve ficar numa altura e distância que permitam uma postura confortável, com a borda de cima mais ou ' +
          'menos na altura dos olhos, e o teclado deve ser independente da tela. O notebook direto na mesa obriga a escolher entre ' +
          'a tela baixa e o teclado alto. O suporte com teclado e mouse externos resolve as duas coisas e elimina a postura forçada.',
        consequencia: 'Depois de meses nessa postura, o funcionário passa a sentir dores fortes no pescoço e nos ombros, com ' +
          'formigamento nos braços, e precisa de fisioterapia.',
        noticia: {
          manchete: 'Analista é afastado por dores no pescoço após meses trabalhando curvado',
          texto: 'Um analista do escritório da Metalúrgica Horizonte foi afastado por 15 dias com dores intensas no pescoço e ' +
            'formigamento nos braços. Ele trabalhava o dia todo com o notebook apoiado direto na mesa. Após a avaliação do médico ' +
            'do trabalho, a empresa comprou suportes, teclados e mouses para o setor.'
        }
      },
      {
        id: 'reflexo',
        nome: 'Monitor de frente para a janela, com ofuscamento',
        descricao: 'O monitor foi colocado bem na frente de uma janela sem cortina. O sol bate nos olhos de quem trabalha ali e reflete na tela.',
        mensagemSeguro: 'Persiana controlando a luz do sol, sem reflexo na tela. Tudo certo aqui!',
        nrs: ['NR-17'],
        referencia: { probabilidade: 1, gravidade: 0 },
        justificativaRisco: 'O sol só bate direto em parte do dia (probabilidade média). Ofuscamento e reflexos causam cansaço ' +
          'visual e dor de cabeça, que costumam passar quando a situação é corrigida (gravidade leve).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Girar a mesa para a janela ficar ao lado do monitor e instalar persianas para controlar o sol.',
            explicacao: 'A luz deixa de bater direto nos olhos e na tela. A causa do ofuscamento sai do campo de visão.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar mais luminárias no teto da sala, com lâmpadas mais fortes, para equilibrar a claridade que vem da janela.',
            explicacao: 'Mais luz artificial não tira o sol dos olhos e ainda pode criar novos reflexos na tela.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Orientar a pessoa a fazer uma pausa curta sempre que sentir a vista cansada.',
            explicacao: 'Pausas ajudam, mas o ofuscamento volta assim que ela retoma o trabalho.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer óculos escuros para a pessoa usar enquanto trabalha no computador.',
            explicacao: 'Óculos escuros escurecem também a tela e forçam ainda mais a vista.' }
        ],
        porque: 'A NR-17 exige iluminação adequada à tarefa, evitando ofuscamento, reflexos incômodos, sombras e contrastes ' +
          'excessivos. Uma janela atrás do monitor cria um contraste enorme entre a tela e a claridade de fora. O ideal é a janela ' +
          'ficar ao lado do monitor, com persianas ou cortinas para controlar o sol. Mudar a posição tira o problema do campo de ' +
          'visão: é a medida mais eficaz.',
        consequencia: 'Com o sol nos olhos todos os dias, quem trabalha ali tem dor de cabeça, olhos secos e ardendo, e passa a ' +
          'entortar o corpo para fugir do reflexo.',
        noticia: {
          manchete: 'Ofuscamento no escritório: funcionária tem crises de dor de cabeça',
          texto: 'Uma assistente administrativa da Metalúrgica Horizonte procurou atendimento médico após semanas com dor de ' +
            'cabeça e ardência nos olhos. Seu monitor ficava de frente para uma janela sem cortina. O laudo apontou fadiga visual ' +
            'causada por ofuscamento, e o setor passará por uma análise ergonômica.'
        }
      },
      {
        id: 'pausas',
        nome: 'Digitação intensa sem pausas',
        descricao: 'Um cartaz cobra 14 mil toques por hora e avisa que pausa só no almoço. O funcionário digita sem parar e já sente dor no punho.',
        mensagemSeguro: 'Programa de pausas afixado e seguido pela equipe. Tudo certo aqui!',
        nrs: ['NR-17'],
        referencia: { probabilidade: 2, gravidade: 1 },
        justificativaRisco: 'A sobrecarga acontece todos os dias, durante horas (probabilidade alta). Lesões por esforço repetitivo ' +
          '(LER/DORT) podem exigir tratamento longo e afastamento (gravidade moderada).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Rever a meta, incluir pausas de descanso fora do posto e alternar a digitação com outras tarefas.',
            explicacao: 'Ataca a organização do trabalho, que é a causa da sobrecarga. O corpo ganha tempo para se recuperar.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer munhequeiras para todos os digitadores usarem durante o expediente.',
            explicacao: 'Munhequeira não reduz o número de movimentos nem o ritmo. A sobrecarga continua igual.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Comprar teclados ergonômicos, mouses verticais e apoios de punho em gel para todos os postos do setor.',
            explicacao: 'Um bom teclado ajuda, mas 14 mil toques por hora sem descanso continuam sobrecarregando punhos e dedos.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Acabar com a digitação trocando o sistema por formulários em papel preenchidos à mão.',
            explicacao: 'Troca um esforço repetitivo por outro, o de escrever à mão, e atrasa o trabalho. A causa real é o ritmo sem pausas.' }
        ],
        porque: 'A NR-17 trata também da organização do trabalho: normas de produção, ritmo, conteúdo das tarefas e pausas. Em ' +
          'atividades com digitação intensa, as metas não podem obrigar a um ritmo excessivo e devem existir pausas para descanso. ' +
          'Como a causa está no jeito de organizar o trabalho, a solução é uma medida administrativa: rever a meta, programar ' +
          'pausas e alternar as tarefas.',
        consequencia: 'Depois de alguns meses, o funcionário desenvolve tendinite nos punhos e não consegue mais digitar sem dor.',
        noticia: {
          manchete: 'Digitador desenvolve tendinite e é afastado do trabalho',
          texto: 'Um digitador da Metalúrgica Horizonte foi diagnosticado com tendinite nos dois punhos e afastado pelo INSS. Ele ' +
            'cumpria uma meta de 14 mil toques por hora, com pausa apenas no almoço. O sindicato pediu a revisão das metas e a ' +
            'inclusão de pausas para todo o setor.'
        }
      },
      {
        id: 'escada-cadeira',
        nome: 'Em pé sobre uma cadeira com rodinhas',
        descricao: 'Para alcançar as pastas no alto do armário, um funcionário subiu numa cadeira giratória com rodinhas.',
        mensagemSeguro: 'Funcionário usando uma escada-banqueta com trava para alcançar o alto do armário. Tudo certo aqui!',
        nrs: ['NR-1'],
        referencia: { probabilidade: 1, gravidade: 1 },
        justificativaRisco: 'Alguém sobe na cadeira algumas vezes por semana, e ela gira e desliza ao menor movimento ' +
          '(probabilidade média). A queda pode causar fraturas e batidas na cabeça (gravidade moderada).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Deixar no setor uma escada-banqueta com trava e degraus antiderrapantes, proibindo subir em cadeiras.',
            explicacao: 'Oferece a todos um meio seguro e estável de alcançar o alto do armário.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer sapatos antiderrapantes para todas as pessoas que trabalham no escritório.',
            explicacao: 'O problema não é o sapato, é a cadeira, que gira e rola. Com qualquer calçado ela pode escapar.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Criar uma regra: sempre que alguém precisar subir na cadeira, um colega deve segurá-la firme pelo encosto.',
            explicacao: 'Depende de ter alguém disponível toda vez e não impede a cadeira de girar. É improviso, não solução.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Retirar o armário alto e passar a guardar todas as pastas empilhadas no chão.',
            explicacao: 'Pilhas no chão atrapalham a passagem, causam tropeços e obrigam a se agachar o tempo todo.' }
        ],
        porque: 'A NR-1 exige que a empresa identifique os perigos e adote medidas de prevenção, dando prioridade às que protegem ' +
          'a todos. Cadeiras não foram feitas para servir de escada, ainda mais com rodinhas e assento giratório. Uma escada-banqueta ' +
          'com trava e degraus antiderrapantes dá um apoio estável para qualquer pessoa do setor. Guardar as pastas mais usadas ' +
          'nas prateleiras baixas também diminui a necessidade de subir.',
        consequencia: 'A cadeira gira, as rodinhas deslizam e o funcionário cai de costas, batendo a cabeça ou fraturando o punho ao tentar se apoiar.',
        noticia: {
          manchete: 'Funcionário cai de cadeira giratória ao tentar pegar pasta no alto do armário',
          texto: 'Um auxiliar administrativo da Metalúrgica Horizonte fraturou o punho depois de cair de uma cadeira com rodinhas ' +
            'em que tinha subido para alcançar uma pasta. A cadeira girou e deslizou. Ele foi levado ao hospital e ficará afastado ' +
            'por cerca de 45 dias.'
        }
      },
      {
        id: 'fios',
        nome: 'Benjamim sobrecarregado e fios no chão',
        descricao: 'Vários aparelhos estão ligados num único benjamim, com adaptador em cima de adaptador, e os fios atravessam a passagem.',
        mensagemSeguro: 'Tomadas suficientes junto às mesas e fios em canaletas. Tudo certo aqui!',
        nrs: ['NR-10', 'NR-23'],
        referencia: { probabilidade: 1, gravidade: 2 },
        justificativaRisco: 'Tropeços nos fios e o aquecimento da tomada são bem possíveis no dia a dia (probabilidade média). O ' +
          'superaquecimento pode causar um incêndio, e um tropeço pode levar a uma queda séria (gravidade grave).',
        opcoes: [
          { nivel: 'coletiva', correta: true,
            texto: 'Instalar tomadas suficientes junto às mesas, com eletricista qualificado, e passar os fios por canaletas.',
            explicacao: 'Acaba com a sobrecarga e tira os fios do caminho, protegendo todos que circulam pelo escritório.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Colocar avisos de “cuidado com os fios” perto das mesas e pedir que todos olhem para o chão ao passar por ali.',
            explicacao: 'O aviso não diminui a carga no benjamim nem tira os fios do chão.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer luvas isolantes para quem precisar ligar ou desligar os aparelhos do benjamim.',
            explicacao: 'O risco principal é o aquecimento e o tropeço, que luva nenhuma resolve.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Proibir o uso de computadores e impressoras até a reforma elétrica completa do prédio.',
            explicacao: 'Inviável: o escritório não funciona sem eles. O problema pode ser corrigido sem parar o setor.' }
        ],
        porque: 'A NR-10 exige que as instalações elétricas sejam adequadas à carga, mantidas em condições seguras e alteradas ' +
          'apenas por profissionais qualificados. Benjamins e extensões em cascata sobrecarregam a tomada, que aquece e pode ' +
          'iniciar um incêndio, risco tratado pela NR-23. Tomadas suficientes e fiação em canaletas acabam com a sobrecarga e com ' +
          'o tropeço para todos de uma vez.',
        consequencia: 'A tomada aquece, o plástico derrete e começa um princípio de incêndio embaixo das mesas. Antes disso, alguém já pode ter tropeçado nos fios.',
        noticia: {
          manchete: 'Benjamim sobrecarregado provoca princípio de incêndio em escritório',
          texto: 'Um benjamim com vários aparelhos ligados superaqueceu e pegou fogo embaixo de uma mesa do escritório da ' +
            'Metalúrgica Horizonte. Funcionários usaram o extintor e controlaram as chamas. Uma impressora e parte da fiação foram ' +
            'perdidas, e o setor ficou dois dias sem energia para reparos.'
        }
      },
      {
        id: 'tapete',
        nome: 'Tapete com a ponta dobrada no caminho',
        descricao: 'Um tapete solto no corredor está com a ponta dobrada e levantada, bem no caminho de quem passa.',
        mensagemSeguro: 'Tapete liso, com as bordas presas ao piso. Tudo certo aqui!',
        nrs: ['NR-8'],
        referencia: { probabilidade: 1, gravidade: 0 },
        justificativaRisco: 'Muita gente passa por ali, e a dobra está no caminho (probabilidade média). Na maioria das vezes, um ' +
          'tropeço desses causa só um susto ou um roxo (gravidade leve).',
        opcoes: [
          { nivel: 'eliminacao', correta: true,
            texto: 'Retirar o tapete solto da passagem, deixando o piso liso e livre de saliências.',
            explicacao: 'Sem a dobra no caminho, não há mais em que tropeçar.' },
          { nivel: 'administrativa', correta: false,
            texto: 'Colar no chão um aviso de “cuidado, degrau” ao lado da dobra do tapete.',
            explicacao: 'O aviso só funciona para quem olha para o chão. A dobra continua lá.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer sapatos com sola antiderrapante para quem circula pelo escritório.',
            explicacao: 'Sola antiderrapante evita escorregões, não tropeços numa ponta levantada.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar um corrimão na parede ao longo do corredor para as pessoas se apoiarem.',
            explicacao: 'O corrimão pode ajudar a se segurar, mas a causa do tropeço continua no meio do caminho.' }
        ],
        porque: 'A NR-8, que trata das edificações, determina que os pisos dos locais de trabalho não tenham saliências nem ' +
          'depressões que atrapalhem a circulação. Um tapete solto, com a ponta dobrada, é exatamente isso. Tirá-lo do caminho ' +
          'elimina o tropeço. Se o tapete for mesmo necessário, ele precisa ficar bem fixado, com as bordas presas ao piso.',
        consequencia: 'Uma funcionária tropeça na dobra do tapete carregando uma pilha de pastas e cai de joelhos no chão.',
        noticia: {
          manchete: 'Funcionária tropeça em tapete e torce o tornozelo no escritório',
          texto: 'Uma assistente da Metalúrgica Horizonte tropeçou na ponta dobrada de um tapete do corredor e torceu o tornozelo. ' +
            'Ela foi atendida no ambulatório e liberada com uma imobilização. Colegas contaram que o tapete estava levantado havia dias.'
        }
      },
      {
        id: 'extintor',
        nome: 'Extintor descarregado',
        descricao: 'O ponteiro do manômetro do extintor está na faixa vermelha, indicando que ele está sem pressão, e o lacre está rompido.',
        mensagemSeguro: 'Extintor com o ponteiro na faixa verde e o lacre intacto. Tudo certo aqui!',
        nrs: ['NR-23'],
        referencia: { probabilidade: 0, gravidade: 2 },
        justificativaRisco: 'Um princípio de incêndio no escritório não é frequente (probabilidade baixa). Mas, se acontecer, um ' +
          'extintor descarregado não apaga nada e o fogo pode se espalhar (gravidade grave).',
        opcoes: [
          { nivel: 'administrativa', correta: true,
            texto: 'Mandar recarregar o extintor e incluir a conferência do manômetro e do lacre na inspeção mensal.',
            explicacao: 'O extintor volta a funcionar, e a rotina de inspeção evita que o problema passe despercebido de novo.' },
          { nivel: 'coletiva', correta: false,
            texto: 'Instalar detectores de fumaça no escritório e deixar o extintor como está.',
            explicacao: 'O detector avisa do fogo, mas não apaga. Sem extintor funcionando, ninguém consegue combater o princípio de incêndio.' },
          { nivel: 'epi', correta: false,
            texto: 'Fornecer máscaras, luvas e roupas resistentes ao calor para a brigada usar caso precise enfrentar um incêndio.',
            explicacao: 'Sem extintor carregado, a brigada não tem com o que combater o fogo.' },
          { nivel: 'eliminacao', correta: false,
            texto: 'Proibir aparelhos elétricos no escritório para acabar com o risco de incêndio.',
            explicacao: 'Inviável: o escritório não funciona sem computadores. E o extintor continuaria descarregado.' }
        ],
        porque: 'A NR-23, junto com as normas do Corpo de Bombeiros, exige que os equipamentos de combate a incêndio estejam ' +
          'prontos para uso. Por isso os extintores passam por inspeções periódicas e manutenção: o ponteiro do manômetro deve ' +
          'estar na faixa verde e o lacre, intacto. A inspeção de rotina é uma medida administrativa simples que garante que o ' +
          'extintor funcione na hora em que for preciso.',
        consequencia: 'Num princípio de incêndio na copa, alguém pega o extintor, aperta o gatilho e nada sai.',
        noticia: {
          manchete: 'Extintor descarregado atrasa combate a incêndio em escritório',
          texto: 'Um curto-circuito numa cafeteira provocou fogo na copa do escritório da Metalúrgica Horizonte. O extintor mais ' +
            'próximo estava descarregado, e os funcionários precisaram buscar outro no andar de baixo. O fogo foi controlado, mas ' +
            'danificou móveis e documentos.'
        }
      }
    ],

    quiz: [
      {
        tema: 'Posto com computador', nr: 'NR-17',
        pergunta: 'Num posto de trabalho com computador, onde deve ficar a parte de cima da tela?',
        opcoes: ['Bem abaixo dos olhos, para descansar a vista', 'Mais ou menos na altura dos olhos', 'Acima da cabeça, para esticar o pescoço', 'Tanto faz, desde que a tela seja grande'],
        correta: 1,
        explicacao: 'Com a borda de cima da tela mais ou menos na altura dos olhos, o pescoço fica numa posição neutra. Tela muito ' +
          'baixa curva o pescoço; tela muito alta obriga a erguer a cabeça.'
      },
      {
        tema: 'Mobiliário', nr: 'NR-17',
        pergunta: 'Qual destas características uma cadeira de trabalho deve ter, segundo a NR-17?',
        opcoes: ['Ser fixa, sem nenhuma regulagem', 'Ter altura ajustável e encosto que proteja a região lombar', 'Ter assento duro, para manter a pessoa acordada', 'Não ter encosto, para obrigar a ficar com a coluna reta'],
        correta: 1,
        explicacao: 'Assentos com altura ajustável e encosto adaptado à coluna se ajustam a pessoas de tamanhos diferentes e ' +
          'protegem a região lombar.'
      },
      {
        tema: 'Organização do trabalho', nr: 'NR-17',
        pergunta: 'O que a NR-17 diz sobre atividades com digitação intensa?',
        opcoes: ['Que a pessoa deve digitar o mais rápido possível', 'Que devem existir pausas e metas que não exijam ritmo excessivo', 'Que pausas só são permitidas no almoço', 'Que basta usar munhequeira'],
        correta: 1,
        explicacao: 'Para a NR-17, a organização do trabalho (ritmo, metas e pausas) faz parte da ergonomia. Ritmo excessivo sem ' +
          'descanso é uma das principais causas de LER/DORT.'
      },
      {
        tema: 'Instalações elétricas', nr: 'NR-10',
        pergunta: 'Por que é perigoso ligar muitos aparelhos num mesmo benjamim?',
        opcoes: ['Porque gasta mais energia elétrica', 'Porque a tomada fica sobrecarregada, aquece e pode pegar fogo', 'Porque os aparelhos ficam mais lentos', 'Não há perigo se o benjamim for novo'],
        correta: 1,
        explicacao: 'Cada aparelho puxa corrente. Somados, eles passam do limite da tomada e dos fios, que aquecem. Esse calor pode ' +
          'derreter o plástico e iniciar um incêndio.'
      },
      {
        tema: 'Iluminação', nr: 'NR-17',
        pergunta: 'Qual é a melhor posição do monitor em relação a uma janela?',
        opcoes: ['Com a janela atrás do monitor', 'Com a janela atrás da pessoa, refletindo na tela', 'Com a janela ao lado do monitor', 'A posição não faz diferença'],
        correta: 2,
        explicacao: 'Com a janela ao lado, a luz do sol não bate direto nos olhos nem reflete na tela. Persianas ou cortinas ajudam ' +
          'a controlar a claridade ao longo do dia.'
      }
    ]
  });
})();
