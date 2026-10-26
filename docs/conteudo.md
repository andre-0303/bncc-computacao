# Conteúdo: lições e questões

Todo o conteúdo pedagógico fica em `content/`, em TypeScript. Não há conteúdo no banco: o banco só guarda as respostas dos alunos, referenciando lições e questões pelo `id`.

| Arquivo | Papel |
| --- | --- |
| `content/types.ts` | Tipos `Skill`, `Lesson`, `Question` |
| `content/ef09co01.ts` … `ef09co10.ts` | Uma habilidade por arquivo |
| `content/index.ts` | Junta tudo em `SKILLS`, embaralha alternativas, monta o mapa `QUESTIONS` e as funções `isCorrect`, `correctAnswerText` e `toPublic` |
| `content/content.test.ts` | Testes de consistência (`pnpm test`) |

## Estrutura

Uma **habilidade** (`Skill`) tem:

- `code`: código BNCC, por exemplo `"EF09CO05"`. Na URL ele aparece em minúsculas (`/aluno/ef09co05`).
- `axis`: eixo, `"PC"` (Pensamento Computacional), `"MD"` (Mundo Digital) ou `"CD"` (Cultura Digital). Define em qual grupo a habilidade aparece na tela inicial do aluno.
- `title`: título curto, em linguagem de aluno.
- `bnccText`: texto oficial da habilidade na BNCC Computação.
- `lessons`: de 2 a 3 lições.

Uma **lição** (`Lesson`) tem `id`, `title`, `explanation` (markdown), `simpler` (markdown, a explicação alternativa do botão "Não entendi") e `questions`.

Uma **questão** (`Question`) tem `id`, `prompt` (enunciado), `options` (alternativas), `answer` (índice da alternativa correta em `options`, começando em 0) e `why` (justificativa mostrada depois da resposta, certa ou errada).

Formatação:

- `explanation` e `simpler` são renderizados com `react-markdown` sem plugins: negrito, itálico, listas, títulos, citações e código funcionam. **Tabelas não funcionam** (seriam necessárias extensões GFM).
- `prompt`, `options` e `why` são texto puro. No `prompt`, `\n` vira quebra de linha.

## Exemplo completo

Uma lição nova dentro de `content/ef09co05.ts`, no array `lessons`:

```ts
{
  id: "ef09co05-l4",
  title: "Senhas fortes",
  explanation: `Uma **senha forte** é difícil de adivinhar, até para um computador que testa milhões de combinações por segundo.

- Quanto **mais longa**, melhor: cada caractere a mais multiplica as combinações.
- Misture **letras, números e símbolos**.
- Evite dados pessoais, como seu nome ou data de aniversário.

