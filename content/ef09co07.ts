import type { Skill } from "./types.ts";

export const ef09co07: Skill = {
  code: "EF09CO07",
  axis: "CD",
  title: "Tecnologia, sociedade e trabalho",
  bnccText:
    "Avaliar aplicações e implicações políticas, socioambientais e culturais das tecnologias digitais para propor alternativas aos desafios do mundo contemporâneo, incluindo aqueles relativos ao mundo do trabalho.",
  lessons: [
    {
      id: "ef09co07-l1",
      title: "Profissões que somem e que surgem",
      explanation: `A tecnologia muda o mundo do trabalho o tempo todo.

**Profissões que diminuíram ou quase sumiram**: telefonista (as ligações eram conectadas à mão), datilógrafo, ascensorista, cobrador de ônibus em muitas cidades.

**Profissões que surgiram**: desenvolvedor de aplicativos, cientista de dados, especialista em cibersegurança, criador de conteúdo, designer de experiência do usuário.

O que costuma ser **mais fácil de automatizar**: tarefas **repetitivas** e com regras claras, como conferir documentos iguais ou montar peças numa linha de produção.

O que é **mais difícil de automatizar**: criatividade, empatia, resolver problemas novos, negociar, cuidar de pessoas. Por isso essas habilidades ficam cada vez mais valiosas.`,
      simpler: `Antigamente, para ligar para alguém, uma pessoa (a telefonista) conectava os fios na mão. Hoje uma central automática faz isso. A profissão quase sumiu.

Mas a internet criou trabalhos que não existiam quando seus avós eram jovens, como quem faz aplicativos ou analisa dados.

Regra prática: o que é **sempre igual** a máquina aprende fácil. O que precisa de **criatividade e cuidado com pessoas** continua muito humano.`,
      questions: [
        {
          id: "ef09co07-l1-q1",
          prompt: "Qual destas tarefas é MAIS fácil de automatizar?",
          options: [
            "Consolar um amigo triste",
            "Conferir milhares de boletos sempre no mesmo formato",
            "Criar uma música original",
            "Mediar uma briga entre vizinhos",
          ],
          answer: 1,
          why: "Tarefas repetitivas com regras fixas são as mais simples de transformar em algoritmo.",
        },
        {
          id: "ef09co07-l1-q2",
          prompt: "Qual profissão surgiu com a computação e a internet?",
          options: ["Telefonista", "Cientista de dados", "Datilógrafo", "Acendedor de lampiões"],
          answer: 1,
          why: "Cientista de dados analisa grandes volumes de dados digitais, algo que só existe por causa dos computadores.",
        },
        {
          id: "ef09co07-l1-q3",
          prompt: "Por que a profissão de telefonista praticamente desapareceu?",
          options: [
            "Porque ninguém mais faz ligações",
            "Porque centrais automáticas passaram a conectar as chamadas",
            "Porque foi proibida por lei",
            "Porque virou esporte",
          ],
          answer: 1,
          why: "A automação das centrais tornou desnecessário conectar as ligações à mão.",
        },
        {
          id: "ef09co07-l1-q4",
          prompt: "Qual habilidade tende a continuar valiosa mesmo com muita automação?",
          options: ["Empatia e criatividade", "Copiar textos", "Repetir a mesma conta mil vezes", "Decorar listas"],
          answer: 0,
          why: "Habilidades humanas como empatia, criatividade e pensamento crítico são difíceis de automatizar.",
        },
      ],
    },
    {
      id: "ef09co07-l2",
      title: "Tecnologia para desafios reais (e seus efeitos)",
      explanation: `Tecnologias digitais ajudam a enfrentar desafios atuais:

- **Saúde**: telemedicina leva consultas a quem mora longe.
- **Meio ambiente**: satélites e sensores detectam queimadas e desmatamento.
- **Acessibilidade**: leitores de tela leem o conteúdo em voz alta para pessoas cegas; aplicativos traduzem para Libras.
- **Transporte**: apps calculam rotas e mostram o horário do ônibus.

Mas toda tecnologia tem **implicações**:

- **Trabalho por aplicativo** (entregas, corridas) gera renda, mas levanta debates sobre direitos trabalhistas.
- **Privacidade**: apps coletam muitos dados pessoais.
- **Meio ambiente**: lixo eletrônico e consumo de energia.

Avaliar uma tecnologia é olhar **os dois lados**.`,
      simpler: `Tecnologia é como uma faca: ajuda muito a cozinhar, mas pode machucar se usada sem cuidado.

Um app de entrega facilita a vida e dá trabalho para muita gente, mas o entregador às vezes trabalha muitas horas sem direitos garantidos.

Por isso, sempre pergunte: **quem ganha** e **quem pode sair prejudicado** com essa tecnologia?`,
      questions: [
        {
          id: "ef09co07-l2-q1",
          prompt: "Um leitor de tela ajuda principalmente:",
          options: ["Pessoas cegas ou com baixa visão", "Quem quer jogar mais rápido", "Quem não tem internet", "Robôs"],
          answer: 0,
          why: "O leitor de tela transforma o texto da tela em fala, tornando celulares e computadores acessíveis.",
        },
        {
          id: "ef09co07-l2-q2",
          prompt: "Como a tecnologia ajuda a combater queimadas na Amazônia?",
          options: [
            "Com satélites que detectam focos de calor",
            "Com jogos de corrida",
            "Com filtros de foto",
            "Não ajuda",
          ],
          answer: 0,
          why: "Satélites monitoram a floresta e alertam sobre focos de incêndio quase em tempo real.",
        },
        {
          id: "ef09co07-l2-q3",
          prompt: "Qual é um debate importante sobre o trabalho por aplicativo?",
          options: [
            "Se os apps deveriam ter cores diferentes",
            "Os direitos e condições de trabalho de entregadores e motoristas",
            "Se a pizza deve ser redonda",
            "Nenhum, é tudo perfeito",
          ],
          answer: 1,
          why: "Muitos trabalhadores de aplicativo não têm férias, salário mínimo garantido ou proteção em caso de acidente.",
        },
        {
          id: "ef09co07-l2-q4",
          prompt: "Verdadeiro ou falso: toda tecnologia digital só traz benefícios.",
          options: ["Verdadeiro", "Falso"],
          answer: 1,
          why: "Toda tecnologia tem efeitos positivos e negativos. Avaliar os dois lados é o que a habilidade pede.",
        },
      ],
    },
  ],
};
