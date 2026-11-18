(function () {
  'use strict';

  const DADOS = window.JOGO_DADOS;
  const palco = document.getElementById('palco');

  if (!DADOS) {
    palco.textContent = 'Não foi possível carregar o conteúdo do jogo (js/data.js).';
    return;
  }

  const CFG = DADOS.config;
  const CHAVE_SAVE = 'simuladorNR.progresso.v1';
  const ETAPAS = ['Identificar', 'Avaliar', 'Resolver', 'Feedback', 'Quiz', 'Consequência', 'Resultado'];
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const reduzirMovimento = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  let progresso = carregarProgresso();
  let fase = null;

  function h(tag, props) {
    const el = document.createElement(tag);
    if (props) {
      for (const chave of Object.keys(props)) {
        const valor = props[chave];
        if (valor === null || valor === undefined || valor === false) continue;
        if (chave === 'class') el.className = valor;
        else if (chave === 'html') el.innerHTML = valor;
        else if (chave === 'style') el.style.cssText = valor;
        else if (chave.indexOf('on') === 0) el.addEventListener(chave.slice(2), valor);
        else el.setAttribute(chave, valor === true ? '' : valor);
      }
    }
    const filhos = Array.prototype.slice.call(arguments, 2);
    anexar(el, filhos);
    return el;
  }

  function anexar(el, filhos) {
    for (const f of filhos) {
      if (f === null || f === undefined || f === false) continue;
      if (Array.isArray(f)) anexar(el, f);
      else el.append(f.nodeType ? f : String(f));
    }
  }

  function embaralhar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = copia[i]; copia[i] = copia[j]; copia[j] = t;
    }
    return copia;
  }

  const limitar = (v, min, max) => Math.min(max, Math.max(min, v));
  const fmt = (n) => Number(n).toLocaleString('pt-BR');
  const numeroNR = (nr) => { const m = /(\d+)/.exec(nr); return m ? Number(m[1]) : 999; };

  function formatarTempo(seg) {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function anunciar(texto) {
    const regiao = document.getElementById('aviso-leitor');
    regiao.textContent = '';
    setTimeout(() => { regiao.textContent = texto; }, 40);
  }

  function animarNumero(el, de, para, duracao) {
    if (reduzirMovimento || de === para) { el.textContent = fmt(para); return; }
    const ms = duracao || 900;
    const inicio = performance.now();
    function passo(agora) {
      const k = Math.min(1, (agora - inicio) / ms);
      const suave = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(Math.round(de + (para - de) * suave));
      if (k < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  const perigoPorId = (id) => fase.setor.perigos.find((p) => p.id === id);
  const nivelHierarquia = (id) => DADOS.hierarquia.find((n) => n.id === id) || { nome: id, cor: '#555' };
  const nivelRisco = (prob, grav) => DADOS.niveisRisco[DADOS.matrizRisco[prob][grav]];

  function etiquetaNivel(idNivel) {
    const n = nivelHierarquia(idNivel);
    return h('span', { class: 'etiqueta-nivel', style: '--cor-nivel:' + n.cor }, n.nome);
  }

  function seloRisco(prob, grav) {
    const n = nivelRisco(prob, grav);
    return h('span', { class: 'selo-risco', style: 'background:' + n.cor + ';color:' + n.corTexto }, 'Risco ' + n.nome.toLowerCase());
  }

  function textoClassificacao(prob, grav) {
    return DADOS.escalas.probabilidade[prob] + ' × ' + DADOS.escalas.gravidade[grav];
  }

  function classeIndice(v) { return v < 40 ? 'ruim' : v < 70 ? 'medio' : 'bom'; }

  function progressoPadrao() {
    return {
      versao: 1,
      pontosTotais: 0,
      indice: CFG.indiceInicial,
      diasSemAcidentes: 0,
      fasesJogadas: 0,
      medalhas: [],
      setores: {},
      aluno: { nome: '', turma: '' }
    };
  }

  function carregarProgresso() {
    const padrao = progressoPadrao();
    try {
      const bruto = window.localStorage.getItem(CHAVE_SAVE);
      if (bruto) {
        const salvo = JSON.parse(bruto);
        if (salvo && typeof salvo === 'object') {
          const p = Object.assign(padrao, salvo);
          if (!Array.isArray(p.medalhas)) p.medalhas = [];
          if (!p.setores || typeof p.setores !== 'object') p.setores = {};
          if (!p.aluno || typeof p.aluno !== 'object') p.aluno = { nome: '', turma: '' };
          p.indice = limitar(Number(p.indice) || 0, 0, 100);
          return p;
        }
      }
    } catch (e) {

    }
    return padrao;
  }

  function salvarProgresso() {
    try {
      window.localStorage.setItem(CHAVE_SAVE, JSON.stringify(progresso));
    } catch (e) {

    }
  }

  function cargoPorPontos(pontos) {
    let atual = DADOS.cargos[0];
    for (const c of DADOS.cargos) if (pontos >= c.minimo) atual = c;
    return atual;
  }

  const proximoCargo = (pontos) => DADOS.cargos.find((c) => c.minimo > pontos) || null;

  const hudEl = {
    dias: document.getElementById('hud-dias'),
    itemDias: document.getElementById('hud-item-dias'),
    indice: document.getElementById('hud-indice'),
    barra: document.getElementById('hud-indice-barra'),
    preenchimento: document.getElementById('hud-indice-preenchimento'),
    cargo: document.getElementById('hud-cargo'),
    pontos: document.getElementById('hud-pontos')
  };
  let hudExibido = null;

  function atualizarHUD(animar) {
    const novo = { dias: progresso.diasSemAcidentes, indice: progresso.indice, pontos: progresso.pontosTotais };
    const antigo = hudExibido || novo;

    if (animar) {
      animarNumero(hudEl.dias, antigo.dias, novo.dias);
      animarNumero(hudEl.indice, antigo.indice, novo.indice);
      animarNumero(hudEl.pontos, antigo.pontos, novo.pontos);
      if (novo.dias < antigo.dias) piscar(hudEl.itemDias, 'alerta');
      else if (novo.dias > antigo.dias) piscar(hudEl.itemDias, 'festa');
    } else {
      hudEl.dias.textContent = fmt(novo.dias);
      hudEl.indice.textContent = fmt(novo.indice);
      hudEl.pontos.textContent = fmt(novo.pontos);
    }

    hudEl.preenchimento.style.width = novo.indice + '%';
    hudEl.barra.className = 'barra ' + classeIndice(novo.indice);
    hudEl.barra.setAttribute('aria-valuenow', String(novo.indice));
    hudEl.cargo.textContent = cargoPorPontos(novo.pontos).nome;
    hudExibido = novo;
  }

  function piscar(el, classe) {
    el.classList.remove(classe);
    void el.offsetWidth;
    el.classList.add(classe);
    setTimeout(() => el.classList.remove(classe), 1600);
  }

  function confirmar(opcoes) {
    return new Promise((resolver) => {
      const anterior = document.activeElement;
      let fechado = false;

      function fechar(resposta) {
        if (fechado) return;
        fechado = true;
        fundo.remove();
        document.removeEventListener('keydown', aoTeclar);
        if (anterior && anterior.focus && document.body.contains(anterior)) anterior.focus();
        resolver(resposta);
      }
      function aoTeclar(e) {
        if (e.key === 'Escape') fechar(false);
        if (e.key === 'Tab') {
          const focaveis = [btnNao, btnSim];
          const i = focaveis.indexOf(document.activeElement);
          e.preventDefault();
          focaveis[(i + (e.shiftKey ? -1 : 1) + focaveis.length) % focaveis.length].focus();
        }
      }

      const btnNao = h('button', { type: 'button', class: 'btn btn-secundario', onclick: () => fechar(false) }, opcoes.nao || 'Cancelar');
      const btnSim = h('button', { type: 'button', class: 'btn ' + (opcoes.perigoso ? 'btn-perigo' : 'btn-primario'), onclick: () => fechar(true) }, opcoes.sim || 'Confirmar');
      const fundo = h('div', { class: 'modal-fundo', onclick: (e) => { if (e.target === fundo) fechar(false); } },
        h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-titulo', 'aria-describedby': 'modal-texto' },
          h('h2', { id: 'modal-titulo' }, opcoes.titulo),
          h('p', { id: 'modal-texto' }, opcoes.mensagem),
          h('div', { class: 'modal-botoes' }, btnNao, btnSim)
        )
      );
      fundo._fechar = fechar;
      document.addEventListener('keydown', aoTeclar);
      document.body.append(fundo);
      btnNao.focus();
    });
  }

  function fecharModais() {
    document.querySelectorAll('.modal-fundo').forEach((m) => { if (m._fechar) m._fechar(false); });
  }

  function mostrar() {
    const nos = Array.prototype.slice.call(arguments);
    palco.replaceChildren();
    anexar(palco, nos);
    window.scrollTo(0, 0);
    palco.focus({ preventScroll: true });
  }

  function telaInicio() {
    fase = null;
    const T = DADOS.textos;
    mostrar(
      h('section', { class: 'tela tela-inicio' },
        h('div', { class: 'faixa-zebrada', 'aria-hidden': 'true' }),
        h('p', { class: 'sobretitulo' }, DADOS.empresa + ' · Treinamento de segurança'),
        h('h1', null, 'Simulador de Segurança do Trabalho'),
        h('p', { class: 'subtitulo' }, 'As Normas Regulamentadoras (NRs) na prática'),
        h('div', { class: 'cartao cartao-papel' },
          h('h2', null, 'Seu papel'),
          h('p', null, T.papel)
        ),
        h('ol', { class: 'passos-inicio' },
          T.comoFunciona.map((p, i) => h('li', null,
            h('span', { class: 'passo-num', 'aria-hidden': 'true' }, i + 1),
            h('strong', null, p.titulo), h('span', null, p.texto)))
        ),
        h('button', { type: 'button', class: 'btn btn-primario btn-grande', onclick: telaMapa }, 'Começar'),
        h('p', { class: 'nota-rodape' }, T.avisoNRs)
      )
    );
  }

  function telaMapa() {
    pararCronometro();
    fase = null;

    const cartoes = DADOS.setores.map(cartaoSetor);
    const pontos = progresso.pontosTotais;
    const cargo = cargoPorPontos(pontos);
    const prox = proximoCargo(pontos);
    const pctCargo = prox ? Math.round(((pontos - cargo.minimo) / (prox.minimo - cargo.minimo)) * 100) : 100;

    const ultimoRel = Object.keys(progresso.setores)
      .map((id) => progresso.setores[id] && progresso.setores[id].ultimoRelatorio)
      .filter(Boolean)
      .sort((a, b) => (b.data || '').localeCompare(a.data || ''))[0];

    mostrar(
      h('section', { class: 'tela tela-mapa' },
        h('h1', null, 'Mapa da empresa'),
        h('p', { class: 'etapa-intro' }, 'Escolha um setor da ' + DADOS.empresa + ' para inspecionar.'),
        h('div', { class: 'mapa', role: 'list', 'aria-label': 'Setores da empresa' }, cartoes),

        h('div', { class: 'painel-progresso' },
          h('div', { class: 'cartao' },
            h('h2', null, 'Sua carreira'),
            h('p', { class: 'cargo-atual' }, cargo.nome),
            h('div', { class: 'barra barra-cargo', role: 'progressbar', 'aria-label': 'Progresso até o próximo cargo', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(pctCargo) },
              h('div', { class: 'barra-preenchimento', style: 'width:' + pctCargo + '%' })),
            h('p', { class: 'texto-suave' }, prox
              ? 'Faltam ' + fmt(prox.minimo - pontos) + ' pontos para ' + prox.nome + '.'
              : 'Você chegou ao topo da carreira!'),
            h('ul', { class: 'lista-cargos' }, DADOS.cargos.map((c) =>
              h('li', { class: pontos >= c.minimo ? 'alcancado' : '' }, c.nome, h('span', null, fmt(c.minimo) + ' pts'))))
          ),
          h('div', { class: 'cartao' },
            h('h2', null, 'Medalhas'),
            h('ul', { class: 'lista-medalhas' }, DADOS.medalhas.map((m) => {
              const tem = progresso.medalhas.indexOf(m.id) >= 0;
              return h('li', { class: 'medalha ' + (tem ? 'conquistada' : 'bloqueada') },
                h('span', { class: 'medalha-icone', 'aria-hidden': 'true' }, m.icone),
                h('span', null, h('strong', null, m.nome), h('small', null, m.descricao)),
                h('span', { class: 'somente-leitor' }, tem ? '(conquistada)' : '(ainda não conquistada)'));
            }))
          )
        ),

        h('div', { class: 'acoes-etapa' },
          ultimoRel ? h('button', { type: 'button', class: 'btn btn-secundario', onclick: () => telaRelatorio(ultimoRel, false) }, 'Ver último relatório') : null,
          h('button', { type: 'button', class: 'btn btn-secundario', onclick: telaInicio }, 'Tela inicial'),
          h('button', { type: 'button', class: 'btn btn-perigo-contorno', onclick: reiniciarProgresso }, 'Reiniciar progresso')
        )
      )
    );
  }

  function cartaoSetor(s) {
    const reg = progresso.setores[s.id];
    const conteudo = [
      h('span', { class: 'setor-icone', 'aria-hidden': 'true' }, s.icone || '🏭'),
      h('span', { class: 'setor-nome' }, s.nome),
      h('span', { class: 'setor-nrs' }, (s.nrs || []).join(' · ')),
      h('span', { class: 'setor-resumo' }, s.resumo || '')
    ];

    if (!s.disponivel) {
      return h('div', { class: 'setor bloqueado', role: 'listitem', 'aria-label': s.nome + ': em breve' },
        conteudo,
        h('span', { class: 'selo-em-breve' }, 'Em breve'),
        h('span', { class: 'setor-cadeado', 'aria-hidden': 'true' }, '🔒'));
    }

    return h('div', { role: 'listitem', class: 'setor-item' },
      h('button', { type: 'button', class: 'setor disponivel', onclick: () => iniciarFase(s.id) },
        conteudo,
        h('span', { class: 'setor-status' }, reg
          ? 'Melhor pontuação: ' + fmt(reg.melhorPontuacao) + ' · jogado ' + reg.vezesJogado + 'x'
          : 'Ainda não inspecionado'),
        h('span', { class: 'btn btn-primario btn-falso' }, reg ? 'Inspecionar de novo' : 'Inspecionar')));
  }

  async function reiniciarProgresso() {
    const ok = await confirmar({
      titulo: 'Reiniciar progresso?',
      mensagem: 'Pontuação, cargo, medalhas, índice de segurança, dias sem acidentes e relatórios salvos serão apagados. Essa ação não pode ser desfeita.',
      sim: 'Sim, reiniciar',
      nao: 'Cancelar',
      perigoso: true
    });
    if (!ok) return;
    progresso = progressoPadrao();
    try { window.localStorage.removeItem(CHAVE_SAVE); } catch (e) {  }
    salvarProgresso();
    atualizarHUD(true);
    telaMapa();
    anunciar('Progresso reiniciado.');
  }

  function iniciarFase(idSetor) {
    const setor = DADOS.setores.find((s) => s.id === idSetor && s.disponivel);
    if (!setor) return;
    fase = {
      setor: setor,
      encontrados: [],
      inspecaoEncerrada: false,
      motivoFim: null,
      inicio: 0,
      fimPrevisto: 0,
      cronometro: null,
      tempoTodos: null,
      cliquesSemPerigo: 0,
      avaliacoes: {},
      acoes: {},
      ordemOpcoes: {},
      quiz: [],
      pontos: { identificar: 0, avaliar: 0, resolver: 0, quiz: 0 },
      concluida: false,
      resultado: null
    };
    telaBriefing();
  }

  const totalFase = () => fase ? fase.pontos.identificar + fase.pontos.avaliar + fase.pontos.resolver + fase.pontos.quiz : 0;

  function atualizarPontosFase() {
    const el = document.getElementById('pontos-fase');
    if (el) el.textContent = fmt(totalFase());
  }

  function pararCronometro() {
    if (fase && fase.cronometro) {
      clearInterval(fase.cronometro);
      fase.cronometro = null;
    }
  }

  function cabecalhoFase(indiceEtapa) {
    return h('div', { class: 'fase-cabecalho' },
      h('div', { class: 'fase-linha' },
        h('span', { class: 'fase-setor' }, (fase.setor.icone || '') + ' ' + fase.setor.nome),
        h('span', { class: 'fase-pontos' }, 'Pontos nesta fase: ', h('strong', { id: 'pontos-fase' }, fmt(totalFase()))),
        fase.concluida ? null : h('button', { type: 'button', class: 'btn-link', onclick: sairDaFase }, 'Sair da fase')
      ),
      h('ol', { class: 'etapas', 'aria-label': 'Etapas da fase' }, ETAPAS.map((nome, k) =>
        h('li', { class: k < indiceEtapa ? 'feita' : k === indiceEtapa ? 'atual' : '', 'aria-current': k === indiceEtapa ? 'step' : null },
          h('span', { class: 'etapa-num', 'aria-hidden': 'true' }, k < indiceEtapa ? '✓' : k + 1),
          h('span', { class: 'etapa-nome' }, nome))))
    );
  }

  async function sairDaFase() {
    const ok = await confirmar({
      titulo: 'Sair da fase?',
      mensagem: 'O andamento desta inspeção será perdido e nada será salvo.',
      sim: 'Sair da fase',
      nao: 'Continuar jogando',
      perigoso: true
    });
    if (!ok || !fase) return;
    pararCronometro();
    telaMapa();
  }

  function telaBriefing() {
    const s = fase.setor;
    mostrar(
      cabecalhoFase(0),
      h('section', { class: 'etapa cartao briefing' },
        h('h1', null, (s.icone || '') + ' ' + s.nome),
        h('p', { class: 'setor-nrs' }, 'NRs envolvidas: ' + s.nrs.join(', ')),
        h('p', null, s.briefing),
        h('ul', { class: 'lista-dicas' },
          h('li', null, 'Você tem ', h('strong', null, CFG.tempoInspecao + ' segundos'), '.'),
          h('li', null, 'Há ', h('strong', null, s.perigos.length + ' perigos'), ' para encontrar.'),
          h('li', null, 'Perigo que ficar de fora pode virar acidente no dia seguinte.')),
        h('div', { class: 'acoes-etapa' },
          h('button', { type: 'button', class: 'btn btn-primario btn-grande', onclick: etapaIdentificar }, 'Iniciar inspeção'))
      )
    );
  }

  function etapaIdentificar() {
    const setor = fase.setor;
    const total = setor.perigos.length;

    const cena = h('div', { class: 'cena', html: setor.cenario.svg });
    const svg = cena.querySelector('svg');
    svg.classList.add('cena-svg');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const aviso = h('div', { class: 'cena-aviso', role: 'status' });
    const cenaMoldura = h('div', { class: 'cena-moldura' }, cena, aviso);
    const dicaRolagem = h('p', { class: 'dica-rolagem' }, '↔ Deslize o cenário para os lados para ver o setor inteiro.');

    const listaVazia = h('p', { class: 'lista-vazia' }, 'Nenhum perigo encontrado ainda.');
    const lista = h('ol', { class: 'lista-encontrados' });
    const contador = h('strong', { class: 'contador' }, '0 de ' + total);
    const tempoTexto = h('span', { class: 'relogio-numero' }, formatarTempo(CFG.tempoInspecao));
    const tempoBarra = h('div', { class: 'barra-preenchimento' });
    const relogio = h('div', { class: 'relogio', role: 'timer', 'aria-label': 'Tempo restante' },
      h('span', { class: 'relogio-icone', 'aria-hidden': 'true' }, '⏱'), tempoTexto,
      h('div', { class: 'barra barra-tempo' }, tempoBarra));
    const btnEncerrar = h('button', { type: 'button', class: 'btn btn-secundario', onclick: pedirEncerramento }, 'Encerrar inspeção');

    let temporizadorAviso = null;
    function mostrarAviso(texto, tipo) {
      aviso.textContent = texto;
      aviso.className = 'cena-aviso visivel ' + (tipo || '');
      clearTimeout(temporizadorAviso);
      temporizadorAviso = setTimeout(() => aviso.classList.remove('visivel'), 2400);
    }

    svg.addEventListener('click', (ev) => {
      if (!fase || fase.inspecaoEncerrada) return;
      const grupoPerigo = ev.target.closest('[data-perigo]');

      if (grupoPerigo) {
        const id = grupoPerigo.getAttribute('data-perigo');
        const p = perigoPorId(id);
        if (!p) return;
        if (fase.encontrados.indexOf(id) >= 0) {
          mostrarAviso('Você já registrou este perigo.', 'info');
          return;
        }
        fase.encontrados.push(id);
        fase.pontos.identificar += CFG.pontos.perigoEncontrado;
        grupoPerigo.classList.add('encontrado');
        marcarNumero(svg, grupoPerigo, fase.encontrados.length);
        listaVazia.remove();
        lista.append(h('li', { class: 'novo' }, p.nome));
        contador.textContent = fase.encontrados.length + ' de ' + total;
        atualizarPontosFase();
        mostrarAviso('Perigo identificado: ' + p.nome, 'sucesso');
        anunciar('Perigo identificado: ' + p.nome + '. ' + fase.encontrados.length + ' de ' + total + '.');

        if (fase.encontrados.length === total) {
          fase.tempoTodos = (Date.now() - fase.inicio) / 1000;
          pararCronometro();
          fase.inspecaoEncerrada = true;
          setTimeout(() => finalizarInspecao('todos'), 700);
        }
        return;
      }

      fase.cliquesSemPerigo++;
      const grupoOk = ev.target.closest('[data-ok]');
      const item = grupoOk && (setor.naoPerigos || []).find((n) => n.id === grupoOk.getAttribute('data-ok'));
      mostrarAviso(item ? item.mensagem : (setor.cenario.mensagemPadrao || DADOS.textos.semPerigo), 'ok');
      marcarToque(svg, ev);
    });

    async function pedirEncerramento() {
      if (!fase || fase.inspecaoEncerrada) return;
      const faltam = total - fase.encontrados.length;
      const ok = await confirmar({
        titulo: 'Encerrar a inspeção?',
        mensagem: 'Ainda há tempo no relógio. Perigos que não forem encontrados podem causar acidentes. ' +
          (faltam > 0 ? 'Você ainda não encontrou ' + faltam + (faltam === 1 ? ' perigo.' : ' perigos.') : ''),
        sim: 'Encerrar inspeção',
        nao: 'Continuar procurando'
      });
      if (ok) finalizarInspecao('manual');
    }

    mostrar(
      cabecalhoFase(0),
      h('section', { class: 'etapa etapa-identificar' },
        h('div', { class: 'identificar-topo' },
          h('div', null,
            h('h1', null, 'Identificar os perigos'),
            h('p', { class: 'etapa-intro' }, 'Clique (ou toque) em tudo que oferece risco no ' + setor.nome.toLowerCase() + '.')),
          relogio
        ),
        h('div', { class: 'identificar-grade' },
          h('div', null, cenaMoldura, dicaRolagem),
          h('aside', { class: 'painel-encontrados cartao', 'aria-label': 'Perigos encontrados' },
            h('h2', null, 'Perigos encontrados'),
            h('p', null, contador),
            listaVazia,
            lista,
            btnEncerrar)
        )
      )
    );

    fase.inicio = Date.now();
    fase.fimPrevisto = fase.inicio + CFG.tempoInspecao * 1000;
    function tique() {
      if (!fase || fase.inspecaoEncerrada) return;
      const restanteMs = Math.max(0, fase.fimPrevisto - Date.now());
      const seg = Math.ceil(restanteMs / 1000);
      tempoTexto.textContent = formatarTempo(seg);
      tempoBarra.style.width = (restanteMs / (CFG.tempoInspecao * 1000)) * 100 + '%';
      relogio.classList.toggle('acabando', seg <= 15);
      if (restanteMs <= 0) finalizarInspecao('tempo');
    }
    fase.cronometro = setInterval(tique, 200);
    tique();
  }

  function marcarNumero(svg, grupo, numero) {
    const alvo = grupo.querySelector('.alvo');
    if (!alvo) return;
    const x = Number(alvo.getAttribute('x')) + Number(alvo.getAttribute('width'));
    const y = Number(alvo.getAttribute('y'));

    const posicao = document.createElementNS(SVG_NS, 'g');
    posicao.setAttribute('transform', 'translate(' + (x - 4) + ' ' + (y + 4) + ')');
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'selo-numero');
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('r', '17');
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dy', '0.35em');
    t.textContent = String(numero);
    g.append(c, t);
    posicao.append(g);
    grupo.append(posicao);
  }

  function marcarToque(svg, ev) {
    if (!svg.getScreenCTM || typeof svg.createSVGPoint !== 'function') return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = ev.clientX; pt.y = ev.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', '16');
    c.setAttribute('class', 'toque');
    svg.append(c);
    setTimeout(() => c.remove(), 700);
  }

  function finalizarInspecao(motivo) {
    if (!fase) return;
    if (fase.motivoFim) return;
    fase.motivoFim = motivo;
    fase.inspecaoEncerrada = true;
    pararCronometro();
    fecharModais();

    const n = fase.encontrados.length;
    const total = fase.setor.perigos.length;
    const titulos = { tempo: 'Tempo esgotado!', todos: 'Inspeção completa!', manual: 'Inspeção encerrada' };
    let msg;
    if (n === total) msg = 'Você encontrou todos os ' + total + ' perigos. Excelente trabalho!';
    else if (n === 0) msg = 'Nenhum perigo foi registrado. Os ' + total + ' perigos continuam no setor. Vamos direto ao quiz.';
    else msg = 'Você encontrou ' + n + ' de ' + total + ' perigos. Os que ficaram de fora continuam no setor…';

    const btn = h('button', { type: 'button', class: 'btn btn-primario', onclick: () => (n > 0 ? etapaAvaliar(0) : etapaQuiz(0)) },
      n > 0 ? 'Avaliar os riscos →' : 'Ir para o quiz →');
    const caixa = h('div', { class: 'cena-fim', role: 'dialog', 'aria-label': titulos[motivo] },
      h('div', { class: 'cena-fim-caixa' },
        h('h2', null, titulos[motivo]),
        h('p', null, msg),
        btn));

    const moldura = document.querySelector('.cena-moldura');
    if (moldura) moldura.append(caixa);
    document.querySelectorAll('.painel-encontrados .btn').forEach((b) => { b.disabled = true; });
    const tempoTexto = document.querySelector('.relogio-numero');
    if (tempoTexto && motivo === 'tempo') tempoTexto.textContent = '0:00';
    anunciar(titulos[motivo] + ' ' + msg);
    btn.focus({ preventScroll: true });
    if (moldura && moldura.scrollIntoView && !reduzirMovimento) moldura.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function miniaturaPerigo(p) {
    const modelo = document.createElement('template');
    modelo.innerHTML = fase.setor.cenario.svg.trim();
    const svg = modelo.content.querySelector('svg');
    const grupo = svg && svg.querySelector('[data-perigo="' + p.id + '"]');
    const alvo = grupo && grupo.querySelector('.alvo');
    if (!svg || !alvo) return null;
    const folga = 30;
    const x = Number(alvo.getAttribute('x')) - folga;
    const y = Number(alvo.getAttribute('y')) - folga;
    const w = Number(alvo.getAttribute('width')) + folga * 2;
    const hgt = Number(alvo.getAttribute('height')) + folga * 2;
    svg.setAttribute('viewBox', x + ' ' + y + ' ' + w + ' ' + hgt);
    svg.removeAttribute('role');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    grupo.classList.add('encontrado');
    return h('div', { class: 'miniatura cena' }, svg);
  }

  function cartaoPerigo(p) {
    return h('div', { class: 'cartao-perigo' },
      miniaturaPerigo(p),
      h('div', null,
        h('h2', null, p.nome),
        h('p', null, p.descricao)));
  }

  function etapaAvaliar(i) {
    const ids = fase.encontrados;
    if (i >= ids.length) { etapaResolver(0); return; }
    const p = perigoPorId(ids[i]);
    const E = DADOS.escalas;
    let escolha = null;

    const resultado = h('p', { class: 'risco-resultado', 'aria-live': 'polite' }, 'Escolha uma casa da matriz.');
    const btnOk = h('button', { type: 'button', class: 'btn btn-primario', disabled: true, onclick: confirmarAvaliacao },
      i < ids.length - 1 ? 'Confirmar e ir ao próximo perigo →' : 'Confirmar e ir para Resolver →');

    const matriz = h('div', { class: 'matriz', role: 'group', 'aria-label': 'Matriz de risco: probabilidade nas linhas, gravidade nas colunas' });
    matriz.append(h('div', { class: 'matriz-canto' }, h('span', null, 'Probabilidade ↓'), h('span', null, 'Gravidade →')));
    E.gravidade.forEach((g) => matriz.append(h('div', { class: 'matriz-cabecalho' }, g)));
    for (let pr = E.probabilidade.length - 1; pr >= 0; pr--) {
      matriz.append(h('div', { class: 'matriz-cabecalho lateral' }, E.probabilidade[pr]));
      for (let gr = 0; gr < E.gravidade.length; gr++) {
        const nv = nivelRisco(pr, gr);
        const celula = h('button', {
          type: 'button', class: 'celula',
          style: '--cor:' + nv.cor + ';--cor-texto:' + nv.corTexto,
          'aria-pressed': 'false',
          'aria-label': 'Probabilidade ' + E.probabilidade[pr].toLowerCase() + ', gravidade ' + E.gravidade[gr].toLowerCase() + ': risco ' + nv.nome.toLowerCase(),
          onclick: () => selecionar(pr, gr, celula)
        }, h('span', null, nv.nome));
        matriz.append(celula);
      }
    }

    function selecionar(pr, gr, celula) {
      escolha = { probabilidade: pr, gravidade: gr };
      matriz.querySelectorAll('.celula').forEach((c) => { c.classList.remove('selecionada'); c.setAttribute('aria-pressed', 'false'); });
      celula.classList.add('selecionada');
      celula.setAttribute('aria-pressed', 'true');
      resultado.replaceChildren(
        'Probabilidade ', h('strong', null, E.probabilidade[pr].toLowerCase()),
        ' × gravidade ', h('strong', null, E.gravidade[gr].toLowerCase()), ' = ', seloRisco(pr, gr));
      btnOk.disabled = false;
    }

    function confirmarAvaliacao() {
      if (!escolha) return;
      const ref = p.referencia;
      const distancia = Math.abs(ref.probabilidade - escolha.probabilidade) + Math.abs(ref.gravidade - escolha.gravidade);
      const pts = distancia === 0 ? CFG.pontos.avaliacaoExata : distancia === 1 ? CFG.pontos.avaliacaoPorUmaCasa : 0;
      fase.avaliacoes[p.id] = { probabilidade: escolha.probabilidade, gravidade: escolha.gravidade, distancia: distancia, pontos: pts };
      fase.pontos.avaliar = Object.keys(fase.avaliacoes).reduce((s, k) => s + fase.avaliacoes[k].pontos, 0);
      etapaAvaliar(i + 1);
    }

    mostrar(
      cabecalhoFase(1),
      h('section', { class: 'etapa etapa-avaliar' },
        h('h1', null, 'Avaliar o risco'),
        h('p', { class: 'etapa-intro' }, 'Quão provável é um acidente e quão grave ele seria? Escolha a casa da matriz que melhor descreve o risco.'),
        h('p', { class: 'contador-etapa' }, 'Perigo ' + (i + 1) + ' de ' + ids.length),
        cartaoPerigo(p),
        h('div', { class: 'cartao' }, matriz, resultado),
        h('p', { class: 'dica' }, 'Classificação igual à de referência: ' + CFG.pontos.avaliacaoExata + ' pontos. Uma casa de diferença: ' + CFG.pontos.avaliacaoPorUmaCasa + ' pontos.'),
        h('div', { class: 'acoes-etapa' }, btnOk)
      )
    );
  }

  function legendaHierarquia() {
    return h('div', { class: 'legenda-hierarquia' },
      h('span', { class: 'legenda-titulo' }, 'Hierarquia de controle (da mais à menos eficaz):'),
      h('ol', null, DADOS.hierarquia.map((n) => h('li', null, etiquetaNivel(n.id)))));
  }

  function etapaResolver(i) {
    const ids = fase.encontrados;
    if (i >= ids.length) { etapaFeedback(); return; }
    const p = perigoPorId(ids[i]);
    if (!fase.ordemOpcoes[p.id]) fase.ordemOpcoes[p.id] = embaralhar(p.opcoes.map((_, k) => k));
    let escolhida = null;

    const btnOk = h('button', { type: 'button', class: 'btn btn-primario', disabled: true, onclick: confirmarAcao },
      i < ids.length - 1 ? 'Confirmar ação e ir ao próximo →' : 'Confirmar ação e ver o feedback →');

    const botoes = fase.ordemOpcoes[p.id].map((k) => {
      const op = p.opcoes[k];
      const b = h('button', {
        type: 'button', class: 'opcao', role: 'radio', 'aria-checked': 'false',
        onclick: () => {
          escolhida = k;
          botoes.forEach((x) => { x.classList.remove('selecionada'); x.setAttribute('aria-checked', 'false'); });
          b.classList.add('selecionada');
          b.setAttribute('aria-checked', 'true');
          btnOk.disabled = false;
        }
      }, etiquetaNivel(op.nivel), h('span', { class: 'opcao-texto' }, op.texto));
      return b;
    });

    function confirmarAcao() {
      if (escolhida === null) return;
      fase.acoes[p.id] = { opcao: escolhida, correta: !!p.opcoes[escolhida].correta };
      const acertos = Object.keys(fase.acoes).filter((k) => fase.acoes[k].correta).length;
      fase.pontos.resolver = acertos * CFG.pontos.acaoCorreta;
      etapaResolver(i + 1);
    }

    mostrar(
      cabecalhoFase(2),
      h('section', { class: 'etapa etapa-resolver' },
        h('h1', null, 'Resolver'),
        h('p', { class: 'etapa-intro' }, 'Escolha a ação mais adequada para controlar este perigo.'),
        h('p', { class: 'contador-etapa' }, 'Perigo ' + (i + 1) + ' de ' + ids.length),
        cartaoPerigo(p),
        legendaHierarquia(),
        h('div', { class: 'opcoes', role: 'radiogroup', 'aria-label': 'Ações possíveis' }, botoes),
        h('div', { class: 'acoes-etapa' }, btnOk)
      )
    );
  }

  function etapaFeedback() {
    const cartoes = fase.encontrados.map((id) => {
      const p = perigoPorId(id);
      const acao = fase.acoes[id];
      const escolhida = p.opcoes[acao.opcao];
      const melhor = p.opcoes.find((o) => o.correta);
      const av = fase.avaliacoes[id];
      const ref = p.referencia;

      return h('article', { class: 'feedback ' + (acao.correta ? 'acertou' : 'errou') },
        h('header', { class: 'feedback-topo' },
          h('span', { class: 'feedback-icone', 'aria-hidden': 'true' }, acao.correta ? '✔' : '✘'),
          h('div', null,
            h('h2', null, p.nome),
            h('p', { class: 'feedback-veredito' }, acao.correta ? 'Ação correta!' : 'A ação escolhida não foi a melhor.')),
          h('span', { class: 'selo-nr' }, p.nrs.join(' · '))
        ),
        h('div', { class: 'feedback-bloco' },
          h('h3', null, 'Sua ação'),
          h('p', null, etiquetaNivel(escolhida.nivel), ' ', escolhida.texto),
          acao.correta ? null : h('p', { class: 'explicacao-erro' }, escolhida.explicacao)),
        acao.correta ? null : h('div', { class: 'feedback-bloco melhor' },
          h('h3', null, 'Melhor ação'),
          h('p', null, etiquetaNivel(melhor.nivel), ' ', melhor.texto)),
        h('div', { class: 'feedback-bloco' },
          h('h3', null, 'Por que essa é a melhor resposta · ' + p.nrs.join(' e ')),
          h('p', null, p.porque)),
        h('div', { class: 'feedback-bloco' },
          h('h3', null, 'Avaliação do risco (+' + av.pontos + ' pontos)'),
          h('p', null, 'Você: ', textoClassificacao(av.probabilidade, av.gravidade), ' ', seloRisco(av.probabilidade, av.gravidade)),
          h('p', null, 'Referência: ', textoClassificacao(ref.probabilidade, ref.gravidade), ' ', seloRisco(ref.probabilidade, ref.gravidade)),
          h('p', { class: 'texto-suave' }, p.justificativaRisco)),
        h('div', { class: 'feedback-bloco vida-real' },
          h('h3', null, 'O que poderia acontecer na vida real'),
          h('p', null, p.consequencia))
      );
    });

    const acertos = fase.encontrados.filter((id) => fase.acoes[id].correta).length;

    mostrar(
      cabecalhoFase(3),
      h('section', { class: 'etapa etapa-feedback' },
        h('h1', null, 'Feedback'),
        h('p', { class: 'etapa-intro' }, 'Você escolheu a melhor ação para ' + acertos + ' de ' + fase.encontrados.length + ' perigos. Veja o porquê de cada resposta.'),
        cartoes,
        h('div', { class: 'acoes-etapa' },
          h('button', { type: 'button', class: 'btn btn-primario', onclick: () => etapaQuiz(0) }, 'Ir para o quiz →'))
      )
    );
  }

  function etapaQuiz(i) {
    const perguntas = fase.setor.quiz;
    if (i >= perguntas.length) { etapaConsequencia(); return; }
    const q = perguntas[i];
    const ordem = embaralhar(q.opcoes.map((_, k) => k));

    const explicacao = h('div', { class: 'quiz-explicacao', hidden: true, 'aria-live': 'polite' });
    const btnProx = h('button', { type: 'button', class: 'btn btn-primario', hidden: true, onclick: () => etapaQuiz(i + 1) },
      i < perguntas.length - 1 ? 'Próxima pergunta →' : 'Ver as consequências →');

    const botoes = ordem.map((k, pos) => h('button', {
      type: 'button', class: 'opcao opcao-quiz', onclick: () => responder(k)
    }, h('span', { class: 'letra', 'aria-hidden': 'true' }, 'ABCDEFG'[pos]), h('span', { class: 'opcao-texto' }, q.opcoes[k])));

    function responder(k) {
      if (fase.quiz[i]) return;
      const acertou = k === q.correta;
      fase.quiz[i] = { escolhida: k, acertou: acertou };
      fase.pontos.quiz = fase.quiz.filter((r) => r && r.acertou).length * CFG.pontos.quizCorreta;
      botoes.forEach((b, pos) => {
        b.disabled = true;
        if (ordem[pos] === q.correta) { b.classList.add('correta'); b.append(h('span', { class: 'somente-leitor' }, ' (resposta correta)')); }
        else if (ordem[pos] === k) { b.classList.add('errada'); b.append(h('span', { class: 'somente-leitor' }, ' (sua resposta)')); }
      });
      explicacao.hidden = false;
      explicacao.className = 'quiz-explicacao ' + (acertou ? 'acertou' : 'errou');
      explicacao.replaceChildren(h('strong', null, acertou ? 'Correto! ' : 'Não foi dessa vez. '), q.explicacao);
      btnProx.hidden = false;
      btnProx.focus({ preventScroll: true });
      atualizarPontosFase();
    }

    mostrar(
      cabecalhoFase(4),
      h('section', { class: 'etapa etapa-quiz' },
        h('h1', null, 'Quiz rápido'),
        h('p', { class: 'contador-etapa' }, 'Pergunta ' + (i + 1) + ' de ' + perguntas.length + ' · ' + q.tema + ' (' + q.nr + ')'),
        h('div', { class: 'cartao' },
          h('h2', { class: 'quiz-pergunta' }, q.pergunta),
          h('div', { class: 'opcoes' }, botoes),
          explicacao),
        h('div', { class: 'acoes-etapa' }, btnProx)
      )
    );
  }

  const CRITERIOS_MEDALHA = {
    todosEncontrados: (c) => c.naoEncontrados.length === 0,
    todosEncontradosRapido: (c, m) => c.naoEncontrados.length === 0 && c.tempoTodos !== null && c.tempoTodos <= (m.limiteSegundos || 45),
    avaliacoesExatas: (c) => c.naoEncontrados.length === 0 && c.avaliacoesExatas === c.totalPerigos,
    todasAcoesCorretas: (c) => c.naoEncontrados.length === 0 && c.acoesCorretas === c.totalPerigos,
    quizPerfeito: (c) => c.quizTotal > 0 && c.quizAcertos === c.quizTotal
  };

  function concluirFase() {
    if (fase.concluida) return;
    const setor = fase.setor;
    const encontrados = fase.encontrados;
    const naoEncontrados = setor.perigos.filter((p) => encontrados.indexOf(p.id) < 0);
    const acoesCorretas = encontrados.filter((id) => fase.acoes[id] && fase.acoes[id].correta).length;
    const avaliacoesExatas = encontrados.filter((id) => fase.avaliacoes[id] && fase.avaliacoes[id].distancia === 0).length;
    const avaliacoesParciais = encontrados.filter((id) => fase.avaliacoes[id] && fase.avaliacoes[id].distancia === 1).length;
    const quizAcertos = fase.quiz.filter((r) => r && r.acertou).length;
    const pontosFase = totalFase();

    const antes = {
      indice: progresso.indice,
      dias: progresso.diasSemAcidentes,
      pontos: progresso.pontosTotais,
      cargo: cargoPorPontos(progresso.pontosTotais).nome
    };

    let deltaIndice = acoesCorretas * CFG.indice.porAcaoCorreta;
    if (naoEncontrados.length > 0) deltaIndice -= naoEncontrados.length * CFG.indice.penalidadePorAcidente;
    else deltaIndice += CFG.indice.bonusSemAcidentes;
    progresso.indice = limitar(progresso.indice + deltaIndice, 0, 100);
    progresso.diasSemAcidentes = naoEncontrados.length > 0 ? 0 : progresso.diasSemAcidentes + CFG.diasPorFase;
    progresso.pontosTotais += pontosFase;
    progresso.fasesJogadas += 1;

    const contexto = {
      totalPerigos: setor.perigos.length,
      naoEncontrados: naoEncontrados,
      tempoTodos: fase.tempoTodos,
      acoesCorretas: acoesCorretas,
      avaliacoesExatas: avaliacoesExatas,
      quizAcertos: quizAcertos,
      quizTotal: setor.quiz.length
    };
    const medalhasGanhas = DADOS.medalhas.filter((m) => {
      const regra = CRITERIOS_MEDALHA[m.criterio];
      return regra ? regra(contexto, m) : false;
    });
    const medalhasNovas = medalhasGanhas.filter((m) => progresso.medalhas.indexOf(m.id) < 0);
    medalhasNovas.forEach((m) => progresso.medalhas.push(m.id));

    const depois = {
      indice: progresso.indice,
      dias: progresso.diasSemAcidentes,
      pontos: progresso.pontosTotais,
      cargo: cargoPorPontos(progresso.pontosTotais).nome
    };

    const revisar = {};
    function marcarRevisao(nr, motivo) {
      if (!revisar[nr]) revisar[nr] = [];
      if (revisar[nr].indexOf(motivo) < 0) revisar[nr].push(motivo);
    }
    naoEncontrados.forEach((p) => p.nrs.forEach((nr) => marcarRevisao(nr, 'Perigo não identificado: ' + p.nome)));
    encontrados.forEach((id) => {
      const p = perigoPorId(id);
      if (fase.acoes[id] && !fase.acoes[id].correta) p.nrs.forEach((nr) => marcarRevisao(nr, 'Ação inadequada: ' + p.nome));
      if (fase.avaliacoes[id] && fase.avaliacoes[id].pontos === 0) p.nrs.forEach((nr) => marcarRevisao(nr, 'Avaliação de risco distante da referência: ' + p.nome));
    });
    setor.quiz.forEach((q, k) => {
      if (!fase.quiz[k] || !fase.quiz[k].acertou) marcarRevisao(q.nr, 'Quiz: ' + q.tema);
    });
    const nrsRevisar = Object.keys(revisar)
      .sort((a, b) => numeroNR(a) - numeroNR(b))
      .map((nr) => ({ nr: nr, motivos: revisar[nr] }));

    const relatorio = {
      setorId: setor.id,
      setorNome: setor.nome,
      data: new Date().toISOString(),
      pontos: Object.assign({}, fase.pontos),
      pontosFase: pontosFase,
      pontosMaximos: setor.perigos.length * (CFG.pontos.perigoEncontrado + CFG.pontos.avaliacaoExata + CFG.pontos.acaoCorreta) + setor.quiz.length * CFG.pontos.quizCorreta,
      identificar: { acertos: encontrados.length, total: setor.perigos.length, tempoTodos: fase.tempoTodos },
      avaliar: { exatas: avaliacoesExatas, parciais: avaliacoesParciais, total: encontrados.length },
      resolver: { acertos: acoesCorretas, total: encontrados.length },
      quiz: { acertos: quizAcertos, total: setor.quiz.length },
      perigos: setor.perigos.map((p) => {
        const achou = encontrados.indexOf(p.id) >= 0;
        const av = fase.avaliacoes[p.id];
        const ac = fase.acoes[p.id];
        return {
          nome: p.nome,
          nrs: p.nrs,
          encontrado: achou,
          avaliacao: av ? textoClassificacao(av.probabilidade, av.gravidade) : null,
          referencia: textoClassificacao(p.referencia.probabilidade, p.referencia.gravidade),
          avaliacaoPontos: av ? av.pontos : 0,
          acao: ac ? nivelHierarquia(p.opcoes[ac.opcao].nivel).nome : null,
          acaoCorreta: ac ? ac.correta : false
        };
      }),
      quizDetalhe: setor.quiz.map((q, k) => ({ tema: q.tema, nr: q.nr, acertou: !!(fase.quiz[k] && fase.quiz[k].acertou) })),
      nrsRevisar: nrsRevisar,
      medalhas: medalhasGanhas.map((m) => m.icone + ' ' + m.nome),
      acidentes: naoEncontrados.length,
      cargo: depois.cargo,
      pontosTotais: depois.pontos
    };

    const reg = progresso.setores[setor.id] || { melhorPontuacao: 0, vezesJogado: 0 };
    reg.melhorPontuacao = Math.max(reg.melhorPontuacao || 0, pontosFase);
    reg.vezesJogado = (reg.vezesJogado || 0) + 1;
    reg.ultimoRelatorio = relatorio;
    progresso.setores[setor.id] = reg;

    salvarProgresso();

    fase.concluida = true;
    fase.resultado = {
      antes: antes,
      depois: depois,
      deltaIndice: progresso.indice - antes.indice,
      naoEncontrados: naoEncontrados,
      medalhasGanhas: medalhasGanhas,
      medalhasNovas: medalhasNovas,
      relatorio: relatorio,
      melhorPontuacao: reg.melhorPontuacao
    };
  }

  function etapaConsequencia() {
    concluirFase();
    const r = fase.resultado;
    const amanha = new Date(Date.now() + 864e5).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    let conteudo;
    if (r.naoEncontrados.length > 0) {
      conteudo = [
        h('p', { class: 'etapa-intro' }, r.naoEncontrados.length === 1
          ? 'Um perigo ficou de fora da inspeção. No dia seguinte…'
          : r.naoEncontrados.length + ' perigos ficaram de fora da inspeção. No dia seguinte…'),
        h('div', { class: 'jornal' },
          h('div', { class: 'jornal-cabecalho' },
            h('span', { class: 'jornal-nome' }, 'Diário da Cidade'),
            h('span', { class: 'jornal-data' }, amanha)),
          r.naoEncontrados.map((p) => h('article', { class: 'noticia' },
            h('h2', null, p.noticia.manchete),
            h('p', null, p.noticia.texto),
            h('p', { class: 'noticia-rodape' }, 'Perigo não identificado na inspeção · ' + p.nrs.join(', '))))
        )
      ];
    } else {
      conteudo = [
        h('div', { class: 'cartao mensagem-positiva' },
          h('span', { class: 'mensagem-icone', 'aria-hidden': 'true' }, '✅'),
          h('div', null,
            h('h2', null, 'Nenhum acidente!'),
            h('p', null, 'Graças à sua inspeção, todos os perigos foram identificados e tratados. O ' + fase.setor.nome.toLowerCase() +
              ' trabalhou em segurança e a equipe agradece.')))
      ];
    }

    const barraPreench = h('div', { class: 'barra-preenchimento', style: 'width:' + r.antes.indice + '%' });
    const barra = h('div', { class: 'barra barra-grande ' + classeIndice(r.antes.indice) }, barraPreench);
    const numIndice = h('strong', null, fmt(r.antes.indice));
    const numDias = h('strong', null, fmt(r.antes.dias));
    const delta = r.deltaIndice;

    const impacto = h('div', { class: 'cartao impacto' },
      h('h2', null, 'Impacto na empresa'),
      h('div', { class: 'impacto-linha' },
        h('span', null, 'Dias sem acidentes'),
        h('span', { class: 'impacto-valor ' + (r.naoEncontrados.length ? 'caiu' : 'subiu') }, fmt(r.antes.dias), ' → ', numDias)),
      h('div', { class: 'impacto-linha' },
        h('span', null, 'Índice de segurança'),
        h('span', { class: 'impacto-valor ' + (delta < 0 ? 'caiu' : 'subiu') }, numIndice, ' / 100 ',
          h('small', null, '(' + (delta >= 0 ? '+' : '') + delta + ')'))),
      barra
    );

    mostrar(
      cabecalhoFase(5),
      h('section', { class: 'etapa etapa-consequencia' },
        h('h1', null, r.naoEncontrados.length ? 'Notícia do dia seguinte' : 'Mais um mês sem acidentes'),
        conteudo,
        impacto,
        h('div', { class: 'acoes-etapa' },
          h('button', { type: 'button', class: 'btn btn-primario', onclick: etapaResultado }, 'Ver resultado da fase →'))
      )
    );

    requestAnimationFrame(() => requestAnimationFrame(() => {
      barraPreench.style.width = r.depois.indice + '%';
      barra.className = 'barra barra-grande ' + classeIndice(r.depois.indice);
      animarNumero(numIndice, r.antes.indice, r.depois.indice, 1100);
      animarNumero(numDias, r.antes.dias, r.depois.dias, 1100);
      atualizarHUD(true);
    }));
    anunciar(r.naoEncontrados.length ? 'Houve ' + r.naoEncontrados.length + ' acidente(s). O contador de dias sem acidentes foi zerado.' : 'Nenhum acidente. O contador de dias sem acidentes avançou.');
  }

  function etapaResultado() {
    const r = fase.resultado;
    const rel = r.relatorio;
    const promovido = r.antes.cargo !== r.depois.cargo;
    const prox = proximoCargo(r.depois.pontos);

    const linhas = [
      ['Identificar', rel.identificar.acertos + ' de ' + rel.identificar.total + ' perigos', rel.pontos.identificar],
      ['Avaliar', rel.avaliar.exatas + ' de ' + rel.avaliar.total + ' exatas' + (rel.avaliar.parciais ? ', ' + rel.avaliar.parciais + ' com uma casa de diferença' : ''), rel.pontos.avaliar],
      ['Resolver', rel.resolver.acertos + ' de ' + rel.resolver.total + ' ações corretas', rel.pontos.resolver],
      ['Quiz', rel.quiz.acertos + ' de ' + rel.quiz.total + ' acertos', rel.pontos.quiz]
    ];

    mostrar(
      cabecalhoFase(6),
      h('section', { class: 'etapa etapa-resultado' },
        h('h1', null, 'Resultado da fase'),
        h('div', { class: 'cartao placar' },
          h('p', { class: 'placar-rotulo' }, 'Pontuação no ' + fase.setor.nome.toLowerCase()),
          h('p', { class: 'placar-numero' }, fmt(rel.pontosFase), h('small', null, ' / ' + fmt(rel.pontosMaximos))),
          h('p', { class: 'texto-suave' }, 'Melhor pontuação neste setor: ' + fmt(r.melhorPontuacao)),
          h('table', { class: 'tabela' },
            h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Etapa'), h('th', { scope: 'col' }, 'Desempenho'), h('th', { scope: 'col', class: 'num' }, 'Pontos'))),
            h('tbody', null, linhas.map((l) => h('tr', null, h('th', { scope: 'row' }, l[0]), h('td', null, l[1]), h('td', { class: 'num' }, fmt(l[2]))))),
            h('tfoot', null, h('tr', null, h('th', { scope: 'row', colspan: '2' }, 'Total'), h('td', { class: 'num' }, fmt(rel.pontosFase)))))
        ),

        h('div', { class: 'cartao' },
          h('h2', null, 'Medalhas'),
          r.medalhasGanhas.length
            ? h('ul', { class: 'lista-medalhas' }, r.medalhasGanhas.map((m) => h('li', { class: 'medalha conquistada' + (r.medalhasNovas.indexOf(m) >= 0 ? ' nova' : '') },
              h('span', { class: 'medalha-icone', 'aria-hidden': 'true' }, m.icone),
              h('span', null, h('strong', null, m.nome), h('small', null, m.descricao)),
              r.medalhasNovas.indexOf(m) >= 0 ? h('span', { class: 'selo-nova' }, 'Nova!') : null)))
            : h('p', { class: 'texto-suave' }, 'Nenhuma medalha desta vez. Jogue de novo para tentar conquistar!')
        ),

        h('div', { class: 'cartao cargo-cartao' + (promovido ? ' promovido' : '') },
          h('h2', null, promovido ? '🎉 Promoção!' : 'Carreira'),
          promovido
            ? h('p', null, 'Você passou de ', h('strong', null, r.antes.cargo), ' para ', h('strong', null, r.depois.cargo), '.')
            : h('p', null, 'Cargo atual: ', h('strong', null, r.depois.cargo), '.'),
          h('p', { class: 'texto-suave' }, 'Pontuação acumulada: ' + fmt(r.depois.pontos) + (prox ? ' · faltam ' + fmt(prox.minimo - r.depois.pontos) + ' para ' + prox.nome : ''))
        ),

        h('div', { class: 'acoes-etapa' },
          h('button', { type: 'button', class: 'btn btn-primario', onclick: () => telaRelatorio(rel, true) }, 'Ver relatório'),
          h('button', { type: 'button', class: 'btn btn-secundario', onclick: () => iniciarFase(fase.setor.id) }, 'Jogar de novo'),
          h('button', { type: 'button', class: 'btn btn-secundario', onclick: telaMapa }, 'Voltar ao mapa'))
      )
    );
  }

  function telaRelatorio(rel, veioDaFase) {
    if (!veioDaFase) { pararCronometro(); fase = null; }
    const data = new Date(rel.data);
    const dataTexto = isNaN(data) ? '' : data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const pct = (a, t) => (t ? Math.round((a / t) * 100) : 0) + '%';
    const plural = (n, um, varios) => n + ' ' + (n === 1 ? um : varios);
    const av = rel.avaliar;

    function campo(rotulo, chave) {
      const id = 'rel-' + chave;
      return h('label', { class: 'campo', for: id },
        h('span', null, rotulo),
        h('input', {
          id: id, type: 'text', autocomplete: 'off', value: progresso.aluno[chave] || '',
          oninput: (e) => { progresso.aluno[chave] = e.target.value.slice(0, 80); salvarProgresso(); }
        }));
    }

    const linhasEtapas = [
      ['Identificar', rel.identificar.acertos + ' de ' + rel.identificar.total, pct(rel.identificar.acertos, rel.identificar.total)],

      ['Avaliar', plural(av.exatas, 'exata', 'exatas') + ' e ' + plural(av.parciais, 'parcial', 'parciais') + ', de ' + av.total, pct(av.exatas + av.parciais / 2, av.total)],
      ['Resolver', rel.resolver.acertos + ' de ' + rel.resolver.total, pct(rel.resolver.acertos, rel.resolver.total)],
      ['Quiz', rel.quiz.acertos + ' de ' + rel.quiz.total, pct(rel.quiz.acertos, rel.quiz.total)]
    ];

    mostrar(
      h('section', { class: 'relatorio', id: 'relatorio' },
        h('header', { class: 'rel-cabecalho' },
          h('p', { class: 'sobretitulo' }, DADOS.empresa + ' · Simulador de Segurança do Trabalho'),
          h('h1', null, 'Relatório de desempenho'),
          h('p', null, 'Setor: ', h('strong', null, rel.setorNome), dataTexto ? ' · ' + dataTexto : '')),

        h('div', { class: 'rel-identificacao' }, campo('Nome', 'nome'), campo('Turma', 'turma')),

        h('h2', null, 'Acertos por etapa'),
        h('table', { class: 'tabela' },
          h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Etapa'), h('th', { scope: 'col' }, 'Acertos'), h('th', { scope: 'col', class: 'num' }, 'Aproveitamento'))),
          h('tbody', null, linhasEtapas.map((l) => h('tr', null, h('th', { scope: 'row' }, l[0]), h('td', null, l[1]), h('td', { class: 'num' }, l[2]))))),
        rel.avaliar.total < rel.identificar.total || rel.identificar.acertos < rel.identificar.total
          ? h('p', { class: 'texto-suave' }, 'Avaliar e Resolver consideram apenas os perigos encontrados na inspeção.')
          : null,

        h('h2', null, 'NRs para revisar'),
        rel.nrsRevisar.length
          ? h('ul', { class: 'rel-nrs' }, rel.nrsRevisar.map((item) => h('li', null,
            h('strong', null, item.nr), h('ul', null, item.motivos.map((m) => h('li', null, m))))))
          : h('p', null, 'Nenhuma NR para revisar neste setor. Excelente!'),

        h('h2', null, 'Detalhe por perigo'),
        h('div', { class: 'tabela-rolagem' },
          h('table', { class: 'tabela tabela-detalhe' },
            h('thead', null, h('tr', null,
              h('th', { scope: 'col' }, 'Perigo'), h('th', { scope: 'col' }, 'NR'), h('th', { scope: 'col' }, 'Encontrado'),
              h('th', { scope: 'col' }, 'Avaliação (referência)'), h('th', { scope: 'col' }, 'Ação escolhida'))),
            h('tbody', null, rel.perigos.map((p) => h('tr', null,
              h('th', { scope: 'row' }, p.nome),
              h('td', null, p.nrs.join(', ')),
              h('td', null, p.encontrado ? 'Sim' : 'Não'),
              h('td', null, p.avaliacao ? p.avaliacao + ' (' + p.referencia + ')' : '—'),
              h('td', null, p.acao ? p.acao + (p.acaoCorreta ? ' ✔' : ' ✘') : '—')))))),

        h('h2', null, 'Resumo'),
        h('ul', { class: 'rel-resumo' },
          h('li', null, 'Pontuação na fase: ', h('strong', null, fmt(rel.pontosFase) + ' de ' + fmt(rel.pontosMaximos))),
          h('li', null, 'Acidentes causados por perigos não identificados: ', h('strong', null, String(rel.acidentes))),
          h('li', null, 'Medalhas: ', h('strong', null, rel.medalhas.length ? rel.medalhas.join(', ') : 'nenhuma')),
          h('li', null, 'Cargo ao final: ', h('strong', null, rel.cargo), ' (' + fmt(rel.pontosTotais) + ' pontos acumulados)')),

        h('p', { class: 'nota-rodape' }, DADOS.textos.avisoNRs),

        h('div', { class: 'acoes-etapa nao-imprimir' },
          h('button', { type: 'button', class: 'btn btn-primario', onclick: () => window.print() }, '🖨 Imprimir relatório'),
          veioDaFase ? h('button', { type: 'button', class: 'btn btn-secundario', onclick: etapaResultado }, 'Voltar ao resultado') : null,
          h('button', { type: 'button', class: 'btn btn-secundario', onclick: telaMapa }, 'Voltar ao mapa'))
      )
    );
  }

  function verificarDados() {
    const avisos = [];
    DADOS.setores.filter((s) => s.disponivel).forEach((s) => {
      if (!s.cenario || !s.cenario.svg) { avisos.push(s.id + ': falta cenario.svg'); return; }
      const modelo = document.createElement('template');
      modelo.innerHTML = s.cenario.svg.trim();
      (s.perigos || []).forEach((p) => {
        const g = modelo.content.querySelector('[data-perigo="' + p.id + '"]');
        if (!g) avisos.push(s.id + '/' + p.id + ': não há <g data-perigo="' + p.id + '"> no SVG');
        else if (!g.querySelector('.alvo')) avisos.push(s.id + '/' + p.id + ': falta o retângulo class="alvo"');
        const corretas = (p.opcoes || []).filter((o) => o.correta).length;
        if (corretas !== 1) avisos.push(s.id + '/' + p.id + ': deve haver exatamente 1 opção correta (há ' + corretas + ')');
        (p.opcoes || []).forEach((o) => { if (!DADOS.hierarquia.some((n) => n.id === o.nivel)) avisos.push(s.id + '/' + p.id + ': nível desconhecido "' + o.nivel + '"'); });
      });
      (s.quiz || []).forEach((q, k) => {
        if (!(q.correta >= 0 && q.correta < q.opcoes.length)) avisos.push(s.id + '/quiz ' + (k + 1) + ': índice "correta" inválido');
      });
    });
    DADOS.medalhas.forEach((m) => { if (!CRITERIOS_MEDALHA[m.criterio]) avisos.push('medalha ' + m.id + ': critério desconhecido "' + m.criterio + '"'); });
    if (avisos.length && window.console) console.warn('[Simulador NR] Problemas no data.js:\n- ' + avisos.join('\n- '));
  }

  verificarDados();
  atualizarHUD(false);
  telaInicio();
})();
