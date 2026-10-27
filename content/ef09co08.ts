import type { Skill } from "./types.ts";

export const ef09co08: Skill = {
  code: "EF09CO08",
  axis: "CD",
  title: "Desigualdade no acesso à tecnologia",
  bnccText:
    "Discutir como a distribuição desigual de recursos de computação em uma economia global levanta questões de equidade, acesso e poder.",
  lessons: [
    {
      id: "ef09co08-l1",
      title: "Exclusão digital",
      explanation: `**Exclusão digital** é quando parte das pessoas não tem acesso (ou tem acesso ruim) a internet, computadores e às habilidades para usá-los.

No Brasil, o acesso é **desigual** entre:

- **Regiões** e entre **cidade e zona rural**.
- **Faixas de renda**: famílias mais pobres muitas vezes só acessam pelo **celular**, com **pacote de dados limitado**.

Na pandemia, quando as aulas viraram remotas, muitos estudantes ficaram sem conseguir estudar por falta de internet ou de aparelho.

Ter só celular com pouco plano dificulta tarefas como fazer trabalhos longos, assistir videoaulas e buscar emprego online.

A pesquisa **TIC Domicílios**, do Cetic.br, mede todo ano como os brasileiros acessam a internet.`,
      simpler: `Imagine uma corrida em que alguns começam de bicicleta e outros a pé. Não é justo, né?

Na escola é parecido: quem tem computador e internet boa em casa faz pesquisa e trabalho com facilidade. Quem só tem um celular com pouco crédito, ou nem isso, sai atrás.

Isso é **exclusão digital**: a tecnologia existe, mas não chega igual para todo mundo.`,
      questions: [
        {
          id: "ef09co08-l1-q1",
          prompt: "O que é exclusão digital?",
          options: [
            "Ser bloqueado num jogo online",
            "Não ter acesso, ou ter acesso precário, à internet, aparelhos e habilidades digitais",
            "Apagar um aplicativo",
            "Ficar um dia sem celular por escolha",
          ],
          answer: 1,
          why: "Exclusão digital envolve falta de acesso a conexão, equipamentos ou conhecimento para usar a tecnologia.",
        },
        {
          id: "ef09co08-l1-q2",
          prompt: "Durante as aulas remotas da pandemia, o que aconteceu com muitos estudantes sem internet?",
          options: [
            "Tiveram vantagem",
            "Ficaram com dificuldade ou sem acesso às aulas",
            "Nada mudou",
            "Ganharam computadores automaticamente",
          ],
          answer: 1,
          why: "A falta de internet e de aparelhos deixou muitos alunos sem conseguir acompanhar as aulas.",
        },
        {
          id: "ef09co08-l1-q3",
          prompt: "Por que acessar a internet SÓ pelo celular com pacote limitado é uma desvantagem?",
          options: [
            "Porque celular não tem tela",
            "Porque dificulta tarefas como ver videoaulas longas e fazer trabalhos extensos",
            "Porque é ilegal",
            "Não é desvantagem nenhuma",
          ],
          answer: 1,
          why: "Os dados acabam rápido e a tela pequena dificulta escrever trabalhos e estudar por muito tempo.",
        },
        {
          id: "ef09co08-l1-q4",
          prompt: "Qual pesquisa mede o acesso à internet nos lares brasileiros?",
          options: ["TIC Domicílios (Cetic.br)", "Campeonato Brasileiro", "Previsão do tempo", "Horário eleitoral"],
          answer: 0,
          why: "A TIC Domicílios, feita pelo Cetic.br, levanta anualmente dados sobre acesso e uso da internet no Brasil.",
        },
      ],
    },
    {
      id: "ef09co08-l2",
      title: "Tecnologia, economia e poder",
      explanation: `A desigualdade também acontece **entre países** e **entre empresas**:

- Poucos países fabricam os **chips** mais avançados; muitos outros só compram.
- Minerais usados em celulares são muitas vezes extraídos em países pobres, em condições ruins de trabalho.
- Poucas empresas controlam as principais **redes sociais, buscadores e nuvens**. Quem controla essas plataformas decide o que aparece para bilhões de pessoas e guarda enormes quantidades de dados. Isso é **poder**.

Algumas ações que **reduzem** a desigualdade:

- **Wi-fi público** em praças, bibliotecas e telecentros.
- Computadores e internet de qualidade nas **escolas**.
- **Software livre**: gratuito e pode ser estudado e adaptado por qualquer um.
- Ensino de computação para todos (como esta BNCC!).`,
      simpler: `Pense num campeonato em que um time é dono da bola, do campo e ainda escolhe o juiz. Fica difícil para os outros, né?

Na tecnologia, poucas empresas e países são "donos da bola": fabricam os chips, controlam as redes sociais e guardam os dados.

Wi-fi gratuito, computadores nas escolas e software livre ajudam a dar mais chances para todo mundo jogar.`,
      questions: [
        {
          id: "ef09co08-l2-q1",
          prompt: "Qual ação ajuda a reduzir a desigualdade digital numa cidade?",
          options: [
            "Wi-fi gratuito em praças e bibliotecas",
            "Aumentar o preço da internet",
            "Proibir celulares",
            "Fechar telecentros",
          ],
          answer: 0,
          why: "Pontos de acesso gratuito levam internet a quem não pode pagar.",
        },
        {
          id: "ef09co08-l2-q2",
          prompt: "Poucas empresas controlarem as principais redes sociais levanta principalmente uma questão de:",
          options: ["Poder e concentração", "Cores dos ícones", "Velocidade do teclado", "Tamanho da tela"],
          answer: 0,
          why: "Quem controla a plataforma decide o que milhões de pessoas veem e concentra muitos dados.",
        },
        {
          id: "ef09co08-l2-q3",
          prompt: "Por que o software livre pode ajudar escolas com poucos recursos?",
          options: [
            "Porque é gratuito e pode ser adaptado",
            "Porque só funciona sem internet",
            "Porque não precisa de computador",
            "Porque é proibido vender",
          ],
          answer: 0,
          why: "Software livre pode ser usado sem pagar licença e modificado para necessidades locais.",
        },
        {
          id: "ef09co08-l2-q4",
          prompt: "Verdadeiro ou falso: o acesso à internet é igual em todas as regiões do Brasil.",
          options: ["Verdadeiro", "Falso"],
          answer: 1,
          why: "Há diferenças grandes entre regiões, entre cidade e campo e entre faixas de renda.",
        },
      ],
    },
  ],
};