Uma boa ideia é usar uma **frase-senha**: várias palavras aleatórias juntas, como \`cavalo-nuvem-lápis-17\`.`,
  simpler: `Pense num cadeado de bicicleta. Um cadeado de 3 números tem 1.000 combinações; um de 6 números tem 1 milhão.

Senha é igual: quanto mais comprida e variada, mais tempo alguém leva para testar todas as possibilidades.`,
  questions: [
    {
      id: "ef09co05-l4-q1",
      prompt: "Qual destas senhas é a mais forte?",
      options: ["123456", "maria2010", "cavalo-nuvem-lápis-17", "senha"],
      answer: 2,
      why: "É a mais longa e mistura palavras, símbolos e números. As outras são curtas ou fáceis de adivinhar.",
    },
    {
      id: "ef09co05-l4-q2",
      prompt: "Usar a data do seu aniversário como senha é seguro.",
      options: ["Verdadeiro", "Falso"],
      answer: 1,
      why: "Datas de aniversário aparecem em redes sociais e são das primeiras coisas que um atacante testa.",
    },
  ],
},
```

Depois de editar, rode `pnpm test`.

## Regras para ids

O progresso dos alunos é gravado pelo `id` da lição e da questão. Por isso:

- **Nunca renomeie um id que já está em uso.** Se renomear, o progresso antigo deixa de ser associado à lição ou questão, e o aluno perde as conclusões e o histórico de erros.
- Corrigir o texto de uma questão sem mudar o `id` é seguro. Se a mudança alterar o sentido da questão (outra pergunta, outra resposta certa), prefira criar uma questão nova com outro id.
- Remover uma questão ou lição é seguro: as tentativas e conclusões antigas continuam no banco, mas deixam de contar em "Revisar erros", no mapa do aluno e na % de acerto do painel do professor.
- Ao adicionar ou remover questões de uma lição, a regra de conclusão (60% de acertos) passa a usar as questões atuais da lição. Quem já tinha concluído a lição continua com ela concluída.
- Padrão de nomes, verificado pelos testes:
  - lição: `<habilidade em minúsculas>-l<n>`, por exemplo `ef09co05-l4`;
  - questão: `<id da lição>-q<n>`, por exemplo `ef09co05-l4-q2`.
- Ids precisam ser únicos em todo o conteúdo. Ao adicionar, use o próximo número livre; não reaproveite números de itens removidos.

## Como o embaralhamento funciona

Quem escreve as questões tende a colocar a resposta certa sempre na mesma posição. Para evitar isso, `content/index.ts` embaralha as alternativas uma única vez, quando o módulo é carregado:

- A ordem é **determinística**: cada alternativa recebe uma chave calculada a partir do id da questão e da posição original (um hash FNV-1a). A mesma questão aparece sempre na mesma ordem, para todos os alunos e em todas as visitas.
- O `answer` é recalculado para apontar para a nova posição da alternativa correta. **No arquivo de conteúdo, escreva `answer` sempre em relação à ordem em que você escreveu as alternativas.**
- Questões com apenas 2 alternativas (verdadeiro/falso, ou pares como "ACESA"/"APAGADA") **não** são embaralhadas, para manter a ordem natural, com "Verdadeiro" sempre antes de "Falso".
- Consequência: não escreva alternativas que dependam da posição, como "Todas as anteriores" ou "Nenhuma das acima".

## Orientações de escrita (alunos de 14 anos)

- **Frases curtas e voz ativa.** Um parágrafo, uma ideia.
- **Explicação de cerca de 5 minutos de leitura** somando texto e exercícios. Se crescer demais, divida em duas lições.
- **Comece pelo concreto**: um exemplo do dia a dia (celular, rede social, jogo, mapa) antes da definição.
- **Destaque os termos novos em negrito** na primeira vez que aparecem, e defina-os logo em seguida.
- **"Não entendi" não é resumo**: use outro caminho, normalmente uma analogia ou atividade com papel e caneta, e linguagem ainda mais simples.
- **Questões testam o conceito, não a memória do texto.** Prefira situações ("Qual destes é um exemplo de...") a "Segundo o texto...".
- **Alternativas erradas plausíveis**, baseadas em confusões reais, e todas com tamanho parecido (a certa não deve ser a mais longa).
- **Evite pegadinhas e negações duplas.** Se usar "NÃO", escreva em maiúsculas.
- **Resposta sem ambiguidade**: só uma alternativa pode estar certa. Unidades e formato vão nas alternativas ("8 km"), nunca dependem de digitação.
- **`why` explica o raciocínio**, não só repete a resposta, e serve tanto para quem acertou quanto para quem errou.
- **3 a 5 questões por lição.**
- Temas sensíveis (golpes, desinformação, imagem de terceiros): tom informativo, sem alarmismo e sem citar marcas ou pessoas reais de forma negativa.

## Testes

```bash
pnpm test
```

`content/content.test.ts` roda com o test runner nativo do Node, executando o TypeScript diretamente (remoção de tipos nativa, Node 22.18+). Ele verifica que:

- as 10 habilidades EF09CO01 a EF09CO10 estão presentes e em ordem;
- todos os ids são únicos e seguem o prefixo da habilidade e da lição;
- toda questão tem pelo menos 2 alternativas, sem alternativas repetidas, e um `answer` válido.

Como o Node executa esses arquivos sem compilar, os arquivos de `content/` precisam importar uns aos outros com extensão `.ts` (`./types.ts`) e sem o alias `@/`, e não podem usar recursos de TypeScript que geram código (como `enum`).

Os testes não verificam se a resposta está **pedagogicamente** correta. Todo conteúdo novo ou alterado deve ser revisado por um professor de Computação.
