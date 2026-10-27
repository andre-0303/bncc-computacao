import type { Skill } from "./types.ts";

export const ef09co02: Skill = {
  code: "EF09CO02",
  axis: "PC",
  title: "Escolhendo a estrutura de dados",
  bnccText:
    "Construir soluções computacionais de problemas de diferentes áreas do conhecimento, de forma individual e colaborativa, selecionando as estruturas de dados e técnicas adequadas, aperfeiçoando e articulando saberes escolares.",
  lessons: [
    {
      id: "ef09co02-l1",
      title: "Cada dado na sua caixa",
      explanation: `Antes de programar, é preciso decidir **como organizar os dados**. Cada jeito de organizar é uma **estrutura de dados**. As principais:

- **Vetor** (ou lista): itens em sequência, cada um numa posição. Ex.: notas da turma, fila de músicas.
- **Matriz**: uma tabela com linhas e colunas. Ex.: tabuleiro de jogo da velha, pixels de uma imagem.
- **Registro**: um conjunto de informações diferentes sobre **uma** coisa, cada uma com um nome. Ex.: ficha do aluno com nome, idade e turma.
- **Grafo**: coisas e as ligações entre elas. Ex.: mapa, rede social.

Escolher a estrutura certa deixa o programa mais simples. Escolher a errada deixa tudo mais complicado.`,
      simpler: `Pense em como você guarda coisas no quarto:

- **Vetor/lista**: uma prateleira com livros enfileirados, um ao lado do outro.
- **Matriz**: uma caixa de ovos, com linhas e colunas.
- **Registro**: a sua carteirinha da escola, com campos "nome", "foto", "turma".
- **Grafo**: um mural com fotos de amigos ligadas por barbantes.

Cada tipo de coisa fica melhor num tipo de organização.`,
      questions: [
        {
          id: "ef09co02-l1-q1",
          prompt: "Qual estrutura combina melhor com um tabuleiro de jogo da velha?",
          options: ["Registro", "Matriz", "Grafo", "Nenhuma"],
          answer: 1,
          why: "O tabuleiro tem 3 linhas e 3 colunas. Cada casa é acessada por (linha, coluna): isso é uma matriz.",
        },
        {
          id: "ef09co02-l1-q2",
          prompt: "Para guardar nome, idade e turma de UM aluno, a melhor estrutura é:",
          options: ["Registro", "Matriz", "Grafo", "Vetor de números"],
          answer: 0,
          why: "Registro junta informações de tipos diferentes sobre uma mesma coisa, cada uma com seu nome (campo).",
        },
        {
          id: "ef09co02-l1-q3",
          prompt: "A fila de próximas músicas de um aplicativo é bem representada por:",
          options: ["Matriz", "Registro", "Lista", "Árvore"],
          answer: 2,
          why: "As músicas ficam em sequência, uma depois da outra, e a fila pode crescer ou diminuir: uma lista.",
        },
        {
          id: "ef09co02-l1-q4",
          prompt: "Linhas de ônibus ligando bairros de uma cidade são melhor representadas por:",
          options: ["Vetor", "Registro", "Grafo", "Matriz de pixels"],
          answer: 2,
          why: "Bairros são vértices e as linhas de ônibus que os ligam são arestas: um grafo.",
        },
      ],
    },
    {
      id: "ef09co02-l2",
      title: "Posições e índices",
      explanation: `Em vetores e listas, cada item tem uma **posição**, chamada **índice**. Em muitas linguagens de programação (como Python e JavaScript), o índice **começa em 0**:

\`notas = [7, 3, 9, 5]\`

- \`notas[0]\` é 7
- \`notas[1]\` é 3
- \`notas[2]\` é 9

Isso permite **acessar direto** qualquer posição, sem passar pelas outras.

Na matriz, você usa **dois** índices: linha e coluna. Numa imagem, \`pixel[10][20]\` é o pixel da linha 10, coluna 20.

Algumas listas têm **tamanho fixo**; outras **crescem** quando você adiciona itens (como a lista de pontuações de um jogo no Scratch).`,
      simpler: `Imagine os armários da escola numerados. Se alguém diz "pega o caderno no armário 2", você vai direto nele, não precisa abrir os outros.

A diferença é que, no computador, a contagem costuma começar no **zero**: o primeiro armário é o 0, o segundo é o 1, o terceiro é o 2...

Então em \`[7, 3, 9, 5]\`, o armário 2 guarda o **9**.`,
      questions: [
        {
          id: "ef09co02-l2-q1",
          prompt: "Dado o vetor notas = [7, 3, 9, 5], com índices começando em 0, qual valor está em notas[2]?",
          options: ["9", "3", "5", "7"],
          answer: 0,
          why: "Índice 0 = 7, índice 1 = 3, índice 2 = 9.",
        },
        {
          id: "ef09co02-l2-q2",
          prompt: "No vetor [10, 20, 30, 40, 50], com índices começando em 0, qual é o índice do valor 50?",
          options: ["4", "5", "50", "0"],
          answer: 0,
          why: "São 5 itens, com índices de 0 a 4. O último (50) está no índice 4.",
        },
        {
          id: "ef09co02-l2-q3",
          prompt: "Por que uma imagem digital é guardada como matriz?",
          options: [
            "Porque imagens não têm cores",
            "Porque os pixels ficam organizados em linhas e colunas",
            "Porque matriz ocupa zero espaço",
            "Porque só funciona com fotos em preto e branco",
          ],
          answer: 1,
          why: "Cada pixel tem uma posição (linha, coluna) na grade da imagem, exatamente como uma matriz.",
        },
        {
          id: "ef09co02-l2-q4",
          prompt: "Num jogo, a lista de recordes recebe um novo nome a cada partida. Que característica a estrutura precisa ter?",
          options: ["Poder crescer", "Ter exatamente 3 itens", "Ter linhas e colunas", "Ser um grafo"],
          answer: 0,
          why: "Como o número de recordes aumenta, a estrutura precisa aceitar novos itens: uma lista que cresce.",
        },
      ],
    },
  ],
};
