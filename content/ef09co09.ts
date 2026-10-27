import type { Skill } from "./types.ts";

export const ef09co09: Skill = {
  code: "EF09CO09",
  axis: "CD",
  title: "Direitos autorais e uso de imagem",
  bnccText:
    "Criar ou utilizar conteúdo em meio digital, compreendendo questões éticas relacionadas a direitos autorais e de uso de imagem.",
  lessons: [
    {
      id: "ef09co09-l1",
      title: "Quem é dono do conteúdo?",
      explanation: `**Direito autoral** garante ao autor o controle sobre a obra que criou: texto, música, desenho, foto, vídeo, programa de computador.

Pontos importantes (no Brasil, pela **Lei 9.610/1998**):

- A obra é protegida **assim que é criada**, mesmo sem registro.
- Usar, copiar ou distribuir sem permissão pode **violar** o direito do autor. Baixar filmes e músicas de sites piratas é um exemplo.
- **"Achei no Google" não quer dizer que é livre.** O buscador só mostra; a imagem continua tendo dono.
- Citar um **trecho curto**, com a **fonte**, para estudo ou crítica é permitido.
- Depois de **70 anos** contados a partir do ano seguinte à morte do autor, a obra entra em **domínio público** e pode ser usada livremente.`,
      simpler: `Se você faz um desenho, ele é **seu** desde o momento em que termina. Ninguém pode pegar, colocar o nome dele e vender, certo?

Com qualquer foto, música ou vídeo da internet é igual: tem alguém que criou e é dono.

Encontrar no Google é como achar uma bicicleta na rua: estar à vista não quer dizer que você pode levar.`,
      questions: [
        {
          id: "ef09co09-l1-q1",
          prompt: "Você encontrou uma imagem no buscador. Pode usá-la livremente num trabalho que vai publicar?",
          options: [
            "Sim, tudo que está no buscador é livre",
            "Não necessariamente: a imagem tem um autor e pode ter direitos protegidos",
            "Sim, desde que mude a cor",
            "Sim, se for em preto e branco",
          ],
          answer: 1,
          why: "O buscador só indica onde a imagem está. É preciso verificar a licença ou pedir autorização.",
        },
        {
          id: "ef09co09-l1-q2",
          prompt: "A partir de quando uma obra é protegida por direito autoral no Brasil?",
          options: ["Desde que é criada", "Só depois de registrada em cartório", "Só se tiver mais de 100 curtidas", "Só depois de vendida"],
          answer: 0,
          why: "A proteção é automática no momento da criação; o registro é opcional.",
        },
        {
          id: "ef09co09-l1-q3",
          prompt: "Quando uma obra entra em domínio público no Brasil?",
          options: [
            "Depois de 1 ano publicada",
            "70 anos após a morte do autor (contados a partir do ano seguinte)",
            "Quando viraliza",
            "Nunca",
          ],
          answer: 1,
          why: "A Lei 9.610/98 garante a proteção até 70 anos após a morte do autor. Depois, a obra fica livre.",
        },
        {
          id: "ef09co09-l1-q4",
          prompt: "Baixar um filme em cartaz num site pirata:",
          options: [
            "É permitido se for para ver sozinho",
            "Viola os direitos autorais",
            "É obrigatório",
            "Não tem nenhuma relação com direito autoral",
          ],
          answer: 1,
          why: "O site pirata distribui a obra sem autorização dos donos dos direitos.",
        },
      ],
    },
    {
      id: "ef09co09-l2",
      title: "Licenças livres e direito de imagem",
      explanation: `Alguns autores **liberam** suas obras com regras claras. As licenças **Creative Commons (CC)** são as mais usadas. As siglas dizem as regras:

- **BY**: dê **crédito** ao autor (está em todas as licenças CC).
- **NC**: **não comercial**, não pode usar para ganhar dinheiro.
- **ND**: **sem derivações**, não pode modificar a obra.
- **SA**: **compartilha igual**, se modificar, publique com a mesma licença.

Exemplo: **CC BY-NC** = pode usar dando crédito, mas não para fins comerciais.

Para dar crédito: **autor, título, fonte (link) e licença**.

**Direito de imagem** é outra coisa: protege a **aparência das pessoas**. Postar foto ou vídeo de alguém sem autorização, principalmente em situação constrangedora, pode violar esse direito e virar **cyberbullying**.`,
      simpler: `Creative Commons é como um bilhete que o autor cola na obra dizendo o que você pode fazer:

- **BY**: "pode usar, mas diga que fui eu que fiz"
- **NC**: "não vale vender"
- **ND**: "não mexa no que eu fiz"
- **SA**: "se mexer, deixe os outros mexerem também"

E sobre fotos de pessoas: antes de postar o colega, **pergunte**. Se ele não quiser, não posta.`,
      questions: [
        {
          id: "ef09co09-l2-q1",
          prompt: "Uma foto tem licença CC BY. O que você precisa fazer para usá-la?",
          options: ["Pagar ao autor", "Dar crédito ao autor", "Pedir autorização por carta", "Não pode usar"],
          answer: 1,
          why: "BY significa atribuição: pode usar desde que cite o autor.",
        },
        {
          id: "ef09co09-l2-q2",
          prompt: "Numa licença Creative Commons, a sigla NC significa:",
          options: ["Não comercial", "Novo conteúdo", "Nenhum crédito", "Nada copiado"],
          answer: 0,
          why: "NC (NonCommercial) proíbe uso para ganhar dinheiro.",
        },
        {
          id: "ef09co09-l2-q3",
          prompt: "Qual sigla Creative Commons indica que a obra NÃO pode ser modificada?",
          options: ["ND", "NC", "SA", "BY"],
          answer: 0,
          why: "ND (NoDerivatives) = sem obras derivadas: use do jeito que está.",
        },
        {
          id: "ef09co09-l2-q4",
          prompt: "Postar o vídeo de um colega levando um tombo, sem a autorização dele:",
          options: [
            "Tudo bem, se for engraçado",
            "Viola o direito de imagem e pode ser cyberbullying",
            "É permitido se tiver menos de 10 segundos",
            "É liberado no intervalo",
          ],
          answer: 1,
          why: "A imagem da pessoa é dela. Expor alguém em situação constrangedora sem permissão fere o direito de imagem.",
        },
      ],
    },
  ],
};
