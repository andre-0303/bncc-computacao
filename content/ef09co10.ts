import type { Skill } from "./types.ts";

export const ef09co10: Skill = {
  code: "EF09CO10",
  axis: "CD",
  title: "Fake news e qualidade da informação",
  bnccText:
    "Avaliar a veracidade, credibilidade e relevância da informação em seus diferentes formatos, sendo capaz de identificar o propósito pelo qual foi disseminada.",
  lessons: [
    {
      id: "ef09co10-l1",
      title: "O que é desinformação",
      explanation: `**Desinformação** (as famosas *fake news*) é conteúdo falso ou enganoso que circula como se fosse verdade. Ela aparece de vários jeitos:

- **Inventada**: a história nunca aconteceu.
- **Fora de contexto**: uma foto real, mas antiga ou de outro lugar, apresentada como se fosse de hoje.
- **Manipulada**: imagem, vídeo ou áudio editados.
- **Sátira levada a sério**: piada de site de humor compartilhada como notícia.

Por que alguém espalha? Para **ganhar dinheiro** com cliques e anúncios, **influenciar** opiniões e eleições, aplicar **golpes** ou só por "zoeira".

**Sinais de alerta**: título exagerado, TUDO EM MAIÚSCULAS, "compartilhe antes que apaguem", sem autor, sem data, sem fonte e erros de português.

Lembre: **muitos compartilhamentos não tornam algo verdadeiro.**`,
      simpler: `Sabe o "telefone sem fio"? A mensagem vai mudando até virar outra coisa. Fake news é parecido, só que muitas vezes alguém muda **de propósito**.

Desconfie quando a notícia:

- quer te deixar com muita raiva ou medo;
- pede para você compartilhar urgente;
- não diz quem escreveu nem quando.

Quanto mais ela mexe com sua emoção, mais calma você precisa ter antes de acreditar.`,
      questions: [
        {
          id: "ef09co10-l1-q1",
          prompt: "Qual destes é um sinal de alerta de que uma notícia pode ser falsa?",
          options: [
            "Tem autor, data e fonte",
            "Pede \"COMPARTILHE ANTES QUE APAGUEM!!!\"",
            "Foi publicada por vários jornais conhecidos",
            "Tem links para documentos oficiais",
          ],
          answer: 1,
          why: "Urgência para compartilhar e texto em maiúsculas são técnicas para fazer você espalhar sem pensar.",
        },
        {
          id: "ef09co10-l1-q2",
          prompt: "Uma foto real de uma enchente de 2015 é compartilhada como se fosse de ontem. Que tipo de desinformação é?",
          options: ["Sátira", "Fora de contexto", "Notícia verdadeira", "Propaganda oficial"],
          answer: 1,
          why: "A foto é real, mas o contexto (data/lugar) é falso. Isso engana tanto quanto uma imagem inventada.",
        },
        {
          id: "ef09co10-l1-q3",
          prompt: "Como um site de notícias falsas costuma ganhar dinheiro?",
          options: ["Com cliques e anúncios", "Vendendo jornais impressos", "Com doações da escola", "Não ganha nada"],
          answer: 0,
          why: "Títulos chocantes geram cliques, e cada visita rende dinheiro com anúncios.",
        },
        {
          id: "ef09co10-l1-q4",
          prompt: "Verdadeiro ou falso: se uma notícia foi compartilhada por milhares de pessoas, ela é verdadeira.",
          options: ["Verdadeiro", "Falso"],
          answer: 1,
          why: "Popularidade não é prova. Notícias falsas costumam se espalhar até mais rápido que as verdadeiras.",
        },
      ],
    },
    {
      id: "ef09co10-l2",
      title: "Como checar antes de compartilhar",
      explanation: `Antes de compartilhar, faça a checagem:

1. **Leia além do título.** Muitas vezes o texto nem confirma o que o título diz.
2. **Quem publicou?** Veja o site, o autor e se é um veículo conhecido.
3. **Quando?** Confira a data: notícia velha pode estar sendo recirculada.
4. **Procure em outras fontes.** Se é verdade e importante, outros veículos sérios também noticiaram.
5. **Agências de checagem**: Lupa, Aos Fatos, Fato ou Fake e outras verificam boatos.
6. **Busca reversa de imagem**: envie a foto ao buscador para descobrir onde e quando ela apareceu primeiro.

Atenção às **deepfakes**: vídeos e áudios criados por inteligência artificial que imitam pessoas reais falando coisas que nunca disseram.

Na dúvida, **não compartilhe**.`,
      simpler: `Pense como um juiz de futebol olhando o VAR antes de marcar o gol:

- Viu o lance todo? (leu além do título)
- De que câmera veio? (quem publicou)
- É desse jogo ou de outro? (data)
- Outras câmeras mostram a mesma coisa? (outras fontes)

Só depois de conferir, você "apita" e compartilha.`,
      questions: [
        {
          id: "ef09co10-l2-q1",
          prompt: "Para que serve a busca reversa de imagem?",
          options: [
            "Para deixar a imagem de cabeça para baixo",
            "Para descobrir onde e quando a imagem apareceu antes",
            "Para apagar a imagem da internet",
            "Para aumentar a resolução",
          ],
          answer: 1,
          why: "Ela mostra outros lugares onde a foto foi publicada, revelando se é antiga ou de outro contexto.",
        },
        {
          id: "ef09co10-l2-q2",
          prompt: "Você recebeu uma notícia chocante no grupo da família. Qual a melhor primeira atitude?",
          options: [
            "Compartilhar logo para avisar todo mundo",
            "Verificar em outras fontes confiáveis antes de compartilhar",
            "Responder com emoji de raiva",
            "Apagar o grupo",
          ],
          answer: 1,
          why: "Checar antes impede que você ajude a espalhar algo falso.",
        },
        {
          id: "ef09co10-l2-q3",
          prompt: "O que é uma deepfake?",
          options: [
            "Um vídeo ou áudio falso gerado por inteligência artificial imitando uma pessoa real",
            "Uma notícia publicada em jornal",
            "Um tipo de antivírus",
            "Uma senha muito forte",
          ],
          answer: 0,
          why: "Deepfakes usam IA para fazer parecer que alguém disse ou fez algo que nunca aconteceu.",
        },
        {
          id: "ef09co10-l2-q4",
          prompt: "Qual destas é uma agência de checagem de fatos brasileira?",
          options: ["Aos Fatos", "Um perfil anônimo", "Um grupo de mensagens", "Um site sem autor"],
          answer: 0,
          why: "Agências como Aos Fatos e Lupa investigam boatos e publicam o que é verdadeiro ou falso, com fontes.",
        },
      ],
    },
  ],
};
