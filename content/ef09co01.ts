import type { Skill } from "./types.ts";

export const ef09co01: Skill = {
  code: "EF09CO01",
  axis: "PC",
  title: "Grafos e árvores",
  bnccText:
    "Criar soluções de problemas para os quais seja adequado o uso de árvores e grafos para descrever suas informações e automatizá-las usando uma linguagem de programação.",
  lessons: [
    {
      id: "ef09co01-l1",
      title: "Grafos: pontos e ligações",
      explanation: `Um **grafo** representa **coisas** e as **ligações** entre elas.

- Cada coisa é um **vértice** (ou nó): uma cidade, uma pessoa, um computador.
- Cada ligação é uma **aresta**: uma estrada, uma amizade, um cabo de rede.

Exemplos do dia a dia:

- **Mapa**: cidades são vértices, estradas são arestas.
- **Rede social**: pessoas são vértices, amizades são arestas.
- **Internet**: computadores e roteadores são vértices, conexões são arestas.

As arestas podem ter um **peso**, como a distância em km. Aí dá para perguntar: qual o **caminho mais curto** de uma cidade até outra? É isso que o aplicativo de mapas calcula quando você pede uma rota.`,
      simpler: `Pegue um papel e desenhe bolinhas com os nomes dos seus amigos. Agora ligue com uma linha quem é amigo de quem.

Pronto, você desenhou um grafo! As **bolinhas** são os vértices e as **linhas** são as arestas.

Se em vez de amigos fossem cidades, e em cada linha você escrevesse quantos km tem a estrada, daria para descobrir o caminho mais curto somando os números das linhas.`,
      questions: [
        {
          id: "ef09co01-l1-q1",
          prompt: "Em um grafo que representa um mapa, as cidades são:",
          options: ["Arestas", "Vértices", "Pesos", "Caminhos"],
          answer: 1,
          why: "As coisas representadas (cidades) são os vértices. As estradas que as ligam são as arestas.",
        },
        {
          id: "ef09co01-l1-q2",
          prompt: "Num grafo de uma rede social, o que as arestas costumam representar?",
          options: ["As fotos postadas", "As pessoas", "As amizades ou conexões entre pessoas", "As senhas"],
          answer: 2,
          why: "Pessoas são vértices; a relação entre elas (amizade, seguir) é a aresta.",
        },
        {
          id: "ef09co01-l1-q3",
          prompt:
            "Estradas: A até B = 5 km, B até C = 3 km, A até C direto = 10 km.\nQual é a menor distância, em km, para ir de A até C?",
          options: ["8 km", "10 km", "18 km", "3 km"],
          answer: 0,
          why: "Passando por B: 5 + 3 = 8 km, menor que os 10 km do caminho direto. Nem sempre o caminho com menos arestas é o mais curto.",
        },
        {
          id: "ef09co01-l1-q4",
          prompt: "Qual destes NÃO é um bom exemplo de grafo?",
          options: [
            "Linhas de metrô ligando estações",
            "Voos ligando aeroportos",
            "A temperatura de hoje",
            "Computadores ligados numa rede",
          ],
          answer: 2,
          why: "A temperatura é um único valor, sem coisas ligadas entre si. Os outros têm vértices e ligações.",
        },
      ],
    },
    {
      id: "ef09co01-l2",
      title: "Árvores: grafos em hierarquia",
      explanation: `Uma **árvore** é um tipo especial de grafo organizado em **hierarquia**, de cima para baixo.

- O vértice do topo é a **raiz**.
- Cada vértice pode ter **filhos** logo abaixo dele.
- Vértices sem filhos são **folhas**.
- Numa árvore **não existem ciclos**: não dá para sair de um vértice, seguir as arestas e voltar para ele sem repetir caminho.

Exemplos:

- **Pastas do computador**: a pasta principal é a raiz, subpastas são filhos, arquivos são folhas.
- **Árvore genealógica**.
- **Organograma** de uma empresa.
- **Chaveamento** de um campeonato.

Árvores facilitam buscas: para achar um arquivo, você desce pelas pastas certas em vez de olhar tudo.`,
      simpler: `Pense nas pastas do seu computador ou celular:

- **Documentos** (raiz)
  - **Escola**
    - Matemática
    - Ciências
  - **Fotos**

"Escola" e "Fotos" são filhos de "Documentos". "Matemática", "Ciências" e "Fotos" não têm nada dentro: são **folhas**.

Desenhe isso de cabeça para baixo e parece uma árvore com a raiz em cima.`,
      questions: [
        {
          id: "ef09co01-l2-q1",
          prompt: "Qual destes é organizado como uma árvore?",
          options: [
            "As pastas e arquivos de um computador",
            "Uma roda de amigos em que todos se conhecem",
            "Uma estrada circular em volta de um lago",
            "Uma lista de compras",
          ],
          answer: 0,
          why: "Pastas formam uma hierarquia com uma raiz e sem ciclos. Uma roda em que todos se conhecem tem ciclos, então é um grafo, não árvore.",
        },
        {
          id: "ef09co01-l2-q2",
          prompt: "Numa árvore, um vértice que não tem filhos se chama:",
          options: ["Raiz", "Folha", "Aresta", "Pai"],
          answer: 1,
          why: "Folhas ficam nas pontas, sem nada abaixo delas.",
        },
        {
          id: "ef09co01-l2-q3",
          prompt:
            "\"Documentos\" contém \"Escola\" e \"Fotos\". \"Escola\" contém \"Matemática\" e \"Ciências\". \"Fotos\" está vazia.\nQuantas folhas essa árvore tem?",
          options: ["3", "2", "4", "5"],
          answer: 0,
          why: "Matemática, Ciências e Fotos não têm filhos. São 3 folhas.",
        },
        {
          id: "ef09co01-l2-q4",
          prompt: "O que diferencia uma árvore de um grafo qualquer?",
          options: [
            "Árvores não têm vértices",
            "Árvores têm hierarquia e não têm ciclos",
            "Árvores só podem ter 2 vértices",
            "Não há diferença",
          ],
          answer: 1,
          why: "Toda árvore é um grafo, mas com hierarquia (raiz, filhos) e sem ciclos.",
        },
      ],
    },
  ],
};
