import type { Skill } from "./types.ts";

export const ef09co06: Skill = {
  code: "EF09CO06",
  axis: "CD",
  title: "Problemas da cidade com olhar digital",
  bnccText:
    "Analisar problemas sociais de sua cidade e estado a partir de ambientes digitais, propondo soluções.",
  lessons: [
    {
      id: "ef09co06-l1",
      title: "Investigando com dados",
      explanation: `Tecnologia ajuda a **entender** problemas da cidade antes de tentar resolvê-los. Um caminho:

1. **Definir a pergunta.** Ex.: "Por que a rua da escola alaga tanto?"
2. **Buscar dados confiáveis.** Fontes oficiais: **IBGE** (população, renda), portal da **prefeitura**, **Portal da Transparência** (gastos públicos), dados da Defesa Civil.
3. **Coletar seus próprios dados**, se precisar: formulários online, fotos com data e local.
4. **Organizar e comparar**: planilhas e gráficos mostram padrões que o texto esconde.

Cuidado com conclusões apressadas: uma enquete com 5 amigos **não** representa a cidade inteira. Quanto maior e mais variada a amostra, mais confiável.`,
      simpler: `Imagine que você é detetive da sua cidade.

- Primeiro decide **qual mistério** vai investigar (o problema).
- Depois procura **pistas confiáveis** (dados de sites oficiais).
- Anota tudo numa **planilha**, como um caderno de pistas.
- Faz um **gráfico** para ver o padrão, tipo "alaga mais nos meses de chuva forte".

Bom detetive não conclui nada perguntando só para 5 pessoas.`,
      questions: [
        {
          id: "ef09co06-l1-q1",
          prompt: "Qual é a fonte mais confiável para saber quantas pessoas vivem no seu município?",
          options: ["Um comentário numa rede social", "O IBGE", "Um vídeo de humor", "Um grupo de mensagens da família"],
          answer: 1,
          why: "O IBGE é o órgão oficial que faz o Censo e as estimativas de população do Brasil.",
        },
        {
          id: "ef09co06-l1-q2",
          prompt: "Qual deve ser o PRIMEIRO passo para investigar um problema da cidade?",
          options: [
            "Criar um aplicativo",
            "Definir claramente qual é o problema ou a pergunta",
            "Postar nas redes sociais",
            "Fazer um gráfico",
          ],
          answer: 1,
          why: "Sem uma pergunta clara, você não sabe quais dados buscar.",
        },
        {
          id: "ef09co06-l1-q3",
          prompt: "Você perguntou a 5 amigos se o ônibus atrasa e 4 disseram sim. O que dá para concluir?",
          options: [
            "Que 80% da cidade sofre com atrasos",
            "Pouca coisa: a amostra é pequena e não representa a cidade",
            "Que os ônibus nunca atrasam",
            "Que o prefeito é o culpado",
          ],
          answer: 1,
          why: "5 pessoas do mesmo grupo não representam a cidade. É um ponto de partida, não uma conclusão.",
        },
        {
          id: "ef09co06-l1-q4",
          prompt: "Para que serve o Portal da Transparência?",
          options: [
            "Ver como o dinheiro público está sendo gasto",
            "Assistir a filmes",
            "Pedir comida",
            "Jogar online",
          ],
          answer: 0,
          why: "Ele publica dados de gastos públicos para que qualquer cidadão possa acompanhar.",
        },
      ],
    },
    {
      id: "ef09co06-l2",
      title: "Propondo soluções",
      explanation: `Depois de entender o problema, ferramentas digitais ajudam a **propor** e **divulgar** soluções:

- **Mapa colaborativo**: moradores marcam pontos de alagamento, buracos, lixo acumulado.
- **Formulário online** para ouvir a comunidade.
- **Gráficos e infográficos** para mostrar o problema de forma clara.
- **Fóruns, abaixo-assinados online** e canais da prefeitura e da câmara de vereadores.

Dois cuidados importantes:

- **Privacidade**: não exponha nome, endereço ou foto de moradores sem autorização (isso também está na **LGPD**, a Lei Geral de Proteção de Dados).
- **Inclusão**: uma solução que só funciona por app deixa de fora quem não tem celular ou internet. Pense em alternativas, como um ponto de atendimento ou cartaz com telefone.`,
      simpler: `Resolver problema da cidade é como organizar uma festa da turma:

- Você faz uma **enquete** para saber o que todos querem (formulário online).
- Monta um **mapa** de quem leva o quê (mapa colaborativo).
- Mostra tudo num **cartaz bonito** (infográfico).

Mas lembra: não pode expor a vida de ninguém, e não pode esquecer quem não tem celular para ver o grupo.`,
      questions: [
        {
          id: "ef09co06-l2-q1",
          prompt: "Qual ferramenta é mais adequada para mostrar ONDE ficam os pontos de alagamento do bairro?",
          options: ["Um mapa colaborativo", "Um editor de música", "Uma calculadora", "Um jogo de corrida"],
          answer: 0,
          why: "O problema é sobre localização, então um mapa em que moradores marcam os pontos é o mais claro.",
        },
        {
          id: "ef09co06-l2-q2",
          prompt: "Ao coletar relatos dos moradores, qual cuidado é obrigatório?",
          options: [
            "Publicar o endereço de todos",
            "Não expor dados pessoais sem autorização",
            "Só ouvir quem concorda com você",
            "Usar apenas fotos de pessoas",
          ],
          answer: 1,
          why: "Dados pessoais são protegidos pela LGPD. Use dados anônimos ou peça autorização.",
        },
        {
          id: "ef09co06-l2-q3",
          prompt: "Uma solução que funciona APENAS por aplicativo pode excluir:",
          options: [
            "Quem tem o celular mais novo",
            "Pessoas sem celular ou sem internet",
            "Ninguém",
            "Só os professores",
          ],
          answer: 1,
          why: "Nem todo mundo tem acesso à internet. Boas soluções oferecem outros caminhos também.",
        },
        {
          id: "ef09co06-l2-q4",
          prompt: "Por que transformar os dados em gráfico antes de apresentar à prefeitura?",
          options: [
            "Para esconder informações",
            "Porque gráficos facilitam ver padrões e comparar rapidamente",
            "Porque é obrigatório por lei",
            "Para ocupar mais espaço",
          ],
          answer: 1,
          why: "Um bom gráfico mostra tendências (ex.: alagamentos aumentando) que uma tabela grande esconde.",
        },
      ],
    },
  ],
};
