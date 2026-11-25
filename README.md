# Simulador de Segurança do Trabalho: as NRs na prática

Jogo educativo para o navegador sobre as **Normas Regulamentadoras (NRs)** de segurança e saúde no trabalho.
O jogador é contratado como técnico(a) de segurança da *Metalúrgica Horizonte*, uma empresa fictícia, e precisa
inspecionar os setores, encontrar os perigos e escolher as medidas de controle certas.

> **Aviso:** o conteúdo é educativo e simplificado. Confira sempre o texto atualizado das NRs no site do
> Ministério do Trabalho e Emprego ([gov.br/trabalho-e-emprego](https://www.gov.br/trabalho-e-emprego)).

## Como abrir

Não precisa instalar nada nem ter internet. Baixe ou clone o projeto e abra o arquivo **`index.html`** no navegador
(dois cliques nele já funcionam).

## Como jogar

Cada setor é uma fase com sete etapas:

1. **Identificar:** clique nos perigos do cenário antes que o tempo acabe. Cada clique em algo sem perigo custa
   3 segundos e 20 pontos. Os 5 perigos de cada inspeção são sorteados entre 7, então o setor muda a cada partida.
2. **Avaliar:** classifique cada perigo na matriz de **probabilidade × gravidade**.
3. **Resolver:** escolha a melhor medida segundo a **hierarquia de controle**
   (eliminação → proteção coletiva → medida administrativa → EPI).
4. **Feedback:** veja por que cada resposta está certa ou errada, com a NR correspondente.
5. **Quiz:** cinco perguntas sobre as NRs do setor.
6. **Consequência:** os perigos que ficaram de fora viram notícia de acidente no dia seguinte.
7. **Resultado:** pontuação, medalhas, cargo e um relatório que pode ser impresso.

Os setores são liberados em sequência: é preciso concluir um para abrir o próximo.

**Carreira:** cada cargo exige pontos de carreira e um número de setores concluídos. Os pontos de carreira somam
só a **melhor** pontuação de cada setor (no máximo 1.450 por setor), então repetir um setor só ajuda se você
melhorar sua marca.

| Cargo | Pontos de carreira | Setores concluídos |
|---|---|---|
| Estagiário(a) | 0 | 0 |
| Técnico(a) Júnior | 1.000 | 1 |
| Técnico(a) Pleno | 3.000 | 3 |
| Técnico(a) Sênior | 5.500 | 5 |
| Engenheiro(a) de Segurança | 7.400 (cerca de 85% do máximo) | todos os 6 |

**Acessibilidade:** a etapa de identificar pode ser jogada pelo teclado ou com leitor de tela usando a opção
“Inspecionar pela lista”, que descreve cada parte do cenário em texto. O relatório indica quando esse modo foi usado.

### Uso em sala de aula

No final da fase, clique em **Ver relatório**. O aluno pode preencher nome e turma e clicar em
**Imprimir relatório**. A impressão sai limpa, só com o relatório (dá para escolher “Salvar como PDF”).
O relatório mostra os acertos por etapa, as NRs a revisar (e o motivo), o detalhe de cada perigo, os cliques
errados e se a inspeção usou o modo lista.

### Pontuação

| Etapa | Pontos |
|---|---|
| Perigo encontrado | +100 cada |
| Clique em algo sem perigo | −20 (e −3 segundos no relógio) |
| Avaliação igual à referência | +50 (uma casa de diferença: +25) |
| Ação correta | +100 cada |
| Pergunta do quiz | +40 cada |

Pontuação máxima por setor: 1.450 pontos.

Índice de segurança (começa em 50): +10 se nenhum perigo ficar de fora, +2 por ação correta e
−10 por perigo não encontrado (limitado entre 0 e 100). Os dias sem acidentes avançam 30 por fase
sem acidentes e voltam a zero quando há acidente.

## Setores e NRs

| Setor | Principais NRs |
|---|---|
| Almoxarifado | NR-6, NR-11, NR-17, NR-23, NR-26 |
| Escritório | NR-1, NR-8, NR-10, NR-17, NR-23 |
| Produção | NR-6, NR-11, NR-12, NR-15 |
| Manutenção elétrica | NR-6, NR-10, NR-23, NR-26 |
| Obra / telhado | NR-6, NR-18, NR-35 |
| Tanque / silo | NR-10, NR-33, NR-35 |

## Estrutura do projeto

```
index.html              página do jogo
css/style.css           estilos (inclui versão para impressão do relatório)
js/data.js              configurações, cargos, medalhas, matriz de risco e lista de setores
js/cenas.js             peças de desenho dos cenários (pessoas, mesas, extintor...) e o montador de cenários
js/setores/*.js         um arquivo por setor: cenário, perigos, opções de resposta e quiz
js/game.js              lógica do jogo (telas, pontuação, progresso e relatório)
```

O progresso fica salvo no próprio navegador (`localStorage`). O botão “Reiniciar progresso”, no mapa, apaga tudo.

### Como criar ou editar um setor

Cada arquivo em `js/setores/` completa um item da lista `setores` do `data.js`. Um setor tem:

- `cenario.montar`: desenha o cenário em SVG. Cada perigo tem uma versão **de perigo** e uma versão **segura**,
  usada quando ele não é sorteado, além de uma descrição em texto para o modo lista.
- `perigos`: nome, descrição, NRs, classificação de referência na matriz, quatro opções de ação (uma correta),
  explicação, consequência e notícia.
- `quiz`: perguntas de múltipla escolha.

Ao abrir o jogo, o console do navegador (tecla F12) avisa se faltar alguma parte obrigatória num setor.

## Créditos

Trabalho de Higiene e Segurança do Trabalho (HST).
