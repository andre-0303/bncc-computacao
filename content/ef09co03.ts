import type { Skill } from "./types.ts";

export const ef09co03: Skill = {
  code: "EF09CO03",
  axis: "PC",
  title: "Autômatos e programação por eventos",
  bnccText:
    "Usar autômatos para descrever comportamentos de forma abstrata automatizando-os através de uma linguagem de programação baseada em eventos.",
  lessons: [
    {
      id: "ef09co03-l1",
      title: "Estados e transições",
      explanation: `Um **autômato** descreve um comportamento usando três ideias:

- **Estados**: as situações em que o sistema pode estar. Ex.: catraca *travada* ou *destravada*.
- **Eventos**: coisas que acontecem. Ex.: *passar o cartão*, *empurrar*.
- **Transições**: as regras "se estou no estado X e acontece o evento Y, vou para o estado Z".

Exemplo: catraca do ônibus.

- *Travada* + passar o cartão → *destravada*
- *Destravada* + empurrar → *travada*
- *Travada* + empurrar → continua *travada*

Costumamos desenhar os estados como **círculos** e as transições como **setas** com o nome do evento. Um semáforo também é um autômato: verde → amarelo → vermelho → verde, mudando quando o tempo acaba.`,
      simpler: `Pense num interruptor de luz. Ele só tem dois **estados**: **acesa** ou **apagada**.

Existe um **evento**: apertar o botão.

As **transições** são:

- apagada + apertar → acesa
- acesa + apertar → apagada

Pronto, isso é um autômato. Ele diz em que situação o sistema está e o que muda quando algo acontece.`,
      questions: [
        {
          id: "ef09co03-l1-q1",
          prompt: "A catraca está TRAVADA e acontece o evento \"passar o cartão\". Para qual estado ela vai?",
          options: ["Travada", "Destravada", "Quebrada", "Continua igual"],
          answer: 1,
          why: "A transição é: travada + passar o cartão → destravada.",
        },
        {
          id: "ef09co03-l1-q2",
          prompt: "No autômato do semáforo (verde → amarelo → vermelho → verde), o que vem depois do amarelo?",
          options: ["Verde", "Vermelho", "Amarelo de novo", "Apagado"],
          answer: 1,
          why: "Do amarelo, a transição leva ao vermelho.",
        },
        {
          id: "ef09co03-l1-q3",
          prompt:
            "Uma lâmpada tem os estados ACESA e APAGADA. Cada aperto no botão troca o estado.\nEla começa APAGADA e o botão é apertado 3 vezes. Qual é o estado final?",
          options: ["ACESA", "APAGADA"],
          answer: 0,
          why: "Apagada → acesa (1) → apagada (2) → acesa (3). Número ímpar de apertos muda o estado inicial.",
        },
        {
          id: "ef09co03-l1-q4",
          prompt: "Num autômato, o que é um evento?",
          options: [
            "Uma situação em que o sistema fica parado",
            "Algo que acontece e pode provocar uma mudança de estado",
            "O desenho de um círculo",
            "O nome do programa",
          ],
          answer: 1,
          why: "Eventos (apertar botão, passar cartão, sensor detectar algo) disparam as transições entre estados.",
        },
      ],
    },
    {
      id: "ef09co03-l2",
      title: "Programar reagindo a eventos",
      explanation: `Em **programação baseada em eventos**, o programa fica esperando algo acontecer e então reage. Muitos programas funcionam assim: jogos, aplicativos e robôs.

No Scratch, por exemplo:

- **quando a bandeira verde for clicada** → começa o jogo
- **quando a tecla espaço for pressionada** → o personagem pula
- **quando este ator for clicado** → toca um som

Antes de programar, ajuda muito **desenhar o autômato**: quais estados existem e quais eventos mudam o estado. Depois, cada seta vira um trecho de código.

Exemplo: robô aspirador.

- Estado *andando* + sensor detecta obstáculo → *girando*
- Estado *girando* + giro concluído → *andando*`,
      simpler: `Pense num cachorro treinado. Ele fica parado esperando. Quando você diz "senta", ele senta. Quando você joga a bolinha, ele corre.

O cachorro não faz tudo numa ordem fixa: ele **reage** ao que acontece.

Um programa baseado em eventos é igual: fica esperando um clique, uma tecla ou um sensor, e reage com a ação combinada.`,
      questions: [
        {
          id: "ef09co03-l2-q1",
          prompt: "Qual destes blocos do Scratch é baseado em evento?",
          options: [
            "mova 10 passos",
            "quando a tecla espaço for pressionada",
            "mude a cor para azul",
            "repita 10 vezes",
          ],
          answer: 1,
          why: "Blocos que começam com \"quando...\" esperam um evento acontecer para executar o que vem abaixo.",
        },
        {
          id: "ef09co03-l2-q2",
          prompt: "Robô aspirador: está no estado GIRANDO e acontece o evento \"giro concluído\". Qual o próximo estado?",
          options: ["Girando", "Andando", "Desligado", "Carregando"],
          answer: 1,
          why: "A transição definida é: girando + giro concluído → andando.",
        },
        {
          id: "ef09co03-l2-q3",
          prompt: "Por que desenhar o autômato antes de programar ajuda?",
          options: [
            "Porque o computador só aceita desenhos",
            "Porque deixa claros todos os estados e eventos, evitando esquecer casos",
            "Porque o programa fica mais bonito",
            "Não ajuda em nada",
          ],
          answer: 1,
          why: "O desenho mostra o comportamento completo de forma abstrata. Fica fácil ver se faltou alguma transição antes de escrever código.",
        },
        {
          id: "ef09co03-l2-q4",
          prompt: "Num jogo, \"quando o personagem tocar na moeda, some 1 ponto\". O evento aqui é:",
          options: ["Somar 1 ponto", "O personagem tocar na moeda", "A moeda", "O placar"],
          answer: 1,
          why: "O evento é o que acontece (tocar na moeda). Somar o ponto é a reação.",
        },
      ],
    },
  ],
};
