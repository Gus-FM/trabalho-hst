/* Peças de desenho reutilizadas nos cenários SVG dos setores. Cada função devolve um trecho de SVG em texto. */
window.CENA = (function () {
  'use strict';

  function linha(x1, y1, x2, y2, cor, largura) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${cor}" stroke-width="${largura}" stroke-linecap="round"/>`;
  }

  function cabeca(cx, cy, o) {
    const pele = o.pele || '#c98e63';
    const cabelo = o.cabelo || '#3b2a1e';
    let s = '';
    if (o.cabeloLongo && !o.capacete) {
      s += `<rect x="${cx - 21}" y="${cy - 6}" width="10" height="44" rx="5" fill="${cabelo}"/>`;
      s += `<rect x="${cx + 11}" y="${cy - 6}" width="10" height="44" rx="5" fill="${cabelo}"/>`;
    }
    if (o.coque && !o.capacete) s += `<circle cx="${cx}" cy="${cy - 19}" r="8" fill="${cabelo}"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="17" fill="${pele}"/>`;
    if (o.capacete) {
      s += `<path d="M${cx - 20} ${cy - 4} a20 20 0 0 1 40 0 z" fill="${o.capacete}" stroke="#00000040" stroke-width="1.5"/>`;
      s += `<rect x="${cx - 24}" y="${cy - 7}" width="48" height="6" rx="3" fill="${o.capacete}" stroke="#00000040" stroke-width="1.5"/>`;
    } else {
      s += `<path d="M${cx - 18} ${cy - 3} a18 18 0 0 1 36 0 z" fill="${cabelo}"/>`;
    }
    if (o.oculos) {
      s += `<rect x="${cx - 13}" y="${cy - 1}" width="26" height="8" rx="3" fill="#a9dcef" stroke="#2b2f33" stroke-width="1.5"/>`;
    }
    if (o.abafador) {
      s += `<rect x="${cx - 25}" y="${cy - 4}" width="9" height="15" rx="4" fill="#d62828"/>`;
      s += `<rect x="${cx + 16}" y="${cy - 4}" width="9" height="15" rx="4" fill="#d62828"/>`;
    }
    return s;
  }

  /* Pessoa de frente, em pé. cx = centro; chao = linha dos pés. */
  function pessoaEmPe(cx, chao, o) {
    o = o || {};
    const pele = o.pele || '#c98e63';
    const camisa = o.camisa || '#4f86c6';
    const calca = o.calca || '#2d3e5c';
    const sapato = o.sapato || '#1b1b1b';
    const topo = chao - 150;
    const maoE = o.maoE || [cx - 27, chao - 80];
    const maoD = o.maoD || [cx + 27, chao - 80];

    let base = '';
    base += `<rect x="${cx - 15}" y="${chao - 72}" width="13" height="66" fill="${calca}"/>`;
    base += `<rect x="${cx + 2}" y="${chao - 72}" width="13" height="66" fill="${calca}"/>`;
    base += `<rect x="${cx - 20}" y="${chao - 10}" width="20" height="10" rx="4" fill="${sapato}"/>`;
    base += `<rect x="${cx}" y="${chao - 10}" width="20" height="10" rx="4" fill="${sapato}"/>`;

    let sup = `<rect x="${cx - 20}" y="${topo}" width="40" height="84" rx="10" fill="${camisa}"/>`;
    if (o.colete) {
      sup += `<rect x="${cx - 17}" y="${topo + 4}" width="34" height="66" rx="6" fill="#ff7a00"/>`;
      sup += `<rect x="${cx - 17}" y="${topo + 26}" width="34" height="5" fill="#e8e8e8"/>`;
      sup += `<rect x="${cx - 17}" y="${topo + 48}" width="34" height="5" fill="#e8e8e8"/>`;
    }
    if (o.cinto) {
      sup += `<path d="M${cx - 15} ${topo + 4} L${cx + 13} ${topo + 60} M${cx + 15} ${topo + 4} L${cx - 13} ${topo + 60}" stroke="#ff7a00" stroke-width="5" fill="none"/>`;
      sup += `<rect x="${cx - 20}" y="${topo + 62}" width="40" height="7" fill="#ff7a00"/>`;
    }
    sup += linha(cx - 15, topo + 12, maoE[0], maoE[1], pele, 10);
    sup += linha(cx + 15, topo + 12, maoD[0], maoD[1], pele, 10);
    if (o.luvas) {
      sup += `<circle cx="${maoE[0]}" cy="${maoE[1]}" r="7" fill="${o.luvas}"/>`;
      sup += `<circle cx="${maoD[0]}" cy="${maoD[1]}" r="7" fill="${o.luvas}"/>`;
    }
    sup += cabeca(cx, chao - 168, o);

    const corpo = o.inclinar ? `<g transform="rotate(${o.inclinar} ${cx} ${chao - 72})">${sup}</g>` : sup;
    return base + corpo;
  }

  function cadeira(cx, a, cor) {
    cor = cor || '#2f3338';
    return `<rect x="${cx - 32}" y="${a - 74}" width="9" height="78" rx="4" fill="${cor}"/>` +
      `<rect x="${cx - 30}" y="${a}" width="58" height="9" rx="4" fill="${cor}"/>` +
      `<rect x="${cx - 4}" y="${a + 9}" width="7" height="38" fill="#6b7178"/>` +
      `<rect x="${cx - 30}" y="${a + 46}" width="58" height="6" rx="3" fill="${cor}"/>` +
      `<circle cx="${cx - 26}" cy="${a + 56}" r="5" fill="#1b1b1b"/>` +
      `<circle cx="${cx}" cy="${a + 56}" r="5" fill="#1b1b1b"/>` +
      `<circle cx="${cx + 24}" cy="${a + 56}" r="5" fill="#1b1b1b"/>`;
  }

  /* Pessoa sentada, de perfil, olhando para a direita. a = altura do assento. */
  function pessoaSentada(cx, a, o) {
    o = o || {};
    const pele = o.pele || '#c98e63';
    const camisa = o.camisa || '#4f86c6';
    const calca = o.calca || '#2d3e5c';
    const sapato = o.sapato || '#1b1b1b';
    const cabelo = o.cabelo || '#3b2a1e';

    let s = o.cadeira === false ? '' : cadeira(cx, a, o.corCadeira);
    s += `<rect x="${cx - 22}" y="${a - 17}" width="58" height="17" rx="8" fill="${calca}"/>`;
    s += `<rect x="${cx + 21}" y="${a - 14}" width="15" height="62" rx="7" fill="${calca}"/>`;
    s += `<rect x="${cx + 19}" y="${a + 44}" width="28" height="10" rx="4" fill="${sapato}"/>`;

    const mao = o.mao || [cx + 44, a - 42];
    const hx = cx - 6;
    const hy = a - 108;
    let sup = `<rect x="${cx - 24}" y="${a - 90}" width="32" height="82" rx="13" fill="${camisa}"/>`;
    sup += linha(cx - 6, a - 76, mao[0], mao[1], pele, 10);
    sup += `<rect x="${hx - 18}" y="${hy - 4}" width="9" height="16" rx="4" fill="${cabelo}"/>`;
    sup += `<circle cx="${hx}" cy="${hy}" r="17" fill="${pele}"/>`;
    sup += `<circle cx="${hx + 16}" cy="${hy + 2}" r="3.5" fill="${pele}"/>`;
    sup += `<path d="M${hx - 18} ${hy - 2} A18 18 0 0 1 ${hx + 16} ${hy - 8} Z" fill="${cabelo}"/>`;
    if (o.headset) {
      sup += `<path d="M${hx - 16} ${hy - 4} a17 17 0 0 1 30 -6" stroke="#1b1b1b" stroke-width="3" fill="none"/>`;
      sup += `<rect x="${hx - 6}" y="${hy - 5}" width="9" height="13" rx="3" fill="#1b1b1b"/>`;
      sup += `<path d="M${hx + 1} ${hy + 6} q8 8 16 6" stroke="#1b1b1b" stroke-width="2.5" fill="none"/>`;
    }

    const corpo = o.inclinar ? `<g transform="rotate(${o.inclinar} ${cx - 8} ${a - 8})">${sup}</g>` : sup;
    return s + corpo;
  }

  function mesa(x, y, w, alt) {
    alt = alt || 100;
    return `<rect x="${x + 6}" y="${y + 10}" width="8" height="${alt - 10}" fill="#7a5a36"/>` +
      `<rect x="${x + w - 14}" y="${y + 10}" width="8" height="${alt - 10}" fill="#7a5a36"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="10" fill="#a7835a" stroke="#7a5a36" stroke-width="2"/>`;
  }

  function monitor(x, y, w, h, o) {
    o = o || {};
    const pe = o.pe || 20;
    const mx = x + w / 2;
    let s = `<rect x="${mx - 4}" y="${y + h}" width="8" height="${pe}" fill="#3a3f45"/>`;
    s += `<rect x="${mx - 16}" y="${y + h + pe}" width="32" height="5" rx="2" fill="#3a3f45"/>`;
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#24282d"/>`;
    if (o.brilho) {
      s += `<rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" fill="#fbf6dc"/>`;
      s += `<polygon points="${x + 8},${y + h - 5} ${x + w * 0.42},${y + 5} ${x + w * 0.62},${y + 5} ${x + 22},${y + h - 5}" fill="#ffffff"/>`;
      s += `<polygon points="${x + w * 0.6},${y + h - 5} ${x + w - 12},${y + 5} ${x + w - 5},${y + 5} ${x + w * 0.72},${y + h - 5}" fill="#ffffff"/>`;
    } else {
      s += `<rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" fill="#6fa8d6"/>`;
      s += `<rect x="${x + 9}" y="${y + 10}" width="${w * 0.5}" height="3" fill="#e8f1f8"/>`;
      s += `<rect x="${x + 9}" y="${y + 17}" width="${w * 0.35}" height="3" fill="#e8f1f8"/>`;
    }
    return s;
  }

  function extintor(x, y) {
    return `<rect x="${x - 2}" y="${y - 34}" width="30" height="28" rx="2" fill="#d62828"/>` +
      `<path d="M${x + 13} ${y - 30} l9 18 h-18 z" fill="#ffffff"/>` +
      `<rect x="${x + 8}" y="${y}" width="10" height="9" fill="#333333"/>` +
      `<path d="M${x + 18} ${y + 4} q14 4 8 30" stroke="#222222" stroke-width="3" fill="none"/>` +
      `<rect x="${x}" y="${y + 8}" width="26" height="78" rx="9" fill="#d62828"/>` +
      `<rect x="${x + 4}" y="${y + 30}" width="18" height="16" fill="#ffffff"/>`;
  }

  function faisca(cx, cy, r) {
    r = r || 10;
    const p = [];
    for (let i = 0; i < 10; i++) {
      const ang = (Math.PI / 5) * i - Math.PI / 2;
      const raio = i % 2 === 0 ? r : r * 0.45;
      p.push((cx + Math.cos(ang) * raio).toFixed(1) + ',' + (cy + Math.sin(ang) * raio).toFixed(1));
    }
    return `<polygon points="${p.join(' ')}" fill="#ffd43b" stroke="#e8742a" stroke-width="1.5"/>`;
  }

  /* Escada vista de frente, inclinada. (x1,y1)/(x2,y2) = trilho esquerdo base/topo; dx = abertura na base, dxTopo = no topo. */
  function escada(x1, y1, x2, y2, dx, dxTopo, cor, degraus) {
    let s = linha(x1, y1, x2, y2, cor, 6) + linha(x1 + dx, y1, x2 + dxTopo, y2, cor, 6);
    for (let i = 1; i <= degraus; i++) {
      const t = i / (degraus + 1);
      const ya = y1 + (y2 - y1) * t;
      const xa = x1 + (x2 - x1) * t;
      const xb = x1 + dx + (x2 + dxTopo - x1 - dx) * t;
      s += linha(xa.toFixed(1), ya.toFixed(1), xb.toFixed(1), ya.toFixed(1), cor, 4);
    }
    return s;
  }

  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function alvo(a) {
    return `<rect class="alvo" x="${a[0]}" y="${a[1]}" width="${a[2]}" height="${a[3]}" fill="transparent"/>`;
  }

  /*
   * Monta o cenário de um setor.
   * cfg = { rotulo, fundo, oks: [{ id, descricao, svg, alvo }], partes: [{ id, perigo, seguro, descPerigo, descSeguro, alvo }] }
   * Cada parte aparece na versão de perigo se o id estiver em `ativos`; senão, na versão segura (clicável, mas sem perigo).
   * `descricao` descreve o que se vê, para o modo lista (teclado e leitor de tela).
   */
  function montar(cfg, ativos) {
    let s = `<svg viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(cfg.rotulo)}">`;
    s += cfg.fundo;
    (cfg.oks || []).forEach((o) => {
      s += `<g data-ok="${o.id}" data-descricao="${esc(o.descricao)}">${o.svg}${alvo(o.alvo)}</g>`;
    });
    cfg.partes.forEach((p) => {
      if (ativos.indexOf(p.id) >= 0) {
        s += `<g data-perigo="${p.id}" data-descricao="${esc(p.descPerigo)}">${p.perigo}${alvo(p.alvo)}</g>`;
      } else {
        s += `<g data-ok="${p.id}" data-descricao="${esc(p.descSeguro)}">${p.seguro}${alvo(p.alvo)}</g>`;
      }
    });
    return s + '</svg>';
  }

  return {
    montar: montar,
    linha: linha,
    pessoaEmPe: pessoaEmPe,
    pessoaSentada: pessoaSentada,
    cadeira: cadeira,
    mesa: mesa,
    monitor: monitor,
    extintor: extintor,
    faisca: faisca,
    escada: escada
  };
})();
