# Simulador de Segurança do Trabalho (NRs) — versão 1

Jogo educativo para navegador sobre as Normas Regulamentadoras (NRs) brasileiras de segurança do trabalho.
O jogador é um(a) técnico(a) de segurança recém-contratado(a) na empresa fictícia **Metalúrgica Horizonte**
e precisa inspecionar os setores, encontrar perigos, avaliar riscos e escolher as melhores medidas de controle.

> **Aviso:** o conteúdo é educativo. As NRs são revisadas com frequência. Antes de usar em aula, confira as
> informações com o texto atualizado no site do Ministério do Trabalho e Emprego
> (gov.br/trabalho-e-emprego, seção "Normas Regulamentadoras").

## Como abrir o jogo

1. Baixe ou copie a pasta inteira do projeto.
2. Dê **duplo clique** no arquivo `index.html`.

Pronto. Não precisa de internet, servidor nem instalação. Funciona em navegadores atuais
(Chrome, Edge, Firefox, Safari) no computador e no celular.

O progresso (pontos, cargo, medalhas e último relatório) fica salvo no próprio navegador (`localStorage`).
Se o navegador bloquear esse armazenamento (por exemplo, em janela anônima), o jogo funciona normalmente,
só não guarda o progresso. Para zerar tudo, use o botão **Reiniciar progresso** no mapa da empresa.

## Como se joga

Cada setor da empresa é uma fase, dividida em etapas:

1. **Identificar:** 90 segundos para clicar nos perigos do cenário. Clicar em algo seguro não tira pontos.
2. **Avaliar:** classificar cada perigo encontrado na matriz de risco (probabilidade × gravidade).
3. **Resolver:** escolher uma entre 4 ações, cada uma marcada com seu nível na hierarquia de controle.
4. **Feedback:** ver se a ação estava certa, qual NR se aplica, o porquê e o que poderia acontecer.
5. **Quiz:** 5 perguntas de múltipla escolha, com explicação.
6. **Consequência:** perigos não encontrados viram a "notícia do dia seguinte", zerando os dias sem acidentes.
7. **Resultado e relatório:** pontuação, medalhas, promoção de cargo e um relatório para imprimir.

Nesta versão, só o **Almoxarifado** está liberado. Os demais setores aparecem como "Em breve".

### Uso em sala de aula

No final da fase, clique em **Ver relatório**. O aluno pode preencher nome e turma e clicar em
**Imprimir relatório**. A impressão sai limpa, só com o relatório (dá para escolher "Salvar como PDF").
O relatório mostra os acertos por etapa, as NRs a revisar (e o motivo) e o detalhe de cada perigo.

## Estrutura dos arquivos

```
index.html        página principal
css/style.css     visual do jogo e estilo de impressão
js/data.js        TODO o conteúdo: setores, perigos, opções, feedbacks, quiz, cargos e medalhas
js/game.js        lógica do jogo (não tem conteúdo de setor)
```

## Como adicionar um setor novo

Tudo é feito em `js/data.js`. **Não é preciso mexer no `game.js`.**

Os setores ficam na lista `setores`. Os que ainda não são jogáveis já estão lá com `disponivel: false`.
Para liberar um deles (ou criar outro), complete o objeto seguindo o modelo do Almoxarifado:

```js
{
  id: 'escritorio',                 // identificador único, sem espaços
  nome: 'Escritório',
  icone: '💻',
  nrs: ['NR-17'],                   // NRs mostradas no mapa
  disponivel: true,                 // true = jogável
  resumo: 'Texto curto do cartão no mapa.',
  briefing: 'Texto mostrado antes da inspeção começar.',

  cenario: {
    mensagemPadrao: 'Aqui está tudo certo.',
    svg: `<svg viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg"> ... </svg>`
  },

  naoPerigos: [
    { id: 'cadeira-ok', mensagem: 'Cadeira com regulagem de altura. Tudo certo aqui!' }
  ],

  perigos: [
    {
      id: 'monitor-baixo',
      nome: 'Monitor muito baixo',               // aparece na lista de encontrados
      descricao: 'Descrição do perigo.',
      nrs: ['NR-17'],
      referencia: { probabilidade: 2, gravidade: 1 },  // 0 = baixa/leve, 1 = média/moderada, 2 = alta/grave
      justificativaRisco: 'Por que essa é a classificação de referência.',
      opcoes: [                                  // exatamente 4, só UMA com correta: true
        { nivel: 'eliminacao', correta: true,  texto: '...', explicacao: '...' },
        { nivel: 'coletiva',   correta: false, texto: '...', explicacao: '...' },
        { nivel: 'administrativa', correta: false, texto: '...', explicacao: '...' },
        { nivel: 'epi',        correta: false, texto: '...', explicacao: '...' }
      ],
      porque: 'Por que a ação correta é a melhor e o que a NR pede.',
      consequencia: 'O que poderia acontecer na vida real (tom sóbrio).',
      noticia: { manchete: '...', texto: '...' }  // usada se o perigo não for encontrado
    }
  ],

  quiz: [
    { tema: 'Ergonomia', nr: 'NR-17', pergunta: '...', opcoes: ['A', 'B', 'C', 'D'], correta: 1, explicacao: '...' }
  ]
}
```

### Regras do cenário (SVG)

- Use o mesmo `viewBox` (por exemplo `0 0 1000 560`) e desenhe com formas simples e cores chapadas.
- Cada **perigo** é um grupo `<g data-perigo="ID">`, em que `ID` é igual ao `id` do perigo.
- Cada **elemento seguro clicável** é um grupo `<g data-ok="ID">`, ligado a um item de `naoPerigos`.
- Dentro de cada grupo, inclua um retângulo de área de clique, que também vira o contorno de destaque:
  `<rect class="alvo" x="..." y="..." width="..." height="..." fill="transparent"/>`
- Elementos desenhados depois ficam por cima. Desenhe primeiro o que fica ao fundo.
- Cliques fora de qualquer grupo mostram a `mensagemPadrao`.
- O SVG fica dentro de uma crase (`` ` ``). Não use crases no meio do desenho.

### Conferência automática

Ao abrir o jogo, o `game.js` confere o `data.js` e, se encontrar problemas (perigo sem desenho no SVG,
falta do retângulo `alvo`, número errado de opções corretas, nível de hierarquia desconhecido etc.),
mostra um aviso no console do navegador (tecla F12 → aba "Console").

### Outras configurações em `data.js`

- `config`: tempo da inspeção, pontos de cada etapa e efeitos no índice de segurança.
- `cargos`: nomes e pontuação mínima de cada cargo (pontuação acumulada de todas as fases).
- `medalhas`: nome, ícone, descrição e o critério usado. Critérios disponíveis:
  `todosEncontradosRapido` (com `limiteSegundos`), `todosEncontrados`, `avaliacoesExatas`,
  `todasAcoesCorretas` e `quizPerfeito`.
- `escalas`, `niveisRisco` e `matrizRisco`: textos e cores da matriz de risco 3×3.
- `hierarquia`: níveis da hierarquia de controle e suas cores.

## Pontuação (padrão)

| Etapa | Pontos |
|---|---|
| Perigo encontrado | 100 cada |
| Avaliação igual à referência | 50 (uma casa de diferença: 25) |
| Ação correta | 100 cada |
| Pergunta do quiz | 40 cada |

Pontuação máxima no Almoxarifado: 1.450 pontos.

Índice de segurança (começa em 50): +10 se nenhum perigo ficar de fora, +2 por ação correta e
−10 por perigo não encontrado (limitado entre 0 e 100). Os dias sem acidentes avançam 30 por fase
sem acidentes e voltam a zero quando há acidente.
